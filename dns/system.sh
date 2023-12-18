#!/bin/bash

# Update all packages
sudo yum update -y

# Upgrade all packages
sudo yum upgrade -y

# Clean the yum cache to remove any cached metadata and packages
sudo yum clean all

# Update the package index files
sudo yum check-update
