import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Link2, Settings, Bot, ArrowRight, Check } from 'lucide-react';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import { useAgent } from '../../context/agentContext';

const QUICK = [
  { Icon:MessageSquare, label:'Test your agent', desc:'Start a live AI conversation', action:'chat', cta:'Open test chat' },
  { Icon:Link2, label:'Share agent link', desc:'Copy and share your public link', action:null, cta:'Copy link' },
  { Icon:Settings, label:'Edit agent settings', desc:'Change name, tone, or channels', action:'/agent-setup-wizard', cta:'Edit agent' },
];

const CHECKLIST = [
  { done:true, label:'Agent created', sub:'Your base agent is configured' },
  { done:false, label:'Add to your website', sub:'Embed the chat widget on your site' },
  { done:false, label:'Connect WhatsApp', sub:'Start receiving WhatsApp messages' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { config, stats, openChat } = useAgent();

  return (
    <div style={{ minHeight:'100vh', background:'#060610' }}>
      <Sidebar />
      <div className="sidebar-offset" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <Header />
        <main style={{ flex:1, padding:'2.5rem clamp(1.25rem,3vw,2.5rem) 6rem', maxWidth:1000, margin:'0 auto', width:'100%' }}>

          <div style={{ marginBottom:'2.5rem' }}>
            <h1 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'0.4rem' }}>Good morning</h1>
            <p style={{ color:'rgba(245,243,239,0.35)', fontSize:'0.92rem' }}>Your agent is set up and ready. Here's what to do next.</p>
          </div>

          {/* Empty state hero */}
          <div style={{ background:'rgba(14,14,28,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'3rem 2.5rem', textAlign:'center', marginBottom:'2rem', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
            <div style={{ position:'relative' }}>
              <div style={{ width:52, height:52, borderRadius:14, background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.25rem', color:'#a78bfa' }}>
                <Bot size={24} />
              </div>
              <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:400, letterSpacing:'-0.025em', marginBottom:'0.6rem' }}>No conversations yet</h2>
              <p style={{ color:'rgba(245,243,239,0.35)', maxWidth:380, margin:'0 auto 1.75rem', lineHeight:1.7, fontSize:'0.9rem' }}>Your agent is live but hasn't received any messages yet. Share the link or embed it on your site to get started.</p>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
                <button className="btn-volt" style={{ fontSize:'0.85rem', padding:'0.7rem 1.5rem' }} onClick={() => navigate('/agent-setup-wizard')}>Configure channels <ArrowRight size={14} style={{ marginLeft:4 }}/></button>
                <button className="btn-ghost" style={{ fontSize:'0.85rem', padding:'0.7rem 1.5rem' }} onClick={openChat}>Test conversation</button>
              </div>
            </div>
          </div>

          {/* 2-col grid */}
          <div className="dash-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
            <div style={{ background:'rgba(14,14,28,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'1.75rem' }}>
              <h3 style={{ fontWeight:600, color:'rgba(245,243,239,0.55)', marginBottom:'1.25rem', letterSpacing:'0.05em', textTransform:'uppercase', fontSize:'0.72rem' }}>Quick actions</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {QUICK.map(q => {
                  const QIcon = q.Icon;
                  return (
                    <div key={q.label} style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.85rem', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', cursor:'pointer', transition:'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(139,92,246,0.25)'; e.currentTarget.style.background='rgba(139,92,246,0.05)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; }}
                      onClick={() => { if (q.action === 'chat') openChat(); else if (q.action) navigate(q.action); }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:'rgba(139,92,246,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'#a78bfa', flexShrink:0 }}>
                        <QIcon size={16} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:600, fontSize:'0.85rem', color:'#f5f3ef', marginBottom:'0.1rem' }}>{q.label}</div>
                        <div style={{ fontSize:'0.75rem', color:'rgba(245,243,239,0.3)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{q.desc}</div>
                      </div>
                      <span style={{ fontSize:'0.75rem', color:'rgba(139,92,246,0.7)', fontWeight:500, flexShrink:0, display:'flex', alignItems:'center', gap:3 }}>{q.cta} <ArrowRight size={11} /></span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background:'rgba(14,14,28,0.6)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'1.75rem' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
                <h3 style={{ fontSize:'0.72rem', fontWeight:600, color:'rgba(245,243,239,0.55)', letterSpacing:'0.05em', textTransform:'uppercase' }}>Setup progress</h3>
                <span style={{ fontSize:'0.72rem', color:'#8b5cf6', fontWeight:500 }}>{CHECKLIST.filter(c=>c.done).length} / {CHECKLIST.length}</span>
              </div>
              <div style={{ height:4, borderRadius:2, background:'rgba(255,255,255,0.06)', marginBottom:'1.5rem', overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:2, background:'linear-gradient(90deg, #8b5cf6, #a8ff3e)', width:`${(CHECKLIST.filter(c=>c.done).length/CHECKLIST.length)*100}%`, transition:'width 0.5s' }} />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {CHECKLIST.map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem' }}>
                    <div style={{ width:22, height:22, borderRadius:'50%', flexShrink:0, marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', background: item.done ? '#8b5cf6' : 'rgba(255,255,255,0.05)', border:`1px solid ${item.done ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}`, color:'#fff' }}>
                      {item.done && <Check size={11} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: item.done ? 400 : 600, fontSize:'0.85rem', color: item.done ? 'rgba(245,243,239,0.35)' : '#f5f3ef', textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</div>
                      <div style={{ fontSize:'0.73rem', color:'rgba(245,243,239,0.25)', marginTop:'0.15rem' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1px', background:'rgba(255,255,255,0.06)', borderRadius:16, overflow:'hidden' }}>
            {[
              { label:'Conversations', value: stats.totalConversations > 0 ? String(stats.totalConversations) : '—', sub: stats.totalConversations > 0 ? `${stats.totalResponses} AI responses` : 'Awaiting first message' },
              { label:'Response time', value:'< 2s', sub:'Average agent response' },
              { label:'Uptime', value:'99.9%', sub:'Platform availability' },
            ].map(stat => (
              <div key={stat.label} style={{ background:'rgba(14,14,28,0.6)', padding:'1.5rem', textAlign:'center' }}>
                <div style={{ fontFamily:'Instrument Serif, serif', fontSize:'2rem', fontWeight:400, letterSpacing:'-0.03em', color: stat.value==='—' ? 'rgba(245,243,239,0.15)' : '#f5f3ef' }}>{stat.value}</div>
                <div style={{ fontSize:'0.76rem', fontWeight:600, color:'rgba(245,243,239,0.45)', marginBottom:'0.15rem' }}>{stat.label}</div>
                <div style={{ fontSize:'0.7rem', color:'rgba(245,243,239,0.2)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <style>{`
        @media (min-width:1024px) { .sidebar-offset { margin-left:64px; } }
        @media (max-width:640px) { .dash-grid { grid-template-columns:1fr !important; } div[style*="repeat(3, 1fr)"] { grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}