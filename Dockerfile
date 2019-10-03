FROM alpine:edge

## PORT will be set by Heroku.
# ENV PORT=5000
ENV VERSION=9ee060973fa435d3b0504b35addd3f94ca8eead1

COPY ./files /app
RUN apk add --no-cache nodejs yarn git && \
  git clone https://github.com/the-uninet/uninet-websocket.git /tmp/uninet-websocket && \
  cd /tmp/uninet-websocket && \
  git checkout $VERSION && \
  rm -fr .git && \
  yarn && \
  yarn build && \
  rm -fr node_modules && \
  cd /app && \
  yarn add /tmp/uninet-websocket && \
  rm -fr /tmp/uninet-websocket && \
  apk del yarn git

WORKDIR /app
CMD ["/app/entrypoint.sh"]
