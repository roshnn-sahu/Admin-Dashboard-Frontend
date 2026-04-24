import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_API;
const useGetCompany = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);

  const getCompanyDetails = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/get-company`);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch company details");
      }

      const data = await res.json();
      setCompanyDetails(data.company);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //  Fetch automatically when hook is first used
  useEffect(() => {
    getCompanyDetails();
  }, []);

  return { companyDetails, isLoading, getCompanyDetails };
};

export default useGetCompany;
