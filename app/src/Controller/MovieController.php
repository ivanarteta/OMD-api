<?php

namespace App\Controller;

use App\UseCase\DeleteMovieUseCase;
use App\UseCase\EditMovieValuationUseCase;
use App\UseCase\GetMoviesUseCase;
use App\UseCase\SaveMoviesUseCase;
use Doctrine\DBAL\Driver\PDO\Exception;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use JsonException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MovieController extends AbstractController
{
    public function __construct(
        private readonly SaveMoviesUseCase $saveMoviesUseCase,
        private readonly GetMoviesUseCase $getMoviesUseCase,
        private readonly EditMovieValuationUseCase $editMovieValuationUseCase,
        private readonly DeleteMovieUseCase $deleteMovieUseCase
    )
    {
    }

    #[Route('/movies', name: 'save_movie', methods: ['POST'])]
    public function save(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $movies = json_decode($data['movies'], true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            return $this->json(
                [
                    "success" => false,
                    "message" => "Invalid JSON",
                    "data" => $request->getContent()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->saveMoviesUseCase->execute($movies);

        return $this->json(
            [
                "success" => true,
                "message" => "Movies saved successfully"
            ]
        );
    }

    #[Route('/movies', name: 'get_movies', methods: ['GET'])]
    public function getMovies(): Response
    {
        return $this->json(
            [
                "success" => true,
                "message" => "Movies retrieved successfully",
                "data" => [
                    'movies' => $this->getMoviesUseCase->execute(),
                ]
            ]
        );
    }

    /**
     * @throws JsonException
     */
    #[Route('/movie/{id}', name: 'edit_movie_valuation', methods: ['PUT'])]
    public function editMovie(int $id, Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
            $valuation = json_decode($data['valuation'], true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            return $this->json(
                [
                    "success" => false,
                    "message" => "Invalid JSON",
                    "data" => $request->getContent()
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->editMovieValuationUseCase->execute($id, $valuation);
        } catch (RuntimeException) {
            return $this->json(
                [
                    "success" => false,
                    "message" => "Movie not found",
                ],
                Response::HTTP_NOT_FOUND
            );

        }

        return $this->json(
            [
                "success" => true,
                "message" => "Movie successfully saved",
            ]
        );
    }

    #[Route('/movie/{id}', name: 'delete_movie', methods: ['DELETE'])]
    public function deleteMovie(int $id): Response
    {
        try {
            $this->deleteMovieUseCase->execute($id);
        } catch (OptimisticLockException|ORMException|\Exception) {
            return $this->json(
                [
                    "success" => false,
                    "message" => "Error deleting movie",
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return $this->json(
            [
                "success" => true,
                "message" => "Movie deleted successfully",
            ]
        );
    }
}