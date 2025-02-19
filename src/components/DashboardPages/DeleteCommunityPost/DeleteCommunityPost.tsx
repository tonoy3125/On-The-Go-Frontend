import { Button } from "@/components/ui/button";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useRemovePostMutation } from "@/redux/features/post/postApi";
import { removePostData } from "@/redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Swal from "sweetalert2";

const DeleteCommunityPost = ({ refetch, id }) => {
  const [removePost] = useRemovePostMutation();
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

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
            id: id,
            token,
          }).unwrap();
          dispatch(removePostData(id));
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

  return (
    <div>
      <Button
        className="w-full"
        variant="destructive"
        onClick={handleRemovePost}
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteCommunityPost;
