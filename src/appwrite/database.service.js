import { Client, Databases, Query } from "appwrite";
import conf from "../conf/config.js";

class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,  // Document ID (should be unique)
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Appwrite Error :: createPost", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Appwrite Error :: updatePost", error);
      throw error;
    }
  }

  async deletePost(slug) {  // Fixed parameter destructuring
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deletePost", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite Error :: getPost", error);
      throw error;
    }
  }

  async getDocuments(queries = [Query.equal("status", "active")]) { // Fixed typo
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries  // Corrected spelling
      );
    } catch (error) {
      console.error("Appwrite Error :: getDocuments", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;