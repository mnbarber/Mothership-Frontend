import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as postService from '../../services/postService';
import CommentForm from "../CommentForm/CommentForm";
import { UserContext } from "../../contexts/UserContext";
import styles from './PostDetails.module.css';

const PostDetails = (props) => {
    const { postId } = useParams();
    const { user } = useContext(UserContext);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId);
            setPost(postData);
        };
        fetchPost();
    }, [postId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await postService.createComment(postId, commentFormData);
        setPost({ ...post, comments: [...post.comments, newComment] });
    };

    const handleDeleteComment = async (commentId) => {
        await postService.deleteComment(postId, commentId);
        setPost({
            ...post,
            comments: post.comments.filter((comment) => comment._id !== commentId),
        });
    };

    if(!post) return <main>Loading...</main>
    return (
        <main className={styles.container}>
            <section>
                <header>
                    <h1>{post.title}</h1>
                    <div>
                    <p>
                        {`${post.author.username} posted on ${new Date(post.createdAt).toLocaleDateString()}`}
                    </p>
                    {post.author._id === user._id && (
                        <>
                            <Link to={`/posts/${postId}/edit`}>EDIT</Link>
                            <button onClick={() => props.handleDeletePost(postId)}>DELETE</button>
                        </>
                    )}
                    </div>
                </header>
                <p>{post.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                <CommentForm handleAddComment={handleAddComment}/>

                {!post.comments.length && <p>There are no comments yet!</p>}

                {post.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <div>
                                {comment.author._id === user._id && (
                                    <>
                                        <Link to={`/posts/${postId}/comments/${comment._id}/edit`}>EDIT</Link>
                                        <button onClick={() => handleDeleteComment(comment._id)}>DELETE</button>
                                    </>
                                )} 
                            </div>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default PostDetails;