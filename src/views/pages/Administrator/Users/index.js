import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import './style.css';

import Layout from './../../Layout';

import api from './../../../../services/api';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Table from './../../../components/Table';
import * as TableActions from './../../../../store/actions/table';

import Toast from './../../../components/Toast';
import Loading from './../../../components/Loading';

import { FormInput } from './../../../components/Form/FormInput';
import { FormCheckbox } from './../../../components/Form/FormCheckbox';

import Roles from './Roles';

const Users = ({ table, dispatch }) => {
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [active, setActive] = useState('');
    const [userid, setUserId] = useState('Novo');
    const [roles, setRoles] = useState([]);
    const [formstatus, setFormstatus] = useState('browse');
    const [renderTable, setRenderTable] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    function handleTabChange(event, newValue) {
        setTabValue(newValue);
    }

    const columns = [
        {
            Header: 'Nome',
            accessor: 'name',
        },
        {
            Header: 'Login',
            accessor: 'login',
        },
        {
            Header: 'E-Mail',
            accessor: 'email',
        },
        {
            Header: 'Editar',
            accessor: 'id',
        },
    ];

    async function getTableData() {
        await api.get('/users').then(res => {
            const response = res.data;

            dispatch(TableActions.updateTable(columns, response));
            setRenderTable(true);
        });
    }

    //Renderizar a tabela.
    useEffect(() => {
        if (table.selected_id) {
            updateHandler(table.selected_id);
        } else {
            getTableData();
        }
        //TODO
        // Make function callback for useEffect :)
        // eslint-disable-next-line
    }, [table.selected_id]);

    //Verificar se o nome de usuário está disponível.
    useEffect(() => {
        async function isLoginAvailable() {
            const res = await api.get('/users/isLoginAvailable/' + login).then(res => {
                return res.data;
            });
            return res;
        }
        if (login) {
            let isLoginValid = isLoginAvailable();
            if (isLoginValid === false) {
                Toast('Login indisponível, favor usar outro login.', 'warning');
                console.log('Login indisponível.')
            }
        }
        //TODO
        // Make function callback for useEffect :)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    function refreshTable() {
        setRenderTable(false);
        setRenderTable(true);
    }

    async function searchHandler(event) {
        event.preventDefault();
        if (!search) {
            Toast('Preencha o campo de busca', 'warning');
            return false;
        }

        let tableData = await api.post('/users/search/', {
            query: search
        }).then(res => {
            return res.data;
        });

        await dispatch(TableActions.updateTable(columns, tableData));

        refreshTable();
    }

    function clearHandler(event) {
        event.preventDefault();

        setUserId("Novo");
        setLogin("");
        setName("");
        setEmail("");
        setActive(false);
        setSearch("");

        if (formstatus === 'browse') {
            getTableData();
        }

    }

    function newHandler(event) {
        event.preventDefault();

        setUserId('Novo');

        formStatus('new');
        setFormstatus('new');

        return false;
    }

    async function updateHandler(selectedId) {
        const response = await api.get('users/bypk/' + selectedId);

        const { name, login, email, roles } = response.data;

        formStatus('update');
        setFormstatus('update');

        setUserId(selectedId);
        setLogin(login);
        setName(name);
        setEmail(email);
        setRoles(roles);
        setActive(true);
    }

    async function saveHandler(event) {
        event.preventDefault();

        let success = false;

        let response = null;

        switch (formstatus) {
            case 'new':
                const password = "302010";

                response = await api.post('/users/', {
                    name, email, login, password
                });

                success = response.status === 200 ? true : false;

                break;
            case 'update':

                response = await api.put('/users/' + userid, {
                    name, email, login
                });

                success = response.status === 200 ? true : false;
                break;
            default:
                success = false;
                break;
        }
        if (!success) {
            Toast('Ocorreu um erro.', 'error');
        } else {
            Toast('Registro salvo com sucesso.', 'success');

            getTableData();

            formStatus('browse');
        }
    }

    function cancelHandler(event) {
        event.preventDefault();

        getTableData();

        formStatus('browse');

        return false;
    }

    function formStatus(formstatus) {
        let div_search = document.getElementById('form-search');
        let div_update = document.getElementById('form-update');
        switch (formstatus) {
            case 'new':
                div_update.style = "display: block";
                div_search.style = "display: none";
                break;
            case 'update':
                div_update.style = "display: block";
                div_search.style = "display: none";
                break;
            case 'browse':
                div_update.style = "display: none";
                div_search.style = "display: block";
                break;
            default:
                div_update.style = "display: none";
                div_search.style = "display: block";
                break;
        }

        setFormstatus(formstatus);
    }

    return (
        <Layout>
            <div className="app-container">
                <h1 className="app-title">Cadastro de Usuários</h1>
                <div className="app-module-container">
                    <div className="app-search" id="form-search">
                        <h1 className="app-subtitle">Pesquisa:</h1>
                        <form className="app-search">
                            <input
                                type="text"
                                className="input input-search"
                                placeholder="Entre com sua Busca"
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                            />
                            <div className="btn-group">
                                <button
                                    className="btn-primary"
                                    onClick={searchHandler}
                                >Pesquisar</button>
                                <button
                                    className="btn-default"
                                    onClick={clearHandler}
                                >Limpar</button>
                                <button
                                    className="btn-success"
                                    onClick={newHandler}
                                >Novo</button>
                            </div>
                        </form>

                        <div className="app-grid">
                            <div className="app-table">
                                {
                                    renderTable ?
                                        <Table />
                                        :
                                        <Loading />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="app-store" id="form-update" style={{ display: 'none' }}>
                        <AppBar position="static" >
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}

                            >
                                <Tab label="Usuário" />
                                <Tab label="Roles" />
                            </Tabs>
                        </AppBar>
                        {tabValue === 0 &&
                            <div className="tab-container">{
                                <>
                                    <h1 className="app-subtitle">Status do Formulário: {formstatus === 'new' ? 'Novo' : 'Edição'}</h1>
                                    <form className="app-form">
                                        {/* ID do registro */}
                                        <FormInput
                                            label="ID"
                                            name="ID"
                                            type="text"
                                            className="input input-id"
                                            placeholder="ID do Registro"
                                            disabled="disabled"
                                            value={userid}
                                            onChange={event => setUserId(event.target.value)}
                                        />

                                        {/* Nome do Usuário */}
                                        <FormInput
                                            label="Nome:"
                                            name="name"
                                            type="text"
                                            className="input"
                                            placeholder="Nome do usuário."
                                            value={name}
                                            onChange={event => setName(event.target.value)}
                                        />

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
                                        />

                                        {/* Usuário ativo/inativo */}
                                        <FormCheckbox
                                            label="Ativo:"
                                            name="ativo"
                                            checked={active}
                                            onChange={event => setActive(event.target.checked)}
                                        />
                                        {/* Mensagem de aviso */}
                                        <div className="form-group">
                                            <p className="label-info">Novos usuários serão criados com a senha padrão <b>"302010"</b></p>
                                        </div>
                                        <div className="btn-group">
                                            <label className="form-label"></label>
                                            <button
                                                className="btn-success"
                                                onClick={saveHandler}
                                            >Salvar</button>
                                            <button
                                                className="btn-primary"
                                                onClick={cancelHandler}
                                            >Cancelar</button>
                                            <button
                                                className="btn-default"
                                                onClick={clearHandler}
                                            >Limpar</button>
                                        </div>
                                    </form>
                                </>
                            }
                            </div>}
                        {tabValue === 1 &&
                            <div className="tab-container">{
                                <Roles
                                    initial_data={roles}
                                    parent_id={userid}
                                />
                            }
                            </div>}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default connect(state => ({ table: state.table }))(Users);
