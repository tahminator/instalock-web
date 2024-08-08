# Use Node.js for building the front-end assets
FROM node:22.2-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

RUN npm install

# Copy the rest of the application code and build the front-end assets
COPY . .

RUN npm run build

# Use Python for serving the application
FROM python:3.12.3-alpine

WORKDIR /app

# Install Python dependencies
COPY ./api/requirements.txt /app/server/requirements.txt
RUN pip install -r /app/server/requirements.txt \
    && pip install gunicorn==22.0.0

# Copy the server code
COPY ./api /app/server

# Copy only the build artifacts from the previous stage
COPY --from=build-stage /app/dist /app/dist

EXPOSE 4999