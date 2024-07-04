import axios from 'axios';
import Swal from 'sweetalert2';

export const inputFunction = (isEdit = '', fetchFunction = '') => {
    Swal.fire({
        title: isEdit ? 'Update Customer details' : 'Add new Customer',
        html: `
            <form id="swal-form">
                <input type="text" id="first_name" class="swal2-input" placeholder="Enter your first name" value="${isEdit ? isEdit.first_name : ''}">
                <input type="text" id="last_name" class="swal2-input" placeholder="Enter your last name"  value="${isEdit ? isEdit.last_name : ''}">
                <input type="email" id="email" class="swal2-input" placeholder="Enter your email"  value="${isEdit ? isEdit.email : ''}">
                <input type="text" id="contact_no" class="swal2-input" placeholder="Enter your contact number"  value="${isEdit ? isEdit.contact_no : ''}">
            </form>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: async () => {
            const inputData = {
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                email: document.getElementById('email').value,
                contact_no: document.getElementById('contact_no').value
            }
            let errors = '';
            let message = '';
            let url = isEdit ? `http://localhost:8000/api/customers/${isEdit.id}` : 'http://localhost:8000/api/customers'

            try{
                const calls = await axios[isEdit ? 'put' : 'post'](url, inputData)
                    .then(response => {
                        message = response.data.message
                    })
            } catch (error){
                errors = Object.values(error.response.data.errors)[0][0]
            }
            
            if (errors) {
                Swal.showValidationMessage(errors);
                return false;
            }
    
            return message;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(`${result.value}`).then(()=>fetchFunction());
        }
    });
};