import { Client, ID, Account } from "appwrite";
import configVariables from "../../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    console.log(
      "Appwrite :: AuthService :: constructor" +
        configVariables.VITE_APPWRITE_URL +
        " :: " +
        configVariables.VITE_APPWRITE_PROJECT_ID
    );
    this.client
      .setEndpoint(configVariables.VITE_APPWRITE_URL)
      .setProject(configVariables.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async addAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        console;
        return this.login({ email, password });
      }
    } catch (error) {
      console.log("Appwrite error :: addAccount :: error: " + error, error);
      return {
        status: false,
        data: error.message,
      };
    }
  }

  async login({ email, password }) {
    try {
      const loginResult = await this.account.createEmailSession(
        email,
        password
      );
      return {
        status: true,
        data: loginResult,
      };
    } catch (error) {
      console.log("Appwrite error :: login :: error: " + error);
      return {
        status: false,
        data: error.message,
      };
    }
  }

  async getCurrentUser() {
    try {
      const currentlyLoggedInAccount = await this.account.get();
      if (currentlyLoggedInAccount) {
        return currentlyLoggedInAccount;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite error :: getCurrentUser :: error: " + error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite error :: logout :: error: " + error);
    }
  }
}

const authService = new AuthService();

export default authService;
