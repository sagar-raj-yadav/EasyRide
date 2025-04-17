import  { useState } from 'react';
import '../AllStyling/Offers.css';

interface Offer {
  id: number;
  title: string;
  image: string;
  details: string[];
  code: string;
}


const BusOffers = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);


  const offers = [
    {
      id: 1,
      title: "Get up to Rs. 600 Off on your booking | Mumbai Vs Delhi",
      image: "/offer1.jpg",
      details: [
        "Apply coupon code SUPER40 and get 40% up to Rs.300 instant discount + 40% up to 100 cashback for new users...",
        "Coupon code SUPER40 works for only 4 mins after a FOUR in the match.",
        "Offer valid only for private bus bookings, not on SRTCs.",
        "Users should be logged in to AbhiBus to avail of the offer.",
        "For SUPER60, complete the payment within 60 seconds of a SIX hit."
      ],
      code: "SUPER40"
    },
    {
      id: 2,
      title: "Flat Rs. 250 Off on First Booking | Bengaluru Special",
      image: "/offer2.png",
      details: [
        "Use code BANG250 for flat Rs.250 off on your first private bus booking.",
        "Valid for routes starting from Bengaluru only.",
        "Only applicable for new users.",
        "Login required to avail the offer.",
        "Not applicable on government buses."
      ],
      code: "BANG250"
    },
    {
      id: 3,
      title: "Midweek Madness: Get 30% Off on All Routes!",
      image: "/offer1.jpg",
      details: [
        "Apply MID30 and get 30% off up to Rs.200 on any route.",
        "Offer valid every Wednesday only.",
        "Applicable for all users (new + existing).",
        "No minimum booking value required.",
        "Max 2 times per user per week."
      ],
      code: "MID30"
    },
    {
      id: 4,
      title: "Weekend Bonanza: Rs. 100 Cashback on Return Bookings",
      image: "/offer4.jpg",
      details: [
        "Use WEEK100 to get Rs.100 cashback on round-trip bookings.",
        "Offer valid from Friday to Sunday only.",
        "Cashback will be credited within 24 hours.",
        "Applicable only for private buses.",
        "Cannot be clubbed with other offers."
      ],
      code: "WEEK100"
    },
    {
      id: 5,
      title: "Pay via UPI & Get Rs. 75 Extra Discount",
      image: "/offer3.jpg",
      details: [
        "Use UPI75 to get Rs.75 off on payment via any UPI app.",
        "Offer valid for all users.",
        "Minimum booking value Rs.400.",
        "Offer can be availed once per user.",
        "Instant discount will be applied at checkout."
      ],
      code: "UPI75"
    },
    {
      id: 6,
      title: "Student Special: Extra 15% Off on All Routes",
      image: "/offer2.png",
      details: [
        "Use STUD15 and get 15% off (up to Rs.120).",
        "Upload student ID for verification.",
        "Applicable for private buses only.",
        "Offer valid once per student account.",
        "Cannot be combined with wallet offers."
      ],
      code: "STUD15"
    },
    {
      id: 7,
      title: "Women Travelers: Rs. 100 Off + Free Water Bottle",
      image: "/offer4.jpg",
      details: [
        "Use WOMEN100 and get Rs.100 discount on all bookings.",
        "Free water bottle will be provided on board.",
        "Offer valid for female users only.",
        "ID verification may be required at boarding.",
        "Valid on selected operators."
      ],
      code: "WOMEN100"
    },
    {
      id: 8,
      title: "Summer Saver: 25% Off on Long-Distance Routes",
      image: "/offer1.jpg",
      details: [
        "Use SUMMER25 for 25% off (up to Rs.250).",
        "Applicable on routes above 400km.",
        "Offer valid till May 31st only.",
        "Valid for all users.",
        "Can be used max 2 times per user."
      ],
      code: "SUMMER25"
    },
    {
      id: 9,
      title: "Rainy Day Deal: Rs. 50 Off + Rs. 50 Wallet Cashback",
      image: "/offer2.png",
      details: [
        "Use RAINY50 and get Rs.50 instant off + Rs.50 cashback.",
        "Cashback credited to AbhiBus wallet.",
        "Offer valid on rainy days (auto-detected).",
        "Applicable only on mobile app.",
        "Offer valid once per user per rainy day."
      ],
      code: "RAINY50"
    },
    {
      id: 10,
      title: "Night Owl Offer: Rs. 80 Off on Overnight Buses",
      image: "/offer4.jpg",
      details: [
        "Apply NIGHT80 and get flat Rs.80 off.",
        "Valid on buses starting between 9 PM and 5 AM.",
        "No minimum booking value.",
        "Offer valid every night till 30th April.",
        "Applicable for all users."
      ],
      code: "NIGHT80"
    },
    {
      id: 11,
      title: "Referral Bonus: Rs. 100 for You & Your Friend",
      image: "/offer4.jpg",
      details: [
        "Share your referral code and earn Rs.100 wallet credit.",
        "Your friend also gets Rs.100 on first booking.",
        "Valid only after successful ticket confirmation.",
        "No limit on number of referrals.",
        "Wallet amount valid for 30 days."
      ],
      code: "REFER100"
    },
    {
      id: 12,
      title: "Flash Deal: Up to 50% Off | Limited Time Only",
      image: "/offer2.png",
      details: [
        "Use FLASH50 for 50% off up to Rs.300.",
        "Valid for first 500 bookings of the day.",
        "Applicable for new and existing users.",
        "Only on selected bus operators.",
        "Hurry! Ends in a few hours."
      ],
      code: "FLASH50"
    }
  ];
  

  const handleViewDetails = (offer:Offer) => {
    setSelectedOffer(offer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOffer(null);
  };

  return (
    <div className="offers-container">
      <h2>Bus Booking Offers</h2>
      <p className="subheading">Exciting offers on Bus Booking Online</p>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt="Offer" className="offer-img" />
            <p className="offer-title">{offer.title}</p>
            <button className="details-btn" onClick={() => handleViewDetails(offer)}>View Details</button>
          </div>
        ))}
      </div>

      {showModal && selectedOffer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedOffer.title}</h3>
            <ul className="offer-details">
              {selectedOffer.details.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <button className="copy-btn">Copy Code: {selectedOffer.code}</button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusOffers;
