import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';

export default function SupportList() {
  const [supportList, setSupportList] = useState([]);
  const [filteredSupportList, setFilteredSupportList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [show, setShow] = useState(false);
  const [replyText, setReplyText] = useState(''); // State variable to store reply text

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItemId(null);
  };

  const handleShowDeleteModal = (itemId) => {
    setSelectedItemId(itemId);
    setShowDeleteModal(true);
  };

  const editSupportItem = (itemId) => {
    setSelectedItemId(itemId);
    handleShow(); // Show the "Reply" modal when editing
  };

  const handleRemoveSupportItem = () => {
    if (selectedItemId) {
      fetch(`http://localhost:8070/ticket/delete/${selectedItemId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete support item');
          }
          const updatedList = supportList.filter((item) => item._id !== selectedItemId);
          setSupportList(updatedList);
          setFilteredSupportList(updatedList);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  useEffect(() => {
    fetch('http://localhost:8070/ticket/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch support tickets');
        }
        return response.json();
      })
      .then((data) => {
        setSupportList(data);
        setFilteredSupportList(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredSupportList([...supportList]);
    } else {
      const filtered = supportList.filter((item) =>
        item.subject.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSupportList(filtered);
    }
  };

  const sendReply = () => {
    if (selectedItemId && replyText) {
      fetch('http://localhost:8070/support/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketId: selectedItemId,
          reply: replyText,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send reply');
          }
          console.log('Reply sent successfully');
          handleClose();
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const generateReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText('Support Tickets Report', {
      x: 50,
      y: 350,
      size: 18,
      color: rgb(0, 0, 0),
    });

    let y = 320;
    filteredSupportList.forEach((item) => {
      const text = `ID: ${item._id}, User ID: ${item.customerId}, Subject: ${item.subject}, Message: ${item.message}`;
      page.drawText(text, {
        x: 50,
        y: y,
        size: 9,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="container">
      <div className="row mt-5 py-5 px-2 rounded" style={{ backgroundColor: '#CD7F32' }}>
        <div className="col-12 mt-3">
          <div className="row">
            <div className="col-8">
              <h3 className='text-light'>All Support Tickets</h3>
            </div>
            <div className='row d-flex justify-content-end'>
              <div className="col-2">
                <Link to="/replies">
                  <button className='btn btn-primary'>Replies</button>
                </Link>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-secondary"
                  onClick={generateReport}
                >
                  <FontAwesomeIcon icon={faFilePdf} /> Generate PDF
                </button>
              </div>
            </div>

            <div className="col-3">
              <form>
                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search Support Ticket"
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
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSupportList.map((item, index) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.customerId}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td className="text-danger pt-3">
                  <button
                    className="btn"
                    onClick={() => handleShowDeleteModal(item._id)}
                  >
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faTrash}
                      style={{ fontSize: 25 }}
                    />
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => editSupportItem(item._id)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>Confirm Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you confirming the removal of this support ticket?</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            variant="secondary"
            onClick={handleCloseDeleteModal}
          >
            Close
          </button>
          <button
            className="btn btn-danger"
            variant="danger"
            onClick={handleRemoveSupportItem}
          >
            Remove
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="reply">Reply:</label>
            <textarea
              className="form-control"
              id="reply"
              rows="4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button className="btn btn-primary" onClick={sendReply}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
