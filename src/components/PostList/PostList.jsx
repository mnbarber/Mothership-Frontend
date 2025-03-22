import { Link } from 'react-router';
import styles from './PostList.module.css';

const PostList = (props) => {
    return (
        <main className={styles.container}>
            {props.posts.map((post) => (
                <Link key={post._id} to={`/posts/${post._id}`}>
                    <article>
                        <header>
                            <h2>{post.title}</h2>
                            <p>
                                {`${post.author.username} posted on ${new Date(post.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{post.text}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default PostList;