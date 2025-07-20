'use client';
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const generatePages = () => {
    const pages = [];

    // Show first 10 pages
    const maxVisible = 10;
    const showEllipsis = totalPages > maxVisible + 1;

    const endPage = Math.min(maxVisible, totalPages);

    for (let i = 1; i <= endPage; i++) {
      pages.push(i);
    }

    // Always include the last page if ellipsis is needed
    if (showEllipsis) {
      pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="mt-8 flex justify-center gap-1 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="border-1 border-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === 'ellipsis' ? (
          <span key={idx} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(p as number)}
            className={`border-1 border-gray-300 px-3 py-1 rounded ${
              p === page ? 'bg-orange-400 text-white' : ''
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="border-1 border-gray-300 px-3 py-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
