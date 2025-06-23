import React from 'react'
import Header from "./../components/Header/index";
import SignUpComp from '../components/SignInSignUp';

const SignUp = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignUpComp/>
      </div>
    </div>
  )
}

export default SignUp;