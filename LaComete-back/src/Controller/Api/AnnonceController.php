<?php

namespace App\Controller\Api;

use App\Entity\Annonce;
use App\Entity\Category;
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


 /**
  * @Route("/api", name="api_annonces_")
  */
class AnnonceController extends AbstractController
{

    /**
     * 
     * @Route("/annonces/list", name="list")
     */
    public function annoncesList()
    {
        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findAllOrderedByCreatedAt();

        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $metadataAwareNameConverter = new MetadataAwareNameConverter($classMetadataFactory);
        $normalizer = new ObjectNormalizer($classMetadataFactory, $metadataAwareNameConverter);
        $serializer = new Serializer([$normalizer]);
        $data = $serializer->normalize($annonces, null, ['groups' => 'api']);
        dump($data);exit;
        return $this->json($data);
        
        /*
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
        */

        //Si besoin de retourner à une vue twig pour faire des tests
        /* 
        return $this->render('api/annonce/index.html.twig', [
            'annonces' => $annonces,
        ]);
         */
        //return new JsonResponse($formatted);
    }

    /**
     * 
     * @Route("/annonces/list/{category}", name="list_category")
     */
    public function annoncesListByCategory(Category $category)
    {
        $annonces = $this->getDoctrine()->getRepository(Annonce::class)->findByCategory($category);

        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $metadataAwareNameConverter = new MetadataAwareNameConverter($classMetadataFactory);
        $normalizer = new ObjectNormalizer($classMetadataFactory, $metadataAwareNameConverter);
        $serializer = new Serializer([$normalizer]);
        $data = $serializer->normalize($annonces, null, ['groups' => 'api']);
        //dump($data);exit;
        return $this->json($data);
    }


    /**
     * @Route("/annonces/{id}", name="single")
     */
    public function singleAnnonce(Annonce $annonce)
    {
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $metadataAwareNameConverter = new MetadataAwareNameConverter($classMetadataFactory);
        $normalizer = new ObjectNormalizer($classMetadataFactory, $metadataAwareNameConverter);
        $serializer = new Serializer([$normalizer]);
        $data = $serializer->normalize($annonce, null, ['groups' => 'api']);
        return $this->json($data);
    }




}
