import Pagination from "react-bootstrap/Pagination";

export default function PaginationTests({
  postPerPage,
  totalPosts,
  setCurrentPage,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ margin: "auto", marginTop: "3%", marginBottom: "3%" }}>
      <Pagination>
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {currentPage > 3 && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(1)}>
              {1}
            </Pagination.Item>
            {currentPage !== 4 && <Pagination.Ellipsis disabled />}
          </>
        )}
        {pageNumbers.map(
          (page, index) =>
            (page === currentPage && (
              <Pagination.Item key={index} active>
                {page}
              </Pagination.Item>
            )) ||
            ((page === currentPage - 1 ||
              page === currentPage + 1 ||
              (page === 1 && currentPage < 4) ||
              (page === pageNumbers.length &&
                currentPage > pageNumbers.length - 3)) && (
              <Pagination.Item key={index} onClick={() => setCurrentPage(page)}>
                {page}
              </Pagination.Item>
            ))
        )}
        {currentPage < pageNumbers.length - 2 && (
          <>
            {currentPage !== pageNumbers.length - 3 && (
              <Pagination.Ellipsis disabled />
            )}
            <Pagination.Item onClick={() => setCurrentPage(pageNumbers.length)}>
              {pageNumbers.length}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          onClick={() =>
            currentPage !== pageNumbers.length &&
            setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === pageNumbers.length}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(pageNumbers.length)}
          disabled={currentPage === pageNumbers.length}
        />
      </Pagination>
    </div>
  );
}
