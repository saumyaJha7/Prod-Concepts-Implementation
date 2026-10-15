import { shard1, shard2 } from "./db.js";

export function getShard(userId) {
  return Number(userId) % 2 === 0
    ? shard1
    : shard2;
}