# -------- Build stage --------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Nhận API key từ build-arg
    ARG VITE_OPENAI_API_KEY
    
    # Fail sớm nếu thiếu key (không dùng ${VAR:0:10})
    RUN if [ -z "$VITE_OPENAI_API_KEY" ]; then \
          echo "ERROR: VITE_OPENAI_API_KEY is not set!" >&2; exit 1; \
        fi && \
        echo "Building with VITE_OPENAI_API_KEY (len check only)." && \
        sh -c 'printf "len=%s\n" "$(printf %s "$VITE_OPENAI_API_KEY" | wc -c)"'
    
    # Cài deps trước để tận dụng cache
    COPY package*.json ./
    RUN npm ci
    
    # Copy source
    COPY . .
    
    # Tạo .env.production để Vite inline
    RUN printf "VITE_OPENAI_API_KEY=%s\n" "$VITE_OPENAI_API_KEY" > .env.production
    
    # Build
    RUN npm run build
    
    # -------- Serve stage --------
    FROM nginx:alpine
    # Copy build output
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Nginx config
    RUN printf '%s\n' \
      'server {' \
      '  listen 80;' \
      '  server_name _;' \
      '  root /usr/share/nginx/html;' \
      '  index index.html;' \
      '  location / {' \
      '    try_files $uri $uri/ /index.html;' \
      '  }' \
      '}' > /etc/nginx/conf.d/default.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    