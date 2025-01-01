import React, { useEffect, useState } from "react";
import "../styles/form.scss";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Populate users state
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch users");
      }
    } catch (error) {
      setError("An error occurred while fetching users.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from state
        alert("User deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData.message);
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  // Load users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="form-container">
      <div className="manage-page">
        <h1>Manage Users</h1>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : users.length > 0 ? (
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                    <button className="edit-button">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;
