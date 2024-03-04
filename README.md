# My Movies Project

This project is a web application for managing a personal movie collection. It allows users to add, edit, and delete movies from their collection, as well as rate them.

## Technologies Used

- PHP
- JavaScript
- NPM
- React
- Composer

## Features

- Add movies to your collection
- Edit the valuation of a movie
- Delete movies from your collection
- Filter movies by title

## Setup

To run this project, you must have installed and opened docker desktop. Then, you can run the following commands: 

```bash
$ docker-compose up -d
$ docker-exec -it OMD-api bash
$ cd app
$ composer install
$ npm install
$ npm run dev
$ php bin/console doctrine:database:create
$ php bin/console doctrine:migrations:migrate

```

## Usage
Open your browser and go to http://localhost:4041
You can see the database in http://localhost:8081 (user: root, password: root_password)