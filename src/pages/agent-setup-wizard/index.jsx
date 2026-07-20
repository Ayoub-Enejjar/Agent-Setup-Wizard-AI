import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Truck, Wrench, Building2, Target, Smile, Brain, Coffee, Globe, MessageSquare, Camera, Check, ArrowRight, ArrowLeft, Loader2, PartyPopper, Sparkles } from 'lucide-react';
import { LogoMark } from '../../components/Logo';

const TEMPLATES = [
  { id:'beauty', label:'Beauty & Salon', Icon:Scissors, accent:'#f472b6', desc:'Appointments, services, staff — fully automated.', features:['Appointment booking','Service pricing','Staff scheduling'] },
  { id:'delivery', label:'Delivery & Logistics', Icon:Truck, accent:'#38bdf8', desc:'Order tracking and status updates on autopilot.', features:['Order tracking','Delivery ETA','Status updates'] },
  { id:'repair', label:'Repair Services', Icon:Wrench, accent:'#fb923c', desc:'Quotes, diagnostics, and parts in seconds.', features:['Quote generation','Diagnostic booking','Warranty info'] },
  { id:'general', label:'General Business', Icon:Building2, accent:'#4ade80', desc:'Flexible for any industry with custom workflows.', features:['Lead capture','FAQ responses','Custom workflows'] },
];

const PERSONALITIES = [
  { id:'professional', label:'Professional', desc:'Formal, concise, business-focused', Icon:Target },
  { id:'friendly', label:'Friendly', desc:'Warm, conversational, approachable', Icon:Smile },
  { id:'expert', label:'Expert', desc:'Knowledgeable, detailed, authoritative', Icon:Brain },
  { id:'casual', label:'Casual', desc:'Relaxed, relatable, easy-going', Icon:Coffee },
];

const INTEGRATIONS = [
  { id:'website', label:'Website Chat', Icon:Globe, desc:'Embed a chat widget on your website' },
  { id:'whatsapp', label:'WhatsApp', Icon:MessageSquare, desc:'Connect your WhatsApp Business number' },
  { id:'instagram', label:'Instagram DMs', Icon:Camera, desc:'Reply to Instagram messages automatically' },
];

const TemplateStep = ({ selected, onSelect }) => (
  <div>
    <div style={{ marginBottom:'2rem' }}>
      <p style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8b5cf6', marginBottom:'0.5rem' }}>Step 1 of 3</p>
      <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Choose your template</h2>
      <p style={{ color:'rgba(245,243,239,0.4)', fontSize:'0.92rem' }}>Pick the industry that best matches your business.</p>
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1rem' }}>
      {TEMPLATES.map(t => {
        const active = selected?.id === t.id;
        const TIcon = t.Icon;
        return (
          <button key={t.id} onClick={() => onSelect(t)} style={{
            all:'unset', cursor:'pointer', background: active ? `${t.accent}10` : '#0e0e1c',
            border:`1px solid ${active ? t.accent+'50' : 'rgba(255,255,255,0.07)'}`,
            borderRadius:16, padding:'1.5rem', transition:'all 0.25s', textAlign:'left',
            boxShadow: active ? `0 0 30px ${t.accent}15` : 'none',
          }}
          onMouseEnter={e => { if(!active) { e.currentTarget.style.borderColor=`${t.accent}30`; e.currentTarget.style.transform='translateY(-2px)'; }}}
          onMouseLeave={e => { if(!active) { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; }}}>
            <div style={{ width:40, height:40, borderRadius:10, background:`${t.accent}12`, border:`1px solid ${t.accent}25`, display:'flex', alignItems:'center', justifyContent:'center', color:t.accent, marginBottom:'0.75rem' }}>
              <TIcon size={20} />
            </div>
            <h3 style={{ fontWeight:600, fontSize:'1rem', marginBottom:'0.4rem', color:'#f5f3ef' }}>{t.label}</h3>
            <p style={{ fontSize:'0.82rem', color:'rgba(245,243,239,0.4)', lineHeight:1.6, marginBottom:'1rem' }}>{t.desc}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.3rem' }}>
              {t.features.map(f => (
                <span key={f} style={{ fontSize:'0.76rem', color:'rgba(245,243,239,0.3)', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                  <Check size={11} style={{ color:t.accent }} />{f}
                </span>
              ))}
            </div>
            {active && <div style={{ marginTop:'1rem', paddingTop:'0.75rem', borderTop:`1px solid ${t.accent}30`, fontSize:'0.78rem', color:t.accent, fontWeight:500, display:'flex', alignItems:'center', gap:'0.4rem' }}><Check size={13} /> Selected</div>}
          </button>
        );
      })}
    </div>
  </div>
);

const ConfigureStep = ({ data, onChange, personality, onPersonality }) => {
  const field = (label, key, placeholder, type='text') => (
    <div>
      <label style={{ display:'block', fontSize:'0.78rem', fontWeight:500, color:'rgba(245,243,239,0.55)', marginBottom:'0.4rem' }}>{label}</label>
      <input type={type} value={data[key]||''} placeholder={placeholder} onChange={e => onChange({...data,[key]:e.target.value})} className="input-dark" />
    </div>
  );
  return (
    <div>
      <div style={{ marginBottom:'2rem' }}>
        <p style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8b5cf6', marginBottom:'0.5rem' }}>Step 2 of 3</p>
        <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Configure your agent</h2>
        <p style={{ color:'rgba(245,243,239,0.4)', fontSize:'0.92rem' }}>Tell us about your business and set your agent's personality.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'2rem' }}>
        {field('Business Name','businessName',"e.g. Maria's Salon")}
        {field('Email','businessEmail','hello@yourbusiness.com','email')}
        {field('Phone Number','contactPhone','+1 (555) 000-0000','tel')}
        {field('Website (optional)','websiteUrl','https://yourbusiness.com')}
      </div>
      <div>
        <p style={{ fontSize:'0.82rem', fontWeight:600, color:'rgba(245,243,239,0.6)', marginBottom:'1rem' }}>Agent personality</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(170px, 1fr))', gap:'0.75rem' }}>
          {PERSONALITIES.map(p => {
            const active = personality === p.id;
            const PIcon = p.Icon;
            return (
              <button key={p.id} onClick={() => onPersonality(p.id)} style={{
                all:'unset', cursor:'pointer', background: active ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${active ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:12, padding:'1rem', textAlign:'left', transition:'all 0.2s',
              }}>
                <div style={{ color: active ? '#a78bfa' : 'rgba(139,138,168,0.7)', marginBottom:'0.4rem' }}><PIcon size={20} /></div>
                <div style={{ fontWeight:600, fontSize:'0.88rem', color:'#f5f3ef', marginBottom:'0.15rem' }}>{p.label}</div>
                <div style={{ fontSize:'0.75rem', color:'rgba(245,243,239,0.35)', lineHeight:1.5 }}>{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LaunchStep = ({ enabled, onToggle }) => (
  <div>
    <div style={{ marginBottom:'2rem' }}>
      <p style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#8b5cf6', marginBottom:'0.5rem' }}>Step 3 of 3</p>
      <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'0.5rem' }}>Choose your channels</h2>
      <p style={{ color:'rgba(245,243,239,0.4)', fontSize:'0.92rem' }}>Select where your agent will respond to customers.</p>
    </div>
    <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', maxWidth:520 }}>
      {INTEGRATIONS.map(intg => {
        const on = enabled.includes(intg.id);
        const IIcon = intg.Icon;
        return (
          <button key={intg.id} onClick={() => onToggle(intg.id)} style={{
            all:'unset', cursor:'pointer', display:'flex', alignItems:'center', gap:'1rem',
            background: on ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.03)',
            border:`1px solid ${on ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius:14, padding:'1.25rem 1.5rem', transition:'all 0.25s',
          }}>
            <div style={{ width:40, height:40, borderRadius:10, background: on ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', color: on ? '#a78bfa' : 'rgba(139,138,168,0.6)', flexShrink:0 }}>
              <IIcon size={20} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:'0.92rem', color:'#f5f3ef', marginBottom:'0.15rem' }}>{intg.label}</div>
              <div style={{ fontSize:'0.8rem', color:'rgba(245,243,239,0.35)' }}>{intg.desc}</div>
            </div>
            <div style={{ width:44, height:24, borderRadius:12, flexShrink:0, background: on ? '#8b5cf6' : 'rgba(255,255,255,0.1)', position:'relative', transition:'background 0.25s' }}>
              <div style={{ position:'absolute', top:2, left: on ? 22 : 2, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left 0.25s' }} />
            </div>
          </button>
        );
      })}
    </div>
    {enabled.length === 0 && <p style={{ marginTop:'1rem', fontSize:'0.8rem', color:'rgba(245,243,239,0.25)' }}>Select at least one channel to continue.</p>}
  </div>
);

const CompletionScreen = ({ data, onDashboard }) => (
  <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
    <div style={{ width:72, height:72, borderRadius:20, background:'linear-gradient(135deg, #8b5cf6, #a8ff3e)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
      <Sparkles size={32} color="#060610" />
    </div>
    <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.8rem,4vw,2.5rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>Your agent is live.</h2>
    <p style={{ color:'rgba(245,243,239,0.4)', maxWidth:400, margin:'0 auto 2.5rem', lineHeight:1.7 }}>
      <strong style={{ color:'#f5f3ef' }}>{data.businessName || 'Your business'}</strong> agent is ready to handle customer conversations.
    </p>
    <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
      <button className="btn-volt" style={{ fontSize:'0.92rem', padding:'0.85rem 2rem' }} onClick={onDashboard}>Go to Dashboard <ArrowRight size={15} style={{ marginLeft:4 }}/></button>
      <button className="btn-ghost" style={{ fontSize:'0.92rem', padding:'0.85rem 2rem' }}>Test your agent</button>
    </div>
  </div>
);

export default function AgentSetupWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState(null);
  const [business, setBusiness] = useState({ businessName:'', businessEmail:'', contactPhone:'', websiteUrl:'' });
  const [personality, setPersonality] = useState('professional');
  const [channels, setChannels] = useState(['website']);

  const toggleChannel = (id) => setChannels(prev => prev.includes(id) ? prev.filter(c=>c!==id) : [...prev, id]);
  const canNext = () => {
    if(step===1) return !!template;
    if(step===2) return !!(business.businessName && business.businessEmail && business.contactPhone);
    if(step===3) return channels.length > 0;
    return true;
  };
  const handleNext = async () => {
    if(!canNext()) return;
    if(step === 3) { setLoading(true); await new Promise(r => setTimeout(r, 1800)); setLoading(false); setStep(4); }
    else setStep(s=>s+1);
  };

  const STEPS = ['Template','Configure','Launch'];
  const isDone = step === 4;

  return (
    <div style={{ minHeight:'100vh', background:'#060610', display:'flex', flexDirection:'column' }}>
      <div style={{ height:64, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 clamp(1.5rem,4vw,3rem)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(6,6,16,0.9)', backdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer' }} onClick={() => navigate('/')}>
          <LogoMark size={26} />
          <span style={{ fontWeight:700, fontSize:'0.95rem', letterSpacing:'-0.02em', color:'#f5f3ef' }}>Rocket<span style={{ color:'#a78bfa' }}>.</span>new</span>
        </div>
        <button onClick={() => navigate('/')} style={{ all:'unset', cursor:'pointer', color:'rgba(245,243,239,0.35)', fontSize:'0.82rem', display:'flex', alignItems:'center', gap:6 }}>✕ Exit</button>
      </div>

      {!isDone && (
        <div style={{ background:'rgba(14,14,28,0.5)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth:720, margin:'0 auto', padding:'1.25rem clamp(1.5rem,4vw,3rem)', display:'flex', gap:'0.5rem', alignItems:'center' }}>
            {STEPS.map((s, i) => {
              const n = i+1, done = n < step, active = n === step;
              return (
                <React.Fragment key={s}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.76rem', fontWeight:700, background: done ? '#8b5cf6' : active ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.05)', border:`1px solid ${done||active ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}`, color: done||active ? '#fff' : 'rgba(245,243,239,0.25)', transition:'all 0.3s' }}>
                      {done ? <Check size={13} /> : n}
                    </div>
                    <span style={{ fontSize:'0.8rem', fontWeight: active ? 600 : 400, color: active ? '#f5f3ef' : 'rgba(245,243,239,0.3)' }}>{s}</span>
                  </div>
                  {i < STEPS.length-1 && <div style={{ flex:1, height:1, background: done ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.06)', minWidth:20 }} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent: isDone ? 'center' : 'flex-start', padding:'3rem clamp(1.5rem,4vw,3rem) 8rem' }}>
        <div style={{ width:'100%', maxWidth: isDone ? 560 : 820 }}>
          {step===1 && <TemplateStep selected={template} onSelect={setTemplate} />}
          {step===2 && <ConfigureStep data={business} onChange={setBusiness} personality={personality} onPersonality={setPersonality} />}
          {step===3 && <LaunchStep enabled={channels} onToggle={toggleChannel} />}
          {step===4 && <CompletionScreen data={business} onDashboard={() => navigate('/dashboard')} />}
        </div>
      </div>

      {!isDone && (
        <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'1rem clamp(1.5rem,4vw,3rem)', background:'rgba(6,6,16,0.95)', backdropFilter:'blur(12px)', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:100 }}>
          <button className="btn-ghost" style={{ visibility: step>1 ? 'visible' : 'hidden' }} onClick={() => setStep(s=>s-1)}>
            <ArrowLeft size={14} style={{ marginRight:4 }} /> Back
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            {[1,2,3].map(n => <div key={n} style={{ width: n===step ? 20 : 6, height:6, borderRadius:3, background: n<=step ? '#8b5cf6' : 'rgba(255,255,255,0.12)', transition:'all 0.3s' }} />)}
          </div>
          <button className="btn-primary" style={{ opacity: canNext()?1:0.4, cursor: canNext()?'pointer':'not-allowed', minWidth:140 }} onClick={handleNext} disabled={!canNext()||loading}>
            {loading ? <><Loader2 size={14} style={{ animation:'spin 1s linear infinite', marginRight:6 }} /> Launching…</> : step===3 ? 'Launch Agent' : <>Continue <ArrowRight size={14} style={{ marginLeft:4 }}/></>}
          </button>
        </div>
      )}
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }
        @media (max-width:600px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}