import { useEffect, useState } from "react"
import Users from '../components/Users'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home(){
    let [balance,setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) navigate('/signup');

        let url = 'http://localhost:3000/api/v1/balance/get';
        async function fetchBalance(){
            let response = await axios.get(url,{
                headers:{
                    authorization:token
                }
            });

            let fetchedBalance = response.data.balance;
            setBalance(Number(fetchedBalance));
        }
        fetchBalance();
        
        console.log('Fetcing done');
    },[]);

    return (
        <>
        
            <nav className="w-full bg-white p-4 shadow-md flex justify-between gap-5 items-center">
                <p className="text-xl font-semibold lg:text-2xl">Paytm App</p>
                <p className="font-semibold ml-auto">Hello User</p>
                <button className="p-3 rounded-md bg-[#08bcf2] text-white">LogOut</button>
            </nav>

            <div className="w-full p-4 space-y-4">
                <h1 className="text-2xl font-bold">Your Balance is {balance}</h1>     
                <Users/>
            </div>


        </>
    )
}