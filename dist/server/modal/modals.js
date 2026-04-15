import { z } from "zod";
export const userModal = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
});
export const userModals = z.object({
    users: z.array(userModal),
});
//# sourceMappingURL=modals.js.map