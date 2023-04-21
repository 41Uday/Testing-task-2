import { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page number clicks
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <nav className="flex justify-center w-full sx:w-5/6">
      <ul className="flex">
        {/* Render "Prev" button if not on first page */}
        {currentPage > 1 ? (
          <li>
            <button
              className="bg-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
              onClick={() => handleClick(currentPage - 1)}
            >
              Prev
            </button>
          </li>
        ) : (
          <li>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border-none  opacity-50 cursor-not-allowed"
              // onClick={() => handleClick(currentPage - 1)}
            >
              Prev
            </button>
          </li>
        )}

        {/* Render page number buttons */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                number === currentPage
                  ? // "bg-blue-500 hover:bg-blue-700 text-white rounded-md border-none"
                    "text-blue-700 border-none underline  hover:text-blue-700 "
                  : "hover:text-blue-700 border-none"
              } font-semibold py-2 px-4 border border-gray-400`}
              onClick={() => handleClick(number)}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Render "Next" button if not on last page */}
        {currentPage < totalPages ? (
          <li>
            <button
              className="bg-white  hover:underline text-blue-500 font-semibold py-2 px-4 border-none"
              onClick={() => handleClick(currentPage + 1)}
            >
              Next
            </button>
          </li>
        ) : (
          <li>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-r opacity-50 cursor-not-allowed"
              // onClick={() => handleClick(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const Page = () => {
  // Sample data to be paginated
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
    { id: 4, name: "Alice Lee" },
    { id: 5, name: "Charlie Brown" },
    { id: 6, name: "Eve Adams" },
    { id: 7, name: "Frank Green" },
    { id: 8, name: "Grace Kim" },
    { id: 9, name: "Henry Lee" },
    { id: 10, name: "Isabel Rodriguez" },
    { id: 11, name: "Jackie Chan" },
    { id: 12, name: "Kevin Wong" },
    { id: 13, name: "Linda Davis" },
    { id: 14, name: "Mike Smith" },
    { id: 15, name: "Nina Patel" },
    { id: 18, name: "Grace Kim" },
    { id: 91, name: "Henry Lee" },
    { id: 101, name: "Isabel Rodriguez" },
    { id: 111, name: "Jackie Chan" },
    { id: 121, name: "Kevin Wong" },
    { id: 131, name: "Linda Davis" },
    { id: 141, name: "Mike Smith" },
    { id: 151, name: "Nina Patel" },
  ];

  // Set the number of items to display per page
  const itemsPerPage = 5;

  // Initialize state for current page and current items
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState(data.slice(0, itemsPerPage));

  // Handle pagination button clicks
  const paginate = (pageNumber) => {
    // Calculate the start and end indexes of the current page
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Set the current page and current items
    setCurrentPage(pageNumber);
    setCurrentItems(data.slice(startIndex, endIndex));
  };

  return (
    <div>
      {/* Render the current items */}
      {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Rendering the pagination component */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Page;
