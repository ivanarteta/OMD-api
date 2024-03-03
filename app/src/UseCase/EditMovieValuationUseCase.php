<?php

namespace App\UseCase;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use RuntimeException;

class EditMovieValuationUseCase
{

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly MovieRepository $movieRepository
    )
    {
    }

    /**
     * @throws RuntimeException
     */
    public function execute(int $id, int $valuation): void
    {
        $movie = $this->movieRepository->find($id);

        if (is_null($movie)) {
            throw new RuntimeException('Movie not found');
        }

        $movie->setValuation($valuation);
        $this->entityManager->flush();
    }
}
