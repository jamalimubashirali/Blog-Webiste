import axios from "axios";
import conf from "../conf/config.js";

class DatabaseService {

  constructor() {
    const baseURL = conf.backendUri || "http://localhost:5000/api"
  }

  async createPost(postData) {
    try {
      const response = await axios.post(`${baseURL}/posts/`, {
        ...postData
      } , {
        headers : {
          "Content-Type" : "multipart/form-data"
        } , 
        withCredentials : true
      });
      return response.data;
    } catch (error) {
      console.error("Appwrite Error :: createPost", error);
      throw error;
    }
  }

  async updatePost(slug, updatedPostData) {
    try {
      const response = await axios.patch(`${baseURL}/posts/:${slug}`, {
        ...updatedPostData
      }, {
        headers : {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials : true
      });
    } catch (error) {
      console.error("Appwrite Error :: updatePost", error);
      throw error;
    }
  }

  async deletePost(slug) {  // Fixed parameter destructuring
    try {
      const response = await axios.delete(`${baseURL}/posts/:${slug}`, {
        withCredentials : true
      });
      return true
    } catch (error) {
      console.error("Appwrite Error :: deletePost", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const response = await axios.get(`${baseURL}/posts/:${slug}` , {
        withCredentials : true,
      });
      return response.data;
    } catch (error) {
      console.error("Appwrite Error :: getPost", error);
      throw error;
    }
  }

  async getDocuments(queries = [Query.equal("status", "active")]) { // Fixed typo
    try {
      const response = await axios.get(`${baseURL}/posts/` , {
        withCredentials : true
      });
      return response.data;
    } catch (error) {
      console.error("Appwrite Error :: getDocuments", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;