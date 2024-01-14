FROM golang:1.21 AS go-builder
WORKDIR /app
COPY . .
WORKDIR /app/server
RUN go mod tidy
RUN go build server.go


FROM alpine:latest AS go-runner

WORKDIR /app

# Copy only the necessary files from the previous stage
COPY --from=go-builder /app/server .

# Expose the port your application listens on
ENV SNACK_BRO_PORT = 8080
EXPOSE 8080

# Command to run your application
CMD ["./server"]
