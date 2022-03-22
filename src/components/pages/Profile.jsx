
import axios from "axios";
import { useEffect,useState } from "react";

function Profile({ currentUser }) {

    const [msg, setMsg] = useState("")

        useEffect(()=>{

            (async()=>{
                try{

                    //get token from local storage
                    const token = localStorage.getItem('jwt')
                    console.log(token)
                    
                    //make the auth headers
                    const options = {
                        headers:{

                            'Authorization':token
                        }
                    }
                    // hit the auth locked end point

                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
                    //set the data from the server in state
                    setMsg(response.data.msg)

                }catch(err){
                    console.log(err)
                }
            })()
        },[])


  return (
    <>
      <h1>Profile</h1>
      <h3>Hello, {currentUser.name}!</h3>
      <p>Your email is: {currentUser.email}</p>
      <h4>The emssage from the auth locked route is: </h4>
      <h6>{msg}</h6>
    </>
  );
}

export default Profile;

