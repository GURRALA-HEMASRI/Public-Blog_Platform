import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);

  const fetchPosts = useCallback(async (searchQuery = '') => {
    try {
      setLoading(true);
      setError('');
      const params = searchQuery ? { search: searchQuery } : {};
      const { data } = await postsAPI.getAll(params);
      setPosts(data.results || data);
      setNextPage(data.next || null);
    } catch {
      setError('Failed to load posts. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(query); }, [query, fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div className="page home-page">
      <header className="hero">
        <h1 className="hero-title">Stories worth <em>reading</em></h1>
        <p className="hero-sub">Thoughts, ideas, and perspectives from writers around the world.</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary">Search</button>
          {query && <button type="button" className="btn btn-ghost" onClick={() => { setSearch(''); setQuery(''); }}>Clear</button>}
        </form>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="posts-grid loading-grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="post-card skeleton" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts found. {query ? 'Try a different search.' : 'Be the first to write!'}</p>
          <Link to="/create" className="btn btn-primary">Write a Post</Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <article key={post.id} className="post-card">
              {post.image_url && (
                <div className="post-card-image">
                  <img src={post.image_url} alt={post.title} />
                </div>
              )}
              <div className="post-card-body">
                <div className="post-meta">
                  <span className="post-author">{post.author?.username}</span>
                  <span className="post-date">{formatDate(post.created_at)}</span>
                </div>
                <h2 className="post-title">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link to={`/posts/${post.id}`} className="read-more">Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}