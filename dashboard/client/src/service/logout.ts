import { post, setAuthToken } from "./requestHandlers";

const logout = async () => {
  try {
    await post("/logout");
    localStorage.removeItem("token");
    setAuthToken(null);
  } catch (error) {
    console.error("Error logging out", error);
    // Handle logout error if necessary
  }
};

export default logout;
