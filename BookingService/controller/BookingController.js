import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




const createbookingseat = async (req, res) => {
  try {
    const {
      name,
      bus_name,
      type,
      price,
      seat,
      star,
      start_time,
      end_time,
      duration,
      source_city,
      destination_city,
      distance_km,
      date,
      status,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const bookingData = {
      name,
      bus_name,
      type,
      price,
      seat,
      star,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      duration,
      source_city,
      destination_city,
      distance_km,
      date: new Date(date),
      status,
    };
    

    const booking = await prisma.booking.create({
      data: bookingData,
    });

    res.status(201).json({ message: "Bus details saved successfully", booking });
  } catch (error) {
    console.error("Error saving bus details:", error.message);
    res.status(500).json({ error: error.message });
  }
};




  


const getbookedseat = async (req, res) => {
  try {
    const booking = await prisma.booking.findMany();

    if (!booking) {
      return res.status(404).json({ message: "No booking data found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getbookingOfUser=async(req,res)=>{
    try{
        const {id}=req.params; //booking id
        const booking=await prisma.Booking.findUnique({
          where: {
              id: Number(id), 
            },
        });

        if(!booking){
            return res.status(404).json({message:"booking data not found by userid"});
        }
        res.json(booking);

    }catch (error) {
        res.status(400).json({ error: error.message });
      }
};


const cancelBooking=async(req,res)=>{
    try{
        const {id}=req.params;

        const booking = await prisma.Booking.update( {
          where: { id:Number(id) },
          data: { status: "CANCELED" },
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found to cancel' });
        }

        res.json({ message: 'Booking canceled successfully', booking });
        
    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}


export { createbookingseat,getbookedseat ,getbookingOfUser,cancelBooking };