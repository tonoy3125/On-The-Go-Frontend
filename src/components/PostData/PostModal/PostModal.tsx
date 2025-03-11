/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hook";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { TUserPayload } from "@/types/user.type";
import { FieldValues, useForm } from "react-hook-form";
import { IPost } from "@/types/post.types";
import {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@/redux/features/comment/commentApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import { Separator } from "@/components/ui/separator";
import CommentCardSkeleton from "@/components/skeletons/CommentCardSkeleton";

import PostReaction from "../PostReaction/PostReaction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import CommentCard from "../CommentCard/CommentCard";
import Pagination from "@/components/shared/Pagination/Pagination";
import PostContent from "../PostContent/PostContent";

interface IPorps {
  post: IPost;
  trigger?: React.ReactNode;
}

const PostModal: React.FC<IPorps> = ({ post, trigger }) => {
  console.log(post)
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);

  const {
    data,
    isLoading,
    refetch: refetchComment,
  } = useGetCommentsByPostIdQuery(
    {
      postId: post._id,
      page,
    },
    {
      skip: !open, // Skip fetching when the dialog is not open
    }
  );

  const [createComment] = useCreateCommentMutation();

  // Handle new comment creation
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Please Wait...");
    try {
      const payload = {
        post: post?._id,
        comment: data?.comment,
      };
      //   console.log(payload);
      const res = await createComment({ token, payload }).unwrap();
      // console.log(res);

      toast.success(res.message || "Comment Created Successfully!!", {
        id: toastId,
        duration: 3000,
      });
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  if (isLoading)
    return (
      <Dialog open={isLoading}>
        <DialogTrigger>
          <Skeleton />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[850px] px-[10px]">
          <div className=" h-[80vh] overflow-auto smoothBar w-full">
            <DialogHeader></DialogHeader>
            <Card>
              <PostCardSkeleton />
            </Card>
            <Separator />

            <form className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <PostCardSkeleton />
                </div>
              </div>
            </form>

            <CommentCardSkeleton />

            <DialogFooter></DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button size={"sm"} variant="ghost">
            <MessageCircle className="mr-1 h-4 w-4" />
            Comments: {post.commentCount || 0}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] px-[10px]">
        <div className=" h-[80vh] overflow-auto smoothBar w-full">
          <DialogHeader></DialogHeader>
          <Card>
            <PostContent post={post} refetch={function (): void {
              throw new Error("Function not implemented.");
            } } />
          </Card>
          <Separator className="my-[20px]" />
          <PostReaction post={post} />
          <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage alt="Your Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Write a comment..."
                  className="w-full min-h-[80px] "
                  required
                  onFocus={(e) => {
                    if (!user) {
                      toast.error("Please login to comment");
                      e.target.blur();
                      return;
                    }
                  }}
                  {...register("comment", {
                    required: "Comment is Required",
                  })}
                />
                <Button type="submit" className="mt-2">
                  Post Comment
                </Button>
              </div>
            </div>
          </form>

          <h3>{data?.meta?.total || 0} Comments:</h3>
          {data?.data?.map((comment, i) => (
            <CommentCard
              refetchComment={refetchComment}
              setPage={setPage}
              comment={comment}
              key={i}
            />
          ))}

          <DialogFooter className="mt-4 flex justify-start w-full">
            <Pagination
              onPageChange={setPage}
              meta={data?.meta?.total || 0}
              className="w-fit"
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
