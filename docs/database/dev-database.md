# Dev Database
When you run "docker-compose up", a Postgres database will be spun up.
To query this database, you can enter this terminal command: docker exec -it draftbash-server-postgres-1 psql -U postgres -d draftbash. 
Make sure the psql client is installed on your machine. The password will be "devpassword".