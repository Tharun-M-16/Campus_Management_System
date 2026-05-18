import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications } from '../services/api';
import { getNotificationId, sortByPriority } from '../utils/notificationUtils';
import FilterBar from '../components/FilterBar';
import NotificationCard from '../components/NotificationCard';
import PaginationControls from '../components/PaginationControls';
import PrioritySection from '../components/PrioritySection';

const HomePage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [filter, setFilter] = useState('All');
  const [viewedIds, setViewedIds] = useState(() => {
    try {
      const stored = window.localStorage.getItem('viewedNotifications');
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.map((id) => id.toString());
    } catch {
      return [];
    }
  });
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchNotifications({ limit, page, notification_type: filter === 'All' ? undefined : filter });
        const list = Array.isArray(data) ? data : data.notifications || [];
        setNotifications(list);
        setHasNext(list.length === limit);
      } catch (err) {
        setError('Unable to load notifications. Please try again later.');
        setNotifications([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, filter, limit]);

  useEffect(() => {
    window.localStorage.setItem('viewedNotifications', JSON.stringify(viewedIds));
  }, [viewedIds]);

  const markViewed = (notification) => {
    const id = getNotificationId(notification);
    if (!id) return;
    setViewedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleNotificationClick = (notification) => {
    markViewed(notification);
    const id = getNotificationId(notification);
    if (!id) return;
    navigate(`/notifications/${id}`, { state: { notification } });
  };

  const unreadList = useMemo(
    () => notifications.filter((notification) => !viewedIds.includes(getNotificationId(notification))),
    [notifications, viewedIds]
  );

  const viewedList = useMemo(
    () => notifications.filter((notification) => viewedIds.includes(getNotificationId(notification))),
    [notifications, viewedIds]
  );

  const sortedNotifications = useMemo(() => sortByPriority(notifications), [notifications]);

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Campus Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stay updated with placements, results, and events
            </Typography>
          </Box>

          {/* Priority Section */}
          <PrioritySection notifications={sortedNotifications} onClick={handleNotificationClick} />

          {/* Filter */}
          <FilterBar
            selectedType={filter}
            onFilterChange={(type) => {
              setFilter(type);
              setPage(1);
            }}
          />

          {/* Loading/Error/Empty States */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#fff3cd', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" color="error" gutterBottom>
                ⚠️ {error}
              </Typography>
            </Box>
          ) : notifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                No notifications found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try a different filter or check back later.
              </Typography>
            </Box>
          ) : (
            <Box>
              {/* Unread Notifications */}
              {unreadList.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#d32f2f',
                    }}
                  >
                    🔔 Unread ({unreadList.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {unreadList.map((notification) => (
                      <Grid item xs={12} md={6} key={getNotificationId(notification)}>
                        <NotificationCard
                          notification={notification}
                          onClick={handleNotificationClick}
                          viewed={false}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Divider */}
              {unreadList.length > 0 && viewedList.length > 0 && <Divider sx={{ my: 3 }} />}

              {/* Viewed Notifications */}
              {viewedList.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#757575',
                    }}
                  >
                    ✓ Read ({viewedList.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {viewedList.map((notification) => (
                      <Grid item xs={12} md={6} key={getNotificationId(notification)}>
                        <NotificationCard
                          notification={notification}
                          onClick={handleNotificationClick}
                          viewed
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          )}

          {/* Pagination */}
          {!loading && notifications.length > 0 && (
            <PaginationControls
              page={page}
              onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
              onNext={() => setPage((prev) => prev + 1)}
              disableNext={!hasNext}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
