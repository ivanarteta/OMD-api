<?php

namespace App\Controller;

use App\SaveMoviesUseCase;
use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MovieController extends AbstractController
{
    public function __construct(
        private SaveMoviesUseCase $saveMoviesUseCase
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
}