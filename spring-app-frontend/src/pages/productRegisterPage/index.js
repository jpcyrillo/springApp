import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

export default function ProductRegisterPage() {
  const [product, setProduct] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: product }),
        });

        if (response.status === 409) {
            setError('Este produto já foi cadastrado!');
            setTimeout(() => { setError(null); }, 3000);
        }else if (response.status === 201) {
            console.log('Produto inserido com sucesso!');
            navigate('/home');
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro durante o cadastro:', error);
    }
  };

  return (
    <div className='container'>
      <main className='my-5'>
        <h2 className='text-center'>Insira um produto</h2>
        <br></br>
        <form onSubmit={handleSubmit} className='col-md-6 mx-auto'>
          {error && <div className='alert alert-danger'>{error}</div>}
            <div className='mb-3'>
                <label htmlFor='product' className='form-label'>Nome do produto:</label>
                <input
                    type='text'
                    id='product'
                    name='product'
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className='form-control'
                    required
                />
            </div>
          <button type='submit' className='btn btn-primary btn-block'>Inserir</button>
          <br></br>
          <br></br>
          <Link to="/home">Voltar</Link>
        </form>
      </main>
    </div>
  );
}
