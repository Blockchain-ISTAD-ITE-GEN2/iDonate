# Build Stage
FROM node:lts AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --force

# Copy source code and build the application
COPY . .
RUN npm run build

# Production Stage
FROM node:lts

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
# Copy .env.production only if it exists
# Copy .env.production if it exists
# COPY --from=build /app/.env.production /.env.production
EXPOSE 3000
# Run the Next.js production server
CMD ["npm", "start"]
