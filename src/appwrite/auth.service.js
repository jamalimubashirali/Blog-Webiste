import { Client, ID, Account } from "appwrite";
import conf from "../conf/config.js";

class Authentication {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const createdUser = await this.account.create(
        ID.unique,
        email,
        password,
        name
      );
      if (createdUser) {
        return this.login(email, password);
      } else {
        return createdUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error Logging in User", error);
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      return currentUser;
    } catch (error) {
      console.log("Error fetching Current User", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error While Logging Out User", error);
    }
  }
}

const authService = new Authentication();

export default authService;
