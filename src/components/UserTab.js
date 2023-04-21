import React from "react";
import { url } from "../config";
import { useState, useEffect } from "react";

import EmailPopup from "./EmailPopup";
import axios from "axios";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  console.log(itemsPerPage, totalItems, paginate);
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

function UserTab() {
  // const [isEnabled, setIsEnabled] = useState(true);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    axios
      .get(url.API + "api/users")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDate = (e) => {
    // console.log(e.e.actions);
    let r = e.e.date;
    // let a = res.substring(0, 10);
    return new Date(r).toLocaleDateString("en-GB");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center align-center">
      <div>
        <EmailPopup />
      </div>
      <div className="overflow-x-auto text-xs md:text-base md:h-3/6 ">
        <table className="table-auto w-full">
          <thead className="h-2">
            <tr className="bg-indigo-100 ">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((e) => (
              <tr
                className="bg-white border border-stone-300 hover:bg-lime-50 hover:cursor-pointer
                "
                key={e.user_id}
              >
                <td className="px-4 py-2">{e.user_id}</td>
                <td className="px-4 py-2">{e.fullname}</td>
                <td className="px-4 py-2">{e.email} </td>
                <td className="px-4 py-2"> {e.dept} </td>
                <td className="px-4 py-2"> {getDate({ e })} </td>
                <td className="px-4 py-2">
                  {e.actions ? (
                    <button
                      className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      // onClick={handleEnabled}
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      // onClick={(event) => handleEnabled(event, e)}
                    >
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
}

export default UserTab;
