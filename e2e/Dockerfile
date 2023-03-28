# Get the base image of Node version 16
FROM node:16-alpine

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# Copy the needed files to the app folder in Docker image
COPY playwright.json /app/package.json
COPY /e2e /app/e2e
COPY tsconfig.json /app/tsconfig.json
COPY playwright.config.ts /app/playwright.config.ts
COPY state.json /app/state.json
COPY start.js start.js

# Use aliyun mirrors
RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list

USER root
# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

# Install the dependencies in Node environment
RUN yarn install --frozen-lockfile --registry=https://registry.npmmirror.com

# installl nginx
USER root
RUN apt-get update && apt-get install -y nginx

WORKDIR /app

# Copy nginx config to container
COPY nginx/error /usr/share/nginx/html/error
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# exposed port
EXPOSE 8080

# CMD ["nginx", "-g", "daemon off;"]

WORKDIR /app
# install cron
USER root
RUN apt-get update && apt-get -y install cron

COPY corn.sh /app/start.sh
RUN chmod +x /app/start.sh

# create cron job file * * * * * root echo "Hello world" >> /var/log/cron.log 2>&1
RUN echo "*/59 * * * * root echo "Hello world" >> /var/log/cron.log 2>&1" > /etc/cron.d/npm-test
# RUN echo "*/5 * * * * root cd /app && npm run test" > /etc/cron.d/npm-test
# RUN echo "*/5 * * * * root cd /app && node start.js" > /etc/cron.d/npm-test
RUN touch /var/log/cron.log

# add execute permission
RUN chmod 0644 /etc/cron.d/npm-test
RUN crontab /etc/cron.d/npm-test
RUN chmod 0644 /var/log/cron.log

# set time zone
ENV TZ=Asia/Shanghai

# start up nginx and cron
CMD ["sh", "-c", "service nginx start && node start.js"]
# CMD ["sh", "-c", "service nginx start"]
# CMD ["nginx", "-g", "daemon off;"]
