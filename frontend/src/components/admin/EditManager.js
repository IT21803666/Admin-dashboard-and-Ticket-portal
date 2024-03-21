import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditManager() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manager, setManager] = useState({
    name: '',
    email: '',
    contact: '',
    department: '',
  });

  useEffect(() => {
    async function fetchManagerData() {
      try {
        const response = await fetch(`http://localhost:8070/manager/get/${id}`);
        if (response.ok) {
          const data = await response.json();
          setManager(data);
        } else {
          console.error('Failed to fetch manager data');
        }
      } catch (error) {
        console.error('Error fetching manager data:', error);
      }
    }

    fetchManagerData();
  }, [id]);

  const handleUpdateManager = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8070/manager/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manager),
      });

      if (response.ok) {
        navigate('/dashboard'); // Redirect to the managers list on successful update
      } else {
        console.error('Failed to update manager');
      }
    } catch (error) {
      console.error('Error updating manager:', error);
    }
  };

  return (
    <div className="container-fluid pt-5" style={{ background: '' }}>
      <div className="container p-5 mt-5 bg-body-secondary" style={{ borderRadius: 20 }}>
        <h1 className="mt-3 text-center">Edit Manager</h1>
        <div className="container">
          <form onSubmit={handleUpdateManager} className='text-start'>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="name"> Manager ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    value={id}
                    placeholder="Manager ID"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="name"> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    value={manager.name}
                    onChange={(e) => setManager({ ...manager, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email"> Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    value={manager.email}
                    onChange={(e) => setManager({ ...manager, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="contact"> Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    aria-describedby="emailHelp"
                    placeholder="Enter Contact"
                    value={manager.contact}
                    onChange={(e) => setManager({ ...manager, contact: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="department"> Division</label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    aria-describedby="emailHelp"
                    placeholder="Enter Division"
                    value={manager.department}
                    onChange={(e) => setManager({ ...manager, department: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
