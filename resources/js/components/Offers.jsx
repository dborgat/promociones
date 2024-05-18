import React, { useEffect, useState } from "react";
import axios from "axios";

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/offers")
            .then((response) => setOffers(response.data))
            .catch((error) => console.error(error));
    }, []);

    const generatePromocode = async (offerId) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/promocodes",
                {
                    offer_id: offerId,
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Offers</h2>
            {/* <ul>
                {offers.map((offer) => (
                    <li key={offer.id}>
                        {offer.name} - {offer.description}
                        <button onClick={() => generatePromocode(offer.id)}>
                            Get Promocode
                        </button>
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>} */}
        </div>
    );
};

export default Offers;
