<?php

namespace App\UseCase;

use App\Entity\Movie;
use Doctrine\ORM\EntityManagerInterface;

class SaveMoviesUseCase
{
    public function __construct(
        private EntityManagerInterface $entityManager
    )
    {
    }

    public function execute(array $movies): void
    {
        foreach ($movies as $movie) {
            $this->saveMovie($movie);
        }
    }

    private function saveMovie(array $movie): void
    {
        $movieEntity = new Movie();
        $movieEntity->setOmdId($movie['imdbID']);
        $movieEntity->setTitle($movie['Title']);
        $movieEntity->setYear($movie['Year']);
        $movieEntity->setImage($movie['Poster']);
        $movieEntity->setValuation(0);
        $this->entityManager->persist($movieEntity);
        $this->entityManager->flush();
    }
}