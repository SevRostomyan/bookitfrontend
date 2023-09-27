import React, { Component } from 'react';
import '../../assets/Req.css'

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                    </div>
                    <button type="submit">Registrera</button>
                </form>
            </div>
        );
    }
}

export default Registration;