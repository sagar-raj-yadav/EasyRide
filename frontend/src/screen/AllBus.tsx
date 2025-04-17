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
  price: string | number;  // Allow both string and number
  star: number | string;
  seat: number | string;
}


const AllBus = () => {
  const { setAllBusData } = useContext(context);
  const [filteredBusData, setFilteredBusData] = useState<BusData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query params
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const handlePress = (id: string) => {
    navigate(`/busSeat/${id}`);
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const res = await axios.get<BusData[]>(`https://questiondata.onrender.com/allbusdata?from=${from}&to=${to}`);
        setFilteredBusData(res.data);
        // setAllBusData(res.data); 
      } catch (error) {
        console.error('Error fetching filtered bus data:', error);
      }
    };

    if (from && to) {
      fetchFilteredData();
    }
  }, [from, to, setAllBusData]);


  const cards=[1,2,3,5,6];


  return (
    <div className="wrapper">
      {/* Left Sidebar */}
      <div className="sidebar">
        <Filter />
      </div>

      {/* Right Bus List */}
      <div className="content">
        {filteredBusData.length > 0 ? (
          filteredBusData.map((data, index) => (
            <BusCard
              key={index}
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
          {cards.map((index)=>(
             <Slider  key={index} />
          ))}
         </>
        )}
      </div>
    </div>
  );
};

export default AllBus;
