<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home()
    {
        return $this->render('main/index.html.twig');
    }

    /**
     * @Route("/contact", name="contact")
     */
    public function contact()
    {
        return $this->render('main/contact.html.twig');
    }

    /**
     * @Route("/mentions-legales", name="mentionsLegal")
     */
    public function mentionsLegal()
    {
        return $this->render('main/mentions.html.twig');
    }

    /**
     * @Route("/a-propos", name="about")
     */
    public function about()
    {
        return $this->render('main/about.html.twig');
    }

    /**
     * @Route("/cdu", name="cdu")
     */
    public function cdu()
    {
        return $this->render('main/cdu.html.twig');
    }
}
