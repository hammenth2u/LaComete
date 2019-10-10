<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
     /**
    *@Route("/{reactRouting}", name="home", requirements={"reactRouting"="(.+)[^connexion][^inscription]"}, defaults={"reactRouting": null})
    */
    public function home()
    {
        return $this->render('main/index.html.twig');
    }

     /** 
      * @Route("/motdepasseoublie", name="password_test")
      */
     public function passwordLost()
     {
         return $this->render('main/index.html.twig');
     }

     /** 
      * @Route("/mon-compte/nouvelle-annonce", name="annonce_new_test")
      */
      public function annonceNew()
      {
          return $this->render('main/index.html.twig');
      }

    // /**
    //  * @Route("/a-propos", name="about")
    //  */
    // public function about()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mentions-legales", name="mentions")
    //  */
    // public function mentions()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/cdu", name="cdu")
    //  */
    // public function cdu()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mon-compte", name="myAccount")
    //  */
    // public function myAccount()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mon-compte/mes-annonces", name="account_ads")
    //  */
    // public function accountAds()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mon-compte/mes-favoris", name="account_favoris")
    //  */
    // public function accountFavoris()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mon-compte/parametres", name="account_parameters")
    //  */
    // public function accountParameters()
    // {
    //     return $this->render('main/index.html.twig');
    // }

    // /**
    //  * @Route("/mon-compte/nouvelle-annonce", name="account_newAd")
    //  */
    // public function accountNewAd()
    // {
    //     return $this->render('main/index.html.twig');
    // }


    
}
