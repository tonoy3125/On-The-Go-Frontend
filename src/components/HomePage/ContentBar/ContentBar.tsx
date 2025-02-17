'use client'
import MyFollowers from "@/components/Followers/MyFollowers/MyFollowers";
import CreatePostModal from "@/components/ProfilePage/CreatePostModal/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const ContentBar = () => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  return (
    <div className="w-[350px] h-full  p-4 hidden lg:block">
      <h2 className="font-semibold mb-4">Seemed Stories</h2>

      {user ? (
        <CreatePostModal />
      ) : (
        <Button
          variant="outline"
          className="w-full mb-4 bg-primaryMat text-white"
          onClick={() => toast.error("Login first to create post")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Your Story
        </Button>
      )}
      <Separator className="my-4" />
      <MyFollowers />
      <Separator className="my-4" />
      {/* <FolowingList /> */}
    </div>
  );
};

export default ContentBar;
