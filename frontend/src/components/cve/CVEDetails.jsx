// import React from 'react';

// const CVEDetails = ({ cve }) => {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h1 className="text-2xl font-bold mb-4">{cve.cveId}</h1>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h2 className="text-lg font-medium mb-2">Identifier</h2>
//           <p>{cve.identifier}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-medium mb-2">Published Date</h2>
//           <p>{new Date(cve.publishedDate).toLocaleDateString()}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-medium mb-2">Last Modified Date</h2>
//           <p>{new Date(cve.lastModifiedDate).toLocaleDateString()}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-medium mb-2">Status</h2>
//           <p>{cve.status}</p>
//         </div>
//       </div>
//       <h2 className="text-lg font-medium mt-6 mb-2">Description</h2>
//       <p>{cve.description}</p>
//       <h2 className="text-lg font-medium mt-6 mb-2">Metrics</h2>
//       <pre className="bg-gray-100 p-4 rounded-md text-sm">
//         {JSON.stringify(cve.metrics, null, 2)}
//       </pre>
//       <h2 className="text-lg font-medium mt-6 mb-2">References</h2>
//       <ul className="list-disc pl-6 space-y-2">
//         {cve.references.map((ref, index) => (
//           <li key={index}><a href={ref} className="text-blue-500 hover:underline">{ref}</a></li>
//         ))}
//       </ul>
//       <h2 className="text-lg font-medium mt-6 mb-2">CPE Matches</h2>
//       <pre className="bg-gray-100 p-4 rounded-md text-sm">
//         {JSON.stringify(cve.cpeMatch, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default CVEDetails;

import React from 'react';

const CVEDetails = ({ cve }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* CVE Title */}
      <h1 className="text-3xl font-bold mb-4">{cve.cveId}</h1>

      {/* Description */}
      <h2 className="text-xl font-semibold mb-2">Description:</h2>
      <p className="mb-4">{cve.description}</p>

      {/* CVSS V2 Metrics */}
      <h2 className="text-xl font-semibold mb-2">CVSS V2 Metrics:</h2>
      <div className="mb-4">
        <p><strong>Severity:</strong> {cve.metrics.cvssMetricV2[0]?.baseSeverity}</p>
        <p><strong>Score:</strong> <span className="text-red-500 font-bold">{cve.metrics.cvssMetricV2[0]?.cvssData.baseScore}</span></p>
        <p><strong>Vector String:</strong> {cve.metrics.cvssMetricV2[0]?.cvssData.vectorString}</p>
      </div>

      {/* CVSS Table */}
      <table className="w-full border-collapse border border-gray-300 text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Access Vector</th>
            <th className="border border-gray-300 px-4 py-2">Access Complexity</th>
            <th className="border border-gray-300 px-4 py-2">Authentication</th>
            <th className="border border-gray-300 px-4 py-2">Confidentiality Impact</th>
            <th className="border border-gray-300 px-4 py-2">Integrity Impact</th>
            <th className="border border-gray-300 px-4 py-2">Availability Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.accessVector}</td>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.accessComplexity}</td>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.authentication}</td>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.confidentialityImpact}</td>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.integrityImpact}</td>
            <td className="border border-gray-300 px-4 py-2">{cve.metrics.cvssMetricV2[0]?.cvssData.availabilityImpact}</td>
          </tr>
        </tbody>
      </table>

      {/* Scores */}
      <h2 className="text-xl font-semibold mb-2">Scores:</h2>
      <p><strong>Exploitability Score:</strong> {cve.metrics.cvssMetricV2[0]?.exploitabilityScore}</p>
      <p><strong>Impact Score:</strong> {cve.metrics.cvssMetricV2[0]?.impactScore}</p>

      {/* CPE Matches */}
      <h2 className="text-xl font-semibold mt-6 mb-2">CPE:</h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Criteria</th>
            <th className="border border-gray-300 px-4 py-2">Match Criteria ID</th>
            <th className="border border-gray-300 px-4 py-2">Vulnerable</th>
          </tr>
        </thead>
        <tbody>
          {cve.cpeMatch.map((cpe, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{cpe.criteria}</td>
              <td className="border border-gray-300 px-4 py-2">{cpe.matchCriteriaId}</td>
              <td className="border border-gray-300 px-4 py-2">{cpe.vulnerable ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* References */}
      <h2 className="text-xl font-semibold mt-6 mb-2">References:</h2>
      <ul className="list-disc pl-6 space-y-2">
        {cve.references.map((ref, index) => (
          <li key={index}>
            <a href={ref} className="text-blue-500 hover:underline">{ref}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVEDetails;
