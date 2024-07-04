import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './components/Customer';
import './App.css';
import { inputFunction } from './assets/inputFunction';

function App() {
    const [customers, setCustomers] = useState([]);

    // Function to fetch customers from API
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/customers');
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Function to handle creation of new customer
    const handleCreate = async () => {
        inputFunction('', fetchCustomers); // Assuming inputFunction handles creation and accepts a callback
    };

    return (
        <div className='container'>
            <div className='p-4 border rounded mb-2 mt-5 d-flex align-items-center flex-row customer-header'>
                <h1 className='flex-fill'><i className="bi bi-people-fill"></i> Customers</h1>
                <button className='btn btn-success' onClick={handleCreate}><i className="bi bi-person-plus"></i> New customer</button>
            </div>
            <div className='list-container'>
                {customers.map(customer => (
                    <Customer key={customer.id} name={`${customer.first_name} ${customer.last_name}`} id={customer.id} fetchFunction={fetchCustomers} />
                ))}
            </div>
        </div>
    );
}

export default App;
