import { useState } from "react";
import axios from 'axios'
import {Navigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function Register({currentUser, setCurrentUser}) {

    const [form, setForm]= useState({
        name: "",
        email: "",
        password: "",
        passwordCheck: ""
    })

    const [msg, setMessage] = useState("")



    const handleOnSubmit = async (e)=>{
        e.preventDefault()
        if(form.password !== form.passwordCheck){
            setMessage("Passwords did not match")
        } else {
            try{
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
                const {token} = response.data
                const decoded = jwt_decode(token)
                localStorage.setItem('jwt', token)
                setCurrentUser(decoded)
            }catch(err){
                if(err.response.status === 504){
                    console.log(err.response.data)
                    setMessage(err.response.data.msg)
                }
                console.log(err)
            }
        }
    }

    if (currentUser) return <Navigate to="/profile"/>


    return ( 
        <>
        <h1>Register</h1>
        <h3>{msg ? `the server has a message for you: ${msg}`:""}</h3>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="name">Name: </label>
            <input 
            type="text" 
            id="name"
            value={form.name}
            onChange={(e)=>setForm({...form, name: e.target.value})}
            />
            <br></br>
            <label htmlFor="email">Email: </label>
            <input 
            type="email" 
            id="email"
            value={form.email}
            onChange={(e)=>setForm({...form, email: e.target.value})}
            />
            <br></br>
            <label htmlFor="password">Password: </label>
            <input 
            type="password" 
            id="password"
            value={form.password}
            onChange={(e)=>setForm({...form, password: e.target.value})}
            />
            <label htmlFor="passwordCheck"> Password Check: </label>
            <input 
            type="password" 
            id="password"
            value={form.passwordCheck}
            onChange={(e)=>setForm({...form, passwordCheck: e.target.value})}
            />
            <br></br>
            <input type="submit" />
        </form>
        </>
     );
}

export default Register;