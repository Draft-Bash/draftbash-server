#!/bin/bash

# Automatically generate a migration name
MIGRATION_NAME=$(date +"%Y%m%d%H%M%S")

# Run prisma migrate
npx prisma migrate dev --name $MIGRATION_NAME