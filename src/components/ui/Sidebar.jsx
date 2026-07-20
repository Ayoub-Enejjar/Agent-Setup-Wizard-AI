import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { LogoMark } from '../Logo';

const NAV = [
  { label:'Dashboard',     path:'/dashboard',              icon:'LayoutDashboard' },
  { label:'Conversations', path:'/conversations',          icon:'MessageCircle', badge:0 },
  { label:'Bookings',      path:'/booking-management',     icon:'Calendar' },
  { label:'Analytics',     path:'/analytics-dashboard',    icon:'BarChart3' },
  { label:'Integrations',  path:'/integration-management', icon:'Puzzle' },
  { label:'Payments',      path:'/payment-processing',     icon:'CreditCard' },
  { label:'Agent Setup',   path:'/agent-setup-wizard',     icon:'Bot' },
];

const BOTTOM = [
  { label:'Settings', path:'/settings', icon:'Settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState(null);
  const isActive = (path) => location.pathname === path;

  const NavBtn = ({ item }) => {
    const active = isActive(item.path);
    return (
      <div style={{ position:'relative' }}>
        <button className={`sidebar-icon-btn ${active ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
          onMouseEnter={() => setTooltip(item.label)}
          onMouseLeave={() => setTooltip(null)}
          title={item.label}>
          <Icon name={item.icon} size={19} />
          {item.badge > 0 && <span style={{ position:'absolute', top:4, right:4, width:8, height:8, borderRadius:'50%', background:'#a8ff3e' }} />}
        </button>
        {tooltip === item.label && (
          <div style={{ position:'absolute', left:'100%', top:'50%', transform:'translateY(-50%)', marginLeft:12, background:'#13132a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'0.4rem 0.85rem', whiteSpace:'nowrap', zIndex:400, boxShadow:'0 8px 24px rgba(0,0,0,0.4)' }}>
            <span style={{ fontSize:'0.8rem', fontWeight:500, color:'#f5f3ef' }}>{item.label}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <aside style={{ position:'fixed', top:0, left:0, bottom:0, width:64, zIndex:100, display:'flex', flexDirection:'column', background:'#0a0a18', borderRight:'1px solid rgba(255,255,255,0.06)' }} className="hide-below-lg">
        <div style={{ height:64, display:'flex', alignItems:'center', justifyContent:'center', borderBottom:'1px solid rgba(255,255,255,0.06)', cursor:'pointer' }} onClick={() => navigate('/')}>
          <LogoMark size={30} />
        </div>
        <nav style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', padding:'1rem 0', gap:4 }}>
          {NAV.map(item => <NavBtn key={item.path} item={item} />)}
        </nav>
        <div style={{ padding:'1rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:4, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          {BOTTOM.map(item => <NavBtn key={item.path} item={item} />)}
          <div style={{ marginTop:8, width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg, #8b5cf6, #7c3aed)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:700, color:'#fff', cursor:'pointer' }}>JD</div>
        </div>
      </aside>

      <nav style={{ position:'fixed', bottom:0, left:0, right:0, height:60, background:'rgba(10,10,24,0.95)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', justifyContent:'space-around', zIndex:100 }} className="show-below-lg">
        {NAV.slice(0, 5).map(item => {
          const active = isActive(item.path);
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, color: active ? '#a78bfa' : 'rgba(139,138,168,0.6)', background:'none', border:'none', cursor:'pointer', padding:'0.4rem' }}>
              <Icon name={item.icon} size={18} />
              <span style={{ fontSize:'0.6rem', fontWeight:500 }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (min-width:1024px) { .show-below-lg { display:none !important; } }
        @media (max-width:1023px) { .hide-below-lg { display:none !important; } }
      `}</style>
    </>
  );
}