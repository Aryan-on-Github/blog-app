import { useState,useEffect } from "react";
import { Container,PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate , useParams } from "react-router-dom";

function EditPost()
{
    const [post,setPost] = useState(null);
    const {slug} = useParams(); // a webpage is something like "posts/:post123" then it extracts post123 from it
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) //
        {
            appwriteService.getPost(slug) // if slug exists, then get the post based on slug
            .then((post) => {
                if(post)
                {
                    setPost(post)
                }
            })
        }
        else
        {
            navigate("/"); // else navigate user to home
        }
    },[slug,navigate])

    return post ?  //if post exists return post
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    : null // else return null
}

export default EditPost;

