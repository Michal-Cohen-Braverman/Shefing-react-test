import React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import UsersTable from './UsersTable';

function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper>
            <UsersTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;