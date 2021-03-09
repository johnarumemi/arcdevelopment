FROM node AS source
RUN mkdir -p /app/public && \
    mkdir -p /app/src
ADD public/ /app/public
ADD src/   /app/src
ADD package.json package-lock.json /app/
WORKDIR /app
RUN npm install --force
RUN npm run build

FROM nginx:latest
ARG VERSION=v1.1
LABEL org.label-schema.version=$VERSION
ENV NODE_ENV=development
RUN mkdir -p /var/www/html
COPY --from=source /app/build/ /var/www/html/
ADD /nginx/*.conf /etc/nginx/conf.d/
WORKDIR /var/www/html
EXPOSE 80
