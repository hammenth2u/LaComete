<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Validator\ConstraintViolationList;

class TestController extends AbstractFOSRestController
{
    /**
     * @Route("/api/test", name="api_test")
     */
    public function test()
    {
        //$response = new JsonResponse(['data' => 123]);

        // if you don't know the data to send when creating the response
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        $response = new JsonResponse();
        // ...
        $response->setData(['data' => 123]);
        
        // if the data to send is already encoded in JSON
        $response = JsonResponse::fromJsonString('{ "data": 123 }');

        return $response;
    }
}
