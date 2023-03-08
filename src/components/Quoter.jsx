import { useSelector } from "react-redux";
import { useState } from "react";
import Test from "./Test";
import SearchBar from "./searchBar";
import PaginationTests from "./PaginationTests";
import Row from "react-bootstrap/Row";

export default function Quoter() {
  const filteredTests = useSelector((state) => state.filteredTests);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(45);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = filteredTests.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <SearchBar setCurrentPage={setCurrentPage} />
      <hr style={{ border: '3px solid navy', opacity: 1 }} />
      <PaginationTests
        postPerPage={postsPerPage}
        totalPosts={filteredTests.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Row md={3} className="g-4 justify-content-center align-items-center">
        {currentPost &&
          currentPost.map((test) => (
            <Test
              key={test.id}
              id={test.id}
              name={test.name}
              description={test.description}
              price={test.price}
            />
          ))}
      </Row>
    </div>
  );
}
