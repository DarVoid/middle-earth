FROM rust:1 as rust-builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim as rust-runner
COPY --from=rust-builder /app/target/release/lameAPI /usr/local/bin/lameAPI
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["lameAPI"]
