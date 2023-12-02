import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './../../assets/auth.css';
import {withNavigation} from '../withNavigation';
import {useAuth} from "../../AuthContext"; //

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role:'',
            errors: {
                email: '',
                password: '',
            },
        };
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    validateForm = () => {
        const {email, password} = this.state;

        const errors = {
            email: '',
            password: '',
        };

        let isValid = true;

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

        this.setState({errors});
        return isValid;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            try {

                const response = await fetch('http://localhost:7878/api/auth/authenticate', {
                    method: 'POST',
                    headers: {

                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                        intendedRole: this.state.role, // Include the role selected by the user
                    }),
                });


                // Om autentiseringen är framgångsrik, kan du hantera svaret här (exempelvis, spara token i localStorage).
                const data = await response.json();

                if (data.errorMessage) {
                    this.setState({unauthorizedAccessMessage: data.errorMessage});
                } else if (data.token) {

                    /*localStorage.setItem('jwtToken', data.token);*/ /*Ersätter local storage med authContext*/
                    const { setAuth } = this.props.authContext;
                    setAuth({ token: data.token, userId: data.userId, role: data.role}); /* extract user ID from response if available */
                    console.log(this.state.role);

                    // Redirect based on role
                    switch (data.role) {
                        case 'ADMIN':
                            this.props.navigate('/admin-dashboard');
                            break;
                        case 'KUND':
                            this.props.navigate('/customer-dashboard');
                            break;
                        case 'STÄDARE':
                            this.props.navigate('/employee-dashboard');
                            break;
                        // ... Handle other roles ...
                        default:
                            // Default redirect or error handling
                            break;
                    }
                }
            } catch (error) {
                console.error('Error making authentication request:', error);
                // Handle the error appropriately here
                // e.g., set an error state, show error message to user, etc.
            }
        }
    };

    render() {
        return (
            <section className="md-flex items-center w-full max-w-7xl px-8 py-12 mx-auto box-border">
                <div className="auth-form w-full max-w-md mx-auto px-8">
                    <div className="card ">
                        <div>
                            <h2 className="text-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                </svg>

                                <span className="ml-2">Logga in</span>
                            </h2>
                        </div>

                        {/* Display unauthorized access message */}
                        {this.state.unauthorizedAccessMessage && (
                            <div className="alert alert-danger">
                                {this.state.unauthorizedAccessMessage}
                            </div>
                        )}

                        <div className="pb-2 mt-4">
                            <div className="form-input">
                                <label>Logga in som</label>
                                <select
                                    name="role" // Change name to "role"
                                    value={this.state.role} // Bind value to state
                                    onChange={this.handleInputChange} // Handle change
                                >
                                    <option value="" disabled>-- Logga in som --</option>
                                    <option value="KUND">Kund</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="STÄDARE">Städare</option>
                                </select>
                            </div>
                        </div>

                        <form onSubmit={this.handleSubmit} className="login-form">
                            <label htmlFor="email">E-post</label>
                            <input
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                className="form-input"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="E-post"
                            />
                            {this.state.errors.email &&
                                <span className="text-sm text-danger">{this.state.errors.email}</span>}

                            <label htmlFor="password">Lösenord</label>
                            <input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                className="form-input"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="******"
                            />
                            {this.state.errors.password &&
                                <span className="text-sm text-danger">{this.state.errors.password}</span>}

                            <button className="button button-primary mt-8" type="submit">
                                Logga in
                            </button>
                        </form>
                        <div className="mt-6">
                            <Link to="/register" className="button button-link mt-4">
                                Har du inget konto? Registrera
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


/*export default withNavigation(LoginForm);*/
/*Har ersatt ovan med nedan som kombinerar både withNavigation higher order
component and authContext som används för att spara id etc istället för localStorage*/


// This functional component wraps LoginForm and injects the auth context
const LoginFormWithAuth = (props) => {
    return <LoginForm {...props} authContext={useAuth()} />;
};

// Wrap LoginFormWithAuth with the withNavigation HOC
export default withNavigation(LoginFormWithAuth);
