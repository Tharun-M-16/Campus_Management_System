import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNotifications } from '../services/api';
import { getNotificationId } from '../utils/notificationUtils';

const NotificationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const markViewed = () => {
      if (!id) return;
      try {
        const stored = JSON.parse(window.localStorage.getItem('viewedNotifications') || '[]');
        const idStr = id.toString();
        if (!stored.includes(idStr)) {
          window.localStorage.setItem('viewedNotifications', JSON.stringify([...stored, idStr]));
        }
      } catch {
        // ignore storage errors
      }
    };

    markViewed();
  }, [id]);

  useEffect(() => {
    const loadNotification = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchNotifications({ limit: 100, page: 1 });
        const list = Array.isArray(data) ? data : data.notifications || [];
        const found = list.find((item) => getNotificationId(item).toString() === id.toString());
        if (found) {
          setNotification(found);
        } else {
          setError('Notification details are not available for this ID.');
        }
      } catch (err) {
        setError('Unable to load notification details.');
      }
      setLoading(false);
    };

    loadNotification();
  }, [id]);

  const getTypeColor = (type) => {
    const colors = {
      Placement: '#d32f2f',
      Result: '#f57c00',
      Event: '#1976d2',
    };
    return colors[type] || '#757575';
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ← Back to notifications
          </Button>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Card variant="outlined" sx={{ backgroundColor: '#fff3cd', p: 3 }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  ⚠️ {error}
                </Typography>
              </CardContent>
            </Card>
          ) : notification ? (
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {notification.Message || 'Notification'}
                    </Typography>
                    <Chip
                      label={notification.Type}
                      sx={{
                        backgroundColor: getTypeColor(notification.Type),
                        color: 'white',
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {new Date(notification.Timestamp || '').toLocaleString()}
                  </Typography>

                  <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {notification.Message || 'No additional details available.'}
                    </Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    ID: {notification.ID}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Loading notification details...
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default NotificationDetailsPage;
