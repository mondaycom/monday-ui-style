#!/bin/bash

# Define the source and destination paths
source_folder="./src/output/mixins"
destination_folder="./dist/mixins"

# Copy the folder and its contents
cp -r "$source_folder" "$destination_folder"

# Display success message
echo "Folder $source_folder successfully copied to $destination_folder."
