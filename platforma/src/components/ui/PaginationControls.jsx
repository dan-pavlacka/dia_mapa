'use client';


export default function PaginationControls({
  totalRecords,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  if (totalRecords <= 10) return null;

  const handleRowsChange = (e) => {
    onRowsPerPageChange(Number(e.target.value));
  };

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage === 1) {
      return [1, 2, 3];
    }
    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const pageNumbers = getPageNumbers();

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={"paginationContainer"}>
      {/* Select počet záznamů na stránku */}
      <select
        className={"rowsPerPageSelect"}
        value={rowsPerPage}
        onChange={handleRowsChange}
      >
        {[10, 25, 50, 100].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span className={"recordsText"}>záznamů na stránku</span>

      {/* Stránkování */}
      <div className={"paginationButtons"}>
        {currentPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              aria-label="První stránka"
              type="button"
              className={"paginationIconButton"}
            >
              <img src="/assets/icons/leftDouble.svg" alt="První stránka" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Předchozí stránka"
              type="button"
              className={"paginationIconButton"}
            >
              <img src="/assets/icons/left.svg" alt="Předchozí stránka" />
            </button>
          </>
        )}

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={
              num === currentPage
                ? "pageButtonActive"
                : "pageButton"
            }
            aria-current={num === currentPage ? 'page' : undefined}
            type="button"
          >
            {num}
          </button>
        ))}

        {currentPage < totalPages && (
          <>
            <button
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Další stránka"
              type="button"
              className={"paginationIconButton"}
            >
              <img src="/assets/icons/right.svg" alt="Další stránka" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              aria-label="Poslední stránka"
              type="button"
              className={"paginationIconButton"}
            >
              <img src="/assets/icons/rightDouble.svg" alt="Poslední stránka" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
