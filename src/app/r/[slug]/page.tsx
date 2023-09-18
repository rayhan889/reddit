import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import MiniCreatePost from "@/components/MiniCreatePost";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
      },
    },
    take: 2,
  });

  return (
    <>
      {!subreddit ? (
        notFound()
      ) : (
        <>
          <h1 className="font-bold text-3xl md:text-4xl h-1/4 mb-4">
            r/{subreddit.name}
          </h1>

          <MiniCreatePost session={session} />
        </>
      )}
    </>
  );
};

export default page;
