import React, { Component } from 'react';

class PerformedCleaningComponent extends Component {
    items = fakeItems();

    cleaningTypes = ["Basic Städning", "Topp Städning", "Diamant Städning", "Fönstertvätt"];

    render() {
        let totalPrice = 0;

        return (
            <div>
                <h1 className="text-xl">Utförda städningar</h1>

                {/* User name */}
                <h2 className="text-lg text-gray-600"> e.x: John Doe</h2>

                <div className="container-xl mx-auto px-8">
                    <div className="card w-full">
                        <table className="table-booking w-full">
                            <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th className="text-left">Typ</th>
                                <th className="text-left">Datum</th>
                                <th className="text-left">Meddelande</th>
                                <th className="text-center">Pris</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.items.map((item, index) => {
                                totalPrice += item.price;
                                return (
                                    <tr key={index} data-index={index}>
                                        <td>{item.id}</td>
                                        <td className="text-left">{item.type}</td>
                                        <td className="text-left">{item.date}</td>
                                        <td className="text-left">{item.message}</td>
                                        <td className="text-center w-12">{item.price} kr</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right font-bold">Totalt:</td>
                                <td className="text-center font-bold">{totalPrice} kr</td>
                            </tr>
                            </tfoot>
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

    for (let i = 1; i <= 8; i++) {
        const randomType = cleaningTypes[Math.floor(Math.random() * cleaningTypes.length)];

        // Generate a random date within the last year
        const randomDate = new Date(
            new Date().getTime() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        );

        const record = {
            id: i,
            type: randomType,
            date: randomDate.toISOString().slice(0, 10), // Format date as "YYYY-MM-DD"
            message:
                'Löksås ipsum jäst där se vad plats sista äng se det sällan söka nu miljoner erfarenheter, strand genom helt brunsås vemod åker ingalunda gör jäst sista så helt rot.',
            price: Math.floor(Math.random() * (2000 - 100 + 1)) + 100,
        };
        items.push(record);
    }

    return items;
}

export default PerformedCleaningComponent;
