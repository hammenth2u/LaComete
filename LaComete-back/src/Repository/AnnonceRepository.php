<?php

namespace App\Repository;

use App\Entity\Annonce;
use App\Entity\Category;
use App\Entity\User;
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
     * 
     * @param User $user
     * @return Annonce[]
     */
    public function findByUser($user)
    {
        $qb = $this->createQueryBuilder('a')
        ->addSelect('u')
        ->join('a.user', 'u')
        ->where('a.user = :myUser')
        ->setParameter('myUser', $user)
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

    /**
     * Méthode qui les annonces lié à la recherche 
     * @return Annonce[] Returns an array of Annonce objects
     */
    public function findBySearch($req1, $req2, $req3)
    {
        $query = $this->getEntityManager()->createQuery('
            SELECT * FROM 
            FROM App\Entity\Annonce a
            JOIN a.category c '
            .$req1.'\n '.$req2.'\n '.$req3. '\n '.'
            ORDER BY a.createdAt ASC
        ')
        ->setParameter('annonce', $annonce);
        return $query->getResult(); 
    }

}
