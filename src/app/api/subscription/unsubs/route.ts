import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubsValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("You need to signin first", { status: 401 });
    }

    const body = await req.json();
    const { subredditId } = SubredditSubsValidator.parse(body);

    const subsExist = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        subredditId,
      },
    });

    const isAlreadySubs = !!subsExist;

    if (!isAlreadySubs) {
      return new Response("You are not subs to this community yet", {
        status: 400,
      });
    }

    await db.subscription.delete({
      where: {
        id: subsExist.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Couldnt join community.", { status: 500 });
  }
}
