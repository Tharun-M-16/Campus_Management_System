import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const PaginationControls = ({ page, onPrev, onNext, disableNext }) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 3 }}>
      <Typography variant="body2" color="text.secondary">
        Page {page}
      </Typography>
      <Box>
        <Button variant="outlined" onClick={onPrev} disabled={page <= 1} sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button variant="contained" onClick={onNext} disabled={disableNext}>
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default PaginationControls;
