# Build Stage
FROM node:lts AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --force  # Use ci for a clean install

# Copy the full project
COPY . .

# Build the Next.js app
RUN npm run build

# Production Stage
FROM node:lts
WORKDIR /app

# Install only production dependencies
COPY --from=build /app/package*.json ./
RUN npm ci --only=production  

# Copy Next.js build and necessary files
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Copy the .env.production file
# COPY --from=build /app/.env.production ./.env.production  

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
