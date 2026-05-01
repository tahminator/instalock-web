// file will automatically import any controller files
// it will pull out default exports, so ensure
// 1. one class per file
// 2. `export default XyzController`

// q: wont this break ordering of controller imports?
// a: yes but that's ok - controllers are the last in the dependency graph.
// they import, but are never imported themselves.

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { modules } from "./controller/**/{controller,*.controller}.ts#default";

export const getControllers = (): Class<unknown>[] => {
  return modules.map((mod) => mod.default as Class<unknown>);
};
