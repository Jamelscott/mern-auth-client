import {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Navigate} from 'react-router-dom'


function Login({currentUser, setCurrentUser}) {

    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [msg, setMessage] = useState("")


    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        try{
            //post to the back end with the form data to login
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
            //decode the token that is sent to us
            const {token} = response.data
            const decoded = jwt_decode(token)
            //save the token in local storage
            localStorage.setItem('jwt', token)
            //set the app state to the logged in user
            setCurrentUser(decoded)
        }catch(err){
            //handle errors sech as wrong credentials
            if(err.response.status === 409){
                console.log(err.response.data)
                setMessage(err.response.data.msg)
            }
            console.log(err)

        }
    }

    //Navigate to the usre profile if usre is not null
    if (currentUser) return <Navigate to="/profile"/>



  return (
    <>
      <h1>Login</h1>
      <h3>{msg ? `the server has a message for you: ${msg}`:""}</h3>
      <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email: </label>
          <input 
          type="text" 
          id="email"
          placeholder='user@domain.com'
          value={form.email}
          onChange={(e)=>setForm({...form, email: e.target.value})
          } />
          <br></br>
          <label htmlFor="password">Password: </label>
          <input 
          type="password" 
          id="password"
          placeholder='enter password'
          value={form.password}
          onChange={(e)=>setForm({...form, password: e.target.value})
          } />
          <br></br>
          <input type="submit"></input>
      </form>
    </>
  );
}

export default Login;
