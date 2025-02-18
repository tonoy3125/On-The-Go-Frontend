import ContentBar from "../ContentBar/ContentBar";
import FeedContent from "../FeedContent/FeedContent";
import LeftSide from "../LeftSide/LeftSide";

const Home = () => {
  return (
    <div className="w-full h-[calc(100vh-81px)] flex justify-between gap-[15px] pt-[20px]">
      <LeftSide />
      <FeedContent />
      <ContentBar />
    </div>
  );
};

export default Home;
