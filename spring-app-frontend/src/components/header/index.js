import React from 'react';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Spring Boot and ReactJS</a>
    </header>
  );
}