<?php

namespace App\Controller\Api;


use App\Entity\Annonce;
use App\Entity\Category;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;
use Symfony\Component\Serializer\NameConverter\MetadataAwareNameConverter;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


 /**
  * @Route("/api", name="api_annonces_")
  */
class AnnonceController extends AbstractController
{

    /**
     * @Route("/list/annonces", name="list")
     */
    public function annoncesList()
    {

        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findAllOrderedByCreatedAt();

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        $formatted = [];
        foreach ($annonces as $annonce) 
        {
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'need' => $annonce->getNeed(),
               'city' => $annonce->getCity(),
               'type' => $annonce->getType(),
            ];
        }
        
        return new JsonResponse($formatted);
    }

    /**
     * @Route("/annonces/list/{category}", name="list_by_category")
     */
    public function annoncesListByCategory(Category $category)
    {
        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findByCategory($category);

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $formatted = [];
        foreach ($annonces as $annonce) 
        {
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'city' => $annonce->getCity(),
               'type' => $annonce->getType(),
            ];
        }
        
        return new JsonResponse($formatted);
    }

    /**
     * 
     * @Route("/annonces/user/list", name="list_by_user")
     */
    public function annoncesListByUser()
    {
        if($this->getUser() != null) {
            $user = $this->getUser();
            //dump($user->getId());exit;
            $userId = $user->getId();
            
            $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findByUser($userId);

            header('Access-Control-Allow-Origin: *'); 
            header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

            $formatted = [];
            foreach ($annonces as $annonce) 
            {
                $formatted [] = [
                'id' => $annonce->getId(),
                'title' => $annonce->getTitle(),
                'description' => $annonce->getDescription(),
                'city' => $annonce->getCity(),
                'type' => $annonce->getType(),
                ];
            }
            
            return new JsonResponse($formatted);
        }
        else {
            return null;
        }
    }


    /**
     * @Route("/annonces/{id}", name="single")
     */
    public function singleAnnonce(Annonce $annonce)
    {

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $formatted = [];
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'city' => $annonce->getCity(),
               'type' => $annonce->getType(),
            ];
        
        
        return new JsonResponse($formatted);

        /*
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $metadataAwareNameConverter = new MetadataAwareNameConverter($classMetadataFactory);
        $normalizer = new ObjectNormalizer($classMetadataFactory, $metadataAwareNameConverter);
        $serializer = new Serializer([$normalizer]);
        $data = $serializer->normalize($annonce, null, ['groups' => 'api']);
        return $this->json($data);
        */
    }


    /**
     * @Route("/annonces/resultats/recherche", name="result_search")
     */
    public function resultSearchAnnonce(Request $request)
    {
        $type = $request->request->get('type');
        $localisation = $request->request->get('localisation');
        $category = $request->request->get('category');

        if($type != ""){
            $req1 = "WHERE a.type = :".$type;
        }else {
            $req1 = "";
        }

        if($localisation != ""){
            $req2 = "WHERE a.city = :".$localisation;
        }else {
            $req2 = "";
        }
        if($category != ""){
            $req3 = "WHERE a.category = :".$category;
        }else {
            $req3 = "";
        }

        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findBySearch($req1, $req2, $req3);


        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $formatted = [];
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'city' => $annonce->getCity(),
               'type' => $annonce->getType(),
            ];
        
        
        return new JsonResponse($formatted);


    }

    /**
     * @Route("/new/annonce", name="new_annonce", methods={"POST"})
     * 
     */
    public function newAnnonce(Request $request)
    {
        // $error = [
        //     'success' => false,
        //     'errors' => []
        // ];

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $annonce = new Annonce();

        $user = $this->getUser();

        $title = $request->request->get('title');
        $city = $request->request->get('city');
        //$picture = $request->request->get('picture');
        $description = $request->request->get('description');
        $type = $request->request->get('adtype');
        $category = $request->request->get('category');
        $need = $request->request->get('need');
        $email = $request->request->get('email');
        $phone = $request->request->get('phone');
        $website = $request->request->get('website');

        $annonce->setUser($user);
        $annonce->setTitle($title);
        $annonce->setCity($city);
        //$annonce->setPicture($picture);
        $annonce->setDescription($description);
        $annonce->setType($type);
        $annonce->setNeed($need);
        $annonce->setNeed($email);
        $annonce->setNeed($phone);
        $annonce->setNeed($website);
        $annonce->setCategory($category);
        $annonce->setStatus(true);

        $em = $this->getDoctrine()->getManager();
        $em->persist($annonce);
        $em->flush();

        // try {
        //     $em->flush();
        // } catch (Exception $e) {
        //     $error['errors'][] = "Une erreur est survenue lors du flush : " . $e->getMessage();
        //     return $this->json($error);
        // } 

        // return $this->json([
        //     'success' => true
        // ]);

        return $this->redirectToRoute('home');
    }




}
