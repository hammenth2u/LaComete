<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/connexion", name="connexion")
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
     * @Route("/deconnexion", name="deconnexion")
     */
    public function logout()
    {
        throw new \Exception('This method can be blank - it will be intercepted by the logout key on your firewall');
    }

    /**
    * @Route("/inscription", name="inscription")
    */
    public function signUp(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new User;

        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $em = $this->getDoctrine()->getEntityManager();

            $passwordEncoded = $passwordEncoder->encodePassword($user, $user->getPassword());
            $user->setPassword($passwordEncoded);

            $em->persist($user);
            $em->flush();

            $this->addFlash('message', 'Inscription terminée');

            return $this->redirectToRoute('home');
        }

        return $this->render('all/signUpForm.html.twig', ['signUpForm' => $form->createView()]);
    }
    
    /**
    * @Route("/profil", name="profil")
    */
    public function myProfile()
    {
        $user = $this->getUser();


        return $this->render('author/profile.html.twig', [
            'author' => $user,
        ]);
    }

}
