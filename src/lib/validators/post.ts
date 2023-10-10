import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(128, { message: "Title must be less than 128 character." }),
  subredditId: z.string(),
  content: z.any(),
});

export type CreatePostValidatorPayload = z.infer<typeof PostValidator>;
