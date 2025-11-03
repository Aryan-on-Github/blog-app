import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite";

export class AuthService{
    client = new Client(); //instance of client from appwrite
    account; // will hold instance of account from appwrite

    constructor(){ //constructor set client values directly whenever authService is called

        //this is boiler plate code (from documentation)
        this.client
        .setEndpoint(conf.appwriteURL) //where server lives
        .setProject(conf.projectID); //tells what project

        this.account = new Account(this.client) //initialize account based on client values
    }

      // The methods we define here (register, login, logout, etc.) 
     // are independent of the backend provider (Appwrite, Firebase, Supabase, etc.).
    // If we switch providers, we only need to update the implementation details 
   // inside this service (like client setup, env variables, and SDK method calls).
  // The rest of the app can keep calling these same methods without changes.

  //i.e. if there are any changes related to authorization services, they would be done directlly here instead of sperately doing it everywhere in app if they are declared there.
  // bcz at end, the app will call authService.logIn,authService.register,authService.logOut only
  // it wont care what happend sin these methods

    //creating/registering user
    //boiler plate (from documentation)
    async register({email,password,name}){
        
        try{
            //depriciated
            const userAccount = await this.account.create(ID.unique(),email,password,name);
//             const userAccount = await this.databases.createDocument({
//                     databaseId: "68b7db180006cf77818d",
//                     collectionId: "users",
//                     documentId: ID.unique(),
//                     data: {
//                         email,
//                         name
//                         }
// });
            if(userAccount)
            {
              // if user account already exists 
              //call another method(function) to logIn directly
              return this.logIn({email,password})

            }
            else
            {
              return userAccount;
            }
        }
        catch(error){
           throw error;
        }
    }

    // logIn user
    //boiler plate code from documentation
    async logIn({email,password})
    {
        try{
           return await this.account.createEmailPasswordSession({email,password});
        }
        catch(error){
           throw error;
        }
    }

    //check if current user is logged in or not
    async currentUser(){
        try{
           return await this.account.get(); //fetches account for us (boilerplate)
        }
        catch(error)
        {
            console.log("User is not logged in...",error);
            return null; // if user isnt loggedIn i.e. doesnt get any user from .get() thus we return null in that case
        } 
        }

    //logOut
    async logOut(){
        try{
            await this.account.deleteSessions(); //deletes all session of user from all devices
            // use deleteSession() to only logOut from current device
        }
        catch(error){
            console.log("error : ",error);
            
        }
    }
}

const authService = new AuthService(); //instance of object to use class

export default authService;