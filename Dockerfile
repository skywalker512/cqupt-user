FROM node:11-alpine
COPY / /app

RUN apk update && apk add --no-cache --virtual .fetch-deps \
    python2 \
    make \
    g++ \
    gcc && \
    yarn install && \
    apk del .fetch-deps

RUN apk --no-cache add tzdata ca-certificates && \
    cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

WORKDIR /app
RUN [ "yarn" ]
RUN yarn global add @zeit/ncc@beta
RUN ncc build ./src/main.ts -o dist

CMD [ "node","./dist/index.js" ]