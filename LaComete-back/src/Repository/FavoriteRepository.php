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
}
