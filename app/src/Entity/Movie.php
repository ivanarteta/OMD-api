<?php

namespace App\Entity;

use App\Repository\MovieRepository;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
class Movie implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 10)]
    private ?string $year = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column]
    private ?int $valuation = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $omdId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getValuation(): ?int
    {
        return $this->valuation;
    }

    public function setValuation(int $valuation): static
    {
        $this->valuation = $valuation;

        return $this;
    }

    public function getOmdId(): ?string
    {
        return $this->omdId;
    }

    public function setOmdId(string $omdId): static
    {
        $this->omdId = $omdId;

        return $this;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'year' => $this->year,
            'image' => $this->image,
            'valuation' => $this->valuation,
            'omdId' => $this->omdId
        ];
    }
}
