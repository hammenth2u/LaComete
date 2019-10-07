<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Favorite;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


 /**
  * @Route("/api", name="api_favorite_")
  */
class FavoriteController extends AbstractController
{
    /**
     * Liste des favoris d'un utilisateur connecté
     * @Route("/list/favorites", name="list")
     */
    public function favoritesList()
    {

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        if($this->getUser() != null) {
            $user = $this->getUser();
            //dump($user->getId());exit;
            $userId = $user->getId();
            
            $favorites = $this->getDoctrine()->getRepository(Favorite::class)->findByUser($userId);

            $formatted = [];
            foreach ($favorites as $favorite) 
            {
                $formatted [] = [
                'id' => $favorite->getId(),
                'annonce' => $favorite->getAnnonce()->getTitle(),
                ];
            }
            
            return new JsonResponse($formatted);
        }
        else {
            return null;
        }
    }

    /**
     * Ajout d'un favori en BDD
     * @Route("/favorite/new", name="new")
     */
    public function favoriteNew(Annonce $annonce)
    {

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        if($this->getUser() != null) {
            $user = $this->getUser();
            //dump($user->getId());exit;
            //$userId = $user->getId();
            //$annonceId = $annonce->getId();
            
            $favorite = new Favorite();

            $favorite->setUser($user);
            $favorite->setAnnonce($annonce);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($favorite);
            $entityManager->flush();

            return new Response("success");
        }
        else {
            return new Response("utilisateur non connecté");
        }
    }
}
