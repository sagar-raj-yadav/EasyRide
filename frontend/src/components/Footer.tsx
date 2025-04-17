
const AbhiBusComponent = () => {
 
  const assuredBenefits = [
    { icon: "🚌", text: "Upto 150% Refund On Bus Cancellation" },
    { icon: "🔧", text: "Upto 100% Refund for Bad Service Quality" },
    { icon: "⏰", text: "Upto 100% Refund For Bus Delays" },
    { icon: "🔁", text: "100% Refund If You Change Plans" },
  ];

  const highlightItems = [
    {
      icon: "🗺️",
      title: "3,50,000+ Bus Routes",
      subtitle: "offering unparalleled choices for your travel needs",
    },
    {
      icon: "🚌",
      title: "4000+ Bus Partners",
      subtitle: "ranging from State RTCs to private partners",
    },
    {
      icon: "⚡",
      title: "Fastest Bus Booking",
      subtitle: "swift and seamless bus ticket booking experience",
    },
    {
      icon: "📞",
      title: "24/7 Customer Support",
      subtitle: "available for all your bus needs",
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Why Choose AbhiBus for Bus Ticket Booking ?</h2>
      <p style={styles.subHeading}>
        AbhiBus is India’s fastest growing online ticket booking platform... over
        4000+ private bus partners covering more than 3,50,000 bus routes
      </p>

      <div style={styles.highlightContainer}>
        {highlightItems.map((item, idx) => (
          <div key={idx} style={styles.highlightItem}>
            <div style={styles.icon}>{item.icon}</div>
            <h4 style={styles.title}>{item.title}</h4>
            <p style={styles.subtitle}>{item.subtitle}</p>
          </div>
        ))}
      </div>

     

      <div style={styles.assuredSection}>
        <div style={styles.assuredBadge}>Abhi Assured</div>
        <div style={styles.assuredBenefits}>
          {assuredBenefits.map((benefit, idx) => (
            <div key={idx} style={styles.benefitItem}>
              <div style={styles.icon}>{benefit.icon}</div>
              <p style={styles.benefitText}>{benefit.text}</p>
            </div>
          ))}
        </div>
        <button style={styles.knowMoreBtn}>Know more </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: 20,
    margin: "0 auto",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 16,
    margin: "20px 0",
  },
  highlightContainer: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: 20,
    justifyContent: "space-between" ,
  },
  highlightItem: {
    flex: "1 1 200px",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    textAlign: "center" as const,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  partnerContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
  partnerCard: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 10,
    width: 180,
    textAlign: "center",
  },
  partnerLogoPlaceholder: {
    backgroundColor: "#eee",
    height: 60,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  partnerDesc: {
    fontSize: 14,
  },
  assuredSection: {
    backgroundColor: "#eef8ff",
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    textAlign: "center" as const,
  },
  assuredBadge: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 15px",
    borderRadius: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  assuredBenefits: {
    display: "flex" ,
    flexWrap: "wrap" as const,
    gap: 20,
    justifyContent: "center",
  },
  benefitItem: {
    width: 200,
    textAlign: "center" as const,
  },
  benefitText: {
    fontSize: 14,
    marginTop: 10,
  },
  knowMoreBtn: {
    marginTop: 20,
    backgroundColor: "#f25b5b",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default AbhiBusComponent;
