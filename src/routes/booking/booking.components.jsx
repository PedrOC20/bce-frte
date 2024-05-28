import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../contexts/auth.context";

import FormInput from "../../components/form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.components";

import { BookingContainer, Details, Form, Footer, Border, Quantity, Value, Arrow } from './booking.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  cardDetails: '',
  store: ''
}

const Booking = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [stores, setStores] = useState();
  const [bagPrice, setBagPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [failSubmit, setFailSubmit] = useState('');

  const { cardDetails } = formFields;
  const { user, authToken, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      // Redirect to sign-in page if not authenticated
      navigate('/sign-in');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Calculate the total whenever the quantity changes
    setTotal((quantity * bagPrice).toFixed(2));
  }, [quantity, bagPrice]);

  useEffect(() => {
    // Get the Available Stores from the API
    axios.get(process.env.REACT_APP_API_URL + '/api/stores')
    .then(response => {
        setStores(response.data.data)
        if (response.data.data.length) {
          setFormFields({ ...formFields, store: response.data.data[0].id });
        }
      })
    .catch((error) => {
        console.log('error ' + error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  useEffect(() => {
    // Set the bag price for the choosen store
    if (stores) {
      const selectedStore = stores.find(store => store.id === parseInt(formFields.store))

      if (selectedStore) {
        setBagPrice(selectedStore.price_per_bag);
      }
    }
  }, [stores, formFields.store])

  const addBag = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const removeBag = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogout = () => {
    signOut();
    navigate('/sign-in');
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const fail = Math.random() >= 0.5

      if (fail) {
        throw new Error("Your booking has failed. Please try again");
      } else {

        let booking = {
          number_of_bags: quantity,
          starts_at: new Date(),
          ends_at: new Date() + 1
        }
    
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/stores/${formFields.store}/bookings`, booking, { headers: { Authorization: authToken } })
          .then( response => {
            console.log(response, 'API RESPONSE');
            resetFormFields();
            setLoading(false);
            setFailSubmit('');
            navigate('booking-placed')
          })
          .catch( (error) => {
            setFailSubmit(error.message)
            console.error('Booking failed:', error);
            setLoading(false);
          })
      }
    } catch (e) {
      setLoading(false);
      setFailSubmit(e.message)
    }
  };

  return (
    <BookingContainer>
      <span onClick={ handleLogout }>Logout</span>
      <Details>
        <p>Booking Storage at</p>
        <FormInput 
            label='Store'
            type='select'
            required
            onChange={ handleChange }
            name='store'
            options={ stores ? stores : []}
            value={ formFields.store }
        />
        <Quantity>
          <span>Number of bags</span>
          <Arrow onClick={ removeBag }>&#8722;</Arrow>
          <Value>{ quantity }</Value>
          <Arrow onClick={ addBag }>&#43;</Arrow>
        </Quantity>
        <Border>Personal Details</Border>
        <Form onSubmit={ handleSubmit }>
          <FormInput 
            label='Display name'
            type='text'
            required
            onChange={ handleChange }
            name='displayName'
            value={ user ? user.name : 'No user' }
          />
          <FormInput
            label='Email'
            type='email'
            required
            onChange={ handleChange }
            name='email'
            value={ user ? user.email : 'No user' }
          />
          <Border>Payment Info</Border>
          <FormInput
            label='Card Details'
            type='text'
            required
            onChange={ handleChange }
            name='cardDetails'
            value={ cardDetails }
          />
          {failSubmit ? <p>{ failSubmit }</p> : ''}
          <Footer>
            <div>
              <p>{quantity} {quantity <= 1 ? 'bag' : 'bags'}</p>
              <p>{total} €</p>
            </div>
            {failSubmit ? (
              <Button buttonType={ BUTTON_TYPE_CLASSES.retry } type='submit'>Retry</Button>
            ) : (
              <Button type='submit'>Book</Button>
            )}
          </Footer>
        </Form>
      </Details>
      {loading && <LoadingScreen />}
    </BookingContainer>
  )
}

export default Booking;