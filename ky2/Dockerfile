# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build argument for OpenAI API Key from docker-compose
ARG VITE_OPENAI_API_KEY

# Set environment variable for Vite build
# CRITICAL: Must be set BEFORE copying source code so Vite can inline it during build
ENV VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY

# Debug: Verify API key is set
RUN if [ -z "$VITE_OPENAI_API_KEY" ]; then \
    echo "ERROR: VITE_OPENAI_API_KEY is not set!" && exit 1; \
    else \
    echo "Building with API key (first 10 chars): ${VITE_OPENAI_API_KEY:0:10}..." && \
    echo "VITE_OPENAI_API_KEY length: ${#VITE_OPENAI_API_KEY}"; \
    fi

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Verify env var is still available before build
RUN echo "Verifying VITE_OPENAI_API_KEY before build: ${VITE_OPENAI_API_KEY:0:10}..."

# Build the app with explicit env var
RUN VITE_OPENAI_API_KEY="${VITE_OPENAI_API_KEY}" npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

