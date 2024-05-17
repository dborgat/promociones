import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await axios.get('/offers');
      setOffers(response.data);
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <h1>Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>{offer.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;
