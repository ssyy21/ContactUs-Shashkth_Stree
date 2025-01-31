"use client"

import React, {useState, useRef} from 'react';

const FormComponents = ()=>{

    const [error, setError] = useState<string[]>([]);
    const [success, setSuccess] = useState<string | null>(null);
    // const [error, setError] =useState([]);
    // const [success, setSucess] = useState(false);
    const fullname = useRef<HTMLInputElement | null>(null)
    const email = useRef<HTMLInputElement | null>(null)
    const phone = useRef<HTMLInputElement | null>(null)
    const message = useRef<HTMLTextAreaElement | null>(null)
    const submitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data = {
            fullname : fullname.current?.value,
            email: email.current?.value,
            phone: phone.current?.value,
            message: message.current?.value
        }

        console.log("Form Data Submitted:", data);
        const res = await fetch('/api/contact', {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        });
        const {msg, success} = await res.json();
        console.log("Response from API:", { msg, success });

        setError(msg);
        if (success) {
        alert("Form successfully submitted!");
          setSuccess("Form successfully submitted!");  // Set success message if response is successful
        } else {
          setSuccess(null);  // Handle case where submission isn't successful
        }

        if (fullname.current) fullname.current.value = '';
        if (email.current) email.current.value = '';
        if (phone.current) phone.current.value = '';
        if (message.current) message.current.value = '';

        // Hide success message after 5 seconds
        setTimeout(() => {
        setSuccess(null);
        }, 3000);
    };


    
    return(
        <>
        <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-[url(/footer-bg.png)] text-white p-6'
        >
        <h2 className='text-3xl font-bold text-white mb-2'>Contact Us ♥</h2>
        <p className='text-center text-gray-300 mb-6'>
            Reach Out, We are here for You<br />
            Feel free to share your story, seek help, or ask for guidance—we are here to listen and support you.
        </p>
            <form onSubmit={submitHandler}>
                <div className='flex flex-col gap-3'>
                    <label className='text-lg' htmlFor='fullname'>Name:-</label>
                    <input ref={fullname} className='w-[380px] py-3 px-4 rounded-full border-4 border-[#C147E9] text-black placeholder-gray-500' id="fullname" type="text" placeholder='Your name here' />
                </div>
                <div className='flex flex-col gap-3 mt-4'>
                    <label className='text-lg' htmlFor='email'>Email:-</label>
                    <input ref={email} className='w-[380px] py-3 px-4 rounded-full border-4 border-[#C147E9] text-black placeholder-gray-500' id="email" type="email"  placeholder='please enter your email id:- '/>
                </div>
                <div className='flex flex-col gap-3 mt-4'>
                    <label className='text-lg' htmlFor='phone'>Phone:-</label>
                    <input ref={phone} className='w-[380px] py-3 px-4 rounded-full border-4 border-[#C147E9] text-black placeholder-gray-500' id="phone" type="number"  placeholder='please enter your phone no:- '/>
                </div>
                <div className='flex flex-col gap-3 mt-4'>
                    <label className='text-lg' htmlFor='message'>Message:-</label>
                    <textarea ref={message} className='w-[380px] py-3 px-4 rounded-xl border-4 border-[#C147E9] text-black placeholder-grey-500 h-24' id="message" placeholder='Share with us '/>
                </div>
                <div className='mt-3 text-center'>
                    <button className='py-2 px-10 bg-green-800 text-2xl rounded-lg' style={{ backgroundColor: '#C147E9' }}>Submit</button>

                </div>
            </form>
            <div className=''>
               {
                error && error.length > 0 ? error.map((item)=>{
                    return <div key={item} className="text-lg text-red-700 mt-2 p-3">{item}</div>
                }): ''
               }
               {
                success ? <div className='bg-white text-green-700'>{success}</div> : ''
               }
            </div>
        </div>
    </>
  );
};
export default FormComponents;
