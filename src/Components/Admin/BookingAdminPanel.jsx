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
            showAddForm: false,  // To control the visibility of the add form
            newItem: {
                type: '',
                user: '',
                customer: '',
                date: '',
                message: '',
                price: '',
            },
            errors: {
                search: '',
                dateFilter: '',
                userFilter: '',
                customerFilter: '',
                typeFilter: '',
            },
            selectedItemToDelete: null,
            showDeleteConfirmation: false,
        };
    }

    toggleAddForm = () => {
        this.setState((prevState) => ({
            showAddForm: !prevState.showAddForm,
        }));
    };

    handleAddFormChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            newItem: {
                ...prevState.newItem,
                [name]: value,
            },
        }));
    };

    handleAddFormSubmit = (e) => {
        e.preventDefault();

        // Perform validation if needed

        // Add the new item to the items array
        this.items.push({
            id: this.items.length + 1,
            ...this.state.newItem,
        });

        // Close the add form and reset form data
        this.setState({
            showAddForm: false,
            newItem: {
                type: '',
                user: '',
                customer: '',
                date: '',
                message: '',
                price: '',
            },
        });
    };

    // Function to handle delete button click
    handleDeleteClick = (item) => {
        this.setState({
            selectedItemToDelete: item,
            showDeleteConfirmation: true,
        });
    };

    // Function to handle confirm delete action
    handleConfirmDelete = () => {
        // Perform the delete action (e.g., call an API)
        // ...

        // After successful deletion, close the confirmation dialog
        this.setState({
            selectedItemToDelete: null,
            showDeleteConfirmation: false,
        });
    };

    // Function to handle cancel delete action
    handleCancelDelete = () => {
        // Cancel the delete action
        this.setState({
            selectedItemToDelete: null,
            showDeleteConfirmation: false,
        });
    };

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

    cleaningTypes = ["Basic Städning", "Topp Städning", "Diamant Städning", "Fönstertvätt"];

    // Fake users
    users = ["Alex", "Olivia", "Liam", "Sophia", "Mia", "Noah", "Ava", "Ethan"];

    items = fakeItems(this.cleaningTypes, this.users);

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

                <section className="md-flex items-center w-full px-8 py-12 mx-auto box-border">
                    <div className="w-full mx-auto px-8">
                        <div className="card ">
                            {/* Add Item */}
                            <div className="w-fit">
                                <button className="button button-success" onClick={this.toggleAddForm}>
                                    {/* Toggle icon based on the form visibility */}
                                    {this.state.showAddForm ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="max-w-xl mx-auto">
                                {/* Add Item Form Accordion Content */}
                                {this.state.showAddForm && (
                                    <div className="mt-4">
                                        <form onSubmit={this.handleAddFormSubmit}>

                                            <div className="pb-2 mt-4">
                                                <div className="form-input">
                                                    <label>TYP</label>
                                                    <select
                                                        name="type"
                                                        value={this.state.newItem.type}
                                                        onChange={this.handleAddFormChange}
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

                                            <div className="pb-2 mt-4">
                                                <div className="form-input">
                                                    <label>Städare</label>
                                                    <select
                                                        name="user"
                                                        value={this.state.newItem.user}
                                                        onChange={this.handleAddFormChange}
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
                                                        name="customer"
                                                        value={this.state.newItem.customer}
                                                        onChange={this.handleAddFormChange}
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
                                                <label htmlFor="new-date">Datum</label>
                                                <input
                                                    value={this.state.newItem.date}
                                                    onChange={this.handleAddFormChange}
                                                    className="form-input w-full box-border"
                                                    id="new-date"
                                                    type="date"
                                                    name="date"
                                                    placeholder="Datum"
                                                />
                                            </div>

                                            <div className="pb-2 mt-4">
                                                <label htmlFor="new-messsage">Meddelande</label>
                                                <input
                                                    value={this.state.newItem.message}
                                                    onChange={this.handleAddFormChange}
                                                    className="form-input w-full box-border"
                                                    id="new-messsage"
                                                    type="text"
                                                    name="message"
                                                    placeholder="Meddelande"
                                                />
                                            </div>

                                            <div className="pb-2 mt-4">
                                                <label htmlFor="new-price">Pris</label>
                                                <input
                                                    value={this.state.newItem.price}
                                                    onChange={this.handleAddFormChange}
                                                    className="form-input w-full box-border"
                                                    id="new-price"
                                                    type="number"
                                                    name="price"
                                                    placeholder="Pris"
                                                />
                                            </div>

                                            {/* Submit button */}
                                            <div className="w-fit mt-4">
                                                <button type="submit" className="button button-success">
                                                    Lägg till
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
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
                                    <td className="flex">
                                        {/* Edit btn */}
                                        <button className="button button-link px-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                        {/* Delete btn */}
                                        <button className="button button-link button-link-danger px-0"
                                                onClick={() => this.handleDeleteClick(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Delete confirmation dialog */}
                    {this.state.showDeleteConfirmation && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>Är du säker?</p>
                                <button className="button-danger mt-6" onClick={this.handleConfirmDelete}>Ja</button>
                                <button className="button-secondary mt-4" onClick={this.handleCancelDelete}>Nej</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function fakeItems(cleaningTypes, users) {
    const items = [];

    for (let i = 1; i <= 8; i++) {
        const randomType = cleaningTypes[Math.floor(Math.random() * cleaningTypes.length)];

        // Generate a random date within the last year
        const randomDate = new Date(
            new Date().getTime() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        );

        const record = {
            id: i,
            type: randomType,
            user: getRandomName(users),
            customer: getRandomName(users),
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
function getRandomName(users) {

    return users[Math.floor(Math.random() * users.length)];
}

export default BookingAdminPanel;
