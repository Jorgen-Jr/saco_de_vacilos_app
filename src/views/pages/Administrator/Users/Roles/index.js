import React, { useState } from 'react';

import './style.css';

import Toast from '../../../../components/Toast';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import api from '../../../../../services/api';

import { FormSelect } from '../../../../components/Form/FormSelect';
import { FormInput } from '../../../../components/Form/FormInput';

import { enableButton } from '../../../../../util';

const Roles = ({ initial_data, parent_id }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState(initial_data);

    const [roles, setRoles] = useState([]);
    const [selected_role, setSelectedRole] = useState(0);
    const [name, setName] = useState([]);
    
    const columns = [
        {
            Header: 'Nome da Role',
            accessor: 'name',
        },
        {
            Header: 'Descrição',
            accessor: 'role',
        },
        {
            Header: 'Excluir',
            accessor: 'virtualkey',
        }
    ];

    async function getRoles() {
        await api.get('/users/roles/').then(res => {
            const result = res.data.map(item => {
                return {
                    id: item.name,
                    name: item.name,
                }
            })
            setRoles(result);
        });
    }
    
    async function newHandler(event) {
        event.preventDefault();

        if(!roles.length){
            await getRoles();
        }

        setModalOpen(true);
    }

    function handleSelectedRole(event){
        setSelectedRole(event);
        setName(event);
    }

    async function refreshData() {
        const result = await api.get('/users/bypk/' + parent_id).then(res => {
            return res.data;
        });
        setData(result.roles);
    }

    async function saveHandler(event) {
        event.preventDefault();

        let success = false;

        //Bloquear o botão de salvar para evitar requisições desnecessárias.
        enableButton('btn-save', false);
        if (await checkfields()) {
            await api.post('/users/' + parent_id + '/roles/', {
                name,
                desc: null,
            }).then(res => {
                success = res.status === 200 ? true : false;
            }).catch(err => {
                console.error(err.message);
                Toast('Ocorreu um erro ao salvar.', 'error');
            });
            if (success) {
                Toast('Registro salvo com sucesso.', 'success');
                await refreshData();
                setModalOpen(false);
            }
        }

        //Reabilitar o botão
        enableButton('btn-save', true);
    }

    async function checkfields() {
        // if (!selected_modalidade) {
        //     Toast('Selecione um subproduto.', 'warning');
        //     return false;
        // }
        return true;
    }

    async function deleteHandler(event) {
        event.preventDefault();

        const selected_name = event.currentTarget.id;
        console.log(selected_name);
        const success = await api.delete('/users/' + parent_id + '/roles/', {
            name: selected_name,
            desc: null,
        }).catch(err => {
            Toast('Ocorreu um erro ao excluir o registro.', 'error');
            console.error(err)
            return false;
        });

        if (success) {
            Toast('Removido com sucesso.', 'success');
            await refreshData();
        }
    }

    function cancelHandler(event) {
        event.preventDefault();

        setModalOpen(false);

        return false;
    }
    return (
        <>
            <div className="btn-group-right">
                <button
                    className="btn-success"
                    onClick={newHandler}
                >
                    Adcionar
                </button>
            </div>
            <div className="app-grid">
                {data.length ?
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="Tabela de Subprodutos do Beneficiario">
                            <TableHead>
                                <TableRow>
                                    {columns.map(item => (
                                        <TableCell component="th" scope="row" key={item.accessor}>
                                            {item.Header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row" >{item.name}</TableCell>
                                        <TableCell component="th" scope="row" >{item.desc ? item.desc : 'Não Informado'}</TableCell>
                                        <TableCell component="th" scope="row" >
                                            <IconButton
                                                id={item.name}
                                                onClick={deleteHandler}
                                                size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <h1 className="app-subtitle">
                        Não existem roles cadastradas para este usuário.
                    </h1>
                }
            </div>
            <div className="app-store">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modal"
                    open={modalOpen}
                    onClose={(() => setModalOpen(!modalOpen))}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <div className="modal-body">
                            <div className="modal-header">
                                <div className="btn-group-right">
                                    <IconButton onClick={() => setModalOpen(!modalOpen)}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <h1 className="app-subtitle">Status do Formulário: Novo</h1>
                            <form>
                                {/* Role */}
                                <FormSelect
                                    label="Role:"
                                    name="role"
                                    className="input"
                                    placeholder="role."
                                    data={roles}
                                    value={selected_role}
                                    onChange={event => handleSelectedRole(event.target.value)}
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

                                {/* Botões de edição */}
                                <div className="btn-group">
                                    <label className="form-label"></label>
                                    <button
                                        id="btn-save"
                                        className="btn-success"
                                        onClick={saveHandler}
                                    >Adcionar</button>
                                    <button
                                        className="btn-primary"
                                        onClick={cancelHandler}
                                    >Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    );
}

export default (Roles);
