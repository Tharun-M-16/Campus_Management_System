import axios from 'axios';

const API_BASE = 'http://4.224.186.213/evaluation-service';

// Mock data matching actual API structure
const mockNotifications = [
  {
    ID: 'd146095a-0d86-4a34-9e69-3900a14576bc',
    Type: 'Result',
    Message: 'Your mid-semester exam results have been published. Check your academic portal.',
    Timestamp: '2026-04-22 17:51:30',
  },
  {
    ID: 'b283218f-ea5a-4b7c-93a9-1f2f240d64b0',
    Type: 'Placement',
    Message: 'CSX Corporation hiring drive on campus. Interested candidates must register by April 25.',
    Timestamp: '2026-04-22 17:51:18',
  },
  {
    ID: '81589ada-0ad3-4f77-9554-f52fb558e09d',
    Type: 'Event',
    Message: 'Farewell event on April 25. All students welcome. Tickets available at the gate.',
    Timestamp: '2026-04-22 17:51:06',
  },
  {
    ID: '0a551513a-142b-4bbc-8678-eefecc5e1ede',
    Type: 'Result',
    Message: 'Mid-semester grades for Data Structures course are now available.',
    Timestamp: '2026-04-22 10:50:54',
  },
  {
    ID: 'f4c8a2b1-77e2-4e9a-8c6c-d1a3b2c9e0f5',
    Type: 'Placement',
    Message: 'Amazon placement interviews scheduled for April 28-30. Check your email for interview slots.',
    Timestamp: '2026-04-21 14:30:12',
  },
  {
    ID: 'c7d5e3f1-92a4-4b1c-8f9e-a1b2c3d4e5f6',
    Type: 'Event',
    Message: 'Tech workshop: Web Development with React. April 24 from 2-5 PM in Lab 3.',
    Timestamp: '2026-04-21 09:15:45',
  },
  {
    ID: 'e8f6a4c2-11b5-4c2d-9g0f-b2c3d4e5f6g7',
    Type: 'Placement',
    Message: 'Microsoft campus recruitment. Candidates scoring above 8.0 CGPA can apply.',
    Timestamp: '2026-04-20 16:45:30',
  },
  {
    ID: 'f9g7b5d3-22c6-4d3e-0h1g-c3d4e5f6g7h8',
    Type: 'Event',
    Message: 'Library orientation for new batch. April 23 at 10 AM. Mandatory attendance.',
    Timestamp: '2026-04-20 11:20:15',
  },
];

const client = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export const fetchNotifications = async ({ limit = 10, page = 1, notification_type } = {}) => {
  try {
    const params = { limit, page };
    if (notification_type && notification_type !== 'All') {
      params.notification_type = notification_type;
    }

    const response = await client.get('/notifications', { params });
    return response.data?.notifications || response.data || [];
  } catch (error) {
    console.warn('Using mock notifications - API unavailable');
    let filtered = mockNotifications;
    if (notification_type && notification_type !== 'All') {
      filtered = filtered.filter((n) => n.Type === notification_type);
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    return filtered.slice(start, end);
  }
};
