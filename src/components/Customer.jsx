import Swal from 'sweetalert2';
import axios from 'axios';
import { inputFunction } from '../assets/inputFunction';

export default function Customers(props){

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const onDelete = (event) => {
        const id = event.currentTarget.parentElement.id
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8000/api/customers/${id}`)
                        .then(response => {
                            props.fetchFunction()
                            Toast.fire({
                                icon:"success",
                                title: response.data.message
                            })
                        })
                        .catch(error => {
                            Toast.fire({
                                icon: "error",
                                title: 'There was an error.'
                            })
                        });
                }
            });
    }

    function onView(event){
        const id = event.currentTarget.parentElement.id;
        axios.get(`http://localhost:8000/api/customers/${id}`)
            .then(response => {
                const info = response.data.data;
                Swal.fire({
                    title: "Customer's information",
                    html:`
                        <p><b>First name:</b> ${info.first_name}</p>
                        <p><b>Last name:</b> ${info.last_name}</p>
                        <p><b>Email Address:</b> ${info.email}</p>
                        <p><b>Contact number:</b> ${info.contact_no}</p>
                    `,
                    icon: "info"
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    async function onEdit(event){
        let data = '';
        const deleteCustomer = await axios.get(`http://localhost:8000/api/customers/${event.currentTarget.parentElement.id}`)
            .then(response => {
                data = response.data.data;
                inputFunction(response.data.data, props.fetchFunction);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    return (
        <>
            <div className='customer d-flex align-items-center py-2 px-3 rounded mb-2'>
                <div className='fw-bold flex-fill'>{props.name}</div>
                <div id={props.id}>
                    <button className='btn btn-info mx-1' onClick={onView}><i className="bi bi-eye"></i></button>
                    <button className='btn btn-warning mx-1' onClick={onEdit}><i className="bi bi-pencil"></i></button>
                    <button className='btn btn-danger mx-1' onClick={onDelete}><i className="bi bi-trash"></i></button>
                </div>
            </div>
        </>
    );
}