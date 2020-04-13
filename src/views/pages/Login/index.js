import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import './style.css';
import logo from '../../../assets/image/onda_azul_prime.png';

import Toast from '../../components/Toast';

import { connect } from 'react-redux';
import * as UserActions from '../../../store/actions/user';

const Login = ({ user, dispatch }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(()  => {
        document.title = "Login"
    },[]);

    async function handleSubmit(event){
        event.preventDefault();
        //Verificar se todos o campos estão preenchidos antes da primeira requisição.
        if(!username || !password){
            Toast('Que vacilo! Você não preencheu todos os campos.', 'warning');
            return false;
        }

        //Bloquear o botão de login para evitar requisições desnecessárias.
        let btn_login = document.getElementById('btn_login');
        btn_login.setAttribute('disabled', 'disabled');
        btn_login.classList.add('waiting');

        //Tentar realizar a requisição.
        try{
            const response = await api.post('/users/login', { username, password });

            const { data } = response;

            console.log(data);
            data.login_date = new Date();

            dispatch(UserActions.login(JSON.stringify(data)));

            //TODO, método de redirecionamento vannila não fica legal :(
            window.location = '/Dashboard';
        }
        catch( error ){
            Toast('Vacilou na senha ou usuario, verifique se suas credenciais estão corretas..', 'warning');

            btn_login.classList.remove('waiting');
            btn_login.removeAttribute('disabled');
        }
    }

    return (
        <div className="login-content">
            <div className="login-background"></div>
            <div className="login-background-2"></div>
            <div className="app-logo">
                <div className="text-intro">
                    <h1 style={{fontWeight:"bold"}}>Rede social apenas para os vacilões.</h1>
                    <h2 style={{fontWeight:"lighter"}}>Se você nunca vacilou, nem crie uma conta. <span className="text-tiny">Mas sabemos que já :)</span></h2>
                </div>
                <div className="logo-div">
                    <img src={logo} alt="Logo" className="logo-img"/>
                </div>
            </div>
            <div className="form-container">
                <div className="login-welcome">
                    <h1 className="login-title">Entre</h1>
                    <p>Favor entrar com suas credenciais.</p>
                </div>
                
                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label htmlFor="login">Credenciais</label>
                        <input
                            id="login"
                            type="text"
                            placeholder="Login"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="login-btn-group">
                        <a href="/Login/ResetSenha" className="login-forgotpassword">Esqueceu sua senha?</a>
                        <button id="btn_login" className="btn-login" type="submit">Entrar</button>
                    </div>
                </form>
                <div className="new-user">
                    <p>Não possui Conta? Se registre em <a href="/Register">Cadastro</a></p>
                </div>
            </div>
        </div>
    );
}

export default connect(state => ({ user: state.token }))(Login);