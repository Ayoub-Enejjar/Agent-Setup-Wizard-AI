import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Moon, Smartphone, Brain, BarChart3, Link2, Sparkles, ArrowRight, Play, ChevronRight, Scissors, Truck, Wrench, Building2, Check, Shield, Clock, Users } from 'lucide-react';
import { LogoFull, LogoMark } from '../../components/Logo';

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const industries = ['Beauty & Salon','Delivery & Logistics','Repair Services','Restaurants','Healthcare','Legal Services','Real Estate','Fitness & Gym','Education','E-Commerce','Hotels','Automotive'];

const templates = [
  { id:'beauty', label:'Beauty & Salon', desc:'Appointment booking, service menus, staff availability — all handled.', tag:'Most popular', accent:'#f472b6', Icon: Scissors, features:['Appointment booking','Service pricing','Staff scheduling'] },
  { id:'delivery', label:'Delivery & Logistics', desc:'Order tracking, status updates, and route coordination on autopilot.', tag:null, accent:'#38bdf8', Icon: Truck, features:['Order tracking','Delivery ETA','Status updates'] },
  { id:'repair', label:'Repair Services', desc:'Diagnostics booking, quotes, and parts availability — instantly.', tag:null, accent:'#fb923c', Icon: Wrench, features:['Quote generation','Diagnostic booking','Warranty info'] },
  { id:'general', label:'General Business', desc:'Lead capture, FAQs, and custom workflows for any business type.', tag:'Most flexible', accent:'#4ade80', Icon: Building2, features:['Lead capture','FAQ responses','Custom workflows'] },
];

const features = [
  { Icon: Zap, title:'Setup in minutes', desc:'No developers, no complex configuration. Just answer a few questions and your agent is live.' },
  { Icon: Moon, title:'Works 24 / 7', desc:'While you sleep, your agent is answering, booking, and following up with customers.' },
  { Icon: Smartphone, title:'Multi-channel', desc:'Deploy to WhatsApp, Instagram, your website, or all three at once.' },
  { Icon: Brain, title:'Industry-smart', desc:'Pre-trained on your industry so responses feel expert and on-brand from day one.' },
  { Icon: BarChart3, title:'Live dashboard', desc:'See every conversation, booking, and lead in a clean, real-time dashboard.' },
  { Icon: Link2, title:'100+ integrations', desc:'Connect your calendar, CRM, payment processor, and more without writing code.' },
];

const stats = [
  { value:'10K+', label:'Businesses', sub:'trust Rocket.new' },
  { value:'2.4M', label:'Conversations', sub:'handled monthly' },
  { value:'< 2s', label:'Response time', sub:'average globally' },
  { value:'99.9%', label:'Uptime', sub:'platform reliability' },
];

const stepIcons = [Brain, Sparkles, ArrowRight];

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  useReveal();

  return (
    <div style={{ background:'#060610', color:'#f5f3ef', minHeight:'100vh', overflowX:'hidden' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 clamp(1.5rem,5vw,4rem)', height:'72px', background:'rgba(6,6,16,0.82)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ cursor:'pointer' }} onClick={() => navigate('/')}>
          <LogoFull size={30} />
        </div>
        <div className="hide-mobile" style={{ display:'flex', alignItems:'center', gap:'2.5rem' }}>
          {['Features','Templates','Pricing','Docs'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color:'rgba(245,243,239,0.5)', fontSize:'0.85rem', fontWeight:500, textDecoration:'none', transition:'color 0.2s', letterSpacing:'-0.01em' }}
               onMouseEnter={e => e.target.style.color='#f5f3ef'} onMouseLeave={e => e.target.style.color='rgba(245,243,239,0.5)'}>{l}</a>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <button className="btn-ghost hide-mobile" style={{ padding:'0.5rem 1.2rem', fontSize:'0.82rem' }} onClick={() => navigate('/login-screen')}>Sign in</button>
          <button className="btn-volt" style={{ padding:'0.55rem 1.4rem', fontSize:'0.82rem' }} onClick={() => navigate('/agent-setup-wizard')}>Get started <ArrowRight size={14} style={{ marginLeft:2 }}/></button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'8rem clamp(1.5rem,5vw,6rem) 5rem', textAlign:'center', overflow:'hidden' }}>
        <div className="orb animate-float-slow" style={{ width:700, height:700, top:'-15%', left:'-10%', background:'radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)' }} />
        <div className="orb animate-float-med" style={{ width:550, height:550, top:'25%', right:'-8%', background:'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)', animationDelay:'3s' }} />
        <div className="orb animate-float-slow" style={{ width:450, height:450, bottom:'-8%', left:'25%', background:'radial-gradient(circle, rgba(168,255,62,0.12) 0%, transparent 70%)', animationDelay:'6s' }} />
        <div style={{ position:'absolute', inset:0, opacity:0.025, backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none' }} />

        <div style={{ position:'relative', maxWidth:860, margin:'0 auto' }}>
          <div className="animate-fade-up" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.25)', borderRadius:'100px', padding:'0.4rem 1.1rem', marginBottom:'2.25rem' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#a8ff3e', display:'inline-block', boxShadow:'0 0 8px rgba(168,255,62,0.6)' }} />
            <span style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#c4b5fd' }}>AI Agent Platform</span>
          </div>

          <h1 className="animate-fade-up delay-100" style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(3.2rem, 8.5vw, 7.5rem)', fontWeight:400, lineHeight:0.98, letterSpacing:'-0.035em', marginBottom:'2rem' }}>
            Build agents that<br/><span style={{ fontStyle:'italic', color:'#c4b5fd' }}>handle your</span><br/>business.
          </h1>

          <p className="animate-fade-up delay-200" style={{ fontSize:'clamp(1rem, 2vw, 1.2rem)', color:'rgba(245,243,239,0.5)', maxWidth:520, margin:'0 auto 2.75rem', lineHeight:1.75 }}>
            Set up an AI assistant in minutes — it books, answers, and follows up with your customers around the clock.
          </p>

          <div className="animate-fade-up delay-300" style={{ display:'flex', gap:'0.85rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'4rem' }}>
            <button className="btn-volt" style={{ fontSize:'0.95rem', padding:'0.9rem 2.25rem' }} onClick={() => navigate('/agent-setup-wizard')}>
              Create your agent <ArrowRight size={16} style={{ marginLeft:4 }}/>
            </button>
            <button className="btn-ghost" style={{ fontSize:'0.95rem', padding:'0.9rem 2rem' }}>
              <Play size={14} fill="currentColor" style={{ marginRight:6 }}/> Watch demo
            </button>
          </div>

          <div className="animate-fade-up delay-400" style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
            {['Setup in 3 steps','No code needed','24/7 active','100+ integrations'].map(s => (
              <span key={s} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'100px', padding:'0.4rem 1rem', fontSize:'0.78rem', color:'rgba(245,243,239,0.45)' }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ position:'absolute', bottom:'2.5rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', color:'rgba(245,243,239,0.15)', fontSize:'0.65rem', letterSpacing:'0.15em' }}>
          <div style={{ width:1, height:48, background:'linear-gradient(to bottom, transparent, rgba(139,92,246,0.4))' }} />
          SCROLL
        </div>
      </section>

      {/* STATS BAR */}
      <section className="reveal" style={{ borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(14,14,28,0.4)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:0 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding:'2.5rem 1.5rem', textAlign:'center', borderRight: i < stats.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-0.03em', color:'#f5f3ef', marginBottom:'0.25rem' }}>{s.value}</div>
              <div style={{ fontSize:'0.82rem', fontWeight:600, color:'rgba(245,243,239,0.5)', marginBottom:'0.15rem' }}>{s.label}</div>
              <div style={{ fontSize:'0.72rem', color:'rgba(245,243,239,0.25)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'1.1rem 0', overflow:'hidden', background:'rgba(14,14,28,0.3)' }}>
        <div style={{ display:'flex', whiteSpace:'nowrap' }}>
          <div className="animate-marquee" style={{ display:'flex', gap:'3rem', paddingRight:'3rem' }}>
            {[...industries, ...industries].map((ind, i) => (
              <span key={i} style={{ fontSize:'0.72rem', fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(245,243,239,0.25)' }}>
                <span style={{ color:'rgba(139,92,246,0.6)', marginRight:'1rem' }}>◆</span>{ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="features" style={{ padding:'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,6rem)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="reveal" style={{ marginBottom:'5rem' }}>
            <p className="section-label" style={{ marginBottom:'1rem' }}>How it works</p>
            <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:400, letterSpacing:'-0.03em' }}>
              From zero to live<br/><span style={{ fontStyle:'italic', color:'#c4b5fd' }}>in three steps.</span>
            </h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {[
              { n:'01', title:'Choose your template', desc:'Pick the industry that matches your business. Each template comes pre-trained with the right knowledge and tone.' },
              { n:'02', title:'Configure in minutes', desc:"Add your business name, set your agent's personality, and connect your communication channels — no technical skills needed." },
              { n:'03', title:'Launch & watch it work', desc:'Deploy your agent to WhatsApp, Instagram, or your website. It starts responding to customers immediately.' },
            ].map((step, i) => {
              const StepIcon = stepIcons[i];
              return (
                <div key={step.n} className="reveal" style={{ display:'flex', gap:'clamp(2rem,5vw,6rem)', alignItems:'flex-start', padding:'3rem 0', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(3rem,7vw,5rem)', fontWeight:400, color:'rgba(255,255,255,0.06)', lineHeight:1, flexShrink:0, minWidth:80 }}>{step.n}</div>
                  <div style={{ paddingTop:'0.5rem', flex:1 }}>
                    <h3 style={{ fontSize:'clamp(1.2rem,3vw,1.6rem)', fontWeight:600, marginBottom:'0.75rem', letterSpacing:'-0.02em' }}>{step.title}</h3>
                    <p style={{ color:'rgba(245,243,239,0.45)', lineHeight:1.7, maxWidth:500, fontSize:'0.95rem' }}>{step.desc}</p>
                  </div>
                  <div style={{ marginLeft:'auto', flexShrink:0, width:48, height:48, borderRadius:12, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#a78bfa', alignSelf:'center' }}>
                    <StepIcon size={20} />
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)' }} />
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" style={{ padding:'clamp(4rem,8vw,8rem) 0', background:'rgba(14,14,28,0.4)' }}>
        <div style={{ padding:'0 clamp(1.5rem,5vw,6rem)', marginBottom:'3rem' }}>
          <div className="reveal" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <p className="section-label" style={{ marginBottom:'0.75rem' }}>Agent templates</p>
              <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:400, letterSpacing:'-0.03em' }}>Pick your starting point.</h2>
            </div>
            <button className="btn-ghost" style={{ fontSize:'0.82rem' }} onClick={() => navigate('/agent-setup-wizard')}>Browse all <ArrowRight size={14} style={{ marginLeft:4 }}/></button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1rem', padding:'0 clamp(1.5rem,5vw,6rem)' }}>
          {templates.map((t, i) => {
            const TIcon = t.Icon;
            return (
              <div key={t.id} className="reveal" style={{ background:'#0e0e1c', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'1.75rem', cursor:'pointer', transition:'all 0.3s', position:'relative', overflow:'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${t.accent}40`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 20px 40px rgba(0,0,0,0.3), 0 0 24px ${t.accent}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                onClick={() => navigate('/agent-setup-wizard')}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem' }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:`${t.accent}12`, border:`1px solid ${t.accent}25`, display:'flex', alignItems:'center', justifyContent:'center', color:t.accent }}>
                    <TIcon size={20} />
                  </div>
                  {t.tag && <span style={{ fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', background:`${t.accent}12`, color:t.accent, border:`1px solid ${t.accent}25`, borderRadius:100, padding:'0.2rem 0.7rem' }}>{t.tag}</span>}
                </div>
                <h3 style={{ fontSize:'1.05rem', fontWeight:600, marginBottom:'0.5rem', letterSpacing:'-0.01em' }}>{t.label}</h3>
                <p style={{ color:'rgba(245,243,239,0.4)', fontSize:'0.85rem', lineHeight:1.6, marginBottom:'1.25rem' }}>{t.desc}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                  {t.features.map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.8rem', color:'rgba(245,243,239,0.35)' }}>
                      <Check size={12} style={{ color:t.accent, flexShrink:0 }} /> {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:'1.5rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:'0.8rem', color:t.accent, fontWeight:500 }}>Use template</span>
                  <ArrowRight size={14} style={{ color:t.accent }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,6rem)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:'4rem' }}>
            <p className="section-label" style={{ marginBottom:'0.75rem' }}>Capabilities</p>
            <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:400, letterSpacing:'-0.03em' }}>
              Everything your agent<br/><span style={{ fontStyle:'italic', color:'#c4b5fd' }}>needs to succeed.</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.25rem' }}>
            {features.map((f, i) => {
              const FIcon = f.Icon;
              return (
                <div key={f.title} className="reveal card-dark" style={{ padding:'1.75rem', borderRadius:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:'rgba(139,92,246,0.08)', border:'1px solid rgba(139,92,246,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#a78bfa', marginBottom:'1rem' }}>
                    <FIcon size={18} />
                  </div>
                  <h3 style={{ fontSize:'1rem', fontWeight:600, marginBottom:'0.5rem', letterSpacing:'-0.01em' }}>{f.title}</h3>
                  <p style={{ color:'rgba(245,243,239,0.4)', fontSize:'0.85rem', lineHeight:1.65 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="reveal" style={{ padding:'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,6rem)', background:'rgba(14,14,28,0.4)', borderTop:'1px solid rgba(255,255,255,0.06)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'flex', justifyContent:'center', gap:'2.5rem', flexWrap:'wrap', marginBottom:'2rem' }}>
            {[
              { Icon: Shield, text:'Enterprise-grade security' },
              { Icon: Clock, text:'99.9% uptime SLA' },
              { Icon: Users, text:'SOC 2 compliant' },
            ].map(t => (
              <div key={t.text} style={{ display:'flex', alignItems:'center', gap:'0.6rem', color:'rgba(245,243,239,0.5)', fontSize:'0.85rem' }}>
                <t.Icon size={16} style={{ color:'#8b5cf6' }} /> {t.text}
              </div>
            ))}
          </div>
          <p style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:400, fontStyle:'italic', color:'rgba(245,243,239,0.35)', lineHeight:1.6, maxWidth:600, margin:'0 auto' }}>
            "We replaced three support agents with one Rocket.new AI — response times dropped 80% and bookings doubled."
          </p>
          <p style={{ marginTop:'1rem', fontSize:'0.82rem', color:'rgba(245,243,239,0.3)' }}>— Maria S., Salon Owner</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position:'relative', padding:'clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,6rem)', textAlign:'center', overflow:'hidden' }}>
        <div className="orb" style={{ width:700, height:700, top:'50%', left:'50%', transform:'translate(-50%,-50%)', background:'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)', opacity:1 }} />
        <div style={{ position:'relative', maxWidth:620, margin:'0 auto' }}>
          <div className="reveal" style={{ background:'rgba(14,14,28,0.7)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:'clamp(2.5rem,6vw,5rem) clamp(2rem,5vw,4rem)' }}>
            <div style={{ margin:'0 auto 1.5rem', width:56, height:56 }}>
              <LogoMark size={56} />
            </div>
            <h2 style={{ fontFamily:'Instrument Serif, serif', fontSize:'clamp(2rem,5vw,3rem)', fontWeight:400, letterSpacing:'-0.03em', marginBottom:'1rem' }}>Ready to build yours?</h2>
            <p style={{ color:'rgba(245,243,239,0.45)', marginBottom:'2rem', lineHeight:1.7 }}>Join thousands of businesses using Rocket.new to automate their customer interactions.</p>
            <button className="btn-volt" style={{ fontSize:'1rem', padding:'0.9rem 2.25rem' }} onClick={() => navigate('/agent-setup-wizard')}>
              Start building — it's free <ArrowRight size={16} style={{ marginLeft:4 }}/>
            </button>
            <p style={{ marginTop:'1rem', fontSize:'0.75rem', color:'rgba(245,243,239,0.22)' }}>No credit card required · Setup in 3 minutes</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding:'2.5rem clamp(1.5rem,5vw,6rem)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <LogoMark size={22} />
          <span style={{ fontWeight:700, fontSize:'0.88rem' }}>Rocket<span style={{ color:'#a78bfa' }}>.</span>new</span>
          <span style={{ color:'rgba(245,243,239,0.2)', fontSize:'0.78rem', marginLeft:'0.5rem' }}>© 2025</span>
        </div>
        <div style={{ display:'flex', gap:'2rem' }}>
          {['Privacy','Terms','Contact'].map(l => (
            <a key={l} href="#" style={{ color:'rgba(245,243,239,0.25)', fontSize:'0.8rem', textDecoration:'none', transition:'color 0.2s' }}
               onMouseEnter={e => e.target.style.color='rgba(245,243,239,0.5)'} onMouseLeave={e => e.target.style.color='rgba(245,243,239,0.25)'}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @media (max-width:768px) {
          .hide-mobile { display:none !important; }
          section [style*="grid-template-columns"] { grid-template-columns:1fr !important; }
        }
        @media (max-width:480px) {
          footer { flex-direction:column; align-items:flex-start !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
