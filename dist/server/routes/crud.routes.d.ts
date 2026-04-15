export declare const crudRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: {
        req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("express").Response<any, Record<string, any>>;
    };
    meta: import("trpc-to-openapi").OpenApiMeta;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    users: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
            id: string;
            name: string;
            email: string;
        }[];
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    userById: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            id: string;
        };
        output: {
            id: string;
            name: string;
            email: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    createUser: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            name: string;
            email: string;
        };
        output: {
            id: string;
            name: string;
            email: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    updateUser: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
            name?: string | undefined;
            email?: string | undefined;
        };
        output: {
            id: string;
            name: string;
            email: string;
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
    deleteUser: import("@trpc/server").TRPCMutationProcedure<{
        input: {
            id: string;
        };
        output: {
            success: true;
            deletedUser: {
                id: string;
                name: string;
                email: string;
            };
        };
        meta: import("trpc-to-openapi").OpenApiMeta;
    }>;
}>>;
//# sourceMappingURL=crud.routes.d.ts.map