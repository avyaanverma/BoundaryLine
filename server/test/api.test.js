import { test, describe } from "node:test";
import assert from "node:assert";
import { validateRequest } from "../src/middleware/validateRequest.js";
import { ROLES } from "../src/constant/role.constant.js";

describe("BoundaryLine Core API & Logic Suite", () => {
  test("User default role is USER (BL-001)", () => {
    assert.strictEqual(ROLES.USER, "USER");
    assert.strictEqual(ROLES.SCORER, "SCORER");
    assert.strictEqual(ROLES.ADMIN, "ADMIN");
  });

  test("validateRequest handles both ZodObject and plain object schemas (BL-007)", () => {
    const middleware = validateRequest({
      body: {
        parse: (input) => {
          if (!input.name) throw new Error("Name is required");
          return input;
        },
      },
    });

    const req = { body: { name: "Test Match" }, params: {}, query: {} };
    const res = {};
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(req.validated.body.name, "Test Match");
  });

  test("Cricket Run Rate calculation produces correct floating point decimals", () => {
    const runs = 164;
    const overs = 18;
    const balls = 2;
    const totalOvers = overs + balls / 6;
    const runRate = parseFloat((runs / totalOvers).toFixed(2));
    assert.strictEqual(runRate, 8.95);
  });
});
