import { db } from "@/db/drizzle";
import { accountsTable, insertAccountSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { validate as uuidValidate } from "uuid";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/:userId", async (ctx) => {
    const userId = ctx.req.param("userId");
    if (!userId) {
      throw new HTTPException(400, {
        res: ctx.json({ error: "User Id is required" }, 400),
      });
    }

    if (!uuidValidate(userId)) {
      throw new HTTPException(400, {
        res: ctx.json({ error: "Invalid User Id" }, 400),
      });
    }

    const data = await db
      .select({
        id: accountsTable.id,
        name: accountsTable.name,
      })
      .from(accountsTable)
      .where(eq(accountsTable.userId, userId));

    return ctx.json({ data }, 200);
  })
  .post(
    "/",
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
        userId: true,
      })
    ),
    async (c) => {
      const { name, userId } = c.req.valid("json");

      if (!userId) {
        throw new HTTPException(400, {
          res: c.json({ error: "User Id is required" }, 400),
        });
      }

      if (!name) {
        throw new HTTPException(400, {
          res: c.json({ error: "Name is required" }, 400),
        });
      }

      const [data] = await db
        .insert(accountsTable)
        .values({
          name,
          userId,
        })
        .returning();

      return c.json({ data }, 201);
    }
  );

export default app;
