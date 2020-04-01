import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();

    useEffect(() =>{
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        }catch(err){
            alert("Erro ao deletar caso, tente novamente");
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                    <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="submit">
                    <FiPower size={28} color="#E02041" />
                </button>
            </header>
            <h1>Caso cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÂO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}