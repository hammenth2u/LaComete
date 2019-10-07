<?php

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Category|null find($id, $lockMode = null, $lockVersion = null)
 * @method Category|null findOneBy(array $criteria, array $orderBy = null)
 * @method Category[]    findAll()
 * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    /**
     * Méthode qui retourne toutes les catégories triées par nom croissant
     * 
    * @return Category[] Returns an array of Annonce objects
    */
    
    public function findAllOrderByName()
    {
        $query = $this->createQueryBuilder('c')
                      ->orderBy('c.name', 'ASC');
              
        return $query->getQuery()->getResult();
    }
}
