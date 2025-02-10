import { Card, CardFooter } from "@/components/ui/card";
import { IPost } from "@/types/post.types";
import PostContent from "../PostContent/PostContent";

interface IPorps {
  post: IPost;
  className?: string;
  showFooterItems?: boolean;
  children?: React.ReactNode;
  groupView?: boolean;
  refetch: () => void;
}

const PostCard: React.FC<IPorps> = ({
  isFollowing,
  setIsFollowing,
  updateFollowerCount,
  post,
  className,
  showFooterItems = true,
  children,
  groupView,
  refetch,
  refetchData
}) => {
  // console.log(isFollowing)
  // console.log(setIsFollowing)
  // console.log(updateFollowerCount)
  return (
    <Card className={`mb-4 ${className || ""}`} id={`post-${post._id}`}>
      <PostContent
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
        updateFollowerCount={updateFollowerCount}
        refetch={refetch}
        post={post}
        groupView={groupView}
        refetchData={refetchData}
      />
      <CardFooter className="flex flex-col justify-start items-start">
        {showFooterItems ? (
          <div className="flex items-center justify-between w-full"></div>
        ) : (
          ""
        )}
        {children ? children : <></>}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
