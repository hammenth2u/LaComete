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


    
}
