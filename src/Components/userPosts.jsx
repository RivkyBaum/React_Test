import axios from "axios"
import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewPost } from "./dialog";
import '../Components/home.css'
export const UserPosts = () => {
    const [posts, setPosts] = useState([]);
    let currentUser = useSelector((myStore) => {
        return myStore.currentUser
    })
    //Receiving the posts from the server by user code
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`);
                setPosts(response.data);
                addNewPost(response.data);
                console.log(posts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [currentUser]);
    //Updating the posts after adding the new post
    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
      };
    
    //Displaying the posts and adding a post button
    return (
        <>
            <div className="post-list">
                <h3>Posts by {currentUser.name}</h3>
                <NewPost addNewPost={addNewPost}></NewPost>
    
                <div className="posts-container">
                    {
                    posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    );
}
