import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";

import { useAppSelector } from "@/redux/hook";
import { TRole, TUserPayload } from "@/types/user.type";

import { toast } from "sonner";
const ChangeUserRole = ({ role, id }: { role: string; id: string }) => {
  const user = useAppSelector(selectCurrentUser) as TUserPayload | null;
  const [updateUserById] = useUpdateUserRoleMutation();
  const token = useAppSelector(useCurrentToken);

  const handleChangeRole = async (updateRole: TRole) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateUserById({ id, role: updateRole, token });
      toast.success(
        res?.data?.message || `Successfully updated user role to ${updateRole}`,
        {
          id: toastId,
          duration: 3000,
        }
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!", {
        id: toastId,
        duration: 3000,
      });
    }
  };
  return (
    <Select
      defaultValue={role}
      disabled={user?.id === id}
      onValueChange={handleChangeRole}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Set Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select role</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChangeUserRole;
