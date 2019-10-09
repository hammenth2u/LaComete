<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Validator\ConstraintViolationList;

class TestController extends AbstractFOSRestController
{
    /**
     * @Route("/api/test", name="api_test")
     */
    public function test(Request $request)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $latitude = $request->request->get('lat');
        $longitude = $request->request->get('lng');
        $location = $request->request->get('city');

        $response = new Response([
            'latitude' => $latitude,
            'longitude' => $longitude,
            'location' => $location
        ]);

        return $response;
    }
}
