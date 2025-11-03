import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import './PostsStyling.css'

function AllPosts()
{
 const [posts,setPosts] = useState([]);

 useEffect(() => {
    appwriteService.getRequiredPosts([])
    .then((posts) => {
        if(posts && Array.isArray(posts.rows))
        {
            setPosts(posts.rows)
        }
        else
        {
            setPosts([]);
        }
    })
 },[])

 return ( 
    // loop over posts array and pass each post and its properties like id, title, featuredImage to PostCard component by spreading (...) post else return no posts
    <div className="w-full py-8">
      <Container>
        <div className="posts-container">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="post-card">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center w-full">No posts available</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;