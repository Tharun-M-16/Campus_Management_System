import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const types = ['All', 'Placement', 'Result', 'Event'];

const FilterBar = ({ selectedType, onFilterChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Filter by notification type
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        {types.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'contained' : 'outlined'}
            color={selectedType === type ? 'primary' : 'inherit'}
            onClick={() => onFilterChange(type)}
          >
            {type}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default FilterBar;
