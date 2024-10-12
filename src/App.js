import React, { useState } from 'react';
import './index.css';
import { FaSearch, FaMapMarkerAlt, FaShower, FaStar } from 'react-icons/fa';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bathrooms, setBathrooms] = useState([
    {
      id: 1,
      name: "ห้องน้ำ A",
      location: "แม่โจ้",
      cleanliness: "สะอาด",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxb-0JGavZTQVPsK6-2VzgVE20ljlYjHY85Q&s",
      reviews: [],
      rating: 4.5,
    },
    // เพิ่มห้องน้ำอื่น ๆ ที่นี่
  ]);

  const filteredBathrooms = bathrooms.filter(bathroom =>
    bathroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bathroom.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bathroom.cleanliness.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addReview = (id, review) => {
    setBathrooms(bathrooms.map(bathroom => {
      if (bathroom.id === id) {
        return { ...bathroom, reviews: [...bathroom.reviews, review] };
      }
      return bathroom;
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>โคตรปวดขี้.com</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="ค้นหาห้องน้ำที่คุณต้องการขี้..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main>
        <div className="bathrooms">
          {filteredBathrooms.length > 0 ? (
            filteredBathrooms.map((bathroom) => (
              <div key={bathroom.id} className="bathroom-card">
                <img src={bathroom.image} alt={bathroom.name} className="bathroom-image" />
                <h2>{bathroom.name}</h2>
                <p><FaMapMarkerAlt /> Location: {bathroom.location}</p>
                <p><FaShower /> Cleanliness: {bathroom.cleanliness}</p>
                <div className="rating">
                  <FaStar className="star" /> {bathroom.rating}
                </div>
                <button className="view-button">ดูห้องน้ำ</button>
                
                {/* ฟอร์มรีวิว */}
                <div className="review-section">
                  <h3>รีวิวห้องน้ำ</h3>
                  <textarea placeholder="เขียนรีวิวของคุณ..." onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addReview(bathroom.id, e.target.value);
                      e.target.value = '';
                    }
                  }} />
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">ไม่พบห้องน้ำที่ค้นหา</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
