import { Client, ID, Storage } from "appwrite";
import configVariables from "../../config/config";

class StorageConfigService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(configVariables.VITE_APPWRITE_URL)
      .setProject(configVariables.VITE_APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const uploadedFile = await this.storage.createFile(
        configVariables.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
      if (uploadedFile) {
        return uploadedFile;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: uploadFile :: error: " + error);
    }
  }

  async deleteFile(fileId) {
    try {
      const deletedFile = await this.storage.deleteFile(
        configVariables.VITE_APPWRITE_BUCKET_ID,
        fileId
      );
      if (deletedFile) {
        return deletedFile;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: deleteFile :: error: " + error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(
      configVariables.VITE_APPWRITE_BUCKET_ID,
      fileId
    );
  }
}

const storageConfigService = new StorageConfigService();

export default storageConfigService;
