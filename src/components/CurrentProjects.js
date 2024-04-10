import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function CurrentProjects() {
    const [projects, setProjects] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [currentTab, setCurrentTab] = useState('notAccepted');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;
    const [editedCustomer, setEditedCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        notes: '',
        status: ''
    });
    const [newCustomer, setNewCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        notes: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const projectsCol = collection(db, 'marketingData');
        const projectSnapshot = await getDocs(projectsCol);
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
    };

    const updateProjectStatus = async (projectId, newStatus) => {
        try {
            const projectRef = doc(db, 'marketingData', projectId);
            await updateDoc(projectRef, {
                status: newStatus
            });

            // Update the local state to reflect the change immediately
            const updatedProjects = projects.map(project => {
                if (project.id === projectId) {
                    return { ...project, status: newStatus };
                }
                return project;
            });
            setProjects(updatedProjects);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addNewCustomer = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'marketingData'), newCustomer);
            setNewCustomer({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                city: '',
                notes: ''
            });
            fetchProjects(); // Refresh the list to include the new customer
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    const handleEdit = (project) => {
        setEditingId(project.id);
        setEditedCustomer({ ...project });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveEdit = async () => {
        if (editingId) {
            const projectRef = doc(db, 'marketingData', editingId);
            await updateDoc(projectRef, { ...editedCustomer });
            fetchProjects();
            setEditingId(null);  // Exit editing mode
        }
    };

    // Function to filter projects based on selected tab
    // Function to filter projects based on selected tab and paginate
    const getFilteredProjects = () => {
        const filteredProjects = projects.filter(project => {
            if (currentTab === 'notAccepted') {
                return project.status !== 'bid accepted';
            } else {
                return project.status === 'bid accepted';
            }
        });

        // Calculate the first and last indices of the projects on the current page
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;

        // Return only the projects for the current page
        return filteredProjects.slice(startIndex, endIndex);
    };


    const totalPages = () => {
        const filteredProjects = projects.filter(project => {
            if (currentTab === 'notAccepted') {
                return project.status !== 'bid accepted';
            } else {
                return project.status === 'bid accepted';
            }
        });
        return Math.ceil(filteredProjects.length / projectsPerPage);
    };

    const goToNextPage = () => {
        setCurrentPage(page => Math.min(page + 1, totalPages()));
    };

    const goToPreviousPage = () => {
        setCurrentPage(page => Math.max(page - 1, 1));
    };


    return (
        <div>



            <form onSubmit={addNewCustomer}>
                <input type="text" name="firstName" placeholder="First Name" value={newCustomer.firstName} onChange={handleInputChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={newCustomer.lastName} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
                <input type="text" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" value={newCustomer.city} onChange={handleInputChange} />
                <textarea name="notes" placeholder="Notes" value={newCustomer.notes} onChange={handleInputChange} />
                <button type="submit">Add Customer</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button onClick={() => setCurrentTab('notAccepted')}>Bids Not Accepted</button>
                <button onClick={() => setCurrentTab('accepted')}>Bids Accepted</button>
            </div>



            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getFilteredProjects().map(project => (
                        <tr key={project.id}>
                            {editingId === project.id ? (
                                // Editable fields
                                <>
                                    <td><input type="text" name="firstName" value={editedCustomer.firstName} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="lastName" value={editedCustomer.lastName} onChange={handleEditChange} /></td>
                                    <td><input type="email" name="email" value={editedCustomer.email} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="phone" value={editedCustomer.phone} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="city" value={editedCustomer.city} onChange={handleEditChange} /></td>
                                    <td><input type="text" name="notes" value={editedCustomer.notes} onChange={handleEditChange} /></td>
                                    <td>
                                        <select name="status" value={editedCustomer.status} onChange={handleEditChange}>
                                            <option value="select one">select one</option>

                                            <option value="inquiry">inquiry</option>
                                            <option value="appointment scheduled">appointment scheduled</option>
                                            <option value="bid needed">bid needed</option>
                                            <option value="bid sent">bid sent</option>
                                            <option value="bid accepted">bid accepted</option>
                                        </select>
                                    </td>
                                </>
                            ) : (
                                // Display fields
                                <>
                                    <td>{project.firstName}</td>
                                    <td>{project.lastName}</td>
                                    <td>{project.email}</td>
                                    <td>{project.phone}</td>
                                    <td>{project.city}</td>
                                    <td>{project.notes}</td>
                                    <td>{project.status}</td>
                                </>
                            )}
                            <td>
                                {editingId === project.id ? (
                                    <button onClick={saveEdit}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(project)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages()}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages()}>Next</button>
            </div>
        </div>
    );
}

export default CurrentProjects;
