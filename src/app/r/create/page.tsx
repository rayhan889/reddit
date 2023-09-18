"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";

const Page = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create Community</h1>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2 flex items-center">
            Community names including capitalization cannot be changed.{" "}
            <AlertCircle className="h-3 w-3" />
          </p>

          <div className="relative">
            <div className="absolute text-sm left-0 inset-y-0 grid w-8 text-zinc-400 place-items-center">
              r/
            </div>
            <Input
              value={input}
              onChange={event => setInput(event.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <Button variant="subtle" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            onClick={() => createCommunity()}
            isLoading={isLoading}
            disabled={input.length === 0}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
