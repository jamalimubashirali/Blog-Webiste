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
      const createdPost = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return createdPost;
    } catch (error) {
      console.log("Appwrite Error occured While Creating the Document");
      return false;
    }
  }

  async updatePost(slug, { title, userId, content, featuredImage, status }) {
    try {
      const updatedDocument = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return updatedDocument;
    } catch (error) {
      console.log("Appwrite update document Error", error);
      return false;
    }
  }

  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error while deleting the document", error);
      return false;
    }
  }

  async getPost({ slug }) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error while getting document via Id", error);
    }
  }

  async getDocuments({ quaries = [Query.equal("status", "active")] }) {
    try {
      const listOfDocs = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        quaries
      );
      return listOfDocs;
    } catch (error) {
      console.log("Appwrite error while fetching the list of documents", error);
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
