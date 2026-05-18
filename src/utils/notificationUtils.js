const priorityValue = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const sortByPriority = (items = []) => {
  return [...items].sort((a, b) => {
    const aPriority = priorityValue[a.Type] || 0;
    const bPriority = priorityValue[b.Type] || 0;
    if (bPriority !== aPriority) {
      return bPriority - aPriority;
    }

    const aDate = new Date(a.Timestamp || 0).getTime();
    const bDate = new Date(b.Timestamp || 0).getTime();
    return bDate - aDate;
  });
};

export const getPriorityNotifications = (items = [], limit = 4) => {
  return sortByPriority(items).slice(0, limit);
};

export const getNotificationId = (notification) => {
  return notification?.ID || notification?.id || '';
};

export const getPriorityColor = (type) => {
  const colors = {
    Placement: '#d32f2f',
    Result: '#f57c00',
    Event: '#1976d2',
  };
  return colors[type] || '#757575';
};
