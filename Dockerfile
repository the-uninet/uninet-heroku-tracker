FROM alpine:edge

RUN apk add --no-cache nodejs

COPY entrypoint.js /entrypoint.js
CMD ["/entrypoint.js"]
