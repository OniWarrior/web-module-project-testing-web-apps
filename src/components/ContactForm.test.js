import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const {getByText} = render(<ContactForm/>);
    const header = getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).not.toBeFalsy();
    expect(header).toBeVisible();
    expect(header).toHaveTextContent('Contact Form');

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { value: /submit/i });
  
    expect(submitButton).not.toBeDisabled(); 
  
    
    userEvent.type(firstNameInput, "");
    userEvent.type(lastNameInput, "johnson");
    userEvent.type(emailInput,'you@gmail.com');
    userEvent.type(messageInput, "hello");
    userEvent.click(submitButton); 
    
  
    
   const errorMessage = screen.getByTestId('error', {value: /firstName must have at least 5 characters./i})


    expect(errorMessage).toBeVisible();
    expect(errorMessage).toBeDefined();
    expect(errorMessage).not.toBeDisabled();

   

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { value: /submit/i });
  
    expect(submitButton).not.toBeDisabled(); 
  
    
    userEvent.type(firstNameInput, "");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput,'');
    userEvent.type(messageInput, "");
    userEvent.click(submitButton); 
    
  
    
   const errorMessage = screen.getAllByTestId('error')


    expect(errorMessage[0]).toBeVisible();
    expect(errorMessage[0]).toBeDefined();
    expect(errorMessage[0]).not.toBeDisabled();

    expect(errorMessage[1]).toBeVisible();
    expect(errorMessage[1]).toBeDefined();
    expect(errorMessage[1]).not.toBeDisabled();

    expect(errorMessage[2]).toBeVisible();
    expect(errorMessage[2]).toBeDefined();
    expect(errorMessage[2]).not.toBeDisabled();

   

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { value: /submit/i });
  
    expect(submitButton).not.toBeDisabled(); 
  
    
    userEvent.type(firstNameInput, "Jonathan");
    userEvent.type(lastNameInput, "johnson");
    userEvent.type(emailInput,'');
    userEvent.type(messageInput, "I love you!!");
    userEvent.click(submitButton);
    
    
  
    
    const errorMessage = screen.getByTestId("error", { value: /email must be a valid address/i });
    
    
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toBeDefined();
    expect(errorMessage).not.toBeDisabled();

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { value: /submit/i });
  
    expect(submitButton).not.toBeDisabled(); 
  
    
    userEvent.type(firstNameInput, "Jonathan");
    userEvent.type(lastNameInput, "johnson");
    userEvent.type(emailInput,'john@.com');
    userEvent.type(messageInput, "I love you!!");
    userEvent.click(submitButton);
    
    
  
    
    const errorMessage = screen.getByTestId("messageDisplay", { value: /email must be a valid address/i });
    
    
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toBeDefined();
    expect(errorMessage).not.toBeDisabled();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole("button", { value: /submit/i });
  
    expect(submitButton).not.toBeDisabled(); 
  
    
    userEvent.type(firstNameInput, "Jonathan");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput,'john@gmail.com');
    userEvent.type(messageInput, "I love you!!");
    userEvent.click(submitButton);
    
    
  
    
    const errorMessage = screen.getByTestId("error", { value: /lastName is a required field/i });
    
    
    expect(errorMessage).toBeVisible();
    expect(errorMessage).toBeDefined();
    expect(errorMessage).not.toBeDisabled();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);

  const submitButton = screen.getByRole("button", { value: /submit/i });

  userEvent.type(firstNameInput, "Jonathan");
  userEvent.type(lastNameInput, "Doe");
  userEvent.type(emailInput,'john@gmail.com') 
  userEvent.click(submitButton);

  const newContact = screen.getByText(/John/i);
  
  
  expect(newContact).toBeVisible();
  expect(newContact).toBeDefined();
  expect(newContact).not.toBeDisabled();
});

test('renders all fields text when all fields are submitted.', async () => {

    
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.getByRole("button", { value: /submit/i });

  expect(submitButton).not.toBeDisabled(); 

  
  userEvent.type(firstNameInput, "Jonathan");
  userEvent.type(lastNameInput, "Doe");
  userEvent.type(emailInput,'john@gmail.com');
  userEvent.type(messageInput, "I love you!!");
  userEvent.click(submitButton);

  
  const newContact = screen.getByText(/John/i);
  
  
  expect(newContact).toBeVisible();
  expect(newContact).toBeDefined();
  expect(newContact).not.toBeDisabled();
    
});