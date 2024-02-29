FROM oven/bun:1 
WORKDIR /usr
RUN apt update && apt install curl -y
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d
WORKDIR /usr/app
EXPOSE 4000
CMD ["task","setup","&&", "tail", "-f", "/dev/null"]