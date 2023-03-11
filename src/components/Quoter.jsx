import { useSelector } from "react-redux";
import { useState } from "react";
import Test from "./Test";
import SearchBar from "./searchBar";
import PaginationTests from "./PaginationTests";
import Row from "react-bootstrap/Row";
import Detail from "./Detail";

export default function Quoter() {
  const filteredTests = useSelector((state) => state.filteredTests);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(24);
  const [detailId, setDetailId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = filteredTests.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%" }}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>
      <div
        style={{
          width: "97%",
        }}
      >
        <Row
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gridAutoRows: "1fr",
            justifyItems: "center",
          }}
          md={3}
        >
          {currentPost &&
            currentPost.map((test) => (
              <Test
                key={test.id}
                id={test.id}
                name={test.name}
                description={test.description}
                price={test.price}
                setDetailId={setDetailId}
                setShowDetails={setShowDetails}
              />
            ))}
        </Row>
      </div>

      <div>
        <PaginationTests
          postPerPage={postsPerPage}
          totalPosts={filteredTests.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <Detail
        id={detailId}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </div>
  );
}
