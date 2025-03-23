import axios from "axios";
import conf from "../conf/config.js";

class Authentication {
  constructor() {
    this.baseURL = conf.backendUri || "http://localhost:5000/api";
  }

  async createAccount(userData) {
    try {
      const { email, password, name } = userData;
      const response = await axios.post(
        `${this.baseURL}/auth/register`,
        {
          email,
          password,
          name,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (error) {
      console.error(
        "Error creating account:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async login(userCredentails) {
    try {
      const { email, password } = userCredentails;
      const response = await axios.post(
        `${this.baseURL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.user;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${this.baseURL}/auth/me`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      console.error(
        "Error fetching current user:",
        error.response?.data || error.message
      );
      return null;
    }
  }

  async logout() {
    try {
      const response = await axios.post(
        `${this.baseURL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

const authService = new Authentication();

export default authService;
