import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function LoggedHomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/productRegister');
    };

    return (
        <div className='container'>
            <main>
                <div>
                    <button className='btn btn-primary' onClick={handleButtonClick}>Inserir</button>
                </div>
            </main>
        </div>
    );
}
