import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/auth.context';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { SignInContainer, Form } from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    let user = {
      user : {
        email: email,
        password: password,
      }
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, user)
      .then( response => {
        // console.log(response, 'API RESPONSE');
        // console.log(response.data.status.data.user, 'USER');
        // console.log(response.headers['authorization'], 'TOKEN')
        const userData = response.data.status.data.user;
        const authToken = response.headers['authorization'];

        signIn(userData, authToken);
        resetFormFields();
        navigate('/booking')
      })
      .catch( (error) => {
        console.error('Sign in failed:', error);
      })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <Form onSubmit={ handleSubmit }>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={ handleChange }
          name='email'
          value={ email }
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={ handleChange }
          name='password'
          value={ password }
        />
        <p>Don't have an account? <Link to='/'>Click Here</Link></p>
        <Button type='submit'>Sign In</Button>
      </Form>
    </SignInContainer>
  )
};

export default SignInForm;