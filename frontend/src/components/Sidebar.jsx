import React from 'react';

const Sidebar = ({
  title,
  items = [],
  activeTab,
  onTabChange,
  onLogout,
  extraAction = null,
  isDark = false,
}) => {
  const bg = isDark ? '#0f172a' : '#f8fafc';
  const titleColor = isDark ? '#93c5fd' : '#1e293b';

  return (
    <div
      className="dashboard-sidebar"
      style={{
        background: bg,
        color: isDark ? 'white' : 'inherit',
      }}
    >
      <h3 style={{ padding: '0 0.5rem', color: titleColor, marginBottom: '1.25rem' }}>{title}</h3>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onTabChange(item.id)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '0.5rem',
            background: activeTab === item.id ? '#2563eb' : 'transparent',
            color: activeTab === item.id ? '#fff' : isDark ? '#cbd5e1' : '#334155',
            fontWeight: 500,
          }}
        >
          {item.label}
        </div>
      ))}
      {extraAction}
      <div
        onClick={onLogout}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '2rem',
          color: isDark ? '#f87171' : '#d90429',
          fontWeight: 600,
        }}
      >
        🚪 Logout
      </div>
    </div>
  );
};

export default Sidebar;
