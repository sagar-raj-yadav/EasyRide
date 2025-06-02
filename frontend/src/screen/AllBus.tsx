
import '../AllStyling/AllBus.css';
import { useContext, useEffect, useState } from 'react';
import BusCard from '../components/BusCard';
import { context } from '../Context/Api';
import Filter from '../components/Filter';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Slider from '../components/Slider';



interface BusData {
  id: string;
  bus_name: string;
  type: string;
  start_time: string;
  end_time: string;
  source_city: string;
  destination_city: string;
  duration: string;
  price: string;
  star: number | string;
  seat:string | number;
  distance_km: number;
  phone: string;  
  source_state: string;
  destination_state: string;
  date: string;
}




const AllBus = () => {

const { setAllBusData }= useContext(context);

  const [filteredBusData, setFilteredBusData] = useState<BusData[]>([]);
  const [filters, setFilters] = useState({
    minrange: 100,
    maxrange: 1500,
    selectedType: null,
    selectedRating: null,
    selectedTime: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const handlePress = (id: string) => {
    navigate(`/busSeat/${id}`);
  };

  // ✅ Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
       const params: any = { from, to };

// Only add filters if they are defined
if (filters.minrange) params.minrange = filters.minrange;
if (filters.maxrange) params.maxrange = filters.maxrange;
if (filters.selectedType) params.type = filters.selectedType;
if (filters.selectedRating) params.rating = filters.selectedRating;
if (filters.selectedTime) params.departure_time = filters.selectedTime;

const res = await axios.get<BusData[]>(`http://54.227.22.130:5000/allbusdata`, {

// const res = await axios.get<BusData[]>(`https://questiondata.onrender.com`, {
  
  params: params,
});

        setFilteredBusData(res.data);
        setAllBusData(res.data);
      } catch (error) {
        console.error('Error fetching filtered bus data:', error);
      }
    };

    if (from && to) {
      fetchFilteredData();
    }
  }, [from, to, filters, setAllBusData]);

  const cards = [1, 2, 3, 5, 6];

  return (
    <div className="wrapper">
      {/* Left Sidebar */}
      <div className="sidebar">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {/* Right Bus List */}
      <div className="content">
        {filteredBusData.length > 0 ? (
          filteredBusData.map((data) => (
            <BusCard
              key={data.id}
              companyName={data.bus_name}
              busType={data.type}
              departureTime={data.start_time}
              arrivalTime={data.end_time}
              departureCity={data.source_city}
              arrivalCity={data.destination_city}
              duration={data.duration}
              price={Number(data.price)}
              rating={Number(data.star)}
              seatsAvailable={Number(data.seat)}
              imageUrl="buslogologin.png"
              isAbhiAssured={true}
              onPress={() => handlePress(data.id)}
            />
          ))
        ) : (
          <>
            {cards.map((index) => (
              <Slider key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBus;
