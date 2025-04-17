import "../AllStyling/Home.css";
import { FaBus, FaLocationArrow, FaExchangeAlt, FaCalendarAlt } from "react-icons/fa";
import { useState, useContext, useRef, useEffect } from 'react';
import { context } from '../Context/Api';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecentSearch from '../components/RecentSearch';
import Footer from '../components/Footer';



const BusSearchForm = () => {
  const navigate = useNavigate();
  const { to, setTo, from, setFrom, allbusData, setAllBusData, getAllBusData } = useContext(context);

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const fromSuggestions = allbusData.filter(
    (bus) => bus.source_city.toLowerCase().includes(from.toLowerCase())
  );
  const toSuggestions = allbusData.filter(
    (bus) => bus.destination_city.toLowerCase().includes(to.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("from", from);
    queryParams.append("to", to);
    navigate(`/allbus?${queryParams.toString()}`);
    setFrom("");
    setTo("");
  };

  useEffect(() => {
    getAllBusData();
  }, []);

  return (
    <div className="hero-section">
      <h1 className="hero-title">India's No. 1 Online Bus Ticket Booking Site</h1>
      <div className="search-container">
        <div className="input-box" ref={fromRef}>
          <FaLocationArrow className="icon" />
          <input
            placeholder="Start City"
            type="text"
            value={from}
            onFocus={() => setShowFromSuggestions(true)}
            onChange={async (e) => {
              const value = e.target.value;
              setFrom(value);
              try {
                const res = await axios.get(`https://questiondata.onrender.com/allbusdata?from=${value}`);
                setAllBusData(res.data);
              } catch (error) {
                console.error("Error fetching 'from'", error);
              }
            }}
          />
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <div style={styles.dropdownStyle}>
              {fromSuggestions.map((data, index) => (
                <p
                  key={index}
                  style={styles.dropdownItemStyle}
                  onClick={() => {
                    setFrom(data.source_city);
                    setShowFromSuggestions(false);
                  }}
                >
                  {data.source_city}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="swap-icon">
          <button onClick={handleSwap} style={{ border: "none", background: "none" }}>
            <FaExchangeAlt />
          </button>
        </div>

        <div className="input-box" ref={toRef}>
          <FaBus className="icon" />
          <input
            placeholder="Destination City"
            type="text"
            value={to}
            onFocus={() => setShowToSuggestions(true)}
            onChange={async (e) => {
              const value = e.target.value;
              setTo(value);
              try {
                const res = await axios.get(`https://questiondata.onrender.com/allbusdata?to=${value}`);
                setAllBusData(res.data);
              } catch (error) {
                console.error("Error fetching 'to'", error);
              }
            }}
          />
          {showToSuggestions && toSuggestions.length > 0 && (
            <div style={styles.dropdownStyle}>
              {toSuggestions.map((data, index) => (
                <p
                  key={index}
                  style={styles.dropdownItemStyle}
                  onClick={() => {
                    setTo(data.destination_city);
                    setShowToSuggestions(false);
                  }}
                >
                  {data.destination_city}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="input-box">
          <FaCalendarAlt className="icon" />
          <input type="date" />
        </div>

        <button onClick={handleSearch} className="search-btn">
          SEARCH BUSES
        </button>
      </div>

      <RecentSearch />

      <Footer />
    </div>
  );
};


const styles={

  dropdownStyle :{
    position: "absolute" as const,
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    width: "15%",
    overflow: "hidden", // Removed scrollbar
    marginTop: "4px",
    top:"13%"
  },
  dropdownItemStyle : {
    padding: "10px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
    color: "#333",
    transition: "background-color 0.2s ease-in-out",
  }
}
export default BusSearchForm;
