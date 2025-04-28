import { useSearchParams } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

export default function PagePagination({ pagination }: { pagination?: any }) {
  const [params, setParams] = useSearchParams({
    page: "1",
  });

  const currentPage = Number(params.get("page") ?? 1);
  const isNextDisabled = currentPage === pagination?.total_pages;
  const isPreviousDisabled = currentPage === 1;

  if (!pagination || pagination?.total_pages === 1 || pagination?.total === 0) {
    return null;
  }

  const pageHandler = (page: number) => {
    setParams((params) => {
      params.set("page", page.toString());
      return params;
    });
  };

  const pagesSubset = () => {
    if (pagination?.total_pages <= 5) {
      return Array.from({ length: pagination?.total_pages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= pagination?.total_pages - 2) {
      return [
        pagination?.total_pages - 4,
        pagination?.total_pages - 3,
        pagination?.total_pages - 2,
        pagination?.total_pages - 1,
        pagination?.total_pages,
      ];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <Pagination className=" bg-lightBackground border border-lightBorderClr rounded-2xl p-2 px-3 w-min">
      <PaginationContent className=" gap-1">
        {!isPreviousDisabled && (
          <PaginationItem>
            <PaginationPrevious
              className={cn("rounded-full")}
              onClick={() => pageHandler(currentPage - 1)}
              type="button"
            />
          </PaginationItem>
        )}

        {pagesSubset().map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              className=" rounded-full"
              onClick={() => pageHandler(i)}
              type="button"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}

        {!isNextDisabled && (
          <PaginationItem>
            <PaginationNext
              className={cn("rounded-full")}
              onClick={() => pageHandler(currentPage + 1)}
              type="button"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
