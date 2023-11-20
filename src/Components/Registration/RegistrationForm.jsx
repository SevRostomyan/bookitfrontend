import React, { Component } from 'react';
import '../../assets/Req.css';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { firstName, lastName, email, password } = this.state;
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    let isValid = true;

    if (!firstName) {
      errors.firstName = 'Förnamn är obligatoriskt';
      isValid = false;
    }

    if (!lastName) {
      errors.lastName = 'Efternamn är obligatoriskt';
      isValid = false;
    }

    if (!email) {
      errors.email = 'E-post är obligatoriskt';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)) {
      errors.email = 'Ogiltig e-postadress';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Lösenord är obligatoriskt';
      isValid = false;
    } else if (password.length < 6) {
      errors.password = 'Lösenord måste vara minst 6 tecken långt';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      try {
        const response = await fetch('http://localhost:7878/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            role: 'ADMIN', // Användaren har en ADMIN-roll enligt ditt exempel, justera vid behov
            email: this.state.email,
            password: this.state.password,
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

  render() {
    return (
        <div className="registration">
          <h2>Registrera dig</h2>
          <form onSubmit={this.handleSubmit} className='form-reg'>
            <div className="form-group">
              <label></label>
              <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  required
                  placeholder='Förnamn'
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  required
                  placeholder='Efternamn'
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                  placeholder='E-post'
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                  placeholder='Lösenord'
              />
            </div>
            <button type="submit">Registrera</button>
          </form>
        </div>
    );
  }
}

export default Registration;
