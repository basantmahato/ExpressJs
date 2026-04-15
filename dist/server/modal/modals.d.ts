import { z } from "zod";
export declare const userModal: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, z.core.$strip>;
export type User = z.infer<typeof userModal>;
export declare const userModals: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=modals.d.ts.map