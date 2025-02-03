/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useJoinGroupMutation } from "@/redux/features/groupMember/groupMemberApi";
import { useAppSelector } from "@/redux/hook";
import { UsersRound } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

interface IProps {
  groupId: string;
  children?: React.ReactNode;
  className?: string;
}

const GroupJoin: React.FC<IProps> = ({ groupId, children, className }) => {
  const [joinGroup, { isLoading }] = useJoinGroupMutation();
  const [isJoined, setIsJoined] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const handleJoinGroup = async () => {
    try {
      const res = await joinGroup({ token, groupId });
      console.log(res);
      const error = res.error as any;
      if (error) {
        toast.error(error.data?.message || "Something went wrong");
        return;
      }

      setIsJoined(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isJoined) {
    return <></>;
  }

  return (
    children || (
      <Button
        onClick={handleJoinGroup}
        disabled={isLoading}
        variant="outline"
        className={`bg-primaryMat/10 text-primaryMat border-primaryMat center gap-[8px] ${
          className || ""
        }`}
      >
        Join Group
        {isLoading ? (
          <FaSpinner className="spinner" />
        ) : (
          <UsersRound width={15} />
        )}{" "}
      </Button>
    )
  );
};

export default GroupJoin;
