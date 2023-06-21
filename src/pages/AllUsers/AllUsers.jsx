import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { useState } from "react";

const AllUsers = () => {
    const [user, setUser] = useState({})

    const { data: users, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://skids-health-server.vercel.app/users').then(res => res.json())
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://skids-health-server.vercel.app/user/${id}`, {
                    method: 'DELETE'
                }).then(res => res.json()).then(data => {
                    refetch();
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })

            }
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        // event.target.reset();
        const userData = { name, email, phone }
        fetch(`https://skids-health-server.vercel.app/update-user/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
            refetch();
            console.log(data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Updated',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, i) => <tr key={user._id} className="hover text-center">
                            <th>{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error">Delete</button>
                                <label onClick={() => setUser(user)} htmlFor="my_modal_6" className="btn btn-sm btn-primary ml-3">Edit</label>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="form-control w-full mx-auto max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your name?<span className="text-red-500 text-xl">*</span></span>
                            </label>
                            <input type="name" defaultValue={user.name} name="name" placeholder="Type here name" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full mx-auto max-w-xs">
                            <label className="label">
                                <span className="label-text">What is your Email?<span className="text-red-500 text-xl">*</span></span>
                            </label>
                            <input type="email" defaultValue={user.email} name="email" placeholder="Type here email" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="form-control w-full mx-auto max-w-xs pr-6">
                            <label className="label">
                                <span className="label-text">What is your phone number?<span className="text-red-500 text-xl">*</span></span>
                            </label>
                            <PhoneInput placeholder="Type here phone number" inputProps={{ name: 'phone', className: "input input-bordered rounded-r-md rounded-l-none ml-6 w-full max-w-xs", required: true }}></PhoneInput>
                        </div>
                        <div className="form-control w-full mx-auto max-w-xs modal-action">
                            <input type="submit" value={'Update User'} className="btn btn-primary w-full max-w-xs mt-12" />
                        </div>
                        <div className="modal-action">
                            <label htmlFor="my_modal_6" className="btn">Close!</label>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;