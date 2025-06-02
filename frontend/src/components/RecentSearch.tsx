import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this

interface SearchData {
  from: string;
  to: string;
  date: string;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const today = new Date();

const recentSearches: SearchData[] = [
  { from: 'Rishikesh', to: 'Haridwar', date: formatDate(today) },
  { from: 'Madurai', to: 'Chennai', date: formatDate(new Date(today.getTime() + 1 * 86400000)) },
  { from: 'Kochi', to: 'Trivandrum', date: formatDate(new Date(today.getTime() + 2 * 86400000)) },
  { from: 'Kolkata', to: 'Ranchi', date: formatDate(new Date(today.getTime() + 3 * 86400000)) },
  { from: 'Patna', to: 'Dhanbad', date: formatDate(new Date(today.getTime() + 4 * 86400000)) },
];

const RecentSearch: React.FC = () => {
  const navigate = useNavigate(); // ✅

  const handleCardClick = (from: string, to: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append("from", from);
    queryParams.append("to", to);
    navigate(`/allbus?${queryParams.toString()}`);
  };


  const [fontSize, setFontSize] = useState(getFontSize());

  function getFontSize() {
    if (window.innerWidth < 500) return '14px';
    if (window.innerWidth < 768) return '14px';
    return '24px';
  }

  useEffect(() => {
    const handleResize = () => {
      setFontSize(getFontSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomImage = (index: number) => {
    if (index === 1) return "buslogologin.png";
    else
    if (index === 2) return "bus.png";
    else
    if (index === 3) return "buslogologin.png";
    if (index === 4) return "bus.png";
    if (index === 0) return "bus.png";
  };
  

  return (
    <>
<h2 style={{ ...styles.heading, fontSize }}>🔥 Trending Bus Routes – Book Instantly!</h2>
    

    <div style={styles.container}>


      {recentSearches.map((search, index) => (
        <div
          key={index}
          style={styles.card}
          onClick={() => handleCardClick(search.from, search.to)} // ✅ go to route
        >
    <img src={randomImage(index)} alt="bus" style={styles.image} />
    <div>
            <h3 style={styles.route}>
              <span style={styles.city}>{search.from}</span> →
              <span style={styles.city}> {search.to}</span>
            </h3>
            <p style={styles.date}>📅 {search.date}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex' as const,
    flexWrap: 'wrap' as const,
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  heading: {
    fontWeight: 'bold',
    color: '#ff5c5c',
    marginBottom: '20px',
    textAlign: 'center' as const,
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    letterSpacing: '0.5px',
    background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },    
  card: {
    width: '150px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    padding: '5px',
    textAlign: 'center' as const,
  },
  image: {
    width: '60%',
    height: '55px',
    objectFit: 'cover' as const,
  },
  route: {
    fontSize: '18px',
    marginBottom: '1px',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  date: {
    fontSize: '12px',
    color: '#777',
  },
  city: {
    color: '#1a73e8',
  },
};

export default RecentSearch;
