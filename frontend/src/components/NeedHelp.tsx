import React, { useState } from 'react';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  maxWidth: '500px',
  width: '100%'
};

const headingStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '10px',
  textAlign: 'center'
};

const labelStyle: React.CSSProperties = {
  marginTop: '15px',
  fontSize: '14px',
  fontWeight: 'bold'
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  marginTop: '5px',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: '100px',
  resize: 'none'
};

const buttonStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '12px',
  width: '100%',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#007BFF',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer'
};

const NeedHelp: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert("Thank you! We'll get back to you soon.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Need Help?</h1>
        <p style={{ textAlign: 'center', color: '#555' }}>
          Fill the form below and we'll get back to you within 24 hours.
        </p>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Name</label>
          <input
            style={inputStyle}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label style={labelStyle}>Message</label>
          <textarea
            style={textareaStyle}
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NeedHelp;
