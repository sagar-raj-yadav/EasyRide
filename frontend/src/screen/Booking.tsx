import {useContext} from 'react'
import { context } from '../Context/Api';

const Booking = () => {

    const { bookedData } = useContext(context);



    return (
        <div style={styles.scrollContainer}>
          {bookedData.map((booking, index) => {
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
                    <span style={styles.value}>{booking.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  )
}


const styles = {
    scrollContainer: {
      padding: 6,
      maxWidth: "700px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#fff",
      padding: 16,
      border: "1px solid #e0e0e0",
      borderRadius: 12,
      marginBottom: 20,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    cardTop: {
      marginBottom: 1,
    },
    busName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
    },
    routeRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: 6,
    },
    city: {
      fontSize: 16,
      color: "#444",
    },
    arrow: {
      margin: "0 10px",
      fontSize: 18,
      color: "#888",
    },
    time: {
      fontSize: 14,
      color: "#555",
    },
    bookedDate: {
      fontSize: 12,
      color: "#999",
    },
    cardBottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    id: {
      fontSize: 14,
      fontWeight: 600,
      color: "#555",
    },
    status: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 5,
      color: "#444",
    },
    value: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#2ecc71",
    },
  };

  
export default Booking