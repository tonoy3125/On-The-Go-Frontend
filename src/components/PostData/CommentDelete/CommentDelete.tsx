import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useRemoveCommentMutation } from "@/redux/features/comment/commentApi";
import { useAppSelector } from "@/redux/hook";
import { TComment } from "@/types/comment.type";
import Swal from "sweetalert2";

interface IPorps {
  comment: TComment;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const CommentDelete: React.FC<IPorps> = ({ comment, setPage }) => {
  const [removeComment] = useRemoveCommentMutation();
  const token = useAppSelector(useCurrentToken);

  const handleRemoveComment = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove Comment!",
      backdrop: false,
      customClass: {
        title: "custom-swal-title",
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-btn",
        cancelButton: "custom-swal-cancel-btn",
      },
      html: `
      <div class="mt-4 rounded-md bg-muted p-4">
        <p class="text-sm text-muted-foreground">
          ${
            comment?.comment.length > 100
              ? `${comment?.comment.slice(0, 100)}...`
              : comment?.comment
          }
        </p>
      </div>
    `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeComment({
            id: comment?._id,
            token,
          }).unwrap();
          setPage(1);
          //   console.log(res);
          //   refetchComment();
          Swal.fire({
            title: "Removed!",
            text: "The Comment has been Removed .",
            icon: "success",
            customClass: {
              title: "custom-swal-title",
              popup: "custom-swal-popup",
            },
          });
        } catch (error) {
          console.error("Failed to remove Comment:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove Comment.",
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
      <button
        onClick={handleRemoveComment}
        className="hover:underline text-[12px]"
      >
        Delete
      </button>
    </div>
  );
};

export default CommentDelete;
