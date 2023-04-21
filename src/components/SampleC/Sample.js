import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function SampleC() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  // Fetch data from API
  const fetchData = async (pageNumber) => {
    const response = await fetch(
      `https://api.example.com/data?page=${pageNumber}`
    );
    const responseData = await response.json();
    setData(responseData);
  };

  // Handle page change event
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    fetchData(selectedPage.selected + 1);
  };

  return (
    <div>
      {/* Display data */}
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Render pagination component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default SampleC;
