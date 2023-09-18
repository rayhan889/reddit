"use client";

import { Session } from "next-auth";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Image as ImageIcon, Link as LinkIcon } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow list-none">
      <div className="h-full px-6 py-4 flex justify-between sm:gap-6 gap-1.5">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user?.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>

        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="Create post"
        />

        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600 h-4 w-4" />
        </Button>

        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <LinkIcon className="text-zinc-600 h-4 w-4" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
