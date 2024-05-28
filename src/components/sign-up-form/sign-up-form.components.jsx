import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import axios from 'axios';

import { SignUpContainer, Form } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    let user = {
      user : {
        name: displayName,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      }
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, user)
      .then( res => {
        console.log(res, 'API RESPONSE')
        resetFormFields();
        navigate('/sign-in')
      })
      .catch( () => {
        console.log('Message not sent')
      })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <Form className='form' onSubmit={ handleSubmit }>
        <FormInput 
          label='Display name'
          type='text'
          required
          onChange={ handleChange }
          name='displayName'
          value={ displayName }
        />

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
          value={ password } />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={ handleChange }
          name='confirmPassword'
          value={ confirmPassword }
        />
        <p>Already have an account? <Link to='/sign-in'>Click Here</Link></p>
        <Button type='submit'>Sign Up</Button>
      </Form>
      </SignUpContainer>
  )
};

export default SignUpForm;