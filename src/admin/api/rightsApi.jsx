const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const rightsApi = {
  assignRights: async (userId, modules) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rights`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, modules }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to assign rights");
      }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getRights: async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rights/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
      }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
