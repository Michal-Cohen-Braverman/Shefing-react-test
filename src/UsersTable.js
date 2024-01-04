import React, { useState, useEffect } from 'react';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TableSortLabel,
} from '@mui/material';
import useAxios from 'axios-hooks';
import UserPosts from './UserPosts';

const UsersTable = () => {
  const [{ data: users, loading, error }] = useAxios('https://jsonplaceholder.typicode.com/users');
  const [filter, setFilter] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  useEffect(() => {
    // Reset selectedUserId when users data changes
    setSelectedUserId(null);
  }, [users]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const sortedUsers = stableSort(filteredUsers, getComparator(order, orderBy));

  return (
    <div>
      <TextField
        label="Filter by name or email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {loading && <CircularProgress />}
      {error && (
        <Typography variant="body2" color="error">
          Error loading users: {error.message}
        </Typography>
      )}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>Company Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id} onClick={() => setSelectedUserId(user.id)}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <UserPosts userId={selectedUserId} />
    </div>
  );
};

export default UsersTable;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}