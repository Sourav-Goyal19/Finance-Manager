import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

import AccountRouter from "./accounts";
import CategoryRouter from "./categories";
import TransactionsRouter from "./transactions";
import SummaryRouter from "./summary";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, ctx) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return ctx.json({ error: err.message }, 500);
});

const routes = app
  .route("/:email/summary", SummaryRouter)
  .route("/:email/accounts", AccountRouter)
  .route("/:email/categories", CategoryRouter)
  .route("/:email/transactions", TransactionsRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
