# Build Stage
FROM node:lts AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --force

# Copy source files explicitly, excluding unnecessary files
COPY . .  

# Ensure .env.production is explicitly copied
COPY .env.production .env.production

# Debugging: Check if the file exists in the container
RUN ls -la /app

# Build the application
RUN npm run build

# Production Stage
FROM node:lts
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app ./

# Install serve for static file hosting
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
