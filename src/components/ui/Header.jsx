import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/agent-setup-wizard': 'Agent Setup',
  '/analytics-dashboard': 'Analytics',
  '/booking-management': 'Bookings',
  '/integration-management': 'Integrations',
  '/payment-processing': 'Payments',
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const title = PAGE_TITLES[location.pathname] ?? 'Rocket.new';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 99,
      height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.75rem',
      background: 'rgba(6,6,16,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(139,138,168,0.55)' }}>
          {title}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button className="btn-volt" style={{ padding: '0.45rem 1.1rem', fontSize: '0.78rem' }}
                onClick={() => navigate('/agent-setup-wizard')}>
          <Plus size={14} style={{ marginRight: 4 }} /> New Agent
        </button>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 700, color: '#fff',
          cursor: 'pointer', flexShrink: 0,
        }}>JD</div>
      </div>
    </header>
  );
}