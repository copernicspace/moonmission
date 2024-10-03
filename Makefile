
up:
	docker-compose up

build:
	docker-compose build && bun --bun run build

up-full:
	bun --bun run build && supabase start && docker-compose up --build

down:
	docker-compose down

down-full:
	docker-compose build && bun --bun run build && docker-compose down && supabase stop