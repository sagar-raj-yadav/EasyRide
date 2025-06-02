import React, { useEffect, useState } from "react";
import { FaBellSlash } from "react-icons/fa";
import io from "socket.io-client";

// Connect to backend socket server (adjust URL as needed)
const socket = io("http://localhost:5008"); // backend notification service port

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Listen to 'booking_notification' event
    socket.on("booking_notification", (data) => {
      console.log("Received Notification:", data);
      setNotifications((prev) => [...prev, data]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("booking_notification");
    };
  }, []);



  return (
    <div style={styles.screen}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <div style={styles.noNotifications}>
          <FaBellSlash size={60} color="#bbb" style={styles.icon} />
          <p style={styles.message}>You have no notifications at the moment.</p>
          <p style={{ ...styles.message, fontStyle: "italic", color: "#999" }}>
            Stay tuned for updates!
          </p>
        </div>
      ) : (
       <div style={styles.notificationsList}>
 {notifications.map((item, index) => (
  <div key={index} style={styles.notificationBox}>
    <div style={styles.notificationHeader}>
      <span style={styles.iconDot} />
      <strong style={styles.notificationTitle}>New Booking</strong>
      <span style={styles.timeStamp}>{item.start_time}</span>
    </div>
    <div style={styles.notificationContent}>
      {item?.user
        ? `${item.user} booked ${item.bus}`
        : JSON.stringify(item)}
    </div>
  </div>
))}

</div>

      )}
    </div>
  );
};

export default NotificationScreen;

const styles = {
  screen: {
    padding: "30px",
    width: "100%",
    height: "100vh",
    backgroundColor: "#e5e8eb",
    borderRadius: "12px",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    paddingTop: "100px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    margin: "0",
    fontSize: "28px",
    color: "#222",
    width: "100%",
    textAlign: "center" as const,
    letterSpacing: "1.5px",
    fontWeight: 700,
  },
  noNotifications: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "60px 20px",
    color: "#666",
    width: "100%",
    userSelect: "none",
    animation: "fadeIn 0.8s ease forwards",
  },
  icon: {
    marginBottom: "25px",
    transition: "color 0.3s ease",
  },
  message: {
    marginTop: "12px",
    fontSize: "20px",
    fontWeight: "500",
  },
  notificationsList: {
    padding: "20px",
    maxHeight: "60vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#0078d4 transparent",
  },
  notificationBox: {
    backgroundColor: "#fff",
    marginBottom: "15px",
    padding: "18px 20px",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    textAlign: "left" as const,
    fontSize: "16px",
    color: "#333",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    cursor: "default",
  },
  notificationBoxHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
  },

  notificationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  iconDot: {
    width: "12px",
    height: "12px",
    backgroundColor: "#0078d4",
    borderRadius: "50%",
    marginRight: "10px",
  },

  notificationTitle: {
    fontWeight: 700,
    color: "#0078d4",
    flexGrow: 1,
  },

  timeStamp: {
    fontSize: "12px",
    color: "#999",
    fontStyle: "italic",
    whiteSpace: "nowrap",
  },

  notificationContent: {
    fontWeight: 500,
    color: "#555",
  },
} as const;
