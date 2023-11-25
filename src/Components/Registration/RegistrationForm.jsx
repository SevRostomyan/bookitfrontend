import React, { useState } from 'react';
import '../../assets/Req.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password } = formData;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = 'Förnamn är obligatoriskt';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Efternamn är obligatoriskt';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'E-post är obligatoriskt';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)) {
      newErrors.email = 'Ogiltig e-postadress';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Lösenord är obligatoriskt';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Lösenord måste vara minst 6 tecken långt';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:7878/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            role: 'KUND',
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();
        console.log('Registration response:', result);

        // Du kan hantera svaret här och uppdatera din komponent om det behövs.

      } catch (error) {
        console.error('Error making registration request:', error);
      }
    }
  };

  return (
      <div className="registration">
        <h2>Registrera dig</h2>
        <form onSubmit={handleSubmit} className='form-reg'>
          <div className="form-group">
            <label></label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder='Förnamn'
            />
            {errors.firstName && <span className="text-sm text-danger">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label></label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder='Efternamn'
            />
            {errors.lastName && <span className="text-sm text-danger">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label></label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder='E-post'
            />
            {errors.email && <span className="text-sm text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label></label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder='Lösenord'
            />
            {errors.password && <span className="text-sm text-danger">{errors.password}</span>}
          </div>
          <button type="submit">Registrera</button>
        </form>
      </div>
  );
};

export default Registration;
