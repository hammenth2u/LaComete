<?php

namespace App\Controller;


use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class UserController extends AbstractController
{
    /**
     * @Route("/connexion", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //    $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/deconnexion", name="app_logout")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }

    /**
    * @Route("/inscription", name="app_register")
    */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        // On ajoute une vérification qui redirige l'utilisateur vers une autre page si il est connecté
        if($this->getUser() != null) {
            return $this->redirectToRoute('home'); 
        }

        $form = $this->createForm(UserType::class);
        $form->handleRequest($request);
        // dump($request);exit;    
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();
            $user->setRoles(["ROLE_USER"]);
            $user->setStatus(true);
            $plainPassword = $user->getPassword();
            $encodedPassword = $encoder->encodePassword($user, $plainPassword);
            $user->setPassword($encodedPassword);

/*************************************Envoie email inscription***************************************/

            $userFirstname = $user->getFirstname();


            $to = $user->getEmail();
            $obj = 'Confirmation Inscription LaComete';
            $msg = "Bonjour $userFirstname,"."\r\n"."\r\n"."Nous vous informons que votre inscription a bien été prise en compte."."\r\n"."Pour vous connecter cliquez sur le lien suivant :"."\r\n". "http://127.0.0.1:8001/connexion"."\r\n"."\r\n"."Amicalement,"."\r\n"."L'équipe de La Comete.";


            $headers = array(
                'From' => 'Support-LaComete',
                'Reply-To' => 'lacometetitan@gmail.com',
                'X-Mailer' => 'PHP/' . phpversion(),
                'Content-type'=> 'text/html; charset= utf8',
            );

            mail($to, $obj, $msg, $headers);


/***************************************************************************************************/

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->redirectToRoute('app_login');
        }
        return $this->render('security/register.html.twig', [
            'registerForm' => $form->createView()
        ]);
   
    }

}
