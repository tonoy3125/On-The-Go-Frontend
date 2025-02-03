import { Button } from "@/components/ui/button";
import { useJoinGroupMutation } from "@/redux/features/groupMember/groupMemberApi";
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
  

  return (
    children || (
      <Button
        // onClick={handleJoinGroup}
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
