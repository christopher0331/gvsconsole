import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function CurrentProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const projectsCol = collection(db, 'marketingData'); // assuming your collection is named marketingData
        const projectSnapshot = await getDocs(projectsCol);
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
    };

    const updateProjectStatus = async (projectId, newStatus) => {
        const projectRef = doc(db, 'marketingData', projectId);
        await updateDoc(projectRef, {
            status: newStatus
        });
        
        fetchProjects();  // refresh the data after updating
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.firstName}</td>
                            <td>{project.lastName}</td>
                            <td>{project.email}</td>
                            <td>{project.phone}</td>
                            <td>{project.status}</td>
                            <td>
                                {["pending bid","bid sent","bid accepted","half down","project started","project completed","final payment received"].map(status => (
                                    <button key={status} onClick={() => updateProjectStatus(project.id, status)}>
                                        {status}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CurrentProjects;
