import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { faMagnifyingGlass, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument, rgb } from 'pdf-lib';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['Cars', 'Photographers', 'Users', 'Bookings'];
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};
export const data = {
    labels,
    datasets: [
        {
            label: 'Active',
            data: [4, 15, 7, 20],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Inactive',
            data: [3, 5, 14, 15],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [managers, setManagers] = useState([]);
    const [filteredManagers, setFilteredManagers] = useState([]);
    const [error, setError] = useState(null);
    const pdfBlobRef = useRef(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [selectedManagerId, setSelectedManagerId] = useState(null);



    const handleClose = () => setShow(false);
    const handleShow = (managerId) => {
        setSelectedManagerId(managerId);
        setShow(true);
    };

    useEffect(() => {
        // Fetch manager data from your API or route
        fetch('http://localhost:8070/manager/') // Replace with your API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                setManagers(data);
                setFilteredManagers(data); // Initialize filtered managers with all managers
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        if (pdfBlobRef.current) {
            const pdfUrl = URL.createObjectURL(pdfBlobRef.current);
            window.open(pdfUrl);
        }
    }, [pdfBlobRef]);


    //pdf generation
    const createPdf = async (managerData) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        page.drawText('Details of Managers', {
            x: 50,
            y: 750,
            size: 18,
            color: rgb(0, 0, 0),
        });
        let y = 720;
        managerData.forEach((data) => {
            Object.entries(data).forEach(([key, value]) => {
                page.drawText(`${key}: ${value}`, {
                    x: 50,
                    y: y,
                    size: 9,
                    color: rgb(0, 0, 0),
                });
                y -= 20;
            });
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        pdfBlobRef.current = pdfBlob;

        window.open(pdfUrl);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredManagers([...managers]);
        } else {
            const filtered = managers.filter((manager) =>
                manager.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredManagers(filtered);
        }
    };

    const navigateToEditManager = (managerId) => {
        navigate(`/editmanager/${managerId}`);
    };

    const removeManager = () => {
        // Send a request to delete the manager with the selectedManagerId
        fetch(`http://localhost:8070/manager/delete/${selectedManagerId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete manager');
                }
                // Update the managers list after successful deletion
                const updatedManagers = managers.filter(
                    (manager) => manager._id !== selectedManagerId
                );
                setManagers(updatedManagers);
                setFilteredManagers(updatedManagers); // Update filtered managers as well
                handleClose();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

   

    return (
        <div className="container ">
            <h1 className='pt-5 font-weight-bold'>Admin Dashboard</h1>
            <div className='d-flex justify-content-end'>
                <Link to="/supportlist"><button className='btn mx-5 btn-primary'>Customer Support</button></Link><br/>
                <Link to="/addticket"><button className='btn btn-primary'>Add Ticket +</button></Link>
            </div>
            <div className='row d-flex justify-content-center mt-5 pt-5'>
                <div className='col-7 pt-5'>
                    <div className='d-flex justify-content-center'>
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>

            <div className="row mt-5 mb-5 py-5 px-2 rounded" style={{ backgroundColor: '#11d1f4' }}>
                <div className="col-12 mt-3" >
                    <div className="row">

                        <div className="col-8">
                            <h2 className='text-light'>Managers</h2>
                        </div>
                        <div className="col-3">
                            <Link to="/addmanager">
                                <button className="btn btn-primary col-12">Add Manager +</button>
                            </Link>
                        </div>
                        <div className="col-2 mb-2">
                            <button
                                className="btn btn-success col-12"
                                onClick={() => createPdf(filteredManagers)}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                    <div className="col-3 ">
                        <form action="">
                            <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="Search Manager"
                                        aria-describedby="button-addon1"
                                        className="form-control border-0 bg-light"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            id="button-addon1"
                                            type="submit"
                                            className="btn btn-link text-primary"
                                        >
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <table className="table ">
                    <thead>
                        <tr>
                            
                            <th scope="col">Name</th>    
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Department</th>
                        
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredManagers.map((manager, index) => (
                            <tr key={index}>
                                <td>{manager.name}</td>
                                <td>{manager.email}</td>
                                <td>{manager.contact}</td>
                                <td>{manager.department}</td>
                        
                                <td className="text-danger pt-3">
                                    <button
                                        className="btn"
                                        onClick={() => handleShow(manager._id)}
                                    >
                                        <FontAwesomeIcon
                                            className="text-danger"
                                            icon={faTrash}    //delete icon
                                            style={{ fontSize: 25 }}
                                        />
                                    </button>

                                </td>
                                <td>
                                    <button
                                        onClick={() => navigateToEditManager(manager._id)}
                                        className="btn btn-link text-success mt-2"
                                    > 
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 25 }} /> 
                                    </button>

                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && <div className="alert alert-danger">{error}</div>}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>Do you want to remove this manager?</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button
                            className="btn btn-danger"
                            variant="danger"
                            onClick={removeManager}
                        >

                    
                            Remove
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
