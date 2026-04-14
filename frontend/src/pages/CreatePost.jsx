import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postsAPI.create({
        title,
        content,
        author: "Guest"
      });
      navigate(`/posts/${data.id}`);
    } catch (err) {
      setError('Failed to publish post');
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">

        <h1 className="create-title">✍️ Write a New Story</h1>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">

          <input
            type="text"
            placeholder="Give your story a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
            required
          />

          <textarea
            placeholder="Write your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-content"
            rows="12"
            required
          />

          <button type="submit" className="publish-btn">
            🚀 Publish
          </button>

        </form>
      </div>
    </div>
  );
}