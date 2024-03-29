<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


 /**
  * @Route("/api", name="api_contact_")
  */
class ContactController extends AbstractController
{

    /**
     * @Route("/contact/post", name="post")
     */
    public function contactPostEmail(Request $request)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');


        if($this->getUser() != null) {
            $user = $this->getUser(); 
            $email = $user->getEmail();
            $object = $request->request->get('object');
            $message = $request->request->get('message');
        } else {
            $email = $request->request->get('email');
            $object = $request->request->get('object');
            $message = $request->request->get('message');
        }

        $from = $email;
        $to = 'lacometetitan@gmail.com';
        $obj = 'Contact-'.$object;
        $msg = $message;
        $msg2= "\r\n"."\r\n"."Le message a été envoyé depuis l'adresse suivante : ".$from;

        $headers = array(
            'From' => 'Support-LaComete',
            'Reply-To' => 'lacometetitan@gmail.com',
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-type'=> 'text/html; charset= utf8',
        );
        
        mail($to, $obj, $msg.$msg2, $headers);

        return new Response('success');
    }

    /**
     * @Route("/admin/contact/users/post", name="contact_all_users_post")
     */
    public function contactAllUsersPost(Request $request)
    {

        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        //$object = $request->request->get('object');
        //$message = $request->request->get('message');

        $object = "Test message groupé";
        $message = "Bonjour %firstname%,"."\r\n"."\r\n"."J'espère que vous avez bien reçu mon dernier mail ?"."\r\n"."\r\n"."Cordialement,"."\r\n"."Clara";
        

        foreach ($users as $user) 
        {
            $email = $user->getEmail();
            $firstname = $user->getFirstname();

            $to = $email;
            $obj = $object;
            $msg = $message;
            //$header = 'Content-type: text/html; charset=utf-8';
            $headers= "Content-Type: text/plain;charset=utf-8";

            $msg = str_replace("%firstname%", $firstname, $msg, $headers);
            //$msg2= "\r\n"."Message de : ".$from;
            
            mail($to, $obj, $msg);

        }      
        $response = new Response("success");

        return $response;
    }

    /**
     * @Route("/contact/another/user", name="post_another_user")
     */
    public function contactAnotherUser(Request $request)
    {

        
        if($this->getUser() != null) {
            $user = $this->getUser(); 
            $email = $user->getEmail();
            $object = $request->request->get('contactObject');
            $message = $request->request->get('contactContent');
            //$anotherUser = $request->request->get('author');
            //$anUser = $this->getDoctrine()->getRepository(User::class)->findUserByUsername($anotherUser);
            //$anUserEmail = $anUser->getEmail();
            $anUserEmail = $request->request->get('email');
        } 

        $from = $email;
        $to = $anUserEmail;
        $obj = $object;

        $msg1 = "Bonjour,"."\r\n"."\r\n". "Un utilisateur souhaite vous contacter par mail."."\r\n"."Voilà le message qu'il vous a envoyé : \r\n"."\r\n";
        $msg2 = $message;
        $msg3= "\r\n"."\r\n"."Vous pouvez lui répondre à cette adresse : ".$from;
        $msg4 = "\r\n"."\r\n"."Amicalement,"."\r\n"."L'équipe LaComete";

        $headers = array(
            'From' => 'Support-LaComete',
            'Reply-To' => 'lacometetitan@gmail.com',
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-type'=> 'text/html; charset= utf8',
        );
        
        mail($to, $obj, $msg1.$msg2.$msg3.$msg4, $headers);

        $response = new Response("success");

        return $response;
    }
}
