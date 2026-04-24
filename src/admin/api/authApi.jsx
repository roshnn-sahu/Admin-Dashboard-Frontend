const BASE_URL = import.meta.env.VITE_BACKEND_API;

export const authApi = {
  // 🔹 Register (Add) a new user
  registerUser: async (formData) => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("mobile", formData.mobile);
      data.append("gender", formData.gender);
      data.append("role", formData.role);
      data.append("email", formData.email);
      data.append("password", formData.password);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      return responseData; // { message, user? }
    } catch (error) {
      throw error;
    }
  },

  //update Logedin user
  updateProfile: async (user_id, formData) => {
    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key] !== "" && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      const res = await fetch(
        `${BASE_URL}/api/auth/update-profile/${user_id}`,
        {
          method: "PUT",
          credentials: "include",
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      return result;
    } catch (err) {
      throw err;
    }
  },
};
