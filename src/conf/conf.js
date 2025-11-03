const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    projectID : String(import.meta.env.VITE_PROJECT_ID),
    databaseID : String(import.meta.env.VITE_DATABASE_ID),
    collectionID : String(import.meta.env.VITE_COLLECTION_ID),
    bucketID: String(import.meta.env.VITE_BUCKET_ID),
    tinyMceKey : String(import.meta.env.VITE_TINYMCE_KEY),
}

export default conf;