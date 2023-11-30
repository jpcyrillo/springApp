import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();

      console.log('Login bem-sucedido:', user);

      if(user) {
        navigate('/home');
      }

    } catch (error) {
      console.error('Erro durante o login:', error);
      if (error.message.includes('Status: 403')) {
        setError('Usuário ou senha incorretos');
        setTimeout(() => { setError(null); }, 3000);
      } else {
        setError('Ocorreu um erro durante o login');
      }
    }
  };

  return (
    <div className='container'>
      <main className='my-5'>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='col-md-6 mx-auto'>
          {error && <div className='alert alert-danger'>{error}</div>}
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username:</label>
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
            <label htmlFor='password' className='form-label'>Password:</label>
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
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </main>
    </div>
  );
}
