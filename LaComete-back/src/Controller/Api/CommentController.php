<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Comment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;



 /**
  * @Route("/api", name="api_comment_")
  */
class CommentController extends AbstractController
{
    /**
     * @Route("/api/annonces/{annonce}/comment/add", name="new")
     */
    public function new(Annonce $annonce)
    {
        //on instancie notre nouveau comment 
        $comment = new Comment();

        //On recupère la donnée 
        $content = $request->request->get('content');


        $user = $this->getUser();
        $userId = $user->getId();


        $comment->setContent($content);
        $comment->setUser($userId);
        $comment->setAnnonce($annonce);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($movie);
        $entityManager->flush();

        return $this->redirectToRoute('home');
    }
}
