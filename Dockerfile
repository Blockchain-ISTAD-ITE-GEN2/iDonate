# Build stage
FROM node:lts as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:lts
WORKDIR /app

# Copy the build artifacts and necessary files from the build stage
COPY --from=build /app ./

# Install only production dependencies, forcefully
RUN npm install --only=production --force

# Expose the port the app runs ondd
EXPOSE 3000

# Start the application using 'next start' to serve the built Next.js application
CMD ["npm", "start"]