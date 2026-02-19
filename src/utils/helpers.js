// Utility functions for PiezoPulse Dashboard

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getStatusColor = (status) => {
  const colors = {
    Active: 'green',
    Underperforming: 'yellow',
    Maintenance: 'red',
    Approved: 'green',
    Pending: 'yellow',
    Rejected: 'red'
  };
  return colors[status] || 'gray';
};

export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const filterSitesByRole = (sites, role) => {
  if (role === 'Metro/Rail Authority Manager') {
    return sites.filter(s => s.type === 'Metro' || s.type === 'Railway');
  }
  return sites;
};

export const canAccessFeature = (user, feature) => {
  const permissions = {
    'Municipal Energy Officer': ['all'],
    'Metro/Rail Authority Manager': ['view', 'optimize', 'export'],
    'Auditor/Viewer': ['view']
  };
  
  const userPermissions = permissions[user.role] || [];
  return userPermissions.includes('all') || userPermissions.includes(feature);
};
