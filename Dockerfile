FROM alpine:edge

RUN apk add --no-cache nodejs yarn

COPY ./files /workdir
RUN cd /workdir && yarn && yarn build && yarn install --production

WORKDIR /workdir
CMD ["/workdir/entrypoint.sh"]
