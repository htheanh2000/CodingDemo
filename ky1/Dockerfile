FROM nginx:alpine

# Copy HTML files to nginx html directory
COPY snake-game.html /usr/share/nginx/html/
COPY snake-game.js /usr/share/nginx/html/

# Nginx config to serve the game
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index snake-game.html; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

