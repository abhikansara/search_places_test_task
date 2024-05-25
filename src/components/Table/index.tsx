import { useState } from "react";
import "./style.css";
import { City } from "../../App";
type TableProps = {
  loading: boolean;
  cities: City[];
  resultFound: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  currentPage: number;
  totalPages: number;
  onPageSizeChange: (size: number) => void;
};
const Table = ({
  loading,
  cities,
  resultFound,
  onNextPage,
  onPageSizeChange,
  currentPage,
  onPreviousPage,
  totalPages,
}: TableProps) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPageChange = (e: any) => {
    const value = parseInt(e.target.value);
    const pageSize = Math.min(Math.max(value, 1), 10);
    setItemsPerPage(pageSize);
    onPageSizeChange(pageSize);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
          {!loading && cities.length === 0 && (
            <tr>
              <td colSpan={3}>
                {resultFound ? "Start searching" : "No result found"}
              </td>
            </tr>
          )}
          {!loading &&
            cities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>
                  <img
                    src={`https://flagsapi.com/${city.countryCode.toUpperCase()}/flat/16.png`}
                    // src={`https://countryflagsapi.com/png/${city.countryCode.toUpperCase()}`}
                    alt={`${city.country} Flag`}
                  />
                  {city.country}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={onPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={onNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div>
        <label htmlFor="itemsPerPage">Items Per Page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option>3</option>
          <option>5</option>
          <option>10</option>
        </select>
      </div>
    </div>
  );
};

export default Table;
