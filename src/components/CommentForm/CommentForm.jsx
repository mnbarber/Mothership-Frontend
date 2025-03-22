import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import * as postService from '../../services/postService';
import styles from './CommentForm.module.css';

const CommentForm = (props) => {
    const navigate = useNavigate();
    const { postId, commentId } = useParams();
    const [formData, setFormData] = useState({ text: '' });

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await postService.show(postId);
            setFormData(postData.comments.find((comment) => comment._id === commentId));
        };
        if(postId && commentId) fetchPost();
    }, [postId, commentId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(postId && commentId) {
            postService.updateComment(postId, commentId, formData);
            navigate(`/posts/${postId}`);
        } else {
            props.handleAddComment(formData);
        }
        setFormData({ text: '' });
    };

    if (postId && commentId) return (
        <main className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h1>Edit Comment</h1>
            <label htmlFor='text-input'>Your comment:</label>
            <textarea
              required
              type='text'
              name='text'
              id='text-input'
              value={formData.text}
              onChange={handleChange}
            />
            <button type='submit'>SUBMIT</button>
          </form>
        </main>
      );

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
                required
                type='text'
                name='text'
                id='text-input'
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default CommentForm;