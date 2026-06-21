import { auth } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";



export default function LogIn(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const[err, setErr] = useState(null);


    async function login(){
        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/profile')
        }
        catch(error){
            console.log(error.code)
            setErr(error.message)
            setEmail('')
            setPassword('')
        }
    }



	return (
		<main className="login-page">
			<form className="login-form">
				<label>
					Email
					<input 
                    type="email" 
                    placeholder="Email..."
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    />
				</label>

				<label>
					Password
					<input 
                    type="password" 
                    placeholder="Password..." 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
				</label>
                {err&&
                <p className='error-message'>{err}</p>
                }
				<button type='button' onClick={login}>Log in</button>
			</form>
		</main>
	)
}

