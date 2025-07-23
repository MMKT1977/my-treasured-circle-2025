import React from 'react';
import './Home.css';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const sections = [
    {
      variant: 'hero',
      image: '/empower.png',
      title: 'Empowering Hope, Healing Lives',
      description: 'Treasured Circle is a program approved service agency with a centered approach of offering the best support to individuals with intellectual and developmental disabilities.',
      buttonText: 'Explore Services',
      href: '/services/residential' 
    },
    {
      title: 'Our Mission',
      image: '/mission.png',
      description: 'At Treasured Circle, our mission is to enrich the lives of all participants by providing personalized care services which promote independence, dignity, and well-being.',
      buttonText: 'Learn More',
      href: '/about' 
    },
    {
      title: 'From Our Team',
      image: '/team.png',
      description: 'With a commitment to compassion, professionalism, and excellence, we stand ready to embark on this journey with you.',
      buttonText: 'View Openings',
      href: '/contact' 
    },
    {
      title: 'Online Therapy',
      image: '/online.png',
      description: 'Remote sessions from the comfort of your home.',
      buttonText: 'Coming Soon',
      // No href since it's coming soon
    },
    {
      variant: 'cta',
      title: 'Ready to Begin Your Healing Journey?',
      description: 'Connect with compassionate mental health professionals today.',
      buttonText: 'Contact Us',
      href: '/contact', 
      fullWidth: true
    }
  ];

  return (
    <div className="home-root">
      <main className="home-main">
        {/* welcome banner*/}
        <section className="welcome-section">
          <Card
            variant="welcome"
            image="/welcome.jpg.jpg"
            title="“You Are Treasured Beyond Measure.”"
            description="Treasured Circle is a program approved service agency with a centered goal of offering the best support to individuals with intellectual and developmental disabilities. Each individual will be assessed based on their needs, and paired with an experienced member of our team who can best support those needs. Whether it be in one of our residential settings,
             in a participant’s home, in an independent living setting, or out in the community, we strive to create a nurturing environment where all individuals feel valued and supported."
          />
        </section>

        {/* Hero Card */}
        <section className="hero-duo">
          <h2 className="home-section-title">Overview</h2>
          <div className="hero-duo-cards">
            <Card
            className="hero-card"
            variant="hero"
            icon={faLocationDot}
            title="Service Areas"
            description="Adams, Arapahoe, Boulder, Broomfield, Denver, Douglas, Jefferson."
            buttonText="Explore Services"
            href="/services/respite" 
          />
          <Card
            className="hero-card"
            variant="hero"
            icon={faFileInvoiceDollar}
            title="Waivers Accepted"
            description="HCBS-CES, HCBS-DD, HCBS-SLS, STATE SLS"
            buttonText="Discover More"
            href="/About"
          />

          </div>
          
        </section>

        {/* Services Grid */}
        <section id="services" className="home-section">
          <h2 className="home-section-title">What We Do</h2>
          <div className="home-services-grid">
            {sections.slice(1, 4).map((service, index) => (
              <Card key={`service-${index}`} {...service} />
            ))}
          </div>
        </section>

        {/* Resources Grid */}
        <section className="home-section">
          <h2 className="home-section-title">Our Resources</h2>
          <div className="resources-grid">
            <Link to="/services/residential">
              <Card
                variant="resources"
                image="/residential services.png"
                title="RESIDENTIAL SERVICES"
              />
            </Link>
            <Link to="/services/respite">
              <Card
                variant="resources"
                image="/respite.png"
                title="RESPITE"
              />
            </Link>
            <Link to="/services/personal-care">
              <Card
                variant="resources"
                image="/personalcare.png"
                title="PERSONAL CARE"
              />
            </Link>
            <Link to="/services/homemaker">
              <Card
                variant="resources"
                image="/homemaker.png"
                title="HOMEMAKER"
              />
            </Link>
            <Link to="/services/mentorship">
              <Card
                variant="resources"
                image="/mentorship.png"
                title="MENTORSHIP"
              />
            </Link>
            <Link to="/community">
              <Card
                variant="resources"
                image="/community.png"
                title="COMMUNITY"
              />
            </Link>
          </div>
        </section>

        {/* CTA Card */}
        <section>
          <Card {...sections[4]} />
        </section>
      </main>
    </div>
  );
}