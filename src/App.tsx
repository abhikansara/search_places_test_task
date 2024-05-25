import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import { useDebounce } from "./hooks/useDebounce";
import Table from "./components/Table";

export type City = {
  id: number;
  name: string;
  countryCode: string;
  country: string;
};

const API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const API_KEY = "b6c3348d50mshed47ae48b98a023p10fdc7jsn533f1978daa9";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = currentPage > 1 ? (currentPage - 1) * limit : 0;
        const response = await axios.get(API_URL, {
          params: {
            countryIds: "IN",
            namePrefix: debouncedSearchTerm,
            limit,
            offset,
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
          },
        });
        setCities(response.data.data);
        setTotal(response.data.metadata.totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (debouncedSearchTerm) {
      fetchData();
    }
  }, [currentPage, debouncedSearchTerm, limit]);

  return (
    <div>
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search places..."
      />
      <Table
        loading={loading}
        cities={cities}
        resultFound={!searchTerm}
        onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
        onNextPage={() => setCurrentPage((prev) => prev + 1)}
        currentPage={currentPage}
        totalPages={Math.ceil(total / limit)}
        onPageSizeChange={setLimit}
      />
    </div>
  );
};

export default App;
