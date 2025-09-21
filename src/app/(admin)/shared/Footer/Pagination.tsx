import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationUI = () => {
  return (
    <Pagination className="">
      <PaginationContent className="gap-0">
        <PaginationItem className="flex items-center">
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem className="">
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="">
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>

        <PaginationItem className="flex items-center">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationUI;
