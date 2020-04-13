import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import api from './../../../services/api';

// import { Container } from './styles';
import Layout from './../Layout';

import { FormInput } from './../../components/Form/FormInput';
import Toast from './../../components/Toast';
import './style.css';

const User = ({ user, dispatch }) => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [verpassword, setVerPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');

    const { persistedLogin } = user;

    const user_login = persistedLogin;

    const [userid] = useState(user_login.user.id);

    async function getData(selectedId) {
        const response = await api.get('users/bypk/' + selectedId);
        const { name, login, email } = response.data;

        setName(name);
        setEmail(email);
        setLogin(login);
    }

    useEffect(() => {
        getData(userid);
    }, [userid]);

    async function saveHandler(event) {
        event.preventDefault();

        let success = false;

        let response = null;

        if (await checkFields()) {
            response = await api.put('/users/' + userid, {
                name, email, login, password: newpassword
            });

            console.log(response);

            success = response.status === 200 ? true : false;

            if (!success) {
                Toast('Ocorreu um erro.', 'error');
            } else {
                Toast('Registro salvo com sucesso.', 'success');
            }
        }
    }

    async function checkPassword() {
        const response = await api.post('/users/login', { login, password }).then(res => {
            return res.status;
        }).catch(err => {
            return false;
        });

        return response === 200 ? true : false;
    }

    async function checkFields() {
        if (!password) {
            Toast('Preencha o campo de senha atual.', 'warning')
            return false;
        }

        const isPasswordCorrect = await checkPassword();

        if (isPasswordCorrect) {

            if (!verpassword) {
                Toast('Preencha o campo de nova senha.', 'warning')
                return false;
            }
            if (!newpassword) {
                Toast('Preencha o campo de confirmação de senha.', 'warning')
                return false;
            }

            if (verpassword === newpassword) {
                return true
            } else {
                Toast('As senhas não são iguais.', 'warning');
            }
        } else {
            Toast('Senha incorreta!', 'warning');
        }
        return false;
    }

    return (
        <Layout>
            <div className="app-container">
                <h1 className="app-title">Configurações de Usuários</h1>
                <div className="app-module-container">
                    <h1 className="app-subtitle" style={{ textAlign: 'center' }}>{user_login.user.name}</h1>
                    <div className="app-store" id="form-update">
                        <form className="app-form" onSubmit={saveHandler}>
                            {/* Email do usuário */}
                            <FormInput
                                label="E-Mail:"
                                name="email"
                                className="input"
                                placeholder="Email do Usuário"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />

                            {/* Login do usuário */}
                            <FormInput
                                label="Login:"
                                name="login"
                                className="input"
                                placeholder="Login do usuário."
                                value={login}
                                onChange={event => setLogin(event.target.value)}
                                disabled="disabled"
                            />
                            {/* Senha stual do usuário */}
                            <FormInput
                                label="Senha Atual:"
                                name="current_password"
                                className="input"
                                type="password"
                                placeholder="Digite a sua senha atual."
                                value={password}
                                onChange={(event) => (setPassword(event.target.value))}
                            />
                            {/* Nova senha do usuário */}
                            <FormInput
                                label="Nova Senha:"
                                name="ver_password"
                                className="input"
                                type="password"
                                placeholder="Digite sua nova senha."
                                value={verpassword}
                                onChange={(event) => (setVerPassword(event.target.value))}
                            />
                            {/* confirmar nova senha do usuário */}
                            <FormInput
                                label="Repita Senha:"
                                name="new_passowrd"
                                className="input"
                                type="password"
                                placeholder="Confirme sua senha."
                                value={newpassword}
                                onChange={(event) => (setNewPassword(event.target.value))}
                            />
                            <div className="btn-group">
                                <label className="form-label"></label>
                                <button
                                    className="btn-success"
                                    type="submit"
                                >Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default connect(state => ({ user: state.user }))(User);