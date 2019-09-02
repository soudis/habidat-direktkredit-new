FROM node:carbon-stretch

WORKDIR /starter
ENV NODE_ENV development
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        python \
        make \
        g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json /starter/package.json

RUN npm config set strict-ssl false --global
RUN npm config set registry "http://registry.npmjs.org/" --global
RUN npm install --production
RUN npm install -g nodemon


COPY .env.example /starter/.env.example
COPY . /starter

CMD ["npm","start"]

EXPOSE 8080
