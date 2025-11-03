import conf from "../conf/conf";
import {Client,TablesDB,Storage,Query,ID} from "appwrite";
//tablesDB instead of Databases bcz it has been depriciated

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectID);

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    //create a Post
    //older method used in cac depriciated. this is new way
    async createPost({title,slug,content,featuredImage,status,userId}){ //slug is unique identifier for each post (that will be name-of-doc-in-this-format whihc we will define later)
        try {
            return await this.databases.createRow({
                databaseId : conf.databaseID,
                tableId : conf.collectionID,
                rowId : slug,
                data : {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            console.log("Error : ",error);    
        }
    }


    //update a existing post
    async updatePost(slug,{title,content,featuredImage,status,userId}){ //slug tells which row to update as it is our rowId
        try {
            return await this.databases.updateRow({

            databaseId : conf.databaseID,
                tableId : conf.collectionID,
                rowId : slug,
                data : { //fields you want to update
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            })
        } catch (error) {
            console.log("error : ",error);
            
        }
    }


    // delete post 
    async deletePost(slug){

        try {
           await this.databases.deleteRow({

                databaseId : conf.databaseID,
                tableId : conf.collectionID,
                rowId : slug,
           }) 
           return true //if successfully deleted
        } catch (error) {
            console.log("error : ",error);    
        }
        return false; //if any error while deleting
    }

    // get a post
    async getPost(slug){

        try {
            return await this.databases.getRow({
               databaseId : conf.databaseID,
               tableId : conf.collectionID,
               rowId : slug, 
            })
            
        } catch (error) {
            console.log("error",error);
            return false;
            
        }
    }

    // get all/list of posts 
    // here we are querying for only active posts
    async getRequiredPosts(queries = [Query.equal("status","active")]){ //"status is a key/index we created in appWrite server" and active is its value

        try {
            
            return await this.databases.listRows({
               databaseId : conf.databaseID,
               tableId : conf.collectionID,
               queries,
            })

        } catch (error) {
            console.log("error : ",error);
            return false;
        }
    }

    // get posts created by user only
    async getUserPosts(userId)
    {
        try {
            return await this.databases.listRows({
                databaseId : conf.databaseID,
               tableId : conf.collectionID,
               queries : [Query.equal("userId", userId)]
            })
            
        } catch (error) {
            console.log("Error fetching posts from user");
            return false;
        }
    }

    // file(image) upload service
    async uploadFile(file){
        try {
            
            return await this.bucket.createFile({
                bucketId : conf.bucketID,
                fileId : ID.unique(),
                file : file
            })

        } catch (error) {
            console.log("error : ",error);
            return false;
        }
    }

    // delete file service
    async deleteFile(fileID){
        try {
             await this.bucket.deleteFile({
                bucketId : conf.bucketID,
                fileId : fileID,
            }
            )
            return true;    
        } 
        catch (error) {
            console.log("error : ",error);
            return false;
        }
    }

    // preview a file service
    async getFilePreview(fileID){
       return this.bucket.getFilePreview({

            bucketId : conf.bucketID,
            fileId : fileID,
       })
    }

    //get image service
    getFileView(fileId) {

      return this.bucket.getFileView(conf.bucketID, fileId);
    }

    // getFileView(fileId) {
    //   return this.bucket.getFileView({
    //    bucketId: conf.bucketID,
    //    fileId
    // });
    // }


}

const service = new Service();
export default service;