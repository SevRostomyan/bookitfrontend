import React, { Component } from 'react';

class BookingHistoryComponent extends Component {

    items = fakeItems();

    cleaningTypes = ["Basic Städning", "Topp Städning", "Diamant Städning", "Fönstertvätt"];

    render() {
        return (
            <div>
                <h1 className="text-xl">Bokningshistorik</h1>

                <div className="auth-form container-xl mx-auto px-8">
                    <div className="card w-full">
                        <table className="table-booking w-full">
                            <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th className="text-left">Typ</th>
                                <th className="text-left">Datum</th>
                                <th className="text-left">Meddelande</th>
                                <th>Handling</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.items.map((item, index) => (
                                <tr key={index} data-index={index}>
                                    <td>{item.id}</td>
                                    <td className="text-left">{item.type}</td>
                                    <td className="text-left">{item.date}</td>
                                    <td className="text-left">{item.message}</td>
                                    <td>
                                        <button className="button button-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function fakeItems() {

    const items = [];

// Array of cleaning types
    const cleaningTypes = ["Basic Städning", "Topp Städning", "Diamant Städning", "Fönstertvätt"];


    for (let i = 1; i <= 20; i++) {
        const randomType = cleaningTypes[Math.floor(Math.random() * cleaningTypes.length)];

        // Generate a random date within the last year
        const randomDate = new Date(
            new Date().getTime() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        );

        const record = {
            id: i,
            type: randomType,
            date: randomDate.toISOString().slice(0, 10), // Format date as "YYYY-MM-DD"
            message: 'Löksås ipsum jäst där se vad plats sista äng se det sällan söka nu miljoner erfarenheter, strand genom helt brunsås vemod åker ingalunda gör jäst sista så helt rot.',
        };
        items.push(record);
    }

    return items;
}

export default BookingHistoryComponent;
