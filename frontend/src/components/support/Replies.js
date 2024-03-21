import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { faTrash, faFilePdf, faPen } from '@fortawesome/free-solid-svg-icons';

export default function Replies() {
    const { id } = useParams();
    const [replies, setReplies] = useState([]);
    const [error, setError] = useState(null);
    const [selectedReply, setSelectedReply] = useState(null);
    const [editedReply, setEditedReply] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Fetch all replies from "http://localhost:8070/support/"
        fetch('http://localhost:8070/support/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch replies');
                }
                return response.json();
            })
            .then((data) => {
                // Fetch ticket details for each reply
                const promises = data.map((reply) => {
                    return fetch(`http://localhost:8070/ticket/get/${reply.ticketId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch ticket data');
                            }
                            return response.json();
                        });
                });

                // Wait for all promises to resolve
                Promise.all(promises)
                    .then((ticketData) => {
                        // Combine the reply data with the corresponding ticket data
                        const combinedData = data.map((reply, index) => ({
                            ...reply,
                            ticket: ticketData[index],
                        }));
                        setReplies(combinedData);
                    })
                    .catch((err) => {
                        setError(err.message);
                    });
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleEditClick = (reply) => {
        setSelectedReply(reply);
        setEditedReply(reply.reply);
        handleShow();
    };

    const handleEditSubmit = () => {
        if (!selectedReply) return;

        const updatedReply = { ...selectedReply, reply: editedReply };

        // Update reply on the server
        fetch(`http://localhost:8070/support/update/${selectedReply._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReply),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update reply');
                }
                // Redirect to '/replies' after successful update
                navigate('/replies');
            })
            .catch((err) => {
                setError(err.message);
            });

        handleClose();
    };

    return (
        <div className="container">
            <div className="row mt-5 py-5 px-2 rounded" style={{ backgroundColor: '#CD7F32' }}>
                <div className="col-12 mt-3">
                    <div className="row">
                        <div className="col-8">
                            <h3 className='text-light'>Ticket Replies</h3>
                        </div>
                        <div className="col-3">
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                                <th scope="col">Reply</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {replies.map((reply, index) => (
                                <tr key={index}>
                                    <td>{reply.ticket.subject}</td>
                                    <td>{reply.ticket.message}</td>
                                    <td>
                                        <ul>
                                            <li>{reply.reply}</li>
                                        </ul>
                                    </td>
                                    <td>
                                        <FontAwesomeIcon className='text-warning'
                                            icon={faPen}
                                            onClick={() => handleEditClick(reply)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        value={editedReply}
                        onChange={(e) => setEditedReply(e.target.value)}
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleEditSubmit}>
                        Update
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
