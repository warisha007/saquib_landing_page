import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as Icons from 'lucide-react';
import './styles.css';

const services = [
  ['Crown', 'Leadership Development', 'Building visionary leaders through strategic thinking, decision-making, emotional intelligence, and executive presence.', ['Strategic Leadership', 'Executive Coaching', 'Decision-Making Frameworks']],
  ['Users', 'Team Building & Collaboration', 'Fostering high-performing teams through trust-building, communication excellence, conflict resolution, and collaborative problem-solving.', ['Trust & Communication', 'Conflict Resolution', 'Collaborative Problem-Solving']],
  ['HeartHandshake', 'Personal Development & EI', 'Emotionally Intelligence-certified programs that enhance self-awareness, self-regulation, empathy, and social skills.', ['Self-Awareness & Regulation', 'Empathy & Social Skills', 'Resilience & Mindset']],
  ['RefreshCw', 'Change Management & Transformation', 'Guiding organizations through change with proven frameworks, stakeholder engagement, and culture transformation strategies.', ['Change Frameworks', 'Stakeholder Engagement', 'Culture Transformation']],
  ['Building2', 'Corporate Training Programs', 'End-to-end corporate learning solutions from needs assessment to program delivery and evaluation.', ['Needs Assessment', 'Custom Curriculum Design', 'Impact Evaluation']],
  ['Landmark', 'Government & Development Sector', 'Specialized training for public sector institutions and development organizations, focusing on capacity building and empowerment.', ['Capacity Building', 'Policy Implementation', 'Community Empowerment']]
];

const sectors = [['Building2', 'Corporate'], ['GraduationCap', 'Education'], ['Landmark', 'Government'], ['HeartHandshake', 'Development'], ['Stethoscope', 'Healthcare'], ['Banknote', 'Finance'], ['Cpu', 'Technology'], ['Globe2', 'Non-Profit']];
const experience = [
  ['Jun 2024 - Present', 'Head of Global Learning & Business, North', 'PSTD · Full-time', 'Acting Head of Business and Consultant/Learning Facilitator, delivering interactive learning and business development support.'],
  ['Dec 2015 - Present', 'Founder', 'SN Ventures · Self-employed', 'Chief Learning Officer and organizational development consultant, providing training and facilitation across workplace communication, leadership, and emotional intelligence.'],
  ['May 2015 - Present', 'Consultant and Trainer', 'British Council · Contract', 'Designed and delivered Citizenship Education and Community Engagement programmes for university faculty across Pakistan.'],
  ['Jan 2014 - Apr 2016', 'Project Lead & Management Committee', 'School of Leadership', 'Created and led the Karachi Youth Support Network, connecting more than 20,000 young people to opportunity.'],
  ['Dec 2008 - Jul 2012', 'Founding Member', 'Torque Corp · Full-time', 'Co-founded a management consulting firm and supported leadership and management training modules.']
];
const testimonials = [
  ['MR', 'Maria Rashid', 'Manager - People & Talent', "Saquib's session on emotional intelligence was informative, interactive, and well-structured. His expertise and engaging style created a dynamic learning environment."],
  ['AA', 'Anisa Aneel', 'HR Leader, Coach & Corporate Trainer', 'The insights gained from this experience have been truly transformative. I feel more equipped to navigate complex interpersonal dynamics, communicate effectively, and lead with empathy.'],
  ['ZS', 'Zahyd S', 'Associate Director - HR', 'Saquib brings a wealth of knowledge, enthusiasm and an engaging teaching style that makes the learning experience truly memorable.'],
  ['IS', 'Iqra Saleem - CHRP', 'Talent Acquisition & Employee Engagement', "Saquib's engaging style and ability to connect with participants made the session an enlightening experience. The practical activities made the learnings applicable to our workplace."]
];

function Icon({ name, size = 20, ...props }) {
  const Component = Icons[name] || Icons.Circle;
  return <Component size={size} strokeWidth={1.8} {...props} />;
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Nav({ menuOpen, setMenuOpen }) {
  const links = [['services', 'Services'], ['results', 'Impact'], ['sectors', 'Sectors'], ['about', 'About'], ['testimonials', 'Testimonials'], ['contact', 'Contact']];
  return <nav className={`navbar ${menuOpen ? 'menu-active' : ''}`}><div className="nav-inner"><a className="brand" href="#hero"><span className="brand-mark">SN</span><strong>Saquib Niaz</strong></a><div className="desktop-links">{links.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><a className="button primary nav-cta" href="#contact">Book a Session</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><Icon name={menuOpen ? 'X' : 'Menu'} /></button></div><div className="mobile-menu">{links.map(([id, label]) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>{label}</a>)}</div></nav>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const onScroll = () => setProgress((window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100);
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove);
    onScroll();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    const cards = document.querySelectorAll('.service-card, .result-card, .project-card, .sector-card, .testimonial, .timeline article');
    const onCardMove = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      card.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -3}deg`);
      card.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 3}deg`);
    };
    const resetCard = (event) => {
      event.currentTarget.style.setProperty('--tilt-x', '0deg');
      event.currentTarget.style.setProperty('--tilt-y', '0deg');
    };
    cards.forEach(card => { card.addEventListener('pointermove', onCardMove); card.addEventListener('pointerleave', resetCard); });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); observer.disconnect(); cards.forEach(card => { card.removeEventListener('pointermove', onCardMove); card.removeEventListener('pointerleave', resetCard); }); };
  }, []);

  return <>
    <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <div className="motion-field" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--particle-index': index }} />)}</div>
    <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main>
      <section className="hero" id="hero"><div className="orb orb-one" /><div className="orb orb-two" /><div className="container hero-grid"><div className="hero-copy"><span className="availability reveal"><i /> Available for new engagements</span><h1 className="reveal">Saquib<br /><span>Niaz</span></h1><p className="role reveal">Expert Trainer & Facilitator</p><p className="credentials reveal">EI Certified | Global Experience<br />Multi-Sector Expertise (Corporate, Education, Govt., Dev.)</p><p className="lead reveal">Empowering organizations and individuals through transformative training in leadership, team development, personal growth, change management, and organizational transformation.</p><div className="hero-actions reveal"><a className="button primary" href="#contact">Book a Training Session <Icon name="CalendarDays" size={18} /></a><a className="button secondary" href="#services">Explore Programs <Icon name="Compass" size={18} /></a></div><div className="stats reveal">{[['500+', 'Professionals Trained'], ['50+', 'Organizations Served'], ['10+', 'Countries Reached'], ['95%', 'Satisfaction Rate']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div><div className="hero-visual reveal"><div className="portrait-frame"><img src="/portrait.png" alt="Professional trainer portrait" /><div className="floating-card top"><Icon name="Award" /><span><b>EI Certified</b><small>Emotional Intelligence</small></span></div><div className="floating-card bottom"><Icon name="Globe2" /><span><b>Global Reach</b><small>10+ Countries</small></span></div></div></div></div><div className="scroll-cue">Scroll <span>↓</span></div></section>
      <section className="section" id="services"><div className="container"><SectionHeading eyebrow="What I Offer" title="Training Programs">Comprehensive, tailored training solutions designed to unlock potential and drive transformation across individuals, teams, and organizations.</SectionHeading><div className="card-grid three">{services.map(([icon, title, description, items]) => <article className="service-card reveal" key={title}><div className="icon-box"><Icon name={icon} /></div><h3>{title}</h3><p>{description}</p><ul>{items.map(item => <li key={item}><Icon name="CheckCircle2" size={16} />{item}</li>)}</ul></article>)}</div></div></section>
      <section className="section tinted" id="results"><div className="container"><SectionHeading eyebrow="Proven Impact" title="Training Impact">Measurable outcomes from transformative training programs delivered across the globe.</SectionHeading><div className="card-grid four results">{[['Users', '500+', 'Professionals Trained'], ['Building2', '50+', 'Organizations Served'], ['Globe2', '10+', 'Countries Reached'], ['Smile', '95%', 'Satisfaction Rate']].map(([icon, value, label]) => <article className="result-card reveal" key={label}><Icon name={icon} size={28} /><strong>{value}</strong><b>{label}</b><span>Across all programs and sectors</span></article>)}</div><div className="card-grid three projects">{[['1552664730-d307ca884978', 'Leadership', 'Executive Leadership Program', '+38% Engagement'], ['1522071820081-009f0129c71c', 'Team Building', 'Cross-Functional Team Alignment', '-30% Delivery Time'], ['1544531585-9847b68c8c86', 'Transformation', 'Organizational Change Initiative', '92% Adoption']].map(([image, category, title, metric]) => <article className="project-card reveal" key={title}><img src={`https://images.unsplash.com/photo-${image}?w=800&h=560&fit=crop&q=85`} alt={title} /><div><span>{category}</span><h3>{title}</h3><p>Practical, measurable training designed to turn capability into lasting organizational outcomes.</p><em>{metric}</em></div></article>)}</div></div></section>
      <section className="section" id="sectors"><div className="container"><SectionHeading eyebrow="Industries Served" title="Sectors I Work With">Delivering transformative training across diverse sectors, adapting approaches to meet unique organizational cultures and challenges.</SectionHeading><div className="sector-grid">{sectors.map(([icon, label]) => <article className="sector-card reveal" key={label}><Icon name={icon} size={25} /><strong>{label}</strong></article>)}</div></div></section>
      <section className="section tinted" id="about"><div className="container about-grid"><div className="reveal"><span className="eyebrow">About Me</span><h2>A People Developer and Learning Facilitator</h2><p>I have been in the learning industry for 15 years, from co-founding a training company called Torque to organising Pakistan's First Learning Festival under the auspices of Trainers' Resource Group.</p><p>I am an expert in professional skills including leadership, communication, problem-solving, emotional intelligence, critical thinking, conflict management, and teamwork.</p><p>I consider myself a People Developer, with a passion for empowering others to reach their full potential through coaching, facilitation, role-playing, case studies, simulation games, and group discussions.</p><h3>Core Competencies</h3><div className="skills">{['Leadership', 'Communication', 'Problem-Solving', 'Emotional Intelligence', 'Critical Thinking', 'Conflict Management', 'Teamwork', 'Coaching', 'Community Engagement', 'Organizational Development'].map(skill => <span key={skill}>{skill}</span>)}</div></div><div className="reveal"><h3>Experience</h3><div className="timeline">{experience.map(([date, title, company, description]) => <article key={title}><span className="timeline-dot" /><small>{date}</small><h4>{title}</h4><b>{company}</b><p>{description}</p></article>)}</div></div></div></section>
      <section className="section" id="testimonials"><div className="container"><SectionHeading eyebrow="Kind Words" title="Testimonials">What participants and organizational leaders say about the transformative impact of our work together.</SectionHeading><div className="card-grid two">{testimonials.map(([initials, name, role, quote]) => <article className="testimonial reveal" key={name}><Icon name="Quote" size={22} /><p>“{quote}”</p><div><span>{initials}</span><b>{name}</b><small>{role}</small></div></article>)}</div></div></section>
      <section className="contact section tinted" id="contact"><div className="container narrow"><SectionHeading eyebrow="Get In Touch" title="Ready to Transform Your Organization?">Let's design a training program that unlocks potential, builds capability, and drives lasting organizational transformation.</SectionHeading><div className="hero-actions"><a className="button primary" href="mailto:saquib13@gmail.com">Book a Training Session <Icon name="CalendarDays" size={18} /></a><a className="button secondary" href="mailto:saquib13@gmail.com">Let's Connect <Icon name="MessageCircle" size={18} /></a></div><div className="contact-details"><span><Icon name="Mail" /> Email<b>saquib13@gmail.com</b></span><span><Icon name="Clock3" /> Response Time<b>Within 24 hours</b></span><span><Icon name="Globe2" /> Availability<b>Worldwide Remote & On-Site</b></span></div></div></section>
    </main>
    <footer><div className="container footer-inner"><a className="brand" href="#hero"><span className="brand-mark">SN</span><strong>Saquib Niaz</strong></a><div className="socials"><a href="mailto:saquib13@gmail.com"><Icon name="Mail" size={17} /></a><a href="#contact"><Icon name="Linkedin" size={17} /></a><a href="#contact"><Icon name="Instagram" size={17} /></a></div><small>© 2026 Saquib Niaz. All rights reserved.</small></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
