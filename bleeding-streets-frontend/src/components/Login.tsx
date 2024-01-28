import axios from 'axios';
import React, { useState } from 'react';

type Credentials = {
    username: string,
    password: string
  }

async function LoginUser({ username, password }: Credentials) {
    console.log('LoginUser()')
    return axios.post(`http://localhost:5236/Auth/Login`, { username, password })
        .then(res => {
        console.log(res);
        return res.data.data;
  })
}

export default function Login({setToken, setUsername}: any) {
    const [name, setUserName] = useState<string>('');
    const [pw, setPassword] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = await LoginUser({
          username: name,
          password: pw
        });
        console.log(token);
        setToken(token);
        setUsername(name);
    }
    
    return(
        <>
            <div className="container mx-auto">
                <div className='flex justify-center'>
                    <div>
                        <img className="w-60 mb-6 mt-8" src={require('../images/bleeding-streets-logo.jpg')} alt="hig"></img>
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-4xl mb-6 text-center'>Login</h1>
                            <label>
                                <p className='mb-2'>Username</p>
                                <input className='w-full mb-6' type="text" onChange={e => setUserName(e.target.value)}/>
                            </label>
                            <label>
                                <p className='mb-2'>Password</p>
                                <input className='w-full mb-6' type="password" onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <div>
                                <button className='button' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}