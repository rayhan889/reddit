import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const isSubredditExist = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (isSubredditExist) {
      return new Response("Subreddit name already exist", { status: 409 });
    }

    if (session) {
      const newSubreddit = await db.subreddit.create({
        data: {
          name,
          creatorId: session.user.id,
        },
      });

      await db.subscription.create({
        data: {
          subredditId: newSubreddit.id,
          userId: session.user.id,
        },
      });

      return new Response(newSubreddit.name);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Couldnt create subreddit.", { status: 500 });
  }
}
