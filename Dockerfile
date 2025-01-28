# Build Stage
FROM node:lts AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy necessary source files
COPY public ./public
COPY pages ./pages
COPY components ./components
COPY styles ./styles
COPY next.config.js .
COPY tsconfig.json . 

# Copy the environment file
COPY .env.production ./.env.production

# Build the Next.js app
RUN npm run build

# Production Stage
FROM node:lts
WORKDIR /app

# Install only production dependencies
COPY --from=build /app/package*.json ./
RUN npm ci --only=production  

# Copy Next.js build and other necessary files
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/.env.production ./.env.production

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
