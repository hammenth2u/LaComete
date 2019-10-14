<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Comment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;



 /**
  * @Route("/api", name="api_comment_")
  */
class CommentController extends AbstractController
{
    /**
     * @Route("/comment/new", name="new")
     */
    public function new(Request $request)
    {
        // header('Access-Control-Allow-Origin: *'); 
        // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        // $annonceId = $request->request->get('adId');
        // $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);


        // $comment = new Comment();

        // $content = $request->request->get('comment');

        // $user = $this->getUser();
        // //$userId = $user->getId();

        // $comment->setContent($content);
        // $comment->setUser($user);
        // $comment->setAnnonce($annonce);
        // $comment->setStatus(true);


        // $entityManager = $this->getDoctrine()->getManager();
        // $entityManager->persist($comment);
        // $entityManager->flush();

        // return new Response ('success');


        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $annonceId = $request->request->get('adId');
        //$annonceId = 9;
        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);
        $annonceUserEmail = $annonce->getUser()->getUsername();
        //dump($annonceUserEmail);exit;
        $annonceTitle = $annonce->getTitle();


        $comment = new Comment();

        $content = $request->request->get('comment');
        //$content = "test blablabla";

        $user = $this->getUser();
        $commentUserUsername = $user->getUsername();

        $comment->setContent($content);
        $comment->setUser($user);
        $comment->setAnnonce($annonce);
        $comment->setStatus(true);


        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($comment);
        $entityManager->flush();

        /*
           Envoie de l'email et construction de l'email
        */

        $from = $commentUserUsername;
        $to = $annonceUserEmail;
        $obj = "Nouveau commentaire sur votre annonce";
        $msg = "Vous avez reçu un nouveau commentaire de la part de ".$from."sur votre annonce : "."\r\n".$annonceTitle;

        $header= 'From: "LaComete <lacomete@gmail.com>"';

        $entete   = 'From: "LaComete <lacomete@gmail.com>"';
        $entete  .= "Content-type: text/html; charset= utf8\n";
        
        mail($to, $obj, $msg, $header);

        return new Response ('success');
    }

    /**
     * @Route("/comments/show", name="list")
     */
    public function listComments(Request $request)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $path = $request->request->get('currentPath');
        $annonceId = substr($path, 10);

        $comments = $this->getDoctrine()->getRepository(Comment::class)->findCommentsByAnnonce($annonceId);

        $formatted = [];

        foreach ($comments as $comment) 
        {
            $formatted [] = [
               'idComment' => $comment->getId(),
               'contentComment' => $comment->getContent(),
               'userComment' => $comment->getUser()->getUsername(),
            ];
        }       

        return new JsonResponse($formatted);
    }
}
