import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';

export default function Send(){
    const resultShower = useRef();

    const token = localStorage.getItem('token');
    if(!token) navigate('/signup');

    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const id = searchParams.get('id');

    const [amount,setAmount] = useState('');

    function handleChange(e){
        let value = e.target.value;
        let arr = value.split('.');
        if(arr[1] && arr[1].length>2){
            arr[1] = arr[1].substring(0,2);
        }
        value = arr.join('.');
        setAmount(value);
    }

    

    function displayMessage(message){
        resultShower.current.innerText = message;
        resultShower.current.classList.remove('hidden');
        setTimeout(()=>{
            resultShower.current.classList.add('hidden');
        },3000);
    }

    async function handleClick() {
        const transferAmount = Number(amount);
    
        // Validate transfer amount
        if (isNaN(transferAmount) || transferAmount <= 0 || transferAmount > 100000) {
            console.log('Invalid amount. Please enter a value between 1 and 100000.');
            return;
        }
    
        // Check if id and token are defined
        if (!id || !token) {
            console.log('Missing recipient ID or authorization token.');
            return;
        }
    
        try {
            const url = 'http://localhost:3000/api/v1/balance/transfer';
            const response = await axios.post(url, {
                to: id,
                amount: transferAmount
            }, {
                headers: {
                    authorization: token
                }
            });

            displayMessage(`Transaction Successfull Updated Balance is ${response.data.balance}`);

            setAmount('');

        } catch (error) {
            displayMessage(error.response ? error.response.data.message : error.message)
            console.error('Error occurred:', error.response ? error.response.data : error.message);
        }
    }
    

    return (
        <div className="w-screen h-screen flex items-center justify-center space-y-4 flex-col relative">
            <p ref={resultShower} className="absolute right-4 top-4 bg-gray-500 text-white p-2 rounded-lg hidden">Transaction Successfull Updated Balance is </p>
            <h1 className="text-2xl lg:text-3xl font-semibold">Send Money</h1>
            <div className="w-[90%] max-w-[500px] space-y-3 border-2 border-gray-300 p-4 rounded-md">
                <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3">
                    <p className="font-semibold px-4 capitalize">Sending Money to {name}</p>
                    <div className="w-12 h-12 flex items-center justify-center text-2xl font-bold rounded-full bg-[#08bcf2] text-white">{name ? name[0] : "U"}</div>
                </div>
                <label className="block" htmlFor="amount">Enter Amount (in Rs)</label>
                <input placeholder="Enter amount less than 100000" className="p-2 border-2 border-gray-400 w-full rounded-md" onChange={handleChange} name="amount" id="amount" type="number" value={amount}/>

                <button onClick={handleClick} className="bg-[#08bcf2] w-full p-3 text-white rounded-md active:bg-[#077394]">Send Money</button>
            </div>
        </div>
    )
}