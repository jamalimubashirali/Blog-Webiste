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
      const fileUri = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return fileUri;
    } catch (error) {
      console.log("Appwrite Error while uploading file", error);
      return false;
    }
  }

  async deleteFile(uniqueId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, uniqueId);
      return true;
    } catch (error) {
      console.log("Appwrite Error Occured while deleting the file", error);
      return false;
    }
  }

  async getPreview(uniqueId) {
    try {
      const filePreview = this.storage.getFilePreview(
        conf.appwriteBucketId,
        uniqueId
      );
      return filePreview;
    } catch (error) {
      console.log("Error Getting the file Preview", error);
    }
  }
}

const storageService = new StorageService();

export default storageService;
