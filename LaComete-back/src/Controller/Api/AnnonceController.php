<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Comment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;

class AnnonceController extends AbstractController
{

    /**
     * 
     * @Route("/api/annonces", name="api_annonces")
     */
    public function annoncesList()
    {
        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findAll();
        
        $formatted = [];
        foreach ($annonces as $annonce) 
        {
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
            ];
        }

        //Si besoin de retourner à une vue twig pour faire des tests
        /* 
        return $this->render('api/annonce/index.html.twig', [
            'annonces' => $annonces,
        ]);
         */
        return new JsonResponse($formatted);
    }


    /**
     * 
     * @Route("api/annonces/{annonce}/show", name="api_annonce_single_show")
     */
    public function singleAnnonce(Annonce $annonce)
    { 
        $comments = $this->getDoctrine()->getRepository(Comment::class)->findCommentsByAnnonce($annonce);
        //$formResponse = $this->createForm(ResponseType::class);

        $formatted = [];
        
        foreach ($comments as $comment) 
        {
            $formatted [] =
            [
               'id' => $comment->getId(),
               'content' => $comment->getContent(),
            ];  
        }
        

        return new JsonResponse($formatted);

        /*
        return $this->render('api/annonce/single.html.twig', [
            'annonce' => $annonce,
            'comments'=> $comments,
        ]);
        */
    } 
}
