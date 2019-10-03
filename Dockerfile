FROM alpine:edge

## PORT / DOMAIN will be set by Heroku.
# ENV PORT=5000
# ENV DOMAIN="example.com"
ENV VERSION=4768209ff4d962b81ec177720a4795de21e459ec

COPY ./files /app
RUN apk add --no-cache nodejs yarn git && \
  git clone https://github.com/the-uninet/uninet-websocket.git /tmp/uninet-websocket && \
  cd /tmp/uninet-websocket && \
  git checkout $VERSION && \
  yarn && \
  yarn build && \
  rm -fr node_modules && \
  cd /app && \
  yarn add /tmp/uninet-websocket && \
  rm -fr /tmp/uninet-websocket && \
  apk del yarn git

WORKDIR /app
CMD ["/app/entrypoint.sh"]
