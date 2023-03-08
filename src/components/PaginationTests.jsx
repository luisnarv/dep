import Pagination from "react-bootstrap/Pagination"

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
    <div>
      <Pagination>
      <Pagination.First onClick={() => setCurrentPage(1)}/>
      <Pagination.Prev onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}/>
      {pageNumbers.map((page, index) => {
        return (
          <Pagination.Item key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </Pagination.Item>
        );
      })}
      <Pagination.Next onClick={() => currentPage !== pageNumbers.length && setCurrentPage(currentPage + 1)}/>
      <Pagination.Last onClick={() => setCurrentPage(pageNumbers.length)}/>
      </Pagination>
    </div>
  );
}
