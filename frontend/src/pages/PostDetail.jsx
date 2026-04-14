import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    postsAPI.getById(id)
      .then(({ data }) => setPost(data))
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      setDeleting(true);
      await postsAPI.delete(id);
      navigate('/');
    } catch {
      setError('Failed to delete post.');
      setDeleting(false);
    }
  };

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  if (loading) return <div className="page-loading"><div className="spinner" /></div>;
  if (error) return <div className="page"><div className="alert alert-error">{error}</div><Link to="/">← Back</Link></div>;

  const isAuthor = user?.id === post?.author?.id;

  return (
    <div className="post-detail-page">
      <article className="post-article">
        <header className="article-header">
          {isAuthor && (
            <div className="author-actions">
              <Link to={`/edit/${post.id}`} className="btn btn-ghost btn-sm">Edit</Link>
              <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span className="article-author">By <strong>{post.author?.username}</strong></span>
            <span className="article-date">{formatDate(post.created_at)}</span>
            {post.updated_at !== post.created_at && (
              <span className="article-updated">Updated {formatDate(post.updated_at)}</span>
            )}
          </div>
        </header>
        {post.image_url && (
          <div className="article-cover">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}
        <div className="article-body">
          {post.content.split('\n').map((p, i) => p ? <p key={i}>{p}</p> : <br key={i} />)}
        </div>
        <footer className="article-footer">
          <Link to="/" className="btn btn-ghost">← All Stories</Link>
        </footer>
      </article>
    </div>
  );
}