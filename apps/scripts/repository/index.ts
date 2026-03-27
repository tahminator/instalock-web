import {
  BasePlayerMatchRepository,
  BaseRiotMatchRepository,
  BaseSessionRepository,
  BaseUserRepository,
  BaseUserListener,
} from "@instalock/db";
import { db } from "db/index";

export const userListener = new BaseUserListener(db);
export const userRepository = new BaseUserRepository(db);
export const sessionRepository = new BaseSessionRepository(db);
export const riotMatchRepository = new BaseRiotMatchRepository(db);
export const playerMatchRepository = new BasePlayerMatchRepository(db);
