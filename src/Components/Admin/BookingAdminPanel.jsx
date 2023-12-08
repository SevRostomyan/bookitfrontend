import React, {Component} from 'react';

class BookingAdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dateFilter: '',
            userFilter: '',
            customerFilter: '',
            typeFilter: '',
            errors: {
                search: '',
                dateFilter: '',
                userFilter: '',
                customerFilter: '',
                typeFilter: '',
            },
        };
    }

    resetFilters = () => {
        this.setState({
            search: '',
            dateFilter: '',
            userFilter: '',
            customerFilter: '',
            typeFilter: '',
        });
    };

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    items = fakeItems();

    cleaningTypes = ["Basic Städning", "Topp Städning", "Diamant Städning", "Fönstertvätt"];

    render() {
        const uniqueUsers = [...new Set(this.items.map(item => item.user))];
        const uniqueCustomers = [...new Set(this.items.map(item => item.customer))];
        const uniqueDates = [...new Set(this.items.map(item => item.date))];

        const filteredItems = this.items.filter(item => {
            const searchFilter = item.message.toLowerCase().includes(this.state.search.toLowerCase());
            const dateFilter = !this.state.dateFilter || item.date === this.state.dateFilter;
            const userFilter = !this.state.userFilter || item.user === this.state.userFilter;
            const customerFilter = !this.state.customerFilter || item.customer === this.state.customerFilter;
            const typeFilter = !this.state.typeFilter || item.type === this.state.typeFilter;

            return searchFilter && dateFilter && userFilter && customerFilter && typeFilter;
        });

        return (
            <div>
                <h1 className="text-xl">Administrera bokningar</h1>

                {/* Admin name */}
                <h2 className="text-lg text-primary"> e.x: John Doe</h2>

                <section className="md-flex items-center w-full max-w-7xl px-8 py-12 mx-auto box-border">
                    <div className="w-full max-w-md mx-auto px-8">
                        <div className="card ">
                            <form>
                                <label htmlFor="seatch">Sök</label>
                                <input
                                    value={this.state.search}
                                    className="form-input w-full box-border"
                                    id="seatch"
                                    type="text"
                                    name="seatch"
                                    placeholder="Sök"
                                />
                            </form>
                        </div>

                        <div className="card mt-4">
                            <h2 className="text-lg text-gray-600 mt-0">Filtrera</h2>

                            <div className="pb-2 mt-4">
                                <div className="form-input">
                                    <label>Datum</label>
                                    <select
                                        name="dateFilter"
                                        value={this.state.dateFilter}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="" disabled>-- Datum --</option>
                                        {uniqueDates.map((date, index) => (
                                            <option key={index} value={date}>
                                                {date}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pb-2 mt-4">
                                <div className="form-input">
                                    <label>Städare</label>
                                    <select
                                        name="userFilter"
                                        value={this.state.userFilter}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="" disabled>-- Städare --</option>
                                        {uniqueUsers.map((user, index) => (
                                            <option key={index} value={user}>
                                                {user}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pb-2 mt-4">
                                <div className="form-input">
                                    <label>Kund</label>
                                    <select
                                        name="customerFilter"
                                        value={this.state.customerFilter}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="" disabled>-- Kund --</option>
                                        {uniqueCustomers.map((customer, index) => (
                                            <option key={index} value={customer}>
                                                {customer}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pb-2 mt-4">
                                <div className="form-input">
                                    <label>TYP</label>
                                    <select
                                        name="typeFilter"
                                        value={this.state.typeFilter}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="" disabled>-- TYP --</option>
                                        {this.cleaningTypes.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className="button button-secondary" onClick={this.resetFilters}>
                                    Återställ filter
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-xl mx-auto px-8">
                    <div className="card w-full">
                        <table className="table-booking w-full">
                            <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th className="text-left">Typ</th>
                                <th className="text-left">Städare</th>
                                <th className="text-left">Kund</th>
                                <th className="text-left">Datum</th>
                                <th className="text-left">Meddelande</th>
                                <th className="text-center w-12">Pris</th>
                                <th>Handling</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredItems.map((item, index) => (
                                <tr key={index} data-index={index}>
                                    <td>{item.id}</td>
                                    <td className="text-left">{item.type}</td>
                                    <td className="text-left">{item.user}</td>
                                    <td className="text-left">{item.customer}</td>
                                    <td className="text-left">{item.date}</td>
                                    <td className="text-left">{item.message}</td>
                                    <td className="text-center w-12">{item.price} kr</td>
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

    for (let i = 1; i <= 8; i++) {
        const randomType = cleaningTypes[Math.floor(Math.random() * cleaningTypes.length)];

        // Generate a random date within the last year
        const randomDate = new Date(
            new Date().getTime() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        );

        const record = {
            id: i,
            type: randomType,
            user: getRandomName(),
            customer: getRandomName(),
            date: randomDate.toISOString().slice(0, 10), // Format date as "YYYY-MM-DD"
            message:
                'Löksås ipsum jäst där se vad plats ...',
            price: Math.floor(Math.random() * (2000 - 100 + 1)) + 100,
        };
        items.push(record);
    }

    return items;
}

// Function to generate a random name
function getRandomName() {
    const firstNames = ["Alex", "Olivia", "Liam", "Sophia", "Mia", "Noah", "Ava", "Ethan"];

    return firstNames[Math.floor(Math.random() * firstNames.length)];
}

export default BookingAdminPanel;
