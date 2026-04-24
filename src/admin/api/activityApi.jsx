import { toast } from "react-toastify";

export const activityApi = {
  getUsersActivites: async (params) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/get-users-activities?${params}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch activities");
        throw new Error(data.message || "Failed to fetch activities");
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
