import ReactPaginate from "react-paginate";

interface ProductPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

/**
 * ProductPagination - Pagination controls for product listing
 */
const ProductPagination: React.FC<ProductPaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="mt-10 flex justify-center">
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={({ selected }) => onPageChange(selected)}
        containerClassName="flex gap-2 text-gray-700"
        activeClassName="text-cyan-600 font-bold"
        pageClassName="px-3 py-1 border rounded"
        previousClassName="px-3 py-1 border rounded"
        nextClassName="px-3 py-1 border rounded"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default ProductPagination;
