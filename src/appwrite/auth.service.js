import { Client, ID, Account } from "appwrite";
import conf from "../conf/config.js";

class Authentication {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Ensure this is correct
      .setProject(conf.appwriteProjectId); // Ensure this is correct
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (createdUser) {
        return this.login({ email, password });
      } else {
        return createdUser;
      }
    } catch (error) {
      console.log("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error logging in:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error fetching current user:", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new Authentication();

export default authService;