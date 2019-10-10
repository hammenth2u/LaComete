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
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $annonceId = $request->request->get('adId');

        //dump($annonceId);exit;

        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);
        //$annonceId = $annonce->getId();
        $comment = new Comment();

        //On recupère la donnée 
        $content = $request->request->get('comment');

        $user = $this->getUser();
        //$userId = $user->getId();

        $comment->setContent($content);
        $comment->setUser($user);
        $comment->setAnnonce($annonce);
        $comment->setStatus(true);


        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($comment);
        $entityManager->flush();

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
