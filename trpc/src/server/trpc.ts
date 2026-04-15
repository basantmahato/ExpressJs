import { initTRPC } from "@trpc/server";
import type { Context } from "./context.js";
import type { OpenApiMeta } from "trpc-to-openapi";

// Create a TRPC context
const trpc = initTRPC.context<Context>().meta<OpenApiMeta>().create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;