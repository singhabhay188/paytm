import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Users(){

    const navigate = useNavigate();

    const [users,setUsers] = useState([]);
    const [search,setSearch] = useState('');

    useEffect( ()=>{
        async function fetchData(){
            try{
                const token = localStorage.getItem('token');
                let url = `http://localhost:3000/api/v1/user/find?name=${search}`;
                console.log(url);
                let response = await axios.get(url,{
                    headers:{
                        authorization:token
                    }
                });
                console.log(response.data.users);
                let nusers = response.data.users;
                setUsers(nusers);
            }   
            catch{
                setUsers([]);
                console.log('Faced an issue in fetching users');
            }
        }
        fetchData();
    },[search]);

    function handleClick(user){
        let name = user.lastName.length > 0 ? user.firstName + ' ' + user.lastName : user.lastName;
        navigate('/send?id='+user.userId+'&name='+name);
    }

    return (
        <>
            <h1 className="text-lg font-semibold">Users</h1>
            <input type="text" value={search} onChange={e=>{setSearch(e.target.value)}} className="border-2 border-gray-300 p-3 rounded-md w-full max-w-[500px]" placeholder="Search for Users"/>

            {users.map(user=>{
                return (
                    <div key={user.userId} className="bg-slate-100 my-[4px] p-2 flex justify-between items-center">
                        <div>
                            <p>{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-500">{user.username}</p>
                        </div>
                        <button onClick={()=>{handleClick(user)}} className="bg-[#08bcf2] text-white font-bold p-3 rounded-md">Send Money</button>
                    </div>
                )
            })}
            {users.length===0 ? <p>No Users</p> : null}
        </>

    )
}