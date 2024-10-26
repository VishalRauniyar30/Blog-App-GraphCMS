"use client";

import { useEffect, useRef, useState } from "react";

import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false) ;   
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const nameEl = useRef();
    const emailEl = useRef();
    const commentEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);

    const handlePostSubmission = () => {
        setError(false);
        const { value : comment } = commentEl.current;
        const { value : name } = nameEl.current;
        const { value : email } = emailEl.current;
        const { checked : storeData } = storeDataEl.current;

        if(!name || !email || !comment) {
            setError(true);
            return;
        }
        const commentObj = {
            name, email, comment, slug
        };

        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email');
        }
        
        submitComment(commentObj).then(() => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false); 
            }, 3000);
        }).catch((error) => {
            console.log(error);
            setError(true);
        })
    };
    
    return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Reply</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input type="text" ref={nameEl} className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' name="name" placeholder="Name" />
                <input type="email" ref={emailEl} className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' name="email" placeholder="Email" />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea ref={commentEl} className='p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' name='comment' placeholder='Comment' />
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <div>
                    <input ref={storeDataEl} type="checkbox" id='storeData' name='storeData' value='true' />
                    <label htmlFor="storeData" className='text-gray-500 ml-2 cursor-pointer'>Save My Name, Email in this Browser for the Next Time I Comment</label>
                </div>
            </div>
            {error && <p className='text-xs text-red-500'>All Fields are Compulsory</p>}
            <div className="mt-8">
                <button 
                    type='button' 
                    onClick={handlePostSubmission} 
                    className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'
                >
                    Post Comment
                </button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment Submitted For Review</span>}
            </div>
        </div>
    );
};

export default CommentsForm;
