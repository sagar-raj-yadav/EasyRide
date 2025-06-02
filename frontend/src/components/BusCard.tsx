import {useEffect,useState} from 'react';

interface BusCardProps {
    companyName: string;
    busType: string;
    departureTime: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCity: string;
    duration: string;
    price: number;
    rating: number;
    seatsAvailable: number;
    isAbhiAssured: boolean;
    imageUrl: string;
    onPress:()=>void;
  }
  

const BusCard: React.FC<BusCardProps> = ({
  companyName,
  busType,
  departureTime,
  departureCity,
  arrivalTime,
  arrivalCity,
  duration,
  price,
  rating,
  seatsAvailable,
  isAbhiAssured,
  onPress
}) => {


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  return (
    <div style={styles.card}>
      {/* 🖼️ Image Section */}
      {!isMobile && (
      <div style={styles.imageContainer}>
        <img src="buslogologin.png" alt={companyName} style={styles.image} />
      </div>
      )}
      {/* 📝 Bus Details Section */}
      <div style={styles.detailsSection}>
        <div style={styles.leftSection}>
          {isAbhiAssured && (
            <div style={styles.abhiAssured}>
              <img
                src="buslogologin.png"
                alt="Abhi Assured"
                height={20}
              />
            </div>
          )}
          <h3 style={styles.company}>{companyName}</h3>
          <p style={styles.busType}>{busType}</p>
          <div style={styles.liveTracking}>
          <span style={styles.ratingBox}>
              {rating.toFixed(1)} <span style={{ color: '#fff' }}>★</span>
            </span>
          </div>

         </div>

        <div style={styles.middleSection}>
          <div style={styles.timeRow}>
            <strong>{departureTime} -</strong>
            <span> {departureCity}</span>
          </div>
          <div style={styles.duration}>
            <span> {duration}</span>
          </div>
          <div style={styles.timeRow}>
            <strong> {arrivalTime} -</strong>
            <span> {arrivalCity}</span>
          </div>
        </div>

        <div style={styles.rightSection}>
          <p style={styles.price}>Starts at ₹{price.toLocaleString()}</p>
          <button 
          onClick={onPress}
          style={styles.button}>Select Seats</button>
          <p style={styles.seatText}>{seatsAvailable} Seats Available</p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // allows responsive stacking
    padding: '10px 15px',
    margin: '2px auto',
    borderRadius: '8px',
    backgroundColor:"rgba(243, 249, 224, 0.78)",
    border: '1px solid #eee',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    gap: '10px',
    width:"90%"
  },  
  imageContainer: {
    width: '120px',
    marginRight: '26px',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '6px',
  },
  detailsSection: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 6,
  },
  abhiAssured: {
    display: 'inline-block',
    backgroundColor: '#e8f3ff',
    padding: '2px 8px',
    borderRadius: 5,
    width: 'fit-content',
  },
  company: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 600,
  },
  busType: {
    color: '#555',
    margin: 0,
    fontSize: '0.9rem',
  },
  liveTracking: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#333',
  },
  ratingSection: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingBox: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '2px 6px',
    borderRadius: 4,
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  middleSection: {
    flex: 1,
    textAlign: 'center',
  },
  timeRow: {
    margin: '4px 0',
  },
  duration: {
    margin: '6px auto',
    padding: '4px 10px',
    border: '1px solid #ccc',
    borderRadius: 20,
    fontSize: '0.85rem',
    color: '#777',
    width: 'fit-content',
  },
  rightSection: {
    textAlign: 'right',
    flex: 1,
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '4px 0',
    color: '#333',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#E53935',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: 'pointer',
  },
  seatText: {
    fontSize: '0.85rem',
    marginTop: 4,
    color: '#555',
  },
};

export default BusCard;
