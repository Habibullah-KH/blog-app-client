"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";

interface PaginationControllsProps {
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
}
import { RxCircleBackslash, RxPinLeft } from "react-icons/rx";
export default function PaginationControls({ meta }: PaginationControllsProps) {
  const { limit: pageSize, page: currentPage, total, totalPage } = meta;
  console.log({ pageSize, currentPage, total, totalPage });
  const searchParams = useSearchParams();
  const router = useRouter();
  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex justify-between">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={() => navigateToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              {currentPage == 1 ? <RxCircleBackslash /> : currentPage - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              {currentPage == totalPage ? <RxPinLeft /> : currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => navigateToPage(currentPage + 1)}
              disabled={currentPage == totalPage}
            >
              {">"}
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="text-gray-600 text-sm">
        <p>
          Showing {start} to {end} results of {totalPage} pages{" "}
        </p>
      </div>
    </div>
  );
}
