import { z } from "zod";

export const userModal = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userModal>;

export const userModals = z.object({
  users: z.array(userModal),
});
