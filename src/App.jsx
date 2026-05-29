import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [formBtnText, setFormBtnText] = useState('Send Message →');
  const [formBtnStyle, setFormBtnStyle] = useState({});

  useEffect(() => {
    // 1. CUSTOM CURSOR
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    
    const moveCursor = (e) => {
      if(cursor && cursorDot) {
        cursorDot.style.left = (e.clientX - 3) + 'px';
        cursorDot.style.top = (e.clientY - 3) + 'px';
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
      }
    };
    
    document.addEventListener('mousemove', moveCursor);

    document.querySelectorAll('button, a, .product-card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        if(cursor) {
          cursor.style.transform = 'scale(2)';
          cursor.style.borderColor = 'var(--forest)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if(cursor) {
          cursor.style.transform = 'scale(1)';
          cursor.style.borderColor = 'var(--gold)';
        }
      });
    });

    // 2. SCROLL REVEAL
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' }); 
    
    reveals.forEach(el => observer.observe(el));

    // 3. COUNTER ANIMATION
    function animateCounter(el) {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isLarge = target >= 1000;
      const duration = 2000;
      const step = duration / 60;
      let current = 0;
      const increment = target / (duration / step);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (isLarge && target >= 1000) {
          el.textContent = Math.floor(current / 1000) + 'K' + suffix;
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.counter-num, .counter').forEach(el => counterObserver.observe(el));

    // 4. NAVBAR SCROLL
    const handleScroll = () => {
      const nav = document.getElementById('navbar');
      if (nav) {
        if (window.scrollY > 80) {
          nav.style.boxShadow = '0 4px 30px rgba(27,67,50,0.1)';
        } else {
          nav.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 5. PRODUCT CARD 3D TILT
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = (y - cy) / cy * 8;
        const rotY = (x - cx) / cx * 8;
        card.style.transform = `translateY(-12px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = () => {
    setFormBtnText('Sending...');
    setTimeout(() => {
      setFormBtnText('Message Sent! ✓');
      setFormBtnStyle({ background: 'var(--gold)', color: 'var(--brown)' });
      setTimeout(() => {
        setFormBtnText('Send Message →');
        setFormBtnStyle({ background: 'var(--forest)', color: 'var(--cream)' });
      }, 3000);
    }, 1500);
  };

  const toggleFaq = (e) => {
    const item = e.currentTarget.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-icon').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-icon').textContent = '×';
    }
  };

  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    color: ['#C6A969', '#DDB892', '#F8F5F0', '#2D6A4F', '#1B4332'][Math.floor(Math.random() * 5)],
    left: Math.random() * 100,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 10
  }));

  const herbs = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    emoji: ['🌿', '🌱', '✿', '🍃', '🌾', '🌺', '🌸'][Math.floor(Math.random() * 7)],
    left: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 15,
    fontSize: Math.random() * 3 + 2
  }));

  return (
    <>
      <div className="custom-cursor" id="cursor"></div>
      <div className="cursor-dot" id="cursorDot"></div>

      <div className="floating-herbs" id="herbs">
        {herbs.map(herb => (
          <div key={herb.id} className="herb" style={{
            left: `${herb.left}%`,
            animationDuration: `${herb.duration}s`,
            animationDelay: `${herb.delay}s`,
            fontSize: `${herb.fontSize}rem`
          }}>
            {herb.emoji}
          </div>
        ))}
      </div>

      <nav id="navbar">
        <div className="nav-logo">HERB<span>IVA</span></div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-cta">Shop Now</button>
      </nav>

      <section id="hero">
        <div className="hero-particles" id="particles">
          {particles.map(p => (
            <div key={p.id} className="particle" style={{
              width: `${p.size}px`, height: `${p.size}px`, background: p.color,
              left: `${p.left}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`
            }}></div>
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-badge">✦ Est. 2018 · Ayurvedic Excellence ✦</div>
          <h1 className="hero-title">Pure Nature.<br /><span className="gold">Powerful</span><br />Wellness.</h1>
          <p className="hero-subtitle">100% Natural Herbal Powder — Made With Ancient Ingredients & Modern Purity Standards</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Explore Products</button>
            <button className="btn-secondary" onClick={() => document.getElementById('process').scrollIntoView({ behavior: 'smooth' })}>Watch Process</button>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section id="about">
        <div className="reveal-left">
          <div className="about-tag">✦ Our Story</div>
          <h2 className="section-title">Rooted in<br />Ancient Wisdom</h2>
          <p className="about-text">We create premium natural powders using traditional methods and high-quality herbs sourced from the finest farms across India.</p>
          <p className="about-text">Our mission is to deliver purity, health, and trust in every package — blending 5000 years of Ayurvedic knowledge with modern quality standards.</p>
          <div className="about-stats">
            <div className="stat-box reveal">
              <div className="stat-num counter" data-target="10000">0</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-box reveal">
              <div className="stat-num counter" data-target="50">0</div>
              <div className="stat-label">Natural Ingredients</div>
            </div>
            <div className="stat-box reveal">
              <div className="stat-num counter" data-target="100">0</div>
              <div className="stat-label">% Organic Process</div>
            </div>
            <div className="stat-box reveal">
              <div className="stat-num counter" data-target="15">0</div>
              <div className="stat-label">Export Countries</div>
            </div>
          </div>
        </div>
        <div className="jar-visual reveal-right">
          <div className="jar-svg-wrap">
            <svg viewBox="0 0 280 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#F8F5F0' }} />
                  <stop offset="100%" style={{ stopColor: '#DDB892' }} />
                </linearGradient>
                <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#C6A969' }} />
                  <stop offset="100%" style={{ stopColor: '#8a6930' }} />
                </linearGradient>
              </defs>
              <ellipse cx="140" cy="295" rx="80" ry="12" fill="rgba(27,67,50,0.15)" />
              <rect x="55" y="100" width="170" height="190" rx="20" fill="url(#jarGrad)" stroke="#DDB892" strokeWidth="2" />
              <rect x="55" y="100" width="170" height="190" rx="20" fill="rgba(27,67,50,0.05)" />
              <ellipse cx="140" cy="285" rx="80" ry="15" fill="#DDB892" opacity="0.8" />
              <rect x="50" y="75" width="180" height="40" rx="10" fill="url(#lidGrad)" />
              <ellipse cx="140" cy="75" rx="90" ry="12" fill="#C6A969" />
              <rect x="60" y="130" width="160" height="130" rx="15" fill="rgba(27,67,50,0.08)" />
              <text x="140" y="182" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="22" fontWeight="700" fill="#1B4332">HERBIVA</text>
              <text x="140" y="205" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="11" fill="#3A2E2A" letterSpacing="3">TURMERIC</text>
              <line x1="90" y1="215" x2="190" y2="215" stroke="#C6A969" strokeWidth="1" opacity="0.5" />
              <text x="140" y="232" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5a4a42">100% ORGANIC</text>
              <ellipse cx="140" cy="100" rx="90" ry="18" fill="rgba(27,67,50,0.1)" />
              <circle cx="80" cy="320" r="5" fill="#C6A969" opacity="0.5" />
              <circle cx="200" cy="310" r="3" fill="#1B4332" opacity="0.3" />
              <circle cx="50" cy="280" r="4" fill="#DDB892" opacity="0.4" />
            </svg>
            <div className="leaf-float" style={{ top: '30%', left: '15%', animationDuration: '8s', animationDelay: '-2s' }}>🌿</div>
            <div className="leaf-float" style={{ top: '60%', right: '10%', animationDuration: '10s', animationDelay: '-5s' }}>🌱</div>
            <div className="leaf-float" style={{ top: '20%', right: '20%', animationDuration: '7s', animationDelay: '-1s' }}>✿</div>
          </div>
        </div>
      </section>

      <section id="products">
        <div className="section-header reveal">
          <span className="about-tag">✦ Our Range</span>
          <h2 className="section-title">Premium Herbal<br />Powders</h2>
        </div>
        <div className="products-grid">
          <div className="product-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="card-glow"></div>
            <div className="card-img" style={{ background: 'linear-gradient(135deg,#fff8e6,#ffe4a0)' }}>🌿</div>
            <div className="card-body">
              <div className="card-name">Turmeric Powder</div>
              <div className="card-benefit">Anti-inflammatory powerhouse. Boosts immunity & aids digestion naturally.</div>
              <div className="card-tags"><span className="tag">Immunity</span><span className="tag">Anti-inflammatory</span></div>
              <button className="card-btn">Add to Cart</button>
            </div>
          </div>
          <div className="product-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="card-glow"></div>
            <div className="card-img" style={{ background: 'linear-gradient(135deg,#e6f5e6,#a8d8a8)' }}>🌱</div>
            <div className="card-body">
              <div className="card-name">Neem Powder</div>
              <div className="card-benefit">Purifies blood, clears skin & fights infections. Nature's antibiotic.</div>
              <div className="card-tags"><span className="tag">Skin Care</span><span className="tag">Detox</span></div>
              <button className="card-btn">Add to Cart</button>
            </div>
          </div>
          <div className="product-card reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="card-glow"></div>
            <div className="card-img" style={{ background: 'linear-gradient(135deg,#e8f5e8,#85c985)' }}>🥬</div>
            <div className="card-body">
              <div className="card-name">Moringa Powder</div>
              <div className="card-benefit">Superfood with 92 nutrients. Energy booster & complete nutrition.</div>
              <div className="card-tags"><span className="tag">Superfood</span><span className="tag">Energy</span></div>
              <button className="card-btn">Add to Cart</button>
            </div>
          </div>
          <div className="product-card reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="card-glow"></div>
            <div className="card-img" style={{ background: 'linear-gradient(135deg,#fce8e8,#f0a0a0)' }}>🍒</div>
            <div className="card-body">
              <div className="card-name">Amla Powder</div>
              <div className="card-benefit">Richest source of Vitamin C. Promotes hair growth & glowing skin.</div>
              <div className="card-tags"><span className="tag">Vitamin C</span><span className="tag">Hair Care</span></div>
              <button className="card-btn">Add to Cart</button>
            </div>
          </div>
          <div className="product-card reveal" style={{ transitionDelay: '0.5s' }}>
            <div className="card-glow"></div>
            <div className="card-img" style={{ background: 'linear-gradient(135deg,#f5f0e6,#d4c090)' }}>💪</div>
            <div className="card-body">
              <div className="card-name">Herbal Protein Mix</div>
              <div className="card-benefit">Plant-based protein blend. Builds muscle & supports recovery naturally.</div>
              <div className="card-tags"><span className="tag">Protein</span><span className="tag">Muscle</span></div>
              <button className="card-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      <section id="why">
        <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: 0 }}>
          <span className="about-tag">✦ Why Herbiva</span>
          <h2 className="section-title">Nature's Promise,<br />Our Guarantee</h2>
        </div>
        <div className="why-grid">
          <div className="why-card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="why-icon">🌿</span>
            <div className="why-title">100% Organic</div>
            <div className="why-desc">Farm-to-table herbs sourced directly from certified organic farms across India.</div>
          </div>
          <div className="why-card reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="why-icon">🧪</span>
            <div className="why-title">Lab Tested</div>
            <div className="why-desc">Every batch tested in NABL-accredited labs for purity, potency & safety.</div>
          </div>
          <div className="why-card reveal" style={{ transitionDelay: '0.3s' }}>
            <span className="why-icon">☣</span>
            <div className="why-title">Chemical Free</div>
            <div className="why-desc">Zero additives, preservatives or artificial colors. Pure as nature intended.</div>
          </div>
          <div className="why-card reveal" style={{ transitionDelay: '0.4s' }}>
            <span className="why-icon">♻</span>
            <div className="why-title">Eco Packaging</div>
            <div className="why-desc">Biodegradable packaging that cares for the planet as much as your health.</div>
          </div>
        </div>
        <div className="counter-section">
          <div className="reveal">
            <div className="counter-num" data-target="10000" data-suffix="K+">0</div>
            <div className="counter-label">Happy Customers</div>
          </div>
          <div className="reveal">
            <div className="counter-num" data-target="50" data-suffix="+">0</div>
            <div className="counter-label">Natural Ingredients</div>
          </div>
          <div className="reveal">
            <div className="counter-num" data-target="100" data-suffix="%">0</div>
            <div className="counter-label">Organic Process</div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="section-header reveal">
          <span className="about-tag">✦ How We Make It</span>
          <h2 className="section-title">From Earth to<br />Your Hands</h2>
        </div>
        <div className="process-timeline">
          <div className="process-line"></div>
          <div className="process-step reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="step-dot">1</div>
            <span className="step-icon">🌾</span>
            <div className="step-name">Ingredient Collection</div>
            <div className="step-desc">Hand-picked from certified organic farms at peak potency</div>
          </div>
          <div className="process-step reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="step-dot">2</div>
            <span className="step-icon">☀</span>
            <div className="step-name">Natural Drying</div>
            <div className="step-desc">Sun-dried using traditional methods to preserve nutrients</div>
          </div>
          <div className="process-step reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="step-dot">3</div>
            <span className="step-icon">⚙</span>
            <div className="step-name">Cold Grinding</div>
            <div className="step-desc">Stone-ground at low temperature to retain all active compounds</div>
          </div>
          <div className="process-step reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="step-dot">4</div>
            <span className="step-icon">🔬</span>
            <div className="step-name">Lab Testing</div>
            <div className="step-desc">Rigorous quality checks for purity, potency & microbes</div>
          </div>
          <div className="process-step reveal" style={{ transitionDelay: '0.5s' }}>
            <div className="step-dot">5</div>
            <span className="step-icon">📦</span>
            <div className="step-name">Eco Packaging</div>
            <div className="step-desc">Sealed in biodegradable packaging for freshness & planet</div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="section-header reveal">
          <span className="about-tag">✦ What They Say</span>
          <h2 className="section-title">Real People,<br />Real Results</h2>
        </div>
        <div className="testimonials-track" id="testimonialsTrack">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              <div className="testimonial-card">
                <span className="quote-mark">"</span>
                <div className="stars">★★★★★</div>
                <div className="testimonial-text">The quality feels truly natural. I've tried many brands but Herbiva's turmeric powder is on another level. My joint pain has reduced significantly.</div>
                <div className="testimonial-author">Rahul Sharma</div>
                <div className="testimonial-role">Yoga Instructor, Mumbai</div>
              </div>
              <div className="testimonial-card">
                <span className="quote-mark">"</span>
                <div className="stars">★★★★★</div>
                <div className="testimonial-text">Best herbal powder brand I've used. The moringa powder has transformed my energy levels. I feel more alive and vibrant every single day.</div>
                <div className="testimonial-author">Priya Verma</div>
                <div className="testimonial-role">Wellness Coach, Delhi</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section id="gallery">
        <div className="section-header reveal">
          <span className="about-tag">✦ Our World</span>
          <h2 className="section-title">Where Nature<br />Meets Craft</h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item gi-1 reveal">
            <div className="gallery-placeholder" style={{ background: '#d4c9b8', fontSize: '6rem' }}>🌾</div>
            <div className="gallery-overlay">Our Farm</div>
          </div>
          <div className="gallery-item gi-2 reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="gallery-placeholder" style={{ background: '#c8d8c0', fontSize: '4rem' }}>🌿</div>
            <div className="gallery-overlay">Herb Garden</div>
          </div>
          <div className="gallery-item gi-3 reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="gallery-placeholder" style={{ background: '#e0d0c0', fontSize: '4rem' }}>⚙</div>
            <div className="gallery-overlay">Processing Unit</div>
          </div>
          <div className="gallery-item gi-4 reveal" style={{ transitionDelay: '0.3s' }}>
            <div className="gallery-placeholder" style={{ background: '#d8cfc5', fontSize: '4rem' }}>📦</div>
            <div className="gallery-overlay">Packaging</div>
          </div>
          <div className="gallery-item gi-5 reveal" style={{ transitionDelay: '0.4s' }}>
            <div className="gallery-placeholder" style={{ background: '#cdd8cd', fontSize: '4rem' }}>👨‍🔬</div>
            <div className="gallery-overlay">Lab Testing</div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem' }}>
          <span className="about-tag">✦ Got Questions?</span>
          <h2 className="section-title" style={{ color: 'var(--cream)' }}>We Have<br />Answers</h2>
        </div>
        <div className="faq-list">
          <div className="faq-item reveal">
            <button className="faq-q" onClick={toggleFaq}>Are all Herbiva products certified organic?<span className="faq-icon">+</span></button>
            <div className="faq-a">Yes, all our products are USDA and India Organic certified. We source from farms that have been organic for at least 3 years, ensuring zero pesticide contamination in every batch.</div>
          </div>
          <div className="faq-item reveal" style={{ transitionDelay: '0.1s' }}>
            <button className="faq-q" onClick={toggleFaq}>How are the powders made without additives?<span className="faq-icon">+</span></button>
            <div className="faq-a">Our powders are made using traditional stone-grinding methods at low temperatures to preserve nutrients. No fillers, no anti-caking agents, no preservatives — just pure, ground herbs.</div>
          </div>
          <div className="faq-item reveal" style={{ transitionDelay: '0.2s' }}>
            <button className="faq-q" onClick={toggleFaq}>Do you export internationally?<span className="faq-icon">+</span></button>
            <div className="faq-a">Yes! We export to 15+ countries including USA, UK, UAE, Canada, and Australia. All our products meet international food safety standards.</div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-info reveal-left">
          <div className="about-tag">✦ Get In Touch</div>
          <h2 className="section-title">Let's Start a<br />Conversation</h2>
          <p className="about-text" style={{ marginBottom: '2.5rem' }}>Have questions about our products or want to explore partnership opportunities? We'd love to hear from you.</p>
          <div className="contact-detail">
            <div className="contact-icon">📧</div>
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">hello@herbiva.com</div>
            </div>
          </div>
          <div className="contact-detail">
            <div className="contact-icon">📍</div>
            <div>
              <div className="contact-label">Location</div>
              <div className="contact-value">Green Valley, Indore, MP 452001</div>
            </div>
          </div>
        </div>
        <div className="contact-form reveal-right">
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Your Name" id="name" />
            <label className="form-label" htmlFor="name">Your Name</label>
          </div>
          <div className="form-group">
            <input type="email" className="form-input" placeholder="Email Address" id="email" />
            <label className="form-label" htmlFor="email">Email Address</label>
          </div>
          <div className="form-group">
            <textarea className="form-input" placeholder="Your Message" id="message"></textarea>
            <label className="form-label" htmlFor="message">Your Message</label>
          </div>
          <button className="form-btn" style={formBtnStyle} onClick={handleSubmit}>{formBtnText}</button>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="nav-logo">HERB<span style={{ color: 'var(--gold)' }}>IVA</span></span>
            <p className="footer-desc">Pure nature. Powerful wellness. Crafting premium herbal powders with ancient wisdom and modern purity standards since 2018.</p>
          </div>
          <div>
            <div className="footer-title">Quick Links</div>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Herbiva. All rights reserved.</span>
          <span>Made with 🌿 in India</span>
        </div>
      </footer>
    </>
  );
}