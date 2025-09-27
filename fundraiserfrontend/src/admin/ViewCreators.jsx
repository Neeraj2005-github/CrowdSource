import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewCreators.css";

export default function ViewCreators() {
    const [creators, setCreators] = useState([]);
    const [error, setError] = useState("");

    const displayCreators = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/viewallcampaigncreators`);
            setCreators(response.data);
        } catch (err) {
            setError("Failed to fetch campaign creators data ... " + err.message);
        }
    };

    useEffect(() => {
        displayCreators();
    }, []);

    const deleteCreator = async (cid) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/deletecreator?cid=${cid}`);
            toast.success(response.data);
            displayCreators();
        } catch (err) {
            console.log(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message);
        }
    };

    return (
        <div className="view-creators-container">
            <h3 className="view-creators-title">View All Campaign Creators</h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <p className="error-text">{error}</p>
            ) : creators.length === 0 ? (
                <p className="no-data-text">No Campaign Creators Data Found</p>
            ) : (
                <table className="creators-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Company Name</th>
                            <th>Creator Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creators.map((creator) => (
                            <tr key={creator.id}>
                                <td>{creator.id}</td>
                                <td>{creator.name}</td>
                                <td>{creator.gender}</td>
                                <td>{creator.dob}</td>
                                <td>{creator.email}</td>
                                <td>{creator.username}</td>
                                <td>{creator.mobileno}</td>
                                <td>{creator.company_name}</td>
                                <td>{creator.creator_location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteCreator(creator.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
