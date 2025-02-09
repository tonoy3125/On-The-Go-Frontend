/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IPost } from "@/types/post.types";
import { TUserPayload } from "@/types/user.type";
import { EllipsisVertical, Eye, Share2, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import DownloadPdf from "../DownloadPdf/DownloadPdf";
import { useRemovePostMutation } from "@/redux/features/post/postApi";
import { removePostData } from "@/redux/features/post/postSlice";
import Swal from "sweetalert2";

const PostOptions = ({
  post,
  refetch,
}: {
  post: IPost;
  refetch: () => void;
}) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const [removePost] = useRemovePostMutation();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  // console.log(user)
  const isAuthor = user && post.user?._id === user?.id;
  // console.log(isAuthor);
  const [_, copy] = useCopyToClipboard();

  const handleRemovePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Post!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removePost({
            id: post._id,
            token,
          }).unwrap();
          dispatch(removePostData(post._id));
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "The Post has been removed .",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove Post:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Post.",
            icon: "error",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        }
      }
    });
  };

  const handleShare = async () => {
    const url = window.location.origin;
    await copy(url + "/post/" + post._id);
    toast.success("Shareable Link copied to clipboard");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"icon"}>
            <EllipsisVertical width={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleShare}
              className="flex items-center gap-[5px]"
            >
              <Share2 width={15} />
              Share
            </DropdownMenuItem>

            <Link href={`/post/${post._id}`}>
              <DropdownMenuItem className="flex items-center gap-[5px]">
                <Eye width={15} /> View Post
              </DropdownMenuItem>
            </Link>
            <DownloadPdf id={post._id} />
            {isAuthor ? (
              <>
                <DropdownMenuItem
                  onClick={handleRemovePost}
                  className="flex items-center gap-[5px]"
                >
                  <Trash width={15} />
                  Delete
                </DropdownMenuItem>
              </>
            ) : (
              ""
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostOptions;
