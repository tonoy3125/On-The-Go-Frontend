import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";

interface IProps {
  label: string;
  value: number | string;
  icon: IconType;
}

const UserCountCard: React.FC<IProps> = ({ label, value, icon: Icon }) => {
  return (
    <Card className="w-full bg-primaryMat/10">
      <CardHeader>
        <CardTitle className="flex items-start justify-between text-primaryMat flex-wrap-reverse gap-[15px]">
          {label}
          <Icon className="w-5 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[20px] font-[400] text-primaryMat">{value}</p>
      </CardContent>
    </Card>
  );
};

export default UserCountCard;
