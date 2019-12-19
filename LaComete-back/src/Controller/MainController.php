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
}
