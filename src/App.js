import { Routes, Route } from "react-router-dom";

import Authentication from "./routes/authentication/authentication.components";
import Registration from "./routes/registration/registration.components";
import Booking from "./routes/booking/booking.components";
import BookingPlaced from "./routes/booking-placed/booking-placed.components";

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Registration /> } ></Route>
      <Route path='/sign-in' element={ <Authentication /> }></Route>
      <Route path='/booking' element={ <Booking /> }></Route>
      <Route path='/booking/booking-placed' element={ <BookingPlaced /> }></Route>
    </Routes>
  );
}

export default App;
