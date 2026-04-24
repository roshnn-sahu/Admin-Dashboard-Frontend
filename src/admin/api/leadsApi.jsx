import { toast } from "react-toastify";

export const leadsApi = {
  getAllLeads: async (params) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/get-all-leads?${params}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch leads");
        throw new Error(data.message || "Failed to fetch leads");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
  createLead: async (formData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/create-lead`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
         const data = await res.json();
      if (!res.ok) {
        toast.error("Something went wrong!");
      }
return data;

    } catch (error) {
      console.log(error);
      toast.error("Failed to create lead.");
    }
  },
};
