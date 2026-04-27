import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_API || `http://localhost:8000`;

export const homeCmsApi = {
  // GET BY URL (for frontend rendering)
  getPageByUrl: async (url) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cms/page/${url}`, {
        method: "GET",
        credentials: "include",
      });
     
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
