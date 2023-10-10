import Editor from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
  });

  return (
    <>
      {!subreddit ? (
        notFound()
      ) : (
        <div className="flex flex-col items-start gap-6">
          <div className="border-b border-gray-200 pb-5">
            <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
              <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
                Create post
              </h3>
              <p className="ml-2 mt-1 truncate text-sm text-gray-500">
                in r/{subreddit.name}
              </p>
            </div>
          </div>

          {/* textarea form */}
          <Editor subredditId={subreddit.id} />

          <div className="w-full flex justify-end">
            <Button type="submit" className="w-full" form="subreddit-post-form">
              Post
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
