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


    handleSubmit = (e) => {
        e.preventDefault();
        // skicka kund information
        console.log(this.state);
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
                        {/* <span className="error">{errors.password}</span> */}
                    </div>
                    <button type="submit">Registrera</button>
                </form>
            </div>
        );
    }
}

export default Registration;