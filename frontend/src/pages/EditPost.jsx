import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    postsAPI.getById(id).then(({ data }) => {
      if (user && data.author?.id !== user.id) { navigate('/'); return; }
      setForm({ title: data.title, content: data.content });
      if (data.image_url) setPreview(data.image_url);
      setLoading(false);
    }).catch(() => { setError('Post not found.'); setLoading(false); });
  }, [id, user, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = e => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) { setError('Title and content are required.'); return; }
    try {
      setSaving(true); setError('');
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      if (image) fd.append('image', image);
      await postsAPI.update(id, fd);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save changes.');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="page-loading"><div className="spinner" /></div>;

  return (
    <div className="editor-page">
      <div className="editor-container">
        <h1 className="editor-title">Edit Story</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="editor-form">
          <input name="title" type="text" value={form.title} onChange={handleChange}
            placeholder="Your story title..." className="editor-title-input" required />
          <textarea name="content" value={form.content} onChange={handleChange}
            placeholder="Tell your story..." className="editor-content" rows={16} required />
          <div className="editor-actions">
            <div className="image-upload">
              <label htmlFor="image-input" className="btn btn-ghost">
                📷 {preview ? 'Change image' : 'Add cover image'}
              </label>
              <input id="image-input" type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              {preview && <img src={preview} alt="Preview" className="image-preview" />}
            </div>
            <div className="editor-btns">
              <button type="button" className="btn btn-ghost" onClick={() => navigate(`/posts/${id}`)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}