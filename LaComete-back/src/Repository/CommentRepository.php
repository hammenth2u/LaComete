<?php

namespace App\Repository;

use App\Entity\Comment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Comment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comment[]    findAll()
 * @method Comment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    /**
     * Méthode qui retourne les commentaire pour une annonce donnée
     * 
     * @param Annonce $annonce
     * @return Comment[]
     */
    public function findCommentsByAnnonce($annonce)
    {
        $query = $this->getEntityManager()->createQuery('
            SELECT c, a 
            FROM App\Entity\Comment c
            JOIN c.annonce a
            WHERE c.annonce = :annonce
            ORDER BY c.createdAt DESC
        ')
        ->setParameter('annonce', $annonce);
        return $query->getResult(); 
    }

}
