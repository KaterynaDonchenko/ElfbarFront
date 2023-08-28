import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, fetchRegistration } from './LoginFormSlice';

import './loginForm.scss';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {accessToken} = useSelector(state => state.loginForm)
    const dispatch = useDispatch();
    const body = {email, password}
    
    return (
        <div className='login-form'>
            <div className="container">
                <div className="login-form__title">Вхід в кабінет адміністратора</div>
                <div className="login-form__wrapper">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email'/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password'/>
                    <div className="login-form__btns">
                        <button className='btn' onClick={() => dispatch(fetchLogin({...body, accessToken}))}>Log in</button>
                        {/* <button className='btn' onClick={() => dispatch(fetchRegistration({...body, accessToken}))}>Registration</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;