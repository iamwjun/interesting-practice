#!/bin/bash

# Define the image name to check
image_name="playwright-docker"

# List running containers
# Find if there is a container to delete
if docker ps --format '{{.Names}}' | grep -q "^$image_name$"; then
    # Stop and delete container
    docker stop $image_name
    docker rm $image_name
    echo "container: $image_name has been deleted."
else
    echo "container: $image_name not found."
fi

# Check if the image exists
if ! docker images | grep -q "$image_name"; then
  echo "Image: $image_name dose not exists, start building..."
  # Define Dockerfile path
  dockerfile_path="."
  # Buid image
  docker build -t "$image_name" "$dockerfile_path"
else
  echo "Image: $image_name already exists."
fi

# Run docker container
docker run -p 8080:80 -d --rm --ipc=host --name "$image_name" \
  --mount type=bind,source=$(pwd)/e2e,target=/app/e2e,readonly \
  --mount type=bind,source=$(pwd)/tsconfig.json,target=/app/tsconfig.json,readonly \
  --mount type=bind,source=$(pwd)/playwright.config.ts,target=/app/playwright.config.ts,readonly \
  --mount type=bind,source=$(pwd)/state.json,target=/app/state.json,readonly \
  $image_name

# Get the newly created container ID
CONTAINER_ID=$(docker ps -lq)

# Execute the command in the container
docker exec -it $CONTAINER_ID npm run test

# Print ID
echo "Container ID: $CONTAINER_ID"
