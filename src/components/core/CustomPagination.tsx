import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const CustomPagination = ({ currentPage, setOffset, setCurrentPage }: PaginationProps) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(30 / itemsPerPage);

  const onNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setOffset((nextPage - 1) * itemsPerPage);
  };
  const onPrev = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    setOffset((prevPage - 1) * itemsPerPage);
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * itemsPerPage);
  };
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center disabled:opacity-50 disabled:cursor-default gap-2 px-3 py-2 bg-gray-300 rounded-lg cursor-pointer"
      >
        <ChevronLeft />
        <span>Previous</span>
      </button>

      {Array(totalPages)
        .fill(0)
        .map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handlePageClick(index + 1);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                index + 1 === currentPage ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          );
        })}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-3 py-2 bg-gray-300 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-default"
      >
        <span>Next</span>
        <ChevronRight />
      </button>
    </div>
  );
};

export default CustomPagination;
