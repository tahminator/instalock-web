import {
  BasePlayerMatchRepository,
  BaseRiotMatchRepository,
  BaseSessionRepository,
  BaseUserRepository,
} from "@instalock/db";
import { db } from "db/index.js";

export const userRepository = new BaseUserRepository(db);
export const sessionRepository = new BaseSessionRepository(db);
export const riotMatchRepository = new BaseRiotMatchRepository(db);
export const playerMatchRepository = new BasePlayerMatchRepository(db);
