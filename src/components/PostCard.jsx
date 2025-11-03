import { Link } from "react-router-dom";
import  appwriteService  from "../appwrite/config";

function PostCard({$id, title, featuredImage}) //$id is id of post, featuredImage is a id of image to be used
{
    
    

    return(
        <Link to={`/post/${$id}`}>
         <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFileView(featuredImage)} alt={title} // pass featuredImage id as parameter
                className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
         </div>
        </Link>
    );
}

export default PostCard;