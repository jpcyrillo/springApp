import './style.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoggedHomePage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleButtonClick = () => {
        navigate('/productRegister');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/product/list');

                if (!response.ok) {
                    throw new Error(`Erro ao carregar a lista de produtos: Status ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();

                    // Adicionando a propriedade color aos produtos para alternar as cores
                    const coloredProducts = data.map((product, index) => ({
                        ...product,
                        color: index % 2 === 0 ? 'white' : '#f2f8fb', // Alternando entre branco e azul claro
                    }));

                    setProducts(coloredProducts);
                    setError(null);
                } else {
                    throw new Error('A resposta da API não é um JSON válido');
                }
            } catch (error) {
                console.error('Erro ao carregar a lista de produtos', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteClick = async (productId) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir este produto?');

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/product/delete?id=${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao excluir o produto: Status ${response.status}, ${errorText}`);
            }

            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
            setError(null);
        } catch (error) {
            console.error('Erro ao excluir o produto', error);
            setError(error.message);
        }
    };

        return (
            <div className='container'>
                <main>
                    <center>
                        <div>
                            <h2>Lista de Produtos</h2>
                        </div>
                        <br></br>
                        <div className='product-list-container'>
                            <ul className='product-list'>
                                {products.map((product) => (
                                    <li key={product.id} style={{ backgroundColor: product.color }}>
                                        <span>{product.name}</span>
                                        <button className='btn btn-delete' onClick={() => handleDeleteClick(product.id)}>
                                            Deletar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <button className='btn btn-primary' onClick={handleButtonClick}>
                                Inserir
                            </button>
                        </div>
                    </center>
                </main>
            </div>
        );
}
