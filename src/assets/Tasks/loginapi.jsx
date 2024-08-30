import { useRef, useState } from "react";
import axios from "axios"

const Login = () => {

    const usernameref=useRef("")
    const passwordref=useRef("")
    const [errors,seterrors]=useState({})
    const [formdata,setform]=useState({})


    const onsubmit=(event)=>{
            event.preventDefault()
            const usernameenterd=usernameref.current.value
            const passwordenterd=passwordref.current.value
            const Formerrors=validations(usernameenterd,passwordenterd)
            if(Object.keys(Formerrors).length>0){
                   seterrors(Formerrors)
            }else{
                hitapi(usernameenterd,passwordenterd)

            }
    }


    const validations=(username,password)=>{
       const  formerrors={}
        if(!username){
            formerrors.usernameerror="please enter username"
        }else if(username.length>20){
            formerrors.usernameerror="please enter less than  20 characters" 
        }

        if(!password){
            formerrors.passworderror="please enter password"
        }else if(password.length>20){
            formerrors.passworderror="please enter less than 20 characters" 
        }
        return formerrors
    }

     const hitapi=async(username,password)=>{
            try{
                const {data}= await axios.post('https://dummyjson.com/auth/login',{
                     "username": username,
                "password": password
                })
                setform(data)
                console.log(data)
            }
            catch(error){
              console.log(error)
            }
        
     }

    return (
        <>
            <form onSubmit={onsubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="username" className="form-label">username:</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter email" name="username" ref={usernameref}/>
                    <span  style={{color:"red"}}>{errors?.usernameerror}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" ref={passwordref} />
                    <span  style={{color:"red"}}>{errors?.passworderror}</span>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                Object.keys(formdata).length>0?
                <>
                <h4>username:{formdata?.username}</h4>
                <h4>email:{formdata?.email}</h4>
                <h4>firstname:{formdata?.firstName}</h4>
                <h4>gender:{formdata?.gender}</h4>
                </>
    :<h2>no data found</h2>
            
        }

        </>
    );
};

export default Login;
