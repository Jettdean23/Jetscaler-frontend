
import React, { useState } from 'react';

export default function JetScaler() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  const generateContent = async () => {
    try {
      const response = await fetch('https://ai-backend-pdc2.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, description })
      });
      const data = await response.json();
      setCaption(data.caption);
      setHashtags(data.hashtags);
      setThumbnail(data.thumbnail);
      setError('');
    } catch (err) {
      setError('Error generating content.');
    }
  };

  return (
    <div className="app-container">
      <h1>JetScaler</h1>
      <input placeholder="Video Topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <input placeholder="Platform" value={platform} onChange={e => setPlatform(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button onClick={generateContent}>Generate Content</button>
      <div>
        <p><strong>Caption:</strong> {error ? error : caption}</p>
        <p><strong>Hashtags:</strong> {hashtags.join(' ')}</p>
        <p><strong>Thumbnail:</strong></p>
        <img src={thumbnail} alt="Thumbnail" />
      </div>
    </div>
  );
}
