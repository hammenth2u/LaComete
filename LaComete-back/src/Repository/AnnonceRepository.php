<?php

namespace App\Repository;

use App\Entity\Annonce;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Annonce|null find($id, $lockMode = null, $lockVersion = null)
 * @method Annonce|null findOneBy(array $criteria, array $orderBy = null)
 * @method Annonce[]    findAll()
 * @method Annonce[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnnonceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Annonce::class);
    }

    /**
     * 
     * @param Category $category
     * @return Annonce[]
     */
    public function findByCategory($category)
    {
        $qb = $this->createQueryBuilder('a')
        ->addSelect('c')
        ->join('a.category', 'c')
        ->where('a.category = :myCategory')
        ->setParameter('myCategory', $category)
        ;
    
        //cast retour de requete
        return $qb->getQuery()->getResult();
    }


    /**
     * Méthode qui retourne toute les annonces triées par ordre de createdAt
     * 
    * @return Annonce[] Returns an array of Annonce objects
    */
    
      public function findAllOrderedByCreatedAt()
      {
          $query = $this->createQueryBuilder('a')
                        ->orderBy('a.createdAt', 'DESC');
                
          return $query->getQuery()->getResult();
      }

}
