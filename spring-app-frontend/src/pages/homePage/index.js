import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    return (
        <div className='container'>
            <main>
                <div>
                    <h2>Bem vindo!</h2>
                    <br></br>
                    <button className='btn btn-primary btn-block' onClick={handleButtonClick}>Login</button>
                </div>
            </main>
        </div>
    );
}
