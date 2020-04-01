import React, { useState } from 'react';
import './style.css';
import { FiLogIn } from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();
    async function handleLogon(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            alert(`Bem bindo: ${response.data.name}`);

            history.push('/profile');
        }catch(err){
            alert("O ID solicitado não está registrado ou está errado.");
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID" />
                    <button className="button" type="submit">Enter</button>

                    <Link className="back-link" to="/register"> <FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}