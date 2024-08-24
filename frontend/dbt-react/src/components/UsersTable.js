import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const UsersTable = ({ users, onEdit }) => {
  const [editing, setEditing] = useState({ row: null, column: null });
  const [editedData, setEditedData] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const handleEditClick = (user, column) => {
    setEditing({ row: user.id, column });
    setEditedData(user);
  };

  const handleSave = async (userId) => {
    if (editedData) {
      try {
        await onEdit(editedData);
        setNotification({ open: true, message: "User updated successfully" });
      } catch (error) {
        setNotification({ open: true, message: "Failed to update user" });
      }
    }
    setEditing({ row: null, column: null });
  };

  const handleChange = (event, column) => {
    setEditedData({ ...editedData, [column]: event.target.value });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 5,
        mb: 5,
        maxHeight: 400, // Set a fixed height for the table container
        overflow: "auto", // Enable scrolling within the container
        paddingBottom: 20,
      }}
    >
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        Users
      </Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {editing.row === user.id && editing.column === "name" ? (
                  <TextField
                    value={editedData.name}
                    onChange={(event) => handleChange(event, "name")}
                    onBlur={() => handleSave(user.id)}
                    fullWidth
                    size="small"
                  />
                ) : (
                  user.name
                )}
                <IconButton onClick={() => handleEditClick(user, "name")}>
                  {editing.row === user.id && editing.column === "name" ? (
                    <SaveIcon fontSize="small" />
                  ) : (
                    <EditIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>
                {editing.row === user.id && editing.column === "email" ? (
                  <TextField
                    value={editedData.email}
                    onChange={(event) => handleChange(event, "email")}
                    onBlur={() => handleSave(user.id)}
                    fullWidth
                    size="small"
                  />
                ) : (
                  user.email
                )}
                <IconButton onClick={() => handleEditClick(user, "email")}>
                  {editing.row === user.id && editing.column === "email" ? (
                    <SaveIcon fontSize="small" />
                  ) : (
                    <EditIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>
                {editing.row === user.id && editing.column === "role" ? (
                  <TextField
                    value={editedData.role}
                    onChange={(event) => handleChange(event, "role")}
                    onBlur={() => handleSave(user.id)}
                    fullWidth
                    size="small"
                  />
                ) : (
                  user.role
                )}
                <IconButton onClick={() => handleEditClick(user, "role")}>
                  {editing.row === user.id && editing.column === "role" ? (
                    <SaveIcon fontSize="small" />
                  ) : (
                    <EditIcon fontSize="small" />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </TableContainer>
  );
};

export default UsersTable;
