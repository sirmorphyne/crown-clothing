import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.style.scss';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state ={
             email: '',
            password: ''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleSubmit= async event => {
        event.preventDefault();
        const {email,password}=this.state;
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''});
        }
        catch(error){
            console.log(error);
        }
        this.setState({email:'',password:''});
    };
    handleChange= event => {
        const {value,name} = event.target; 
        this.setState({[name]: value});
    }; 
    render(){
        return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit={this.handleSubmit}>np
           
            <FormInput name="email" type="email" value={this.state.email}  handleChange={this.handleChange} label='email' required/>
            
            
            <FormInput name='password' type='password' value={this.state.password} handleChange={this.handleChange} label='password' required/>
            <div className='buttons'>
            <CustomButton type="submit" value="Submit Form">SIGN IN</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
            </div>
            </form>
            </div>
        
        
        );
    }
}

export default SignIn;