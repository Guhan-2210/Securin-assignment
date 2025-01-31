import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./Card";
import FilterSection from "./FilterSection";
import CVETable from "./CVETable";
import Pagination from "./Pagination";
import {
  fetchCVEById,
  fetchCVEByYear,
  fetchCVEByScore,
  fetchCVEByModified,
} from "./api";

const CVEDashboard = () => {
  const [cveData, setCVEData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    resultsPerPage: 10,
    totalRecords: 0,
  });

  const handleFetchData = async (filterParams) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (filterParams.cveId) {
        data = await fetchCVEById(filterParams.cveId);
        data = data ? [data] : [];
        console.log("Fetched data :", data);
      } else if (filterParams.year) {
        data = await fetchCVEByYear(filterParams.year);
      } else if (filterParams.scoreRange.min && filterParams.scoreRange.max) {
        data = await fetchCVEByScore(filterParams.scoreRange);
      } else if (filterParams.modifiedDays) {
        data = await fetchCVEByModified(filterParams.modifiedDays);
      }
      setCVEData(data);
      setPagination((prev) => ({ ...prev, totalRecords: data.length }));
    } catch (err) {
      setError("Failed to fetch CVE data");
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (newPage, newResultsPerPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
      resultsPerPage: newResultsPerPage,
    }));
  };

  const getPaginatedData = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.resultsPerPage;
    const endIndex = startIndex + pagination.resultsPerPage;
    return cveData.slice(startIndex, endIndex);
  };

  useEffect(() => {
    // Fetch initial data with default year 1999
    handleFetchData({ year: 1999 });
  }, []);

  return (
    <div>
      <h1 className="mx-auto text-3xl font-bold text-center">CVE LIST</h1>
      <Card className="w-full max-w-6xl mx-auto p-4">
        <CardContent>
          <FilterSection onFilter={handleFetchData} />
          <CVETable data={getPaginatedData()} loading={loading} error={error} />
          <Pagination {...pagination} onPageChange={handlePaginationChange} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CVEDashboard;
