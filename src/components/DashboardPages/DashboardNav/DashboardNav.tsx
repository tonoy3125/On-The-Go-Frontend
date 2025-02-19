import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from "@/routes";

interface DashboardNavProps {
  items: NavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const isMobileNav = false;
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map(({ Icon, href, title }, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === href ? "bg-accent" : "transparent"
                  )}
                >
                  <Icon className={`ml-3 size-5 flex-none`} />

                  {!isMobileNav ? (
                    <span className="mr-2 truncate">{title}</span>
                  ) : (
                    ""
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                // className={!isMinimized ? "hidden" : "inline-block"}
              >
                {title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
