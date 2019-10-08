<?php

namespace App\Controller\Api;

use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


 /**
  * @Route("/api", name="api_categories_")
  */
class CategoryController extends AbstractController
{
    /**
     * @Route("/list/categories", name="list")
     */
    public function listCategorie()
    {
        $categories = $this->getDoctrine()->getRepository(Category::class)->findAllOrderByName();

        header('Access-Control-Allow-Origin: *'); 
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'); 
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        
        $formatted = [];
        foreach ($categories as $category) 
        {
            $formatted [] = [
               'id' => $category->getId(),
               'name' => $category->getName(),

            ];
        }
        
        return new JsonResponse($formatted);
    }
}
