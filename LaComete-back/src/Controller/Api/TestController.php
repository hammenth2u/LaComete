<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

use Symfony\Component\Validator\ConstraintViolationList;

class TestController extends AbstractFOSRestController
{
    /**
     * @Route("/api/test", name="api_test")
     */
    public function test()
    {
        $test = "coucou";
        return $this->render('api/test/index.html.twig', [
            'test' => $test,
        ]);
    }
}
