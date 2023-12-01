import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

      if (response.status === 200) {
        //const user = await response.json();
        //console.log('Login bem-sucedido!', user);
        console.log('Login bem-sucedido!');
        navigate('/home');
      } else {
        const errorMessage = await response.text();
        console.error(`Erro durante o login. Status: ${response.status}, Message: ${errorMessage}`);

        if (response.status === 403) {
            setError('Usuário ou senha incorretos');
            setTimeout(() => { setError(null); }, 3000);
        } else if (response.status == 500) {
            setError('Usuário não existe');
            setTimeout(() => { setError(null); }, 3000);
        } else {
            setError('Ocorreu um erro durante o login');
            setTimeout(() => { setError(null); }, 3000);
        }
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setError('Ocorreu um erro durante o login');
    }

  };

  return (
    <div className='container'>
      <main className='my-5'>
        <h2 className='text-center'>Login</h2>
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
          <button type='submit' className='btn btn-primary'>Login</button>
          <br></br>
          <br></br>
          Não possui uma conta? <Link to="/register">Cadastrar</Link>
        </form>
      </main>
    </div>
  );
}
