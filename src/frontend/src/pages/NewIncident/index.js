import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() 
{
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValeu] = useState('');

    async function handleNewIncident(e)
    {
        e.preventDefault();

        try 
        {
            await api.post('incidents', { title, description, value }, 
            {
                headers: { Authorization: ongId }
            });

            history.push('/profile');
        }
        catch (error)
        {
            alert(`Tente novamente!`);
        }
    }

    return (
        <div className="new-incident-container">

            <div className="content">

                <section className="form">

                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>

                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValeu(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            
            </div>

        </div>
    );
}
