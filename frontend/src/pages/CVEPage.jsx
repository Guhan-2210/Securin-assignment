import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CVEDetails from '../components/cve/CVEDetails';
import { fetchCVEById } from '../components/cve/api';

const CVEPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCVEById(id);
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <div>Failed to load CVE details.</div>;
  if (!data) return <div>Loading...</div>;

  return <CVEDetails cve={data} />;
};

export default CVEPage;