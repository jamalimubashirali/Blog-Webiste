import axios from "axios";
import conf from "../conf/config.js";

class DatabaseService {
  constructor() {
    this.baseURL = conf.backendUri || "http://localhost:5000/api";
  }

  async createPost(postData) {
    try {
      const response = await axios.post(
        `${this.baseURL}/posts/`,
        {
          ...postData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Appwrite Error :: createPost", error);
      throw error;
    }
  }

  async updatePost(slug, updatedPostData) {
    try {
      const response = await axios.patch(
        `${this.baseURL}/posts/${slug}`,
        {
          ...updatedPostData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Appwrite Error :: updatePost", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const response = await axios.delete(`${this.baseURL}/posts/${slug}`, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deletePost", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const response = await axios.get(`${this.baseURL}/posts/${slug}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Appwrite Error :: getPost", error);
      throw error;
    }
  }

  async getDocuments(query) {
    try {
      if (query) {
        const { userId } = query;
        const response = await axios.get(
          `${this.baseURL}/posts/?userId=${userId}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } else {
        const response = await axios.get(`${this.baseURL}/posts/`, {
          withCredentials: true,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Appwrite Error :: getDocuments", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
