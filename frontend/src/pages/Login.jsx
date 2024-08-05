import Heading from "../components/Heading";
import Redirect from "../components/Redirect";
import SubHeading from "../components/SubHeading";

import { useState } from "react";

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleClick(){
        console.log(email,password);

        //clear
        setEmail('');
        setPassword('');
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="border-4 border-gray-400 p-4 rounded-lg w-[90%] max-w-[450px] space-y-4">
                <Heading title="Login"/>
                <SubHeading title="Enter your details to login"/>
                <div className="h-1 w-full bg-gray-400 rounded-full"></div>
                {/* <Input identifier="Email" value={email} placeholder="demo@gmail.com" onChange={e=>{setEmail(e.target.value)}}/>
                <Input identifier="Password" value={password} placeholder="******" onChange={e=>{setPassword(e.target.value)}}/>
                <Button btntext="Login" onClick={handleClick}/> */}
                <Redirect label="Don't have a account" href="SignUp" to="/signup"/>
            </div>
        </div>
    )
}