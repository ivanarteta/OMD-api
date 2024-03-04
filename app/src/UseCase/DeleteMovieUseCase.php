<?php

namespace App\UseCase;

use App\Repository\MovieRepository;
use Doctrine\DBAL\Driver\PDO\Exception;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Movie;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;

class DeleteMovieUseCase
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly MovieRepository $movieRepository,
    )
    {
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    public function execute(int $id): void
    {
        $movie = $this->movieRepository->find($id);

        if(is_null($movie)) {
            throw new Exception('Not found');
        }

        $this->entityManager->remove($movie);
        $this->entityManager->flush();
    }
}
