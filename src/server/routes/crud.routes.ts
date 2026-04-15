import { router, publicProcedure } from "../trpc.js";
import { userModal } from "../modal/modals.js";
import { TRPCError } from "@trpc/server";
import fs from "fs/promises";
import { z } from "zod";

const usersFilePath = "src/server/data/users.json";

const userIdInput = z.object({
  id: z.string().min(1),
});

const createUserInput = userModal.omit({ id: true });

const updateUserInput = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

const deleteUserOutput = z.object({
  success: z.literal(true),
  deletedUser: userModal,
});

const readUsers = async () => {
  const users = await fs.readFile(usersFilePath, "utf8");
  return userModal.array().parse(JSON.parse(users));
};

const writeUsers = async (users: z.infer<typeof userModal>[]) => {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

export const crudRouter = router({
  users: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users",
        tags: ["users"],
        summary: "Get all users",
      },
    })
    .output(userModal.array())
    .query(async () => {
      return readUsers();
    }),

  userById: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/{id}",
        tags: ["users"],
        summary: "Get user by id",
      },
    })
    .input(userIdInput)
    .output(userModal)
    .query(async ({ input }) => {
      const users = await readUsers();
      const user = users.find((item) => item.id === input.id);

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with id '${input.id}' not found`,
        });
      }

      return user;
    }),

  createUser: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/users",
        tags: ["users"],
        summary: "Create a new user",
      },
    })
    .input(createUserInput)
    .output(userModal)
    .mutation(async ({ input }) => {
      const users = await readUsers();
      const nextId =
        users.length > 0
          ? String(
              Math.max(...users.map((user) => Number.parseInt(user.id, 10) || 0)) +
                1,
            )
          : "1";

      const newUser = userModal.parse({
        id: nextId,
        ...input,
      });

      const updatedUsers = [...users, newUser];
      await writeUsers(updatedUsers);

      return newUser;
    }),

  updateUser: publicProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/users/{id}",
        tags: ["users"],
        summary: "Update an existing user",
      },
    })
    .input(updateUserInput)
    .output(userModal)
    .mutation(async ({ input }) => {
      const users = await readUsers();
      const userIndex = users.findIndex((item) => item.id === input.id);

      if (userIndex === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with id '${input.id}' not found`,
        });
      }

      const currentUser = users[userIndex];
      const updatedUser = userModal.parse({
        ...currentUser,
        ...input,
      });
      users[userIndex] = updatedUser;

      await writeUsers(users);
      return updatedUser;
    }),

  deleteUser: publicProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/users/{id}",
        tags: ["users"],
        summary: "Delete a user",
      },
    })
    .input(userIdInput)
    .output(deleteUserOutput)
    .mutation(async ({ input }) => {
      const users = await readUsers();
      const userToDelete = users.find((item) => item.id === input.id);

      if (!userToDelete) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with id '${input.id}' not found`,
        });
      }

      const updatedUsers = users.filter((item) => item.id !== input.id);
      await writeUsers(updatedUsers);

      return {
        success: true,
        deletedUser: userToDelete,
      };
    }),
});