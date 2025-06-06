// import { useEffect, useState } from 'react';

// export default function ManageUsers({ isLoading, setIsLoading }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [formUsername, setFormUsername] = useState('');
//   const [formPassword, setFormPassword] = useState('');
//   const [formIsAdmin, setFormIsAdmin] = useState(false);
//   const [addingUser, setAddingUser] = useState(false);
//   const [toast, setToast] = useState('');

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('https://apjapi.vercel.app/getAllUsers');
//       const data = await response.json();
//       if (data.success) {
//         setUsers(data.users);
//         setError('');
//       } else {
//         setError(data.message || 'Failed to fetch users.');
//       }
//       setIsLoading(false);
//     } catch (err) {
//       setError('An error occurred while fetching users.');
//     } finally {
//       // setLoading(false);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     setAddingUser(true);
//     try {
//       const response = await fetch(
//         `https://apjapi.vercel.app/addUser/username=${formUsername}/password=${formPassword}/admin=${formIsAdmin}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setToast(data.message);
//         setFormUsername('');
//         setFormPassword('');
//         setFormIsAdmin(false);
//         setPopupOpen(false);
//         await fetchUsers();
//       } else {
//         setToast(data.message || 'Failed to add user.');
//       }
//     } catch {
//       setToast('An error occurred while adding the user.');
//     } finally {
//       setAddingUser(false);
//       setTimeout(() => setToast(''), 3000);
//     }
//   };

//   const handleDelete = async (username) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${username}?`
//     );
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `https://apjapi.vercel.app/deleteUser/username=${username}`
//       );
//       const data = await response.json();
//       if (data.success) {
//         setToast(data.message);
//         await fetchUsers();
//       } else {
//         setToast(data.message || 'Failed to delete user.');
//       }
//     } catch {
//       setToast('An error occurred while deleting the user.');
//     } finally {
//       setTimeout(() => setToast(''), 3000);
//     }
//   };

//   return (
//     <div className="manageusers-container">
//       <h2 className="manageusers-heading">All Registered Users</h2>

//       <button
//         onClick={() => setPopupOpen(true)}
//         className="manageusers-add-button"
//       >
//         + Add User
//       </button>

//       {popupOpen && (
//         <div className="manageusers-popup-overlay">
//           <div className="manageusers-popup">
//             <h3 className="manageusers-form-heading">Add New User</h3>
//             <form onSubmit={handleAddUser}>
//               <div className="manageusers-form-group">
//                 <label className="manageusers-label">Username:</label>
//                 <input
//                   type="text"
//                   value={formUsername}
//                   onChange={(e) => setFormUsername(e.target.value)}
//                   className="manageusers-input"
//                   required
//                 />
//               </div>
//               <div className="manageusers-form-group">
//                 <label className="manageusers-label">Password:</label>
//                 <input
//                   type="text"
//                   value={formPassword}
//                   onChange={(e) => setFormPassword(e.target.value)}
//                   className="manageusers-input"
//                   required
//                 />
//               </div>
//               <div className="manageusers-form-group">
//                 <label className="manageusers-label">Is Admin:</label>
//                 <input
//                   type="checkbox"
//                   checked={formIsAdmin}
//                   onChange={(e) => setFormIsAdmin(e.target.checked)}
//                   className="manageusers-checkbox"
//                 />
//               </div>
//               <div className="manageusers-popup-buttons">
//                 <button
//                   type="submit"
//                   className="manageusers-button"
//                   disabled={addingUser}
//                 >
//                   {addingUser ? 'Adding...' : 'Add User'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPopupOpen(false)}
//                   className="manageusers-button-cancel"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {toast && <div className="manageusers-toast">{toast}</div>}

//       {isLoading ? (
//         <p className="manageusers-loading">Loading users...</p>
//       ) : error ? (
//         <p className="manageusers-error">{error}</p>
//       ) : (
//         <table className="manageusers-table">
//           <thead>
//             <tr>
//               <th className="manageusers-th">Username</th>
//               <th className="manageusers-th">Password</th>
//               <th className="manageusers-th">Admin</th>
//               <th className="manageusers-th">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.docname}>
//                 <td className="manageusers-td">{user.USERNAME}</td>
//                 <td className="manageusers-td">{user.PASSWORD}</td>
//                 <td className="manageusers-td">{user.ADMIN ? 'Yes' : 'No'}</td>
//                 <td className="manageusers-td">
//                   <img
//                     src="/edit2.png"
//                     alt="Edit"
//                     className="btn manageusers-icon"
//                     onClick={() => alert('Edit functionality coming soon!')}
//                   />
//                   <img
//                     src="/delete2.png"
//                     alt="Delete"
//                     className="btn manageusers-icon"
//                     onClick={() => handleDelete(user.USERNAME)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';

export default function ManageUsers({ isLoading, setIsLoading }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formIsAdmin, setFormIsAdmin] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [toast, setToast] = useState('');
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editPassword, setEditPassword] = useState('');
  const [editIsAdmin, setEditIsAdmin] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://apjapi.vercel.app/getAllUsers');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch users.');
      }
    } catch (err) {
      setError('An error occurred while fetching users.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    try {
      const response = await fetch(
        `https://apjapi.vercel.app/addUser/username=${formUsername}/password=${formPassword}/admin=${formIsAdmin}`
      );
      const data = await response.json();
      if (data.success) {
        setToast(data.message);
        setFormUsername('');
        setFormPassword('');
        setFormIsAdmin(false);
        setPopupOpen(false);
        await fetchUsers();
      } else {
        setToast(data.message || 'Failed to add user.');
      }
    } catch {
      setToast('An error occurred while adding the user.');
    } finally {
      setAddingUser(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleDelete = async (username) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${username}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://apjapi.vercel.app/deleteUser/username=${username}`
      );
      const data = await response.json();
      if (data.success) {
        setToast(data.message);
        await fetchUsers();
      } else {
        setToast(data.message || 'Failed to delete user.');
      }
    } catch {
      setToast('An error occurred while deleting the user.');
    } finally {
      setTimeout(() => setToast(''), 3000);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditPassword(user.PASSWORD);
    setEditIsAdmin(user.ADMIN);
    setEditPopupOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/addEditedUser/username=${editUser.USERNAME}/password=${editPassword}/admin=${editIsAdmin}`
      );
      const data = await response.json();
      if (data.success) {
        setToast(data.message);
        setEditPopupOpen(false);
        await fetchUsers();
      } else {
        setToast(data.message || 'Failed to edit user.');
      }
    } catch {
      setToast('An error occurred while editing the user.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <div className="manageusers-container">
      <h2 className="manageusers-heading">All Registered Users</h2>

      <button
        onClick={() => setPopupOpen(true)}
        className="manageusers-add-button"
      >
        + Add User
      </button>

      {popupOpen && (
        <div className="manageusers-popup-overlay">
          <div className="manageusers-popup">
            <h3 className="manageusers-form-heading">Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Username:</label>
                <input
                  type="text"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  className="manageusers-input"
                  required
                />
              </div>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Password:</label>
                <input
                  type="text"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="manageusers-input"
                  required
                />
              </div>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Is Admin:</label>
                <input
                  type="checkbox"
                  checked={formIsAdmin}
                  onChange={(e) => setFormIsAdmin(e.target.checked)}
                  className="manageusers-checkbox"
                />
              </div>
              <div className="manageusers-popup-buttons">
                <button
                  type="submit"
                  className="manageusers-button"
                  disabled={addingUser}
                >
                  {addingUser ? 'Adding...' : 'Add User'}
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="manageusers-button-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editPopupOpen && (
        <div className="manageusers-popup-overlay">
          <div className="manageusers-popup">
            <h3 className="manageusers-form-heading">Edit User</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Username:</label>
                <input
                  type="text"
                  value={editUser.USERNAME}
                  className="manageusers-input"
                />
              </div>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Password:</label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="manageusers-input"
                  required
                />
              </div>
              <div className="manageusers-form-group">
                <label className="manageusers-label">Is Admin:</label>
                <input
                  type="checkbox"
                  checked={editIsAdmin}
                  onChange={(e) => setEditIsAdmin(e.target.checked)}
                  className="manageusers-checkbox"
                />
              </div>
              <div className="manageusers-popup-buttons">
                <button type="submit" className="manageusers-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditPopupOpen(false)}
                  className="manageusers-button-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="manageusers-toast">{toast}</div>}

      {isLoading ? (
        <p className="manageusers-loading">Loading users...</p>
      ) : error ? (
        <p className="manageusers-error">{error}</p>
      ) : (
        <table className="manageusers-table">
          <thead>
            <tr>
              <th className="manageusers-th">Username</th>
              <th className="manageusers-th">Password</th>
              <th className="manageusers-th">Admin</th>
              <th className="manageusers-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.docname}>
                <td className="manageusers-td">{user.USERNAME}</td>
                <td className="manageusers-td">{user.PASSWORD}</td>
                <td className="manageusers-td">{user.ADMIN ? 'Yes' : 'No'}</td>
                <td className="manageusers-td">
                  <img
                    src="/edit2.png"
                    alt="Edit"
                    className="btn manageusers-icon"
                    onClick={() => handleEdit(user)}
                  />
                  <img
                    src="/delete2.png"
                    alt="Delete"
                    className="btn manageusers-icon"
                    onClick={() => handleDelete(user.USERNAME)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
