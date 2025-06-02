import { useContext } from 'react';
import { context } from '../Context/Api';
import { Link } from 'react-router-dom';

const Booking = () => {
  const { bookedData } = useContext(context);
  const token = localStorage.getItem('token');

  return (
    <div style={styles.scrollContainer}>
      {token ? (

        bookedData.length===0 ?(
      
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      flexDirection: 'column',
      color: '#555',
      fontSize: '18px',
      textAlign: 'center',
      opacity: 0.8,
    }}>
      <img 
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
        alt="No Data" 
        style={{ width: '100px', marginBottom: '20px', opacity: 0.6 }}
      />
  <p style={{ margin: 0 }}>No bookings found yet.</p>
      <p style={{ marginTop: '5px' }}>Please make a booking to see it here.</p>    </div>
        ):(
         bookedData.map((booking, index) => {
          const date = new Date(booking.createdAt);
          const formattedDate = date.toLocaleString();

          return (
            <div style={styles.card} key={index}>
              <div style={styles.cardTop}>
                <h3 style={styles.busName}>{booking.bus_name} (03326)</h3>
                <div style={styles.routeRow}>
                  <span style={styles.city}>{booking.source_city}</span>
                  <span style={styles.arrow}>→</span>
                  <span style={styles.city}>{booking.destination_city}</span>
                </div>
                <p style={styles.time}>
                  {booking.start_time} - {booking.end_time}
                </p>
                <p style={styles.bookedDate}>Booked on: {formattedDate}</p>
              </div>
              <div style={styles.cardBottom}>
                <span style={styles.id}>ID: {booking.id}</span>
                <div style={styles.status}>
                  <span style={styles.label}>STATUS:</span>
                  <span style={{ fontSize: 14, fontWeight: 'bold', color: '#333', textTransform: 'uppercase' }}>
                  {booking.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })
)) : (
       <div style={styles.loginContainer}>
  <p style={styles.loginMessage}>Please log in to view your bookings.</p>
  <Link to="/login" style={styles.loginButton}>
    Go to Login
  </Link>
</div>

      )}
    </div>
  );
};

const styles = {
  scrollContainer: {
    padding: 20,
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    border: '1px solid #e0e0e0',
    borderRadius: 16,
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  },
  cardTop: {
    marginBottom: 16,
  },
  busName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  routeRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  city: {
    fontSize: 18,
    fontWeight: 500,
    color: '#34495e',
  },
  arrow: {
    margin: '0 12px',
    fontSize: 18,
    color: '#888',
  },
  time: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  bookedDate: {
    fontSize: 14,
    color: '#999',
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    fontSize: 16,
    fontWeight: 600,
    color: '#2980b9',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#444',
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#27ae60',
    textTransform: 'uppercase',
  },
 loginContainer: {
    textAlign: 'center',
    marginTop: 100,
    padding: '40px 30px',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  } as React.CSSProperties,

  loginMessage: {
    fontSize: 20,
    marginBottom: 24,
    color: '#333',
    fontWeight: 500,
  } as React.CSSProperties,

  loginButton: {
    display: 'inline-block',
    padding: '12px 28px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
  } as React.CSSProperties,
};

export default Booking;
