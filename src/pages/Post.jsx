import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button,Container } from "../components";
import parse from "html-react-parser"
import { useSelector } from "react-redux";

function Post()
{
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false; 
    // if post exists and user is logged in
    // if post author's id matches with user id then set isAuthor = true else false

    // if post exists, load it else navigate to home
    useEffect(() => {
        if(slug) 
        {
            appwriteService.getPost(slug)
            .then((post) => {
                if(post)
                {
                    setPost(post);
                }
                else
                {
                    navigate("/");
                }
            })
        }
    } , [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(slug)
        .then((status)=>{ // status is true/false based on if post was deleted successfully or not
            if(status) // if deleted
            {
                appwriteService.deleteFile(post.featuredImage); // delete images as well
                navigate("/");
            }
        })
    }

    return post ? ( // if post exists, show post content else show(return) null(nothing)
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && ( // if author is viewing post, then give options to 'edit post (which navigates to editPost page)' and 'delete post'
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;

}

export default Post;