

import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { AuthSliceAction } from "../Store/AuthSlice";
import { useNavigate } from "react-router-dom";


function LoginAndSignUp() {

    const [loggin, setloggin] = useState(false);
    const emailref = useRef();
    const passwordref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();


   async function formSubmitHandler(event) {
        event.preventDefault();
       const email = emailref.current.value;
       const password = passwordref.current.value;

       let url;
       if (loggin) {
           url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVLhHUxSl3zE0nJ3cK-S-P70pMzepRi1k"
       }
       else {
          
           
            url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVLhHUxSl3zE0nJ3cK-S-P70pMzepRi1k"
       }

       try {
           const AuthResponse = await fetch(url, {
               method: 'POST',
               body: JSON.stringify({
                   email: email,
                   password: password, 
                  returnSecureToken:true,
               }),
               headers: {
                   'Content-Type': 'application/json'
               }
           })

           if (!AuthResponse.ok) {
               throw new Error(AuthResponse.error)
           }
           else {
               const responsejson = await AuthResponse.json();
               //    dispatch(AuthSliceAction.logginHandler( responsejson.idToken));
               dispatch(AuthSliceAction.logginHandler({
                token: responsejson.idToken,
                email: email
            }));
               navigate('/')

           }
       }
       catch (error) {
           console.log(error)
           alert(error);

       }
       

    }

    function setlogginHandler() {
        setloggin((prev) => !prev);
    }


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "350px",
          backgroundColor: "#3d4248",
          borderRadius: "10px",
          color: "#ffffff",
        }}
      >
        <h3 className="text-center mb-4">Login / Sign Up</h3>
        
        <form onSubmit={formSubmitHandler}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
            ref={emailref}
              type="email"
              className="form-control bg-dark text-white border-secondary focus-ring focus-border-white shadow-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              ref={passwordref}
              type="password"
              className="form-control bg-dark text-white border-secondary focus-ring focus-border-white shadow-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                         {loggin ? 'Login' : 'Sign Up'}
                      </button>
                      
            <button onClick={setlogginHandler} className="btn btn-outline-light">
              {!loggin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAndSignUp;