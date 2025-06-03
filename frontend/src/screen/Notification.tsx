import React, { useEffect, useState } from "react";
import { FaBellSlash } from "react-icons/fa";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://booking-notification-kut9.onrender.com", {
  transports: ["websocket"],
});

interface NotificationData {
  userName?: string;
  busName?: string;
  startTime?: string;
  [key: string]: any;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Fetch existing notifications from backend on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://booking-notification-kut9.onrender.com/notifications");
        setNotifications(res.data.reverse()); // latest at bottom
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    // Setup socket listeners
    socket.on("connect", () => {
      console.log("✅ Connected to socket server with ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("booking_notification", (data) => {
      console.log("📨 Received Notification:", data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("booking_notification");
      socket.off("connect");
    };
  }, []);


  const mytoken=localStorage.getItem("token")

  return (
    <div style={styles.screen}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>
      </div>

     {
  !mytoken && (
        <div style={styles.noNotifications}>
      <FaBellSlash size={60} color="#bbb" style={styles.icon} />
      <p style={styles.message}>You have no notifications at the moment.</p>
      <p style={styles.message}>Please log in to continue.</p>
    </div>
  )
}

 
     {mytoken && (
      notifications.length === 0 ? (
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
        <span style={styles.timeStamp}>{item.startTime}</span>
      </div>
      
      <div style={styles.notificationContent}>
  {item?.userName && item?.busName ? (
    <>
      <div><p style={{color:"green"}}>{item.userName} booked {item.busName} Bus.</p></div>
      <p>status :<span style={{color:"orange"}}>{item.status} </span>  </p>
      <div style={{ fontSize: '12px', color: '#555' }}>{item.message}</div>
    </>
  ) : (
    JSON.stringify(item)
  )}
</div>

    </div>
  ))}
</div>

      )
    )}
    </div>
  );
};

export default NotificationScreen;

// Styling (same as before)
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
    width:"95vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#0078d4 transparent",
  },
  notificationBox: {
    backgroundColor: "#fff",
    marginBottom: "5px",
    padding: "8px 10px",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    textAlign: "left" as const,
    fontSize: "18px",
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
