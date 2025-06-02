import { useState, useEffect } from 'react';
import '../AllStyling/Filter.css';

interface FilterProps {
  onFilterChange: (filters: {
    minrange: number;
    maxrange: number;
    selectedType: string | null;
    selectedRating: number | null;
    selectedTime: string | null;
  }) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [minrange, setMinRange] = useState<number>(0);
  const [maxrange] = useState<number>(400);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    onFilterChange({
      minrange,
      maxrange,
      selectedType,
      selectedRating,
      selectedTime,
    });
  }, [minrange, maxrange, selectedType, selectedRating, selectedTime]);

  return (
    <div className="filter-container">
      {/* Bus Type */}
      <div className="filter-section">
        <p className="section-title">Bus Type:</p>
        <div className="button-group">
          {['Ac class', 'Sleeper', 'Seater'].map((type) => (
            <button
              key={type}
              className={`button ${selectedType === type ? 'selected' : ''}`}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <p className="section-title">Price Range:</p>
        <div className="range-container">
          <span className="price">₹{minrange}</span>
          <input
            type="range"
            min={0}
            max={400}
            value={minrange}
            onChange={(e) => setMinRange(Number(e.target.value))}
          />
          <span className="price">₹{maxrange}</span>
        
        </div>
      </div>

      {/* Rating */}
      <div className="filter-section">
        <p className="section-title">Rating:</p>
        <div className="button-group">
          {[2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`button ${selectedRating === star ? 'selected' : ''}`}
              onClick={() => setSelectedRating(selectedRating === star ? null : star)}
            >
              {star} Star
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="filter-section">
        <p className="section-title">Departure Time:</p>
        <div className="button-group">
          {['Before 10AM', '10AM - 5PM', '5PM - 11PM', 'After 11PM'].map((slot) => (
            <button
              key={slot}
              className={`button ${selectedTime === slot ? 'selected' : ''}`}
              onClick={() => setSelectedTime(selectedTime === slot ? null : slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
