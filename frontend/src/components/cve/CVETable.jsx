import React from "react";
import { Link } from "react-router-dom";

const CVETable = ({ data, loading, error }) => {
  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-zinc-400 rounded-sm">
        <thead>
          <tr className="bg-zinc-300">
            <th className="p-2 text-left">CVE ID</th>
            <th className="p-2 text-left">IDENTIFIER</th>
            <th className="p-2 text-left">PUBLISHED DATE</th>
            <th className="p-2 text-left">LAST MODIFIED DATE</th>
            <th className="p-2 text-left">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cve, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <Link to={`/cves/list/${cve.cveId}`} className="contents">
                <td className="p-2 border">{cve.cveId}</td>
                <td className="p-2 border">{cve.identifier}</td>
                <td className="p-2 border">
                  {new Date(cve.publishedDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {new Date(cve.lastModifiedDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{cve.status}</td>
              </Link>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default CVETable;
