# dependencies
FROM node:18-alpine AS builder

WORKDIR /app
COPY yarn.lock package.json ./

RUN yarn install

ARG NEXT_APP_NAME
ARG NEXT_PUBLIC_API

ENV NEXT_APP_NAME=$NEXT_APP_NAME
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

COPY . .

RUN yarn build

# serve
FROM node:18-alpine

ARG USERNAME=posy
ARG GROUPNAME=$USERNAME
ARG USER_UID=1002
ARG GROUP_GID=$USER_UID

ARG NEXT_APP_NAME
ARG NEXT_PUBLIC_API

ENV NEXT_APP_NAME=$NEXT_APP_NAME
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API

RUN apk update && apk --no-cache add shadow \
    && apk add curl \
    && groupadd -r -g $GROUP_GID $GROUPNAME \
    && useradd -m -d /home/$USERNAME/ -s /bin/sh -u $USER_UID -r -g $GROUPNAME $USERNAME

WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R posy: /app
USER posy
EXPOSE 3000

CMD ["node", "server.js"]