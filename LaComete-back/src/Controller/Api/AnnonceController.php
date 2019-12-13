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

            $createdAt= $annonce->getCreatedAt()->getTimestamp();

            $createdAt = date('d-M-Y à H:i',$createdAt);

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
               'createdAt' => $createdAt,
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
                $createdAt= $annonce->getCreatedAt()->getTimestamp();
                $createdAt = date('d-M-Y à H:i',$createdAt);

                $formatted [] = [
                'id' => $annonce->getId(),
                'title' => $annonce->getTitle(),
                'description' => $annonce->getDescription(),
                'city' => $annonce->getLocation(),
                'type' => $annonce->getType(),
                'picture' => $annonce->getPicture(),
                'createdAt' => $createdAt,
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
    public function newAnnonce(Request $request)
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


        $category = $this->getDoctrine()->getRepository(Category::class)->find($cat);

        $image = '';

        if($category->getName() == 'Animaux'){
            $image = 'https://i.ibb.co/5BmMVPj/animaux.jpg';
        }elseif($category->getName() == 'Art'){
            $image = 'https://i.ibb.co/QKrG4tC/art.jpg';
        }elseif($category->getName() == 'Bricolage'){
            $image = 'https://i.ibb.co/QK3k6sj/photo-1540103711724-ebf833bde8d1.jpg';
        }elseif($category->getName() == 'Cinéma'){
            $image = 'https://i.ibb.co/nbcGj2x/cinema.jpg';
        }elseif($category->getName() == 'Communauté'){
            $image = 'https://i.ibb.co/dWNbXXj/communaute.jpg';
        }elseif($category->getName() == 'Humanitaire'){
            $image = 'https://i.ibb.co/dc8L4Tp/humanitarian-aid-939723-960-720.jpg';
        }elseif($category->getName() == 'Théâtre'){
            $image = 'https://i.ibb.co/prTPYfZ/photo-1513106580091-1d82408b8cd6.jpg';
        }elseif($category->getName() == 'Travaux'){
            $image = 'https://i.ibb.co/2gR9R1P/travaux.jpg';
        }elseif($category->getName() == 'Jardinage'){
            $image = 'https://i.ibb.co/xgLgRMW/jardinage.jpg';
        }elseif($category->getName() == 'Voyage'){
            $image = 'https://i.ibb.co/Pzrg7sN/photo-1517842264405-72bb906a1936.jpg';
        }elseif($category->getName() == 'Divers'){
            $image = 'https://i.ibb.co/gDbFRjs/photo-1493612276216-ee3925520721.jpg';
        }elseif($category->getName() == 'Technologie'){
            $image = 'https://i.ibb.co/DV95WgZ/technologie.jpg';
        }elseif($category->getName() == 'Mode'){
            $image = 'https://i.ibb.co/C0XjQxC/mode.jpg';
        }elseif($category->getName() == 'Musique'){
            $image = 'https://i.ibb.co/5jtdwGj/photo-1477233534935-f5e6fe7c1159.jpg';
        }elseif($category->getName() == 'Sport'){
            $image = 'https://i.ibb.co/mXQB2zx/photo-1558365849-6ebd8b0454b2.jpg';
        }elseif($category->getName() == 'Immbobilier'){
            $image = 'https://i.ibb.co/0j7fBwZ/immobilier.jpg';
        }elseif($category->getName() == 'Geek'){
            $image = 'https://i.ibb.co/pvDHr0G/photo-1514302240736-b1fee5985889.jpg';
        }elseif($category->getName() == 'Photographie'){
            $image = 'https://i.ibb.co/Xxmh9HM/photographie.jpg';
        }elseif($category->getName() == 'Éducation'){
            $image = 'https://i.ibb.co/Pj1n74q/photo-1509062522246-3755977927d7.jpg';
        }


        $annonce->setPicture($image);
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

        $createdAt= $annonce->getCreatedAt()->getTimestamp();
        $createdAt = date('d-M-Y à H:i',$createdAt);

        $formatted = [];
            $formatted [] = [
               'id' => $annonce->getId(),
               'title' => $annonce->getTitle(),
               'description' => $annonce->getDescription(),
               'city' => $annonce->getLocation(),
               'type' => $annonce->getType(),
               'need' => $annonce->getNeed(),
               'user' => $annonce->getUser()->getUsername(),
               'category' => $annonce->getCategory()->getName(),
               'website' => $annonce->getWebsite(),
               'email' => $annonce->getEmail(),
               'phone' => $annonce->getPhone(),
               'picture' => $annonce->getPicture(),
               'createdAt' => $createdAt,
            ];
        
        return new JsonResponse($formatted);
    }

    /**
     * @Route("/update/add", name="update_add")
     */
    public function UpdateAdd(Request $request)
    {
        // permet d'acceder aux differentes methodes
        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
         // on récupère l'utilisateur connecté 
        $user = $this->getUser();
         // on récupère l'id de l'annonce à modifier
        $annonceId = $request->request->get('annonceId');
         // on retrouve l'object annonce associé à l'id
        $annonce = $this->getDoctrine()->getRepository(Annonce::class)->find($annonceId);
         // on vérifie qu'on reçoit le text de l'annonce si oui en remplace dans la bdd
        if($request->request->get('title') !== '')
        {
            $title = $request->request->get('title');
            $annonce->setTitle($title);
        }
         if($request->request->get('description') !== '')
        {
            $description = $request->request->get('description');
            $annonce->setDescription($description);
        }
         // on envoie dans la bdd 
        $em = $this->getDoctrine()->getManager();
        $em->persist($annonce);
        $em->flush();
         // on peut informer que l'annonce est bien modifié !
        return new Response('annonce modifié', Response::HTTP_CREATED);
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
                $createdAt= $annonce->getCreatedAt()->getTimestamp();
                $createdAt = date('d-M-Y à H:i',$createdAt);
            
                $formatted [] = [
                'id' => $annonce->getId(),
                'title' => $annonce->getTitle(),
                'description' => $annonce->getDescription(),
                'location' => $annonce->getLocation(),
                'type' => $annonce->getType(),
                'category' => $annonce->getCategory()->getName(),
                'picture' => $annonce->getPicture(),
                'createdAt' => $createdAt,
                ];
            }
            
            return new JsonResponse($formatted);

        }
        else {
            return new JsonResponse([]);
        }
    }
}
