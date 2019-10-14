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
        $msg2= "\r\n"."Le message a été envoyé depuis l'adresse suivante : ".$from;

        $headers = array(
            'From' => 'lacometetitan@gmail.com',
            'Reply-To' => 'lacometetitan@gmail.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($to, $obj, $msg.$msg2, $headers);

        return new Response('success');
    }


    /**
     * @Route("/password/lost", name="password_lost")
     */
    public function passwordLost(Request $request, \Swift_Mailer $mailer)
    {
        /*
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
        */

        $email = $request->request->get('email');
        $object = 'Réinitialisation du mot de passe';
        $message = "Bonjour, pour réinitialiser votre mot de passe veuillez cliquer sur le lien suivant : \n 
        http://127.0.0.1:8001/nouveau/mot-de-passe?e=".$email;

        $msg = (new \Swift_Message($object))
        ->setFrom($email)
        ->setTo('clara.hammenthienne@gmail.com')
        ->setBody($message);

        //dump($msg);exit;

        $mailer->send($msg);

        

        return $this->redirectToRoute('contact');
    }

    /**
     * @Route("/admin/contact/users/post", name="contact_all_users_post")
     */
    public function contactAllUsersPost(Request $request, \Swift_Mailer $mailer)
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



/*       $message = (new \Swift_Message('Hello Email'))
        ->setFrom('send@example.com')
        ->setTo('clara.hammenthienne@gmail.com')
        ->setBody('You should see me from the profiler!')

    ;

    $mailer->send($message);
*/      
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
        $msg = $message;
        $msg2= "\r\n"."Message de : ".$from;
        
        mail($to, $obj, $msg.$msg2);

        $response = new Response("success");

        return $response;
    }




}
