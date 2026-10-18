# SD — Distributed Systems & Scalable Architecture Lab

A hands-on repo where I implement the concepts I learn while reading about distributed systems, scalable architecture, and system design.

Each folder is a self-contained mini-project built to understand one concept in practice — not just read about it.

## Projects

| Folder | Concept | What it covers |
| --- | --- | --- |
| [`MongoDB/`](./MongoDB) | Replica sets & document stores | Working with MongoDB from Node.js, data modeling basics |
| [`mysql-Sharding/`](./mysql-Sharding) | Database sharding | Horizontal partitioning of MySQL across shards, routing queries to the correct shard |
| [`Neo4j/`](./Neo4j) | Graph databases | Node/edge modeling, graph queries for highly connected data |
| [`RabbitMQ/`](./RabbitMQ) | Message queues | Pub/sub, async processing, decoupling services with message brokers |
| [`SocketIO/`](./SocketIO) | Real-time communication | WebSockets, persistent connections, real-time event pushing |

Each project has its own `README.md` with details.

## Getting Started

These projects use [Bun](https://bun.sh) and [Docker Compose](https://docs.docker.com/compose/) (for the ones needing databases/brokers).

```bash
# Clone the repo
git clone https://github.com/<your-username>/SD.git
cd SD

# Run any project, e.g. the sharding demo
cd mysql-Sharding
docker compose up -d
bun install
bun run server.js
```

Check each project's README for its specific setup.

## Why I Built This

System design interviews and blog posts teach the *theory*. This repo is where I turn that theory into working code: spinning up the infra, writing the queries, breaking things, and fixing them.

## Roadmap

Things I want to explore next:

- [ ] Caching (Redis, cache invalidation strategies)
- [ ] Load balancing & reverse proxies (Nginx/HAProxy)
- [ ] Rate limiting algorithms (token bucket, sliding window)
- [ ] Consistent hashing
- [ ] CAP theorem & replication strategies
- [ ] Pub/sub at scale (Kafka vs RabbitMQ)
- [ ] Distributed locks & leader election
- [ ] CQRS & event sourcing
