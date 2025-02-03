/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useCheckMembershipQuery,
  useJoinGroupMutation,
  useLeaveGroupMutation,
} from "@/redux/features/groupMember/groupMemberApi";
import { useAppSelector } from "@/redux/hook";
import { UsersRound } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

interface IProps {
  groupId: string;
  className?: string;
}

const GroupJoin: React.FC<IProps> = ({ groupId, className }) => {
  const [joinGroup, { isLoading: isJoining }] = useJoinGroupMutation();
  const [leaveGroup, { isLoading: isLeaving }] = useLeaveGroupMutation();
  const token = useAppSelector(useCurrentToken);

  const {
    data: memberShipData,
    isFetching,
    refetch,
  } = useCheckMembershipQuery({ groupId, token }, { skip: !groupId || !token });

  //   console.log(memberShipData)

  const handleJoinGroup = async () => {
    try {
      const res = await joinGroup({ token, groupId });
      if ("error" in res) {
        toast.error(res.error?.data?.message || "Something went wrong");
        return;
      }
      toast.success("Joined group successfully!");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const res = await leaveGroup({ token, groupId });
      if ("error" in res) {
        toast.error(res.error?.data?.message || "Something went wrong");
        return;
      }
      toast.success("Left group successfully!");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) return <FaSpinner className="spinner" />;

  return memberShipData?.data?.isMember ? (
    <Button
      onClick={handleLeaveGroup}
      disabled={isLeaving}
      variant="outline"
      className={`bg-red-500/10 text-red-500 border-red-500 center gap-2 ${
        className || ""
      }`}
    >
      Leave Group
      {isLeaving ? (
        <FaSpinner className="spinner" />
      ) : (
        <UsersRound width={15} />
      )}
    </Button>
  ) : (
    <Button
      onClick={handleJoinGroup}
      disabled={isJoining}
      variant="outline"
      className={`bg-primaryMat/10 text-primaryMat border-primaryMat center gap-2 ${
        className || ""
      }`}
    >
      Join Group
      {isJoining ? (
        <FaSpinner className="spinner" />
      ) : (
        <UsersRound width={15} />
      )}
    </Button>
  );
};

export default GroupJoin;
