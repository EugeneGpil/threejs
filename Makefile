

start:
	cd container &&\
	docker compose up --build --remove-orphans --detach &&\
	docker compose exec nodejs bash

exec-root:
	cd container && docker compose exec --user=root nodejs bash

stop:
	cd container &&\
	docker compose stop
