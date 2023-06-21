import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Swal from "sweetalert2";

const CreateUsers = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const user = { name, email, phone }
        fetch('https://skids-health-server.vercel.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(() => {
            event.target.reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User Created',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    return (
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full mx-auto max-w-xl">
                    <label className="label">
                        <span className="label-text">What is your name?<span className="text-red-500 text-xl">*</span></span>
                    </label>
                    <input type="name" name="name" required placeholder="Type here name" className="input input-bordered w-full max-w-xl" />
                </div>
                <div className="form-control w-full mx-auto max-w-xl">
                    <label className="label">
                        <span className="label-text">What is your Email?<span className="text-red-500 text-xl">*</span></span>
                    </label>
                    <input type="email" name="email" required placeholder="Type here email" className="input input-bordered w-full max-w-xl" />
                </div>
                <div className="form-control w-full mx-auto max-w-xl pr-8">
                    <label className="label">
                        <span className="label-text">What is your phone number?<span className="text-red-500 text-xl">*</span></span>
                    </label>
                    <PhoneInput placeholder="Type here phone number" inputProps={{ name: 'phone', className: "input input-bordered rounded-r-md rounded-l-none ml-8 w-full max-w-xl", required: true }}></PhoneInput>

                </div>
                <div className="form-control w-full mx-auto max-w-xs">
                    <input type="submit" value={'Create User'} className="btn btn-primary w-full max-w-xs mt-12" />
                </div>
            </form>
    );
};

export default CreateUsers;