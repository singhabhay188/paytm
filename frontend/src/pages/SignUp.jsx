import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Redirect from "../components/Redirect";
import { useState } from "react";
import axios from 'axios'

export default function SignUp(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        
        console.log(username,password,firstName,lastName);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username,
                password,
                firstName,
                lastName
            });
            
            localStorage.setItem('token',response.data.token);
            console.log('Everything Successfull'); 
        } catch (error) {
            console.log('Error occurred while making request:',error);
        }

        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="border-4 border-gray-400 p-4 rounded-lg w-[90%] max-w-[450px] space-y-4">
                <Heading title="SignUp"/>
                <SubHeading title="Enter your details to create a account"/>
                <div className="h-1 w-full bg-gray-400 rounded-full"></div>
                <form action="" className="space-y-3" onSubmit={handleSubmit}>
                    <p><label htmlFor="username" className="ml-[3%] text-sm">Email</label></p>
                    <input required value={username} onChange={e => {setUsername(e.target.value)}} type="email" id="email" placeholder="demo@gmail.com"  className="w-[90%] p-2 rounded-md border-[2px] border-gray-300 mx-auto block outline-none focus:border-gray-800"/>
                    
                    <p><label htmlFor="firstName" className="ml-[3%] text-sm">First Name</label></p>
                    <input required minLength={3} value={firstName} onChange={e => {setFirstName(e.target.value)}} type="text" id="firstName" placeholder="Abhay"  className="w-[90%] p-2 rounded-md border-[2px] border-gray-300 mx-auto block outline-none focus:border-gray-800"/>
                    
                    <p><label htmlFor="lastName" className="ml-[3%] text-sm">Last Name</label></p>
                    <input  value={lastName} onChange={e => {setLastName(e.target.value)}} type="text" id="lastName" placeholder="Singh"  className="w-[90%] p-2 rounded-md border-[2px] border-gray-300 mx-auto block outline-none focus:border-gray-800"/>
                    
                    <p><label htmlFor="password" className="ml-[3%] text-sm">Password</label></p>
                    <input required minLength={6} value={password} onChange={e => {setPassword(e.target.value)}} type="password" id="password" placeholder="*******"  className="w-[90%] p-2 rounded-md border-[2px] border-gray-300 mx-auto block outline-none focus:border-gray-800"/>

                    <button type="submit" className="w-[90%] mx-auto block p-2 rounded-md bg-[#08bcf2] text-white font-semibold">Sign Up</button>
                </form>
                <Redirect label="Already have a account" href="Login" to="/login"/>
            </div>
        </div>
    )
}