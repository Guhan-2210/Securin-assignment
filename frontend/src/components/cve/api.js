import { API_BASE_URL } from "../configuration/config";

export const fetchCVEById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch CVE by ID");
  return response.json();
};

export const fetchCVEByYear = async (year) => {
  const response = await fetch(`${API_BASE_URL}/year/${year}`);
  if (!response.ok) throw new Error("Failed to fetch CVE by year");
  return response.json();
};

export const fetchCVEByScore = async ({ min, max }) => {
  const response = await fetch(`${API_BASE_URL}/score/${min}/${max}`);
  if (!response.ok) throw new Error("Failed to fetch CVE by score");
  return response.json();
};

export const fetchCVEByModified = async (days) => {
  const response = await fetch(`${API_BASE_URL}/modified/${days}`);
  if (!response.ok) throw new Error("Failed to fetch CVE by modified date");
  return response.json();
};
  