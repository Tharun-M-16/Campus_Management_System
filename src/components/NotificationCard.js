import React from 'react';
import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { getPriorityColor } from '../utils/notificationUtils';

const NotificationCard = ({ notification, onClick, viewed }) => {
  const timestamp = notification.Timestamp || '';
  const formattedDate = timestamp ? new Date(timestamp).toLocaleString() : 'No date';
  const isUnread = !viewed;
  const priorityColor = getPriorityColor(notification.Type);

  return (
    <Card
      variant="outlined"
      sx={{
        borderLeft: isUnread ? `4px solid ${priorityColor}` : '1px solid #e2e8f0',
        backgroundColor: isUnread ? '#f1f5f9' : '#ffffff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
        },
      }}
    >
      <CardActionArea onClick={() => onClick(notification)}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
            <Typography
              variant="subtitle1"
              fontWeight={isUnread ? 700 : 600}
              color="text.primary"
              sx={{ flex: 1, wordBreak: 'break-word' }}
            >
              {notification.Message || 'No subject'}
            </Typography>
            <Chip
              label={notification.Type}
              size="small"
              sx={{
                backgroundColor: priorityColor,
                color: '#ffffff',
                fontWeight: 700,
                flexShrink: 0,
              }}
            />
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
            {isUnread && (
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: priorityColor,
                }}
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NotificationCard;
