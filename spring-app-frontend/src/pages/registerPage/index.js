import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('As senhas não coincidem');
      setTimeout(() => { setError(null); }, 3000);
      return;
    }

    try {
        const response = await fetch('http://localhost:8080/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 409) {
            setError('Nome de usuário não disponível');
            setTimeout(() => { setError(null); }, 3000);
        } else if (response.status === 201) {
            console.log('Cadastro bem-sucedido');
            navigate('/login');
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
        <h2 className='text-center'>Insira as informações</h2>
        <br></br>
        <form onSubmit={handleSubmit} className='col-md-6 mx-auto'>
          {error && <div className='alert alert-danger'>{error}</div>}
            <div className='mb-3'>
                <label htmlFor='username' className='form-label'>Nome de usuário:</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='form-control'
                    required
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Senha:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                    required
                />
            </div>
            <div className='mb-3'>
                <label htmlFor='password2' className='form-label'>Digite sua senha novamente:</label>
                <input
                    type='password'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className='form-control'
                    required
                />
            </div>
          <button type='submit' className='btn btn-primary btn-block'>Cadastrar</button>
          <br></br>
          <br></br>
          <Link to="/login">Voltar</Link>
        </form>
      </main>
    </div>
  );
}
