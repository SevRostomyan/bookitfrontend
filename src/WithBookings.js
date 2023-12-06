import React from 'react';
import { BookingsContext } from './BookingsContext';

export  const withBookings = WrappedComponent => {
    return class extends React.Component {
        render() {
            return (
                <BookingsContext.Consumer>
                    {context => <WrappedComponent {...this.props} {...context} />}
                </BookingsContext.Consumer>
            );
        }
    };
};

