dcup:
	docker-compose up -d

dcdown:
	docker-compose down

build:
	docker-compose up -d --build

openbash:
	docker exec -it OMD-api bash