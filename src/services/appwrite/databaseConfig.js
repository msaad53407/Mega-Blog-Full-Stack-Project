import { Client, Databases, Query } from "appwrite";
import configVariables from "../../config/config";

class DatabaseConfigService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(configVariables.VITE_APPWRITE_URL)
      .setProject(configVariables.VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        configVariables.VITE_APPWRITE_DATABASE_ID,
        configVariables.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      if (post) {
        return post;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: createPost :: error: " + error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedPost = await this.databases.updateDocument(
        configVariables.VITE_APPWRITE_DATABASE_ID,
        configVariables.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      if (updatedPost) {
        return updatedPost;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: updatePost :: error: " + error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        configVariables.VITE_APPWRITE_DATABASE_ID,
        configVariables.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error :: deletePost :: error: " + error);
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        configVariables.VITE_APPWRITE_DATABASE_ID,
        configVariables.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
      if (post) {
        return post;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: getPost :: error: " + error);
    }
  }

  async getAllPosts(queries = [Query.equal("status", "published")]) {
    try {
      const posts = await this.databases.listDocuments(
        configVariables.VITE_APPWRITE_DATABASE_ID,
        configVariables.VITE_APPWRITE_COLLECTION_ID,
        queries
      );
      if (posts) {
        return posts;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: getAllPosts :: error: " + error);
    }
  }
}

const databaseConfigService = new DatabaseConfigService();

export default databaseConfigService;
