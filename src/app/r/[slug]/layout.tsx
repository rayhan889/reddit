import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";

const Layout = async ({
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
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
      creator: true,
    },
  });

  const subscription = !session
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          userId: session.user.id,
        },
      });

  const isSubscribe = !!subscription;

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  return (
    <>
      {!subreddit ? (
        notFound()
      ) : (
        <div className="sm:container max-w-7xl mx-auto h-full pt-32">
          <div>
            {/* TODO: button to back */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
              <div className="flex flex-col col-span-2 space-y-6">
                {children}
              </div>

              {/* info sidebar */}
              <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                <div className="px-6 py-4">
                  <p className="font-semibold py-3">About r/{subreddit.name}</p>
                </div>
                <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Created</dt>
                    <dd className="text-gray-700">
                      <time dateTime={subreddit.createdAt.toDateString()}>
                        {format(subreddit.createdAt, "MMMM, d yyyy")}
                      </time>
                    </dd>
                  </div>

                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Members</dt>
                    <dd className="text-gray-700">{memberCount}</dd>
                  </div>

                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Created by</dt>
                    <dd className="text-gray-700">
                      {subreddit.creatorId !== session?.user.id ? (
                        <p>{subreddit.creator?.name}</p>
                      ) : (
                        <p>You created this community.</p>
                      )}
                    </dd>
                  </div>

                  {isSubscribe ? (
                    <Link
                      href={`/r/${slug}/submit`}
                      className={buttonVariants({
                        className: "w-full mb-4",
                        variant: "outline",
                      })}
                    >
                      Create Post
                    </Link>
                  ) : null}
                  {subreddit.creator?.id !== session?.user.id ? (
                    <SubscribeLeaveToggle
                      isSubscribe={isSubscribe}
                      subredditId={subreddit.id}
                    />
                  ) : null}
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
