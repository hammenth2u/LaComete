<?php

namespace App\Controller;


use App\Entity\User;
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
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return $this->redirectToRoute('app_login');
        }
        return $this->render('security/register.html.twig', [
            'registerForm' => $form->createView()
        ]);
   

    /*
    if ($request->request->get('password') != '') {

            //$user = $form->getData();

            $user = new User();
            $user->setRoles(["ROLE_USER"]);
            $user->setStatus(true);

            $username = $request->request->get('username');
            $email = $request->request->get('email');
            $plainPassword = $request->request->get('password');

            //$plainPassword = $user->getPassword();
            $encodedPassword = $encoder->encodePassword($user, $plainPassword);

            $user->setUsername($username);
            $user->setEmail($email);
            $user->setPassword($encodedPassword);

            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('app_login');
       }

        return $this->render('security/register.html.twig');
        */
    }
    
    /**
     * @Route("/mon-compte", name="app_profile")
     */
    public function profile(Request $request)
    {
        // On a besoin d'afficher un formulaire différent de l'inscription
        // Grâce au UserType, avec l'Event, on devrait y arriver sans faire de manipulation dans le contrôleur

        // On crée l'objet Form avec l'objet de l'utilsateur
        $user = $this->getUser();
        $form = $this->createForm(UserType::class, $user);

        // C'est par ici qu'on ajouterait le code pour traiter les informations reçues par le formulaire. On n'a pas développé cette fonctionnalité pour le moment.

        // Le formulaire est déja relié à l'utilisateur, on l'envoie à la vue
        return $this->render('security/profile.html.twig', [
            'profileForm' => $form->createView(),
            'user' => $user
        ]);
    }

}
