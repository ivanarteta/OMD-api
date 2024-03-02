<?php

namespace App\UseCase;

use App\Repository\MovieRepository;

class GetMoviesUseCase
{
    public function __construct(
        private MovieRepository $movieRepository
    )
    {
    }

    public function execute(): array
    {
        return $this->movieRepository->findAll();
    }
}
