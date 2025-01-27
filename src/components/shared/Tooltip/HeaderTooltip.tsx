import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface IProps {
  children: React.ReactNode;
  message: React.ReactNode;
  delay?: number;
}

const HeaderTooptip: React.FC<IProps> = ({ children, message, delay }) => {
  return (
    <TooltipProvider delayDuration={delay || 200}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeaderTooptip;
