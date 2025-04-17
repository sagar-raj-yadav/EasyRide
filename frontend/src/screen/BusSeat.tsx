import {  useState ,useContext} from "react";
import { useParams,useNavigate  } from 'react-router-dom';
import { context } from '../Context/Api';
import axios from 'axios';





const Booking = () => {

  const navigate = useNavigate();

    const { id } = useParams();
    const { allbusData } = useContext(context);
  
    const selectedBus = allbusData.find(bus => bus.id === id);
  


//   const { busDetails } = useContext(context);
  const [PopUpVisible, setPopUpVisible] = useState(false);

  const [row1, setRow1] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      seatno: `A${i + 1}`,
      empty: true,
      selected: false,
    }))
  );

  const [row2, setRow2] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      seatno: `B${i + 1}`,
      empty: true,
      selected: false,
    }))
  );

  const [row3, setRow3] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      seatno: `C${i + 1}`,
      empty: true,
      selected: false,
    }))
  );

  const updateSeatState = (
    index: number,
    row: { seatno: string; empty: boolean; selected: boolean }[],
    setRow: React.Dispatch<React.SetStateAction<{ seatno: string; empty: boolean; selected: boolean }[]>>
  ) => {
    const updated = row.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          selected: !item.selected,
          empty: item.selected,
        };
      }
      return item;
    });
    setRow(updated);
  };

  const getAllSeats = () => {
    return [...row1, ...row2, ...row3].filter((item) => item.selected).length;
  };




  const renderSeat = (
    item: { seatno: string; empty: boolean; selected: boolean },
    index: number,
    row: { seatno: string; empty: boolean; selected: boolean }[],
    setRow: React.Dispatch<React.SetStateAction<{ seatno: string; empty: boolean; selected: boolean }[]>>
  ) => (
    <button
      key={item.seatno}
      style={{ margin: 8, background: 'none', border: 'none', cursor: 'pointer' }}
      onClick={() => {
        if (!item.empty && !item.selected) {
          alert("Seat already reserved");
        } else {
          updateSeatState(index, row, setRow);
        }
      }}
    >
      <img
        src={
          item.empty && !item.selected
            ? "/seatwhite.png" // Image in public folder
            : item.selected
            ? "/seatgreen.png" // Image in public folder
            : "/seatblack.png" // Image in public folder
        }
        alt={item.seatno}
        style={{
          width: 30,
          height: 30,
          filter:
            item.selected
              ? "none" // No filter on selected (seatgreen)
              : !item.empty
              ? "grayscale(100%)" // Grayscale for reserved seats
              : "none", // No filter for empty seats
        }}
      />
    </button>
  );



const convertToDateTime = (timeStr: string) => {
  const today = new Date();
  const [hours, minutesPart] = timeStr.split(':');
  const minutes = parseInt(minutesPart);
  const isPM = timeStr.toLowerCase().includes('pm');

  const hour24 = isPM
    ? (parseInt(hours) % 12) + 12
    : parseInt(hours) % 12;

  today.setHours(hour24);
  today.setMinutes(minutes);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return new Date(today);
};


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};



const saveBookingDetails = async () => {
  const data = {
    name: "sagar raj",
    bus_name: selectedBus?.bus_name,
    type: selectedBus?.type,
    price: Number(selectedBus?.price) * getAllSeats(),
    seat: getAllSeats(),
    star: Number(selectedBus?.star) || 4,
    start_time: convertToDateTime(selectedBus?.start_time || ""),
    end_time: convertToDateTime(selectedBus?.end_time || ""),    
    duration: selectedBus?.duration,
    source_city: selectedBus?.source_city,
    destination_city: selectedBus?.destination_city,
    distance_km: selectedBus?.distance_km || 100,
    date: new Date().toISOString(),
    status: "CONFIRMED",
  };

  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    // Step 1: Create order
    const orderRes = await axios.post("https://bus-booking-microservice.onrender.com/api/payment/createorder", {
      amount: data.price,
    });

    const options = {
      key: "rzp_test_JM6LShfFVZeJ40", // Replace with your Razorpay key_id
      amount: orderRes.data.amount,
      currency: "INR",
      name: "Bus Booking",
      description: "Ticket Booking Transaction",
      order_id: orderRes.data.id,
      handler: async function () {
        // Payment Success
        await axios.post("https://bus-booking-microservice.onrender.com/api/bookseat", data);
        alert("Booking successful!");
      },
      prefill: {
        name: data.name,
        email: "sagar@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Bus booking system",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    navigate("/booking");


  } catch (error) {
    console.error("Error in payment or booking", error);
    alert("Something went wrong");
  }
};






  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 50 }}>
      <div style={{ width: "100%", maxWidth: 800, border: "1px solid #000", borderRadius: 8, padding: 16 }}>
        <img
          src="/stearing.png"
          alt="Steering"
          style={{ width: 34, height: 34, float: "right", marginBottom: 10 }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{row1.map((item, i) => renderSeat(item, i, row1, setRow1))}</div>
          <div>{row2.map((item, i) => renderSeat(item, i, row2, setRow2))}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          {row3.map((item, i) => renderSeat(item, i, row3, setRow3))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/seatwhite.png" alt="Empty" width={25} height={25} />
            <span>Empty</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/seatblack.png"
              alt="Reserved"
              width={25}
              height={25}
              style={{ filter: "grayscale(100%)" }}
            />
            <span>Reserved</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="/seatgreen.png"
              alt="Selected"
              width={25}
              height={25}
              // style={{ filter: "hue-rotate(90deg)" }}
            />
            <span>Selected</span>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h4>{`Selected Seats (${getAllSeats()})`}</h4>
            <button
              onClick={() => setPopUpVisible(true)}
              style={{ background: "none", border: "none", color: "#32aeef", cursor: "pointer" }}
            >
              View seat Details &gt;&gt;
            </button>
          </div>

          <button
            onClick={saveBookingDetails}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 30px",
              borderRadius: 8,
              fontSize:"20px",
              fontWeight: "bold",
              cursor: "pointer",
              border:"none"
            }}
          >
            Book Now
          </button>
        </div>


      </div>




      {PopUpVisible && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.popup}>
            <button
              onClick={() => setPopUpVisible(false)}
              style={popupStyles.closeButton}
            >
              ✕
            </button>
            <div style={popupStyles.content}>
              <h3 style={popupStyles.title}>Booking Details</h3>
              <p>Name: {selectedBus?.bus_name || "Sae"}</p>
              <p>Bus Name: {selectedBus?.bus_name}</p>
              <p>From: {selectedBus?.source_city} → {selectedBus?.destination_city}</p>
              <p>Time: {selectedBus?.start_time} - {selectedBus?.end_time}</p>
              <p>Duration: {selectedBus?.duration}</p>
              <p>Phone: {selectedBus?.phone || "123456789"}</p>
              <p>Total Seats: {getAllSeats()}</p>
              <p>Bus Type: {selectedBus?.type}</p>
              <p>Total Price: ₹{Number(selectedBus?.price) * getAllSeats()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const popupStyles = {
  openButton: {
    padding: '6px 4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '14px',
    fontWeight:"bold",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin:"10px 0"
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  popup: {
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    position: 'relative' as const,
  },
  popup2: {
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '12px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '20px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
};

export default Booking;
