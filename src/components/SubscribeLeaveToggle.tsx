"use client";

import { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditSubsPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  isSubscribe: boolean;
  subredditId: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribe,
  subredditId,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subsToCommunity, isLoading: isSubsLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditSubsPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subscription/subs", payload);
      return data;
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        description: "You are now part of the community.",
      });
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "Something went wrong!",
        description: "Couldnt join community.",
        variant: "destructive",
      });
    },
  });

  const { mutate: unsubsToCommunity, isLoading: isUnsubsLoading } = useMutation(
    {
      mutationFn: async () => {
        const payload: CreateSubredditSubsPayload = {
          subredditId,
        };
        const { data } = await axios.post("/api/subscription/unsubs", payload);
        return data;
      },
      onSuccess: () => {
        startTransition(() => {
          router.refresh();
        });
        toast({
          title: "Unsubscribed!",
          description: "Successfully leave from the community.",
        });
      },
      onError: err => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            return loginToast();
          }
        }
        toast({
          title: "Something went wrong!",
          description: "Couldnt leave community.",
          variant: "destructive",
        });
      },
    }
  );

  return isSubscribe ? (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => unsubsToCommunity()}
      isLoading={isUnsubsLoading}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => subsToCommunity()}
      isLoading={isSubsLoading}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
