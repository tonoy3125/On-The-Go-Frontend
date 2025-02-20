import { Button } from "@/components/ui/button";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useRemoveCategoryMutation } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

type TDeleteCategoryProps = {
  id: string;
  refetch: () => void;
};

const DeleteCategory: React.FC<TDeleteCategoryProps> = ({ id, refetch }) => {
  const [removeCategory] = useRemoveCategoryMutation();
  const token = useAppSelector(useCurrentToken);

  const handleRemoveCategory = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Category!",
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeCategory({
            id,
            token,
          }).unwrap();
          refetch();
          Swal.fire({
            title: "Removed!",
            text: "The Category Has Been Removed .",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove Category:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Category.",
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

  return (
    <div>
      <Button onClick={handleRemoveCategory} variant="destructive" size="sm">
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};

export default DeleteCategory;
