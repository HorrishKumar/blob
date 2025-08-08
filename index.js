import { useState } from 'react';

export default function Home() {
  const [color, setColor] = useState('blue');
  const [accessory, setAccessory] = useState('none');
  const [expression, setExpression] = useState('neutral');
  const [customPrompt, setCustomPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateBlobcat = async () => {
    const prompt = customPrompt || `A cute blobcat in ${color} color with ${accessory}, feeling ${expression}`;
    setLoading(true);
    setImage(null);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Comic Sans MS', textAlign: 'center', padding: '2rem', background: '#fef6f6' }}>
      <h1>Blobcat Builder 🐾</h1>

      <div style={{
        width: 300, height: 300, margin: '1rem auto', backgroundColor: '#fff',
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        border: '1px solid #ccc', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {loading && <span>Generating...</span>}
      </div>

      <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'left' }}>
        <label>Choose Color:</label>
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="pink">Pink</option>
          <option value="gradient">Gradient</option>
          <option value="light blue">Light Blue</option>
        </select>

        <label>Accessory:</label>
        <select value={accessory} onChange={e => setAccessory(e.target.value)}>
          <option value="none">None</option>
          <option value="party hat">Party Hat</option>
          <option value="glasses">Glasses</option>
          <option value="bowtie">Bowtie</option>
        </select>

        <label>Mood:</label>
        <select value={expression} onChange={e => setExpression(e.target.value)}>
          <option value="neutral">Neutral</option>
          <option value="happy">Happy</option>
          <option value="angry">Angry</option>
          <option value="sad">Sad</option>
        </select>

        <label>Or describe your blobcat:</label>
        <input
          style={{ width: '100%', padding: '0.5rem' }}
          type="text"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          placeholder="e.g. A rainbow blobcat with a crown"
        />

        <button style={{
          marginTop: '1.5rem', padding: '0.75rem 1.5rem', fontSize: '1rem',
          backgroundColor: '#5cabff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer'
        }} onClick={generateBlobcat}>
          🎨 Generate My Blobcat
        </button>
      </div>
    </div>
  );
}
