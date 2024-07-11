#!/bin/bash

# Start MongoDB instances
mongod --config P:/mongodb/data/rs0/mongod0.conf &
mongod --config P:/mongodb/data/rs1/mongod1.conf &
mongod --config P:/mongodb/data/rs2/mongod2.conf &

echo "MongoDB instances are starting..."
