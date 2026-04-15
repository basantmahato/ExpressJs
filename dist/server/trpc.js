import { initTRPC } from "@trpc/server";
// Create a TRPC context
const trpc = initTRPC.context().meta().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
//# sourceMappingURL=trpc.js.map