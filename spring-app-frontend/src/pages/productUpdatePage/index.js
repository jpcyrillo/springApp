import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

export default function ProductUpdatePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');

    const handleCancelClick = () => {
            navigate('/home');
    };

    const fetchProductDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product/find?id=${id}`);

            if (!response.ok) {
                console.error('Erro ao obter detalhes do produto');
                return;
            }

            const productDetails = await response.json();
            setName(productDetails.name);
        } catch (error) {
            console.error('Erro ao obter detalhes do produto', error);
        }
    };


    useEffect(() => {
        fetchProductDetails();
    }, []);

    const handleUpdateClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name }),
            });

            if (response.ok) {
                navigate('/home');
            } else {
                console.error('Erro ao atualizar o produto');
            }
        } catch (error) {
            console.error('Erro ao realizar a atualização', error);
        }
    };

    return (
        <div className='container'>
            <main>
                <center>
                    <div>
                        <h2>Atualizar Produto</h2>
                    </div>
                    <br />
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>Produto:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <br />
                        <button className='btn btn-primary' style={{ marginRight: '10px' }} onClick={handleUpdateClick}>
                            Atualizar
                        </button>
                        <button className='btn btn-primary' onClick={handleCancelClick}>
                            Cancelar
                        </button>
                    </div>
                </center>
            </main>
        </div>
    );
}