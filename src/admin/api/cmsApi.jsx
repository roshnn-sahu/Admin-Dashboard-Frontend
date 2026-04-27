const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const cmsApi = {
  // CREATE
  createCms: async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms/create-cms`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // GET ALL
  getCmsList: async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms`, {
        method: "GET",
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // GET SINGLE
  getCmsById: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms/pages/${id}`, {
        method: "GET",
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // UPDATE
  updateCms: async (id, payload) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms/pages/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // DELETE
  deleteCms: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms/pages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getPageByUrl: async (url) => {
    try {
      const res = await fetch(`${BASE_URL}/api/cms/page/${url}`, {
        method: "GET",
        credentials: "include",
      });
      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
