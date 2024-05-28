import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth.context";

import { BookingPlacedContainer } from './booking-placed.styles';

const BookingPlaced = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      // Redirect to sign-in page if not authenticated
      navigate('/sign-in');
    }
  }, [user, navigate]);


  return (
    <BookingPlacedContainer>
      <p>Booking Placed!</p>
    </BookingPlacedContainer>
  );
};

export default BookingPlaced;