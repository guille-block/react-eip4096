# Step 1: Use an official Node runtime as a parent image
FROM node:16

# Step 2: Set the working directory in the container to /app
WORKDIR /app

# Step 3: Copy the package.json files from your local machine into the container
COPY package*.json ./

# Step 4: Install any needed packages specified in package*.json
RUN npm install

# Step 5: Bundle the app's source code inside the Docker image
COPY . .

# Step 6: Build your React app for production
RUN npm run build

# Step 7: Install serve to serve the build folder
RUN npm install -g serve

# Step 8: Define environment variable
ENV PORT=3000

# Step 9: Run serve when the container launches
CMD ["serve", "-s", "build", "-l", "3000"]

# Step 10: Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000
