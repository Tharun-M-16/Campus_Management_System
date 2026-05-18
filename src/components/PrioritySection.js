import React from 'react';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { getPriorityNotifications, getPriorityColor } from '../utils/notificationUtils';

const PrioritySection = ({ notifications, onClick }) => {
  const topItems = getPriorityNotifications(notifications, 5);

  return (
    <Card
      variant="outlined"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        mb: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
          ⭐ Priority Notifications (Top {topItems.length})
        </Typography>
        {topItems.length === 0 ? (
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            No notifications yet.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {topItems.map((notification) => {
              const priorityColor = getPriorityColor(notification.Type);
              return (
                <Box
                  key={notification.ID}
                  onClick={() => onClick(notification)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    p: 1.5,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    borderLeft: `4px solid ${priorityColor}`,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.9rem' }}>
                        {notification.Message?.substring(0, 70)}...
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.85 }}>
                        {new Date(notification.Timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={notification.Type}
                      size="small"
                      sx={{
                        backgroundColor: priorityColor,
                        color: 'white',
                        fontWeight: 700,
                      }}
                    />
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default PrioritySection;
