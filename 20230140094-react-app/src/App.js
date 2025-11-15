import React, { useEffect, useState } from 'react';

const appStyle = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: 'center',
  padding: '40px',
  backgroundColor: '#f4f7f6', 
  minHeight: '100vh',
};

const cardStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  backgroundColor: '#ffffff',
  marginBottom: '30px',
};

function App() {
  const [message, setMessage] = useState('Memuat pesan...');

  useEffect(() => {
   
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        
        if (!response.ok) {
          throw new Error(`Server merespon dengan status ${response.status}`);
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
        setMessage('Gagal terhubung ke server. Pastikan Node.js berjalan di port 5000.');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div style={appStyle}>
      <header>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Integrasi React & Node.js</h1>
      </header>
      
      {}
      <div style={cardStyle}>
        <h2 style={{ color: '#007bff', marginBottom: '15px' }}>Status Koneksi Server</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#555' }}>
          Pesan dari server: <span style={{ color: message.includes('Gagal') ? 'red' : 'green' }}>{message}</span>
        </p>
      </div>
      
      <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #ccc' }} />
      
      {}
      <HelloNama />
    </div>
  );
}

//comment
const helloNamaCardStyle = {
  ...cardStyle, 
  backgroundColor: '#e6f7ff', 
  border: '1px solid #91d5ff',
  padding: '40px 20px',
};

const inputStyle = {
  padding: '12px 15px',
  fontSize: '18px',
  borderRadius: '8px',
  border: '2px solid #007bff',
  marginTop: '15px',
  width: '80%',
  maxWidth: '300px',
  textAlign: 'center',
  boxSizing: 'border-box',
};

function HelloNama() {
  const [name, setName] = useState('');
  
  
  const greeting = name.trim() ? name : 'dunia';
  
  return (
    <div style={helloNamaCardStyle}>
      <h2 style={{ color: '#0056b3', fontSize: '2em', marginBottom: '20px' }}>
        Halo, <span style={{ color: name.trim() ? '#d9534f' : '#888' }}>{greeting}!</span>
      </h2>
      <input
        type="text"
        placeholder="Masukkan nama Anda di sini..."
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
      />
      <p style={{ marginTop: '10px', color: '#666' }}>Coba ketik nama Anda di atas.</p>
    </div>
  );
}

export default App;