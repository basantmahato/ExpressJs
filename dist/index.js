import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { crudRouter } from "./server/routes/crud.routes.js";
import { createContext } from "./server/context.js";
import { createOpenApiExpressMiddleware, generateOpenApiDocument, } from "trpc-to-openapi";
import swaggerUi from "swagger-ui-express";
const app = express();
app.use(express.json());
const openapiDocument = generateOpenApiDocument(crudRouter, {
    title: "TRPC API",
    description: "TRPC API",
    version: "1.0.0",
    baseUrl: "http://localhost:3000/api",
});
app.use("/openapi.json", (_req, res) => {
    res.json(openapiDocument);
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use("/api", createOpenApiExpressMiddleware({
    router: crudRouter,
    createContext,
}));
app.use("/trpc", createExpressMiddleware({
    router: crudRouter,
    createContext,
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map