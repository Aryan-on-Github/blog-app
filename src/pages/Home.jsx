import { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container , PostCard } from "../components";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom"; // to access context passed via Outlet
import './PostsStyling.css'

function Home()
{
    const [posts,setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const { appLoading } = useOutletContext(); // get appLoading from App
    const [loadingPosts, setLoadingPosts] = useState(false); // track posts loading

    useEffect(() => { //load all the posts 
        if (!userData || !userData.$id) {
        return;
        }
        const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        console.log("userData in Home:", userData);
        const res = await appwriteService.getUserPosts(userData.$id);
        console.log("Fetched posts:", res);
        if (res && res.rows) setPosts(res.rows);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
    } , [userData]);

    if (appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading user info...
      </div>
    );
  }

  //2️⃣ Wait for posts if userData exists but posts are loading
  if (loadingPosts) {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <div className="w-full text-center py-20 text-white font-bold text-xl">
            Loading posts...
          </div>
        </div>
      </div>
    );
  }
  
    if(!posts || posts.length === 0) // if no post exists , then display a message
    {
        return(
        <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // else if they exist, show all the post by looping through posts array
    return (
  <div className="w-full py-8">
    <Container>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.$id} className="post-card">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
);
}

export default Home;