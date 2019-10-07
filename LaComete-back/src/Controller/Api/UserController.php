<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\NameConverter\MetadataAwareNameConverter;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;



/**
 * @Route("/api/user", name="api_user_")
 */
class UserController extends AbstractController
{

    /**
     * @Route("IsConnected", name="isConnected")
     */
    public function userConnect()
    {
        if($this->getUser() != null) {
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            $formatted = [];
            
            $formatted [] = [
            'userConnected' => true,
            ];
        }
        else {
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            $formatted = [];
            
            $formatted [] = [
            'userConnected' => false,
            ];
        }

        return new JsonResponse($formatted);
    }

    /**
     * @Route("/account", name="account")
     */
    public function account()
    {

        if($this->getUser() != null) {
            
            $user = $this->getUser();
            //$form = $this->createForm(UserType::class, $user);
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


            $formatted = [];
            
                $formatted [] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                ];
            
            return new JsonResponse($formatted);
        }
        else {
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            return null;
        }
    }
}
