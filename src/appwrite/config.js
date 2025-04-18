import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

class AppwriteService {
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title,  content, featuredImage, status, userId }) {
    if (!featuredImage) {
        throw new Error("Missing required attribute: featuredImage");
      }
    
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId, // Updated to use the corrected attribute name
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error);
      throw error;
    }
  }

  async updatePost(documentId, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId, // Updated to use the corrected attribute name
        documentId,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId); // Updated to use the corrected attribute name
      return true;
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId); // Updated to use the corrected attribute name
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries); // Updated to use the corrected attribute name
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error', error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error', error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;