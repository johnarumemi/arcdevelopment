FROM node AS source
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN npm install

FROM node:alpine
ARG VERSION=v1.1
LABEL org.label-schema.version=$VERSION
ENV NODE_ENV=development
COPY --from=source /app /app
WORKDIR /app
EXPOSE 3000
ENTRYPOINT ["npm","run"]
CMD ["start"]
