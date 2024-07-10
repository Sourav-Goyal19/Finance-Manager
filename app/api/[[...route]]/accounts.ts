import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { validate as validateUUId } from "uuid";
import { accountsTable, insertAccountSchema, usersTable } from "@/db/schema";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "param",
      z.object({
        email: z.string().email(),
      })
    ),
    async (ctx) => {
      const email = ctx.req.valid("param").email;
      if (!email) {
        return ctx.json({ error: "Email Id is required" }, 400);
      }

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      const data = await db
        .select({
          id: accountsTable.id,
          name: accountsTable.name,
        })
        .from(accountsTable)
        .where(eq(accountsTable.userId, user.id));

      return ctx.json({ data }, 200);
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
        email: z.string().email(),
      })
    ),
    async (c) => {
      const id = c.req.valid("param").id;
      const email = c.req.valid("param").email;
      if (!id) {
        return c.json({ error: "Id is required" }, 400);
      }

      if (!validateUUId(id)) {
        return c.json({ error: "Invalid Id" }, 400);
      }

      if (!email) {
        return c.json({ error: "Email Id is required" }, 400);
      }
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return c.json({ error: "User Not Found" }, 404);
      }

      const [data] = await db
        .select({
          id: accountsTable.id,
          name: accountsTable.name,
        })
        .from(accountsTable)
        .where(
          and(eq(accountsTable.userId, user.id), eq(accountsTable.id, id))
        );

      if (!data) {
        return c.json({ error: "Account Not Found" }, 404);
      }

      return c.json({ data }, 200);
    }
  )
  .post(
    "/",
    zValidator(
      "param",
      z.object({
        email: z.string().email(),
      })
    ),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const { name } = c.req.valid("json");
      const email = c.req.valid("param").email;

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return c.json({ error: "User Not Found" }, 400);
      }

      if (!name) {
        return c.json({ error: "Name is required" }, 400);
      }

      const [data] = await db
        .insert(accountsTable)
        .values({
          name,
          userId: user.id,
        })
        .returning();

      return c.json({ data }, 201);
    }
  )
  .post(
    "/bulk-delete",
    zValidator(
      "param",
      z.object({
        email: z.string().email(),
      })
    ),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");
      const email = c.req.valid("param").email;
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return c.json({ error: "User Not Found" }, 404);
      }

      const data = await db
        .delete(accountsTable)
        .where(
          and(
            eq(accountsTable.userId, user.id),
            inArray(accountsTable.id, values.ids)
          )
        )
        .returning();
      return c.json({ data }, 200);
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid("Invalid Account Id").optional(),
        email: z.string().email(),
      })
    ),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const id = c.req.valid("param").id;
      const email = c.req.valid("param").email;
      const name = c.req.valid("json").name;

      if (!id) {
        return c.json({ error: "Account id is required" }, 400);
      }

      if (!email) {
        return c.json({ error: "Email Id is required" }, 400);
      }

      if (!name) {
        return c.json({ error: "Name is required" }, 400);
      }

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return c.json({ error: "User Not Found" }, 404);
      }

      const [data] = await db
        .update(accountsTable)
        .set({
          name,
        })
        .where(and(eq(accountsTable.userId, user.id), eq(accountsTable.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Account Not Found" }, 404);
      }

      return c.json({ data }, 200);
    }
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().uuid("Invalid Account Id").optional(),
        email: z.string().email(),
      })
    ),
    async (c) => {
      const id = c.req.valid("param").id;
      const email = c.req.valid("param").email;

      if (!id) {
        return c.json({ error: "Account id is required" }, 400);
      }

      if (!email) {
        return c.json({ error: "Email Id is required" }, 400);
      }

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return c.json({ error: "User Not Found" }, 404);
      }

      const [data] = await db
        .delete(accountsTable)
        .where(and(eq(accountsTable.userId, user.id), eq(accountsTable.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Account Not Found" }, 404);
      }

      return c.json({ data }, 200);
    }
  );

export default app;
