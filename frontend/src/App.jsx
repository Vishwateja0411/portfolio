import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Fetch data from FastAPI backend
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, certsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/profile'),
          axios.get('http://localhost:8080/api/projects'),
          axios.get('http://localhost:8080/api/certificates')
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
        setCertificates(certsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!profile) {
    return <div style={{ color: 'white', padding: '40px', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>Loading... Make sure FastAPI backend is running!</div>;
  }

  return (
    <div className="container animate-fade-in">
      <header className="hero glass-panel">
        <div className="hero__content">
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="summary">{profile.summary}</p>
          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="#certificates" className="btn btn--secondary">Certificates</a>
            <a href="/resume.pdf" className="btn btn--secondary" target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
        <div className="hero__profile">
          <div className="profile-image-wrapper">
            <picture>
              <source srcSet="/assets/vishwa_profile.png" />
              <img src="/assets/profile-placeholder.svg" alt={`Profile photo of ${profile.name}`} />
            </picture>
          </div>
          <div className="profile-card">
            <h2>About Me</h2>
            <p>{profile.about}</p>
            <h3>Technical Skills</h3>
            <ul>
              {profile.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section id="projects" className="section animate-fade-in delay-1">
          <div className="section__heading">
            <h2>Projects & Repositories</h2>
          </div>
          <div className="card-grid">
            {projects.map((project) => (
              <article className="glass-card card" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.disabled ? (
                  <span className="text-muted" style={{ fontWeight: 600, fontSize: '0.95rem', opacity: 0.8 }}>
                    {project.link_text}
                  </span>
                ) : (
                  <a href={project.link} className="text-link" target="_blank" rel="noopener noreferrer">
                    {project.link_text}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="certificates" className="section animate-fade-in delay-3">
          <div className="section__heading">
            <h2>Open Certificates</h2>
            <p className="section__note">Click a card to open the full certificate image.</p>
          </div>
          <div className="card-grid">
            {certificates.map((cert) => (
              <article className="glass-card card cert-card" key={cert.id}>
                {cert.disabled ? (
                   <img src={`/assets/${cert.image}`} alt={`${cert.title} placeholder`} />
                ) : (
                  <a href={`/assets/${cert.link}`} target="_blank" rel="noopener noreferrer">
                    <img src={`/assets/${cert.image}`} alt={`${cert.title} certificate`} />
                  </a>
                )}
                <div>
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer} • {cert.details}</p>
                </div>
                <a href={cert.disabled ? "#" : `/assets/${cert.link}`} target={cert.disabled ? "_self" : "_blank"} rel="noopener noreferrer" className={`btn btn--outline ${cert.disabled ? 'disabled' : ''}`}>
                  Certificate
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
