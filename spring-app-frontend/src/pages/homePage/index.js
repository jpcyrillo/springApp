import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    return (
        <div className='container'>
            <main>
                <div>
                    <button onClick={handleButtonClick}>Sair</button>
                </div>
            </main>
        </div>
    );
}
