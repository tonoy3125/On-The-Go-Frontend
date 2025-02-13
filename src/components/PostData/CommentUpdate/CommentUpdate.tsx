/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useUpdateCommentByIdMutation } from "@/redux/features/comment/commentApi";
import { useAppSelector } from "@/redux/hook";
import { TComment } from "@/types/comment.type";

import { DialogClose } from "@radix-ui/react-dialog";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IPorps {
  comment: TComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentUpdate: React.FC<IPorps> = ({ comment, setPage }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      comment: comment?.comment || "",
    },
  });
  const [updateCommentById] = useUpdateCommentByIdMutation();
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (comment) {
      reset({
        comment: comment?.comment || "",
      });
    }
  }, [comment, reset]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Please Wait...");
    try {
      const payload = {
        comment: data?.comment,
      };
      //   console.log(payload);
      const res = await updateCommentById({ id: comment?._id, payload, token });
      // console.log(res);
      setPage(1);

      toast.success(res.data?.message || "Comment Updated Successfully!!", {
        id: toastId,
        duration: 3000,
      });
      setOpen(false);
      // reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:underline text-[12px]">Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5 text-blue-500" />
            Edit Comment
          </DialogTitle>
          <DialogDescription>
            Make changes to your comment below. Click update when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Textarea
            {...register("comment", {
              required: "Comment is Required",
            })}
            placeholder="Edit your comment here..."
            className="min-h-[100px]"
            name="comment"
            required
          />
          <Button type="submit" className="mt-[20px]">
            Update
          </Button>
        </form>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" id="cancel_comment_update_dialog">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentUpdate;
