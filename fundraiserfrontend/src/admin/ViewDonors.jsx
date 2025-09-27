import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewDonors.css";

export default function ViewDonors() {
    const [donors, setDonors] = useState([]);
    const [error, setError] = useState("");

    const displayDonors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/viewalldonors`);
            setDonors(response.data);
        } catch (err) {
            setError("Failed to fetch donors data ... " + err.message);
        }
    };

    useEffect(() => {
        displayDonors();
    }, []);

    const deleteDonor = async (did) => {
        if (!did) {
            toast.error("Invalid donor ID");
            return;
        }

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/deletedonor?did=${did}`);
            toast.success(response.data?.message || "Donor deleted successfully");
            displayDonors();
        } catch (err) {
            console.error(err);
            setError("Unexpected Error Occurred... " + err.message);
            toast.error("Deletion failed: " + err.message);
        }
    };

    return (
        <div className="view-donors-container">
            <h3 className="view-donors-title">View All Donors</h3>

            <ToastContainer position="top-center" autoClose={4000} />

            {error ? (
                <p className="error-text">{error}</p>
            ) : donors.length === 0 ? (
                <p className="no-data-text">No Donor Data Found</p>
            ) : (
                <table className="donors-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Mobile No</th>
                            <th>Location</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor.id}>
                                <td>{donor.id}</td>
                                <td>{donor.name}</td>
                                <td>{donor.gender}</td>
                                <td>{donor.dob}</td>
                                <td>{donor.email}</td>
                                <td>{donor.username}</td>
                                <td>{donor.mobileno}</td>
                                <td>{donor.location}</td>
                                <td>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteDonor(donor.id)}
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
