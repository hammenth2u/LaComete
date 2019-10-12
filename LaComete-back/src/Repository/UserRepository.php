<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findUserByEmail($email): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.email = :myEmail')
            ->setParameter('myEmail', $email)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findUserByUsername($userUsername): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.username = :myUsername')
            ->setParameter('myUsername', $userUsername)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
