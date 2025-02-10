/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "@/redux/features/follower/followerApi";
import { useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  updateFollowerCount: (value: number) => void;
  userId?: string;
  refetch: () => void;
}

const ProfileFollowToggle: React.FC<IProps> = ({
  isFollowing,
  setIsFollowing,
  updateFollowerCount,
  userId: uid,
  refetch,
}) => {
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unFollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);

  const { userId } = useParams();
  const id = userId || uid;
  // console.log(id)
  if (!id) return null;

  const handleFollow = async () => {
    try {
      const payload = {
        following: userId,
        follower: user?.id,
      };
      // console.log("payload is", payload);
      const res = await follow({ token, payload }).unwrap();
      // console.log("Follow Response", res);
      setIsFollowing(true);
      updateFollowerCount(1);
      toast.success(res?.message || "Followed successfully");
      await refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const handleUnfollow = async () => {
    try {
      const payload = {
        following: userId,
        follower: user?.id,
      };
      // console.log("payload is", payload);
      const res = await unFollow({ token, payload }).unwrap();
      // console.log("UnFollow Response", res);
      setIsFollowing(false);
      updateFollowerCount(-1);
      toast.success(res?.message || "Unfollowed successfully");
      await refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      {isFollowing ? (
        <Button onClick={handleUnfollow} disabled={isUnfollowLoading}>
          Unfollow
        </Button>
      ) : (
        <Button onClick={handleFollow} disabled={isFollowLoading}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default ProfileFollowToggle;
