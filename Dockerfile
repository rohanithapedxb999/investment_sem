# Use an existing base image
                FROM node:21.6.0

                # Set the working directory in the container
                WORKDIR /usr/src/app

                # Copy package.json and package-lock.json to the working directory
                COPY package*.json ./

                # Install dependencies
                RUN npm install --legacy-peer-deps

                # Copy the rest of the application files to the working directory
                COPY . .

                # Specify the port number the container should expose
                EXPOSE 1024

                # Command to start the application
        CMD ["npm", "run", "dev"]
