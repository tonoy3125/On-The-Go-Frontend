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
import {
  followUser,
  unfollowUser,
} from "@/redux/features/follower/followerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TUserPayload } from "@/types/user.type";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  userId?: string;
  userName: string;
  refetch: () => void;
}

const ProfileFollowToggle: React.FC<IProps> = ({
  isFollowing,
  setIsFollowing,
  userId: uid,
  userName,
  refetch,
}) => {
  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unFollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const { userId } = useParams();
  const id = userId || uid;
  // console.log(id)
  if (!id) return null;

  const handleFollow = async () => {
    try {
      const payload = {
        following: id,
        follower: user?.id,
      };
      console.log("payload is", payload);
      const res = await follow({ token, payload }).unwrap();
      // console.log("Follow Response", res);
      setIsFollowing(true);
      dispatch(
        followUser({
          authUserId: user?.id,
          targetUser: { _id: userId, name: userName }, // Adjust target user data as needed
        })
      );
      toast.success(res?.data?.message || "Followed successfully");
      await refetch();
    } catch (error: any) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const handleUnfollow = async () => {
    try {
      const payload = {
        following: id,
        follower: user?.id,
      };
      console.log("payload is", payload);
      const res = await unFollow({ token, payload }).unwrap();
      // console.log("UnFollow Response", res);
      setIsFollowing(false);
      dispatch(
        unfollowUser({
          authUserId: user?.id,
          targetUserId: id,
        })
      );
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
