import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate("/login")
        }
        
    }, [dispatch, navigate, successDelete, userInfo])

    const deletHandler = (id) => {
        if(window.confirm(`Are you sure you want to delete user ${id}?`)) {
            dispatch(deleteUser(id))
        }
        
    }
    return (
        <div>
            <h1 className="text-center">Users</h1>
            {loading 
                ? (<Loader/>)
                : error 
                    ? (<Message variant="danger">{ error }</Message>)
                    : (
                        <Table striped bordered hover responsive className="table-sm" style={{border: "solid 1px"}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>EDIT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className="fa fa-check" style={{color: "green"}}></i>
                                        ) : (
                                            <i className="fa fa-times" style={{color: "red"}}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/administration/user/${user._id}/edit`} >
                                                <Button variant="warning" className="btn-sm">
                                                <i className="fa fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant="danger"className="btn-sm" onClick={() => deletHandler(user._id)}>
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen;
