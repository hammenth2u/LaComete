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
        //$annonceId = 9;
        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);
        $annonceUserEmail = $annonce->getUser()->getEmail();
        $annonceUserFirstname = $annonce->getUser()->getFirstname();
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
        $msg = "Bonjour ".$annonceUserFirstname.","."\r\n"."\r\n"."Vous venez de recevoir un nouveau commentaire de la part de ".$from." sur votre annonce. "."\r\n"."Intitulé de l'annonce : ".$annonceTitle.".\r\n"."\r\n"."Amicalement,\r\n"."L'équipe LaComete.";

        $headers = array(
            'From' => 'Support-LaComete',
            'Reply-To' => 'lacometetitan@gmail.com',
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-type'=> 'text/html; charset= utf8',
        );

        $entete   = 'From: "LaComete <lacomete@gmail.com>"';
        $entete  .= "Content-type: text/html; charset= utf8\n";
        
        mail($to, $obj, $msg, $headers);

        /* Retour de réponse avec tous les commentaires de l'annonce */

        $comments = $this->getDoctrine()->getRepository(Comment::class)->findCommentsByAnnonce($annonceId);

        $formatted = [];

        foreach ($comments as $comment) 
        {
            $createdAt= $comment->getCreatedAt()->getTimestamp();
            $createdAt = date('d-M-Y',$createdAt);

            $formatted [] = [
               'idComment' => $comment->getId(),
               'contentComment' => $comment->getContent(),
               'userComment' => $comment->getUser()->getUsername(),
               'dateComment' => $createdAt,
            ];
        } 

        return new JsonResponse($formatted);
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
            $createdAt= $comment->getCreatedAt()->getTimestamp();
            $createdAt = date('d-M-Y',$createdAt);

            $formatted [] = [
               'idComment' => $comment->getId(),
               'contentComment' => $comment->getContent(),
               'userComment' => $comment->getUser()->getUsername(),
               'dateComment' => $createdAt,
            ];
        }       

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/update/comment", name="update_comment")
     */
    public function UpdateComment(Request $request)
    {
        // permet d'acceder aux differentes methodes
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
         // on récupère l'utilisateur connecté 
        $user = $this->getUser();
         // on récupère l'id de l'alerte associé au commentaire à modifier
       // $advertId = $request->request->get('advertId');
         // on récupère l'id du commentaire à modifier
        $commentId = $request->request->get('commentId');
         // on retrouve l'object commentaire associé à l'id du commentaire
        $comment = $this->getDoctrine()->getRepository(Comment::class)->find($commentId);
         // on vérifie qu'on reçoit le text du commentaire si oui en remplace dans la bdd
        if($request->request->get('content') !== '')
        {
            $content = $request->request->get('content');
            $comment->setContent($content);
        }
         // on envoie dans la bdd 
        $em = $this->getDoctrine()->getManager();
        $em->persist($comment);
        $em->flush();
         // on peut informer que le commentaire est bien modifié !
        return new Response('commentaire modifié', Response::HTTP_CREATED);
    }
}
