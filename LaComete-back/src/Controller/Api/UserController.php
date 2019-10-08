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
     * @Route("/isConnected", name="isconnected")
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
     * @Route("/account", name="")
     */
    public function account(UserPasswordEncoderInterface $encoder)
    {

        if($this->getUser() != null) {
            
            $user = $this->getUser();
            //$form = $this->createForm(UserType::class, $user);
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


            $formatted = [];

            $passwordEncode = $user->getPassword();
            
            //$encodedPassword = $encoder->encodePassword($user, $plainPassword);
            

            
                $formatted [] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'email' => $user->getEmail(),
                'firstname' => $user->getFirstname(),
                'lastname' => $user->getLastname(),
                'password' => $passwordEncode,
                ];
            

            //dump($formatted);exit;
            return new JsonResponse($formatted);
        }
        else {
            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            return null;
        }
    }

    /**
     * @Route("/edit/account", name="edit")
     */
    public function editProfile(Request $request, UserPasswordEncoderInterface $encoder) 
    {
        $user = $this->getUser();

        if($request->request->get('firstname') !== null)
        {
            $firstname = $request->request->get('firstname');
            $user->setFirstname($firstname);
        }

        if($request->request->get('lastname') !== null)
        {
            $lastname = $request->request->get('lastname');
            $user->setLastname($lastname);
        }

        if($request->request->get('username') !== null)
        {
            $username = $request->request->get('username');
            $user->setUsername($username);
        }

        if($request->request->get('email') !== null)
        {
            $email = $request->request->get('email');
            $user->setEmail($email);
        }

        if($request->request->get('newpassword') !== null)
        {
            $newpassword = $request->request->get('newpassword');
            $encodedPassword = $encoder->encodePassword($user, $newpassword);
            $user->setPassword($encodedPassword);
        }

        //$firstname = "Clara";
        //$user->setFirstname($firstname);


        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        $response = new Response('success');
        return $response;
    }
}
