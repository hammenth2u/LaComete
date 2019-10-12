<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Category;
use App\Entity\User;
use App\Service\FileUploadManager;
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
     * 
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
               'city' => $annonce->getLocation(),
               'type' => $annonce->getType(),
               'need' => $annonce->getNeed(),
               'user' => $annonce->getUser()->getUsername(),
               'category' => $annonce->getCategory()->getName(),
               'picture' => $annonce->getPicture(),
            ];
        }
        
        return new JsonResponse($formatted);
    }


    /**
     * 
     * @Route("/list/user/annonces", name="list_user")
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
                'city' => $annonce->getLocation(),
                'type' => $annonce->getType(),
                'picture' => $annonce->getPicture(),
                ];
            }
            
            return new JsonResponse($formatted);
        }
        else {
            return null;
        }
    }

    /**
     * Permet d'ajouter une nouvelle annonce dans la bdd
     * @Route("/annonce/new", name="new_annonce")
     * 
     */
    public function newAnnonce(Request $request, FileUploadManager $fileUploadManager)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


        $annonce = new Annonce();
        

        $user = $this->getUser();

        $title = $request->request->get('title');
        $location = $request->request->get('location');
        $description = $request->request->get('description');
        $type = $request->request->get('type');
        $cat = $request->request->get('category');
        $need = $request->request->get('need');
        

        // if($request->request->get('fileName')){
        //     $picture = $request->request->get('fileName');
        //     $annonce->setPicture($picture);
        // }

        if($request->request->get('email')){
            $email = $request->request->get('email');
            $annonce->setEmail($email);
        }

        if($request->request->get('phone')){
            $phone = $request->request->get('phone');
            $annonce->setPhone($phone);
        }

        if($request->request->get('website')){
            $website = $request->request->get('website');
            $annonce->setWebsite($website);
        }

        if($request->request->get('formData')){
            $formData = $request->files->get('formData');
        }
        
        // dump($request);exit;

        // if (isset($_FILES['formData'])) {
        //     $formData  = $_FILES['formData'];
        
        //     $tmpFilePath      = $formData['tmp_name'];
        //     $fileType         = $formData['type'];
        //     $fileOriginalName = $formData['name'];
        
        //     //	uploaded file is moved to upload directory
        //     $imageContent = @file_get_contents($tmpFilePath);
        // }


        $category = $this->getDoctrine()->getRepository(Category::class)->find($cat);


        $annonce->setUser($user);
        $annonce->setTitle($title);
        $annonce->setLocation($location);
        $annonce->setDescription($description);
        $annonce->setType($type);
        $annonce->setNeed($need);
        $annonce->setCategory($category);
        $annonce->setStatus(true);

        $em = $this->getDoctrine()->getManager();
        $em->persist($annonce);
        $em->flush();

        $imagePath = $fileUploadManager->upload($formData, $annonce->getId());
        $annonce->setImage($imagePath);
        $em->flush();

        $response = new Response('success');
        return $response;
    }

    /**
     * @Route("/single/annonce", name="single_ad")
     */
    public function singleAd(Request $request)
    {

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        $path = $request->request->get('currentUrl');
        $annonceId = substr($path, 10);
        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);

        $formatted = [];
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'city' => $annonce->getLocation(),
               'type' => $annonce->getType(),
               'need' => $annonce->getNeed(),
               'createdAt' => $annonce->getCreatedAt(),
               'user' => $annonce->getUser()->getUsername(),
               'category' => $annonce->getCategory()->getName(),
               'website' => $annonce->getWebsite(),
               'email' => $annonce->getEmail(),
               'phone' => $annonce->getPhone(),
               'picture' => $annonce->getPicture(),
            ];
        
        return new JsonResponse($formatted);
    }

###############################################################################################################################
####################################################  NE PAS TOUCHER ##########################################################
###############################################################################################################################
    /**
     * @Route("/results/annonces/search", name="result_search")
     */
    public function resultSearchAnnonce(Request $request)
    {
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    
        if($request->request->get('type') != ''){
            $type = $request->request->get('type');
        }else{
            $type="";
        }
        if($request->request->get('location') != ''){
            $location = $request->request->get('location');
        }
        else{
            $location="";
        }
        if($request->request->get('category') != ''){
            $category = $request->request->get('category');
        }else{
            $category ="";
        }


        if($type  != ''){
            $req1 = "WHERE a.type = :myType";
        }else {
            $req1 = "";
        }

        if($location != ''){
            $req2 = " AND a.location = :myLocation";
        }else {
            $req2 = "";
        }
        if($category != ''){
            $req3 = " AND a.category = :myCategory";
        }else {
            $req3 = "";
        }

        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findBySearch($req1, $req2, $req3, $type, $location, $category);

        if($annonces != null){

            $formatted = [];

            foreach($annonces as $annonce)
            {
            
                $formatted [] = [
                'id' => $annonce->getId(),
                'title' => $annonce->getTitle(),
                'description' => $annonce->getDescription(),
                'location' => $annonce->getLocation(),
                'type' => $annonce->getType(),
                'category' => $annonce->getCategory()->getName(),
                'picture' => $annonce->getPicture(),
                ];
            }
            
            return new JsonResponse($formatted);

        }
        else {
            return new JsonResponse([]);
        }
    }
}
