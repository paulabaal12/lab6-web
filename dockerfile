# Dockerfile 
FROM mysql:latest

ENV MYSQL_DATABASE=f1_db
ENV MYSQL_USER=paula
ENV MYSQL_PASSWORD=f1
ENV MYSQL_ROOT_PASSWORD=f1

COPY ./schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]

FROM node:21.6.2

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
