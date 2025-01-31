import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
const FilterSection = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    cveId: "",
    year: "",
    scoreRange: { min: "", max: "" },
    modifiedDays: "",
  });

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScoreRangeChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      scoreRange: {
        ...prev.scoreRange,
        [key]: value,
      },
    }));
  };

  const clearFilters = () => {
    setFilters({
      cveId: "",
      year: "",
      scoreRange: { min: "", max: "" },
      modifiedDays: "",
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CVE ID</label>
          <Input
            value={filters.cveId}
            onChange={(e) => handleInputChange("cveId", e.target.value)}
            placeholder="CVE-YYYY-XXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <Input
            type="number"
            value={filters.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
            placeholder="YYYY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Score Range</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={filters.scoreRange.min}
              onChange={(e) => handleScoreRangeChange("min", e.target.value)}
              placeholder="Min"
            />
            <Input
              type="number"
              value={filters.scoreRange.max}
              onChange={(e) => handleScoreRangeChange("max", e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Modified (Days)
          </label>
          <Input
            type="number"
            value={filters.modifiedDays}
            onChange={(e) => handleInputChange("modifiedDays", e.target.value)}
            placeholder="Days ago"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onFilter(filters)}>Apply Filters</Button>
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
