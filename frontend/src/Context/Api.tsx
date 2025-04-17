import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

export interface BusDataType {
  id: string;
  bus_name: string;
  type: string;
  price: string;
  seat: string;
  star: string;
  start_time: string;
  end_time: string;
  duration: string;
  distance_km: number;
  source_city: string;
  source_state: string;
  destination_city: string;
  destination_state: string;
  date: string;
  phone:number;
}


interface BookingData {
  id: number;
  name: string;
  bus_name: string;
  type: string;
  price: number;
  seat: number;
  star: number;
  start_time: string;
  end_time: string;
  duration: string;
  source_city: string;
  destination_city: string;
  distance_km: number;
  date: string;
  status: string;
  createdAt: string;
}


// Define the context type (for managing state)
interface ContextType {
  allbusData: BusDataType[];
  setAllBusData: React.Dispatch<React.SetStateAction<BusDataType[]>>;
  to: string;
  setTo: (to: string) => void;
  from: string;
  setFrom: (from: string) => void;
  getAllBusData: () => void;
  bookedData: BookingData[];  // Changed from 'data' to 'bookedData'
  setBookedData: React.Dispatch<React.SetStateAction<BookingData[]>>; // Changed from 'setData'
}


// Create context
export const context = createContext<ContextType>({} as ContextType);

// Props type for provider
interface ContextProviderProps {
  children: ReactNode;
}

// Context provider component
export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const [allbusData, setAllBusData] = useState<BusDataType[]>([]);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');





  const getAllBusData = async () => {
    try {
      const response = await axios.get(`https://questiondata.onrender.com/allbusdata?to=${to}&from=${from}`);

      setAllBusData(response.data);
      console.log("Fetched bus data:");
    } catch (error) {
      console.error("get all bus data error", error);
    }
  };


  //booked seat
  const [bookedData,setBookedData  ]=useState<BookingData[]>([])

  const fetchBookedData=async()=>{
      try{
          const response=await axios.get("https://bus-booking-microservice.onrender.com/api/getbookedseat");
          setBookedData(response.data);
      }catch(error){
          console.log("error in fetching booking data",error);
      }
  };
  
  useEffect(()=>{
    fetchBookedData();
  },[])


  return (
    <context.Provider value={{
      allbusData,
      setAllBusData,
      to,
      setTo,
      from,
      setFrom,
      getAllBusData,
      bookedData,
      setBookedData,
      
    }}>
      {children}
    </context.Provider>
  );
};
