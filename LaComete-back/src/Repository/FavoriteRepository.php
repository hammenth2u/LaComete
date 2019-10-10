<?php

namespace App\Repository;

use App\Entity\Favorite;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Favorite|null find($id, $lockMode = null, $lockVersion = null)
 * @method Favorite|null findOneBy(array $criteria, array $orderBy = null)
 * @method Favorite[]    findAll()
 * @method Favorite[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FavoriteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Favorite::class);
    }

    /**
     * 
     * @param User $user
     * @return Favorite[]
     */
    public function findByUser($user)
    {
        $qb = $this->createQueryBuilder('f')
        ->addSelect('u')
        ->join('f.user', 'u')
        ->where('f.user = :myUser')
        ->setParameter('myUser', $user)
        ;
    
        //cast retour de requete
        return $qb->getQuery()->getResult();
    }

    // /**
    //  * 
    //  * @param User $user
    //  * @param Annonce $annonce
    //  * @return Favorite[]
    //  */
    // public function findByUserAndAnnonce($user,$annonce)
    // {
    //     $qb = $this->createQueryBuilder('f')
    //     ->addSelect('u','a')
    //     ->join('f.user', 'u')
    //     ->join('f.annonce','a')
    //     ->where('f.user = :myUser')
    //     ->where('f.annonce = :myAnnonce')
    //     ->setParameter('myUser', $user)
    //     ->setParameter('myAnnonce', $annonce)
    //     ;
    
    //     //cast retour de requete
    //     return $qb->getQuery()->getResult();
    // }

    /**
     * 
     * @param Annonce $annonce
     * @param User $user 
     * @return Favorite[]
     */
    public function findFavoriteByAnnonceAndUser($user, $annonce)
    {
        $query = $this->getEntityManager()->createQuery('

            SELECT f
            FROM App\Entity\Favorite f
            WHERE f.user = :user
            AND f.annonce = :annonce
        ')
        ->setParameter('annonce', $annonce)
        ->setParameter('user', $user);
        return $query->getResult(); 
    }

}
