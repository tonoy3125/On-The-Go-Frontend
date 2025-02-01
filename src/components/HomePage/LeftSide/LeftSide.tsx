import GroupSuggestion from "@/components/GroupSuggestion/GroupSuggestion";
import MyGroups from "@/components/MyGroups/MyGroups";
import ShortCuts from "@/components/ShortCuts/ShortCuts";
import { Separator } from "@/components/ui/separator";

const LeftSide = () => {
  return (
    <div className="w-[350px] h-full px-4 hidden lg:flex flex-col">
      <ShortCuts />
      <MyGroups />
      <Separator className="my-5" />
      <GroupSuggestion />
    </div>
  );
};

export default LeftSide;
