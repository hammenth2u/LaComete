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
        
            $userId = $user->getId();
            
            $favorites = $this->getDoctrine()->getRepository(Favorite::class)->findByUser($userId);

            $formatted = [];
            foreach ($favorites as $favorite) 
            {
                $formatted [] = [
                'idFavorite' => $favorite->getId(),
                'titleAnnonce' => $favorite->getAnnonce()->getTitle(),
                'locationAnnonce' => $favorite->getAnnonce()->getLocation(),
                'pictureAnnonce' => $favorite->getAnnonce()->getPicture(),
                'categoryAnnonce' =>$favorite->getAnnonce()->getCategory()->getName(),
                'idAnnonce' => $favorite->getAnnonce()->getId(),
                ];
            }
            
            return new JsonResponse($formatted);
        }
        else {
            return new Response('pas d\'annonces en fav');
        }
    }

    /**
     * Ajout d'un favori en BDD
     * @Route("/isFavorite", name="favorite_yes_or_no")
     */
    public function isFavorite(Request $request)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        $path = $request->request->get('currentAdPath');
        $annonceId = substr($path, 10);


        //dump($annonceId);exit;
        

        if($this->getUser() != null) {
            $user = $this->getUser();
            $userId = $user->getId();

            $favorite = $this->getDoctrine()->getRepository(Favorite::class)->findFavoriteByAnnonceAndUser($userId, $annonceId);

            //dump($favorite);exit;
            if($favorite != null){
                $isFavorite = true;
            } else {
                $isFavorite = false;
            }
            return new JsonResponse(['isFavorite' => $isFavorite]);
        }
    }


    /**
     * Ajout d'un favori en BDD
     * @Route("/favorite/new", name="new")
     */
    public function favoriteNew(Request $request)
    {

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        $annonceId = $request->request->get('currentAdId');

        //dump($annonceId);exit;
    

        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);

        if($request->request->get('isFavorite')){
            $isFavorite = $request->request->get('isFavorite');
        }else {
            $isFavorite = '';
        }

        //$isFavorite = false;

        //dump($isFavorite);exit;

        if ($isFavorite == true || $isFavorite = ''){

            if($this->getUser() != null) {
                $user = $this->getUser();
                
                $favorite = new Favorite();
    
                $favorite->setUser($user);
                $favorite->setAnnonce($annonce);
    
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($favorite);
                $entityManager->flush();
    
                return new Response('favorite add');
            }
        }

        if($isFavorite == false){

            if($this->getUser() != null) {
                
                $user = $this->getUser();
                $userId = $user->getId();
                
                $favorite = $this->getDoctrine()->getRepository(Favorite::class)->findFavoriteByAnnonceAndUser($userId,$annonceId);

                $annonce = $favorite[0]->getAnnonce();
                
                $annonce->removeFavorite($favorite[0]);
                $user->removeFavorite($favorite[0]);
                
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->remove($favorite[0]);
                $entityManager->flush();

                return new Response('favorite delete');
            }
        }


   
    }
}
