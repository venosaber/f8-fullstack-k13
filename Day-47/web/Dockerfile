FROM node:24.2.0

# Set the working directory inside the container
WORKDIR /app/web

# Copy dependency files and leverage Docker's build cache.
# This layer is only rebuilt when package.json or package-lock.json changes.
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application's source code into the image
COPY . .

# Expose the port the app runs on
EXPOSE 3500

CMD ["npm","run","dev","--","--port","3500"]

