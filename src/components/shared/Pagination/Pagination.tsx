"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React, { useMemo } from "react";

// Types
export interface PaginationProps {
  meta: number;
  limit?: number;
  onPageChange: (page: number) => void;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

interface PaginationTextProps {
  currentPage: number;
  limit: number;
  meta: number;
  className?: string;
}

// Text Component
function PaginationText({
  currentPage,
  limit,
  meta,
  className,
}: PaginationTextProps) {
  const start = Math.min((currentPage - 1) * limit + 1, meta);
  const end = Math.min(currentPage * limit, meta);

  return (
    <p className={cn("text-sm text-gray-700", className)}>
      Showing <span className="font-medium">{start}</span> to{" "}
      <span className="font-medium">{end}</span> of{" "}
      <span className="font-medium">{meta}</span> items
    </p>
  );
}

// Main Pagination Component
function Pagination({
  meta,
  limit = 10,
  onPageChange,
  className,
  showText = true,
  textClassName,
}: PaginationProps) {
 console.log(meta)
  const totalPages = Math.ceil(meta / limit);
  const [currentPage, setCurrentPage] = React.useState(1);

  const pages = useMemo(() => {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    items.push(1);

    if (currentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="space-y-4 mt-4">
      {showText && (
        <PaginationText
          currentPage={currentPage}
          limit={limit}
          meta={meta}
          className={textClassName}
        />
      )}
      <nav
        className={cn("flex items-center justify-center space-x-2", className)}
        aria-label="Pagination"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center space-x-1">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  variant="ghost"
                  size="sm"
                  className="w-9"
                  disabled
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              );
            }

            const pageNumber = page as number;
            return (
              <Button
                key={pageNumber}
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(pageNumber)}
                className={`w-9 ${
                  currentPage === pageNumber
                    ? "bg-primaryMat text-white"
                    : "bg-primaryMat/10 text-primaryMat"
                }`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
}

export default Pagination;
