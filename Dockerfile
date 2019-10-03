FROM alpine:edge

## PORT / DOMAIN will be set by Heroku.
# ENV PORT=5000
# ENV DOMAIN="example.com"
ENV VERSION=45c09395098d4c665ddbd82dc4ba010b53c230af

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
