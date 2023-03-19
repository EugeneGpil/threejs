FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
USER root
ARG ID_USER=1000
ARG ID_GROUP=1000
ARG NODE_VERSION=18.15.0
COPY init.sh init.sh
RUN chmod +x init.sh && ./init.sh ${ID_USER} ${ID_GROUP} ${NODE_VERSION}
