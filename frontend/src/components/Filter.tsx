import { useState } from 'react';
import '../AllStyling/Filter.css';

const Filter = () => {
  const [minrange, setMinRange] = useState<number>(100);
  const [maxrange] = useState<number>(1500);

  return (
    <div className='filter-container'>
      <div className='filter-section'>
        <p className="section-title">Bus Type:</p>
        <div className="button-group">
          {['Ac class', 'Sleeper', 'Seater'].map((type) => (
            <button key={type} className='button'>{type}</button>
          ))}
        </div>
      </div>

      <div className='filter-section'>
        <p className="section-title">Price Range:</p>
        <div className='range-container'>
          <span className="price">₹{minrange}</span>
          <input
            type="range"
            min={100}
            max={1500}
            value={minrange}
            onChange={(e) => setMinRange(Number(e.target.value))}
          />
          <span className="price">₹{maxrange}</span>
        </div>
      </div>

      <div className='filter-section'>
        <p className="section-title">Rating:</p>
        <div className="button-group">
          {[2, 3, 4, 5].map((star) => (
            <button key={star} className='button'>{star} star </button>
          ))}
        </div>
      </div>

      <div className='filter-section'>
        <p className="section-title">Departure Time:</p>
        <div className="button-group">
          {['Before 10AM', '10AM - 5PM', '5PM - 11PM', 'After 11PM'].map((slot) => (
            <button key={slot} className='button'>{slot}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
