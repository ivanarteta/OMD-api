<?php

namespace App\UseCase;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Movie;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;

class DeleteMovieUseCase
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
    )
    {
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function execute(int $id): void
    {
        $movie = $this->entityManager->find(Movie::class, $id);
        $this->entityManager->remove($movie);
        $this->entityManager->flush();
    }
}
