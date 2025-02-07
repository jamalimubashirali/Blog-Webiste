import { Client, Storage, ID } from "appwrite";
import conf from "../conf/config.js";

class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite Error :: uploadFile", error);
      throw error;
    }
  }

  async deleteFile(fileId) {  // Renamed parameter for clarity
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deleteFile", error);
      throw error;
    }
  }

  getFilePreview(fileId) {  // Changed to synchronous method
    try {
      return this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      ).href;  // Return full URL string
    } catch (error) {
      console.error("Appwrite Error :: getFilePreview", error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;