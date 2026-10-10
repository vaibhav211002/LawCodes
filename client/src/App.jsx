import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { GoLaw } from 'react-icons/go'
import api from './api'
import { apiBaseUrl } from './api'
import IPC from './Pages/IPC'
import CRPC from './Pages/CRPC'
import IEA from './Pages/IEA'
import Footer from './components/Footer'

const conversions = [
  {
    path: '/ipc',
    shortName: 'IPC → BNS',
    oldLaw: 'Indian Penal Code, 1860',
    newLaw: 'Bharatiya Nyaya Sanhita, 2023',
    description: 'Find the corresponding section in India’s updated penal code.',
  },
  {
    path: '/crpc',
    shortName: 'CrPC → BNSS',
    oldLaw: 'Code of Criminal Procedure, 1973',
    newLaw: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    description: 'Compare criminal procedure sections across the two laws.',
  },
  {
    path: '/iea',
    shortName: 'IEA → BSA',
    oldLaw: 'Indian Evidence Act, 1872',
    newLaw: 'Bharatiya Sakshya Adhiniyam, 2023',
    description: 'Look up the equivalent section in the new evidence law.',
  },
]

function Home() {
  const [serviceStatus, setServiceStatus] = useState('checking')

  useEffect(() => {
    let active = true

    api.get('/')
      .then(() => {
        if (active) setServiceStatus('online')
      })
      .catch(() => {
        if (active) setServiceStatus('offline')
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A simpler way to navigate legal updates</p>
          <h1>Find the section.<br /><span>Understand the change.</span></h1>
          <p className="hero-description">
            Compare sections from India’s former criminal laws with their
            counterparts in the new legal codes.
          </p>
          <a className="button button-primary" href="#converters">
            Explore converters <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <GoLaw />
          <span>LAW<br />CODES</span>
        </div>
      </section>

      <section className="converter-section" id="converters">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose a conversion</p>
            <h2>Three codes. One clear starting point.</h2>
          </div>
          <span className={`service-status service-status-${serviceStatus}`}>
            <span className="status-dot" />
            {serviceStatus === 'online' && 'Service online'}
            {serviceStatus === 'checking' && 'Checking service'}
            {serviceStatus === 'offline' && 'Service unavailable'}
          </span>
        </div>

        <div className="converter-grid">
          {conversions.map((conversion, index) => (
            <article className="converter-card" key={conversion.path}>
              <div className="card-topline">
                <span className="card-number">0{index + 1}</span>
                <span className="card-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="card-conversion">{conversion.shortName}</p>
              <h3>{conversion.oldLaw}</h3>
              <p className="card-to">to</p>
              <h3>{conversion.newLaw}</h3>
              <p className="card-description">{conversion.description}</p>
              <Link className="card-link" to={conversion.path}>
                Open converter <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <p className="eyebrow">Quick and straightforward</p>
        <h2>How it works</h2>
        <ol>
          <li><span>01</span><div><strong>Choose a code</strong><p>Select the law you want to look up.</p></div></li>
          <li><span>02</span><div><strong>Enter a section</strong><p>Use the section number, including any letter suffix.</p></div></li>
          <li><span>03</span><div><strong>Review the match</strong><p>See the corresponding section and comparison details.</p></div></li>
        </ol>
      </section>
    </main>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="LawCodes home">
          <span className="brand-icon"><GoLaw /></span>
          <span>Law<span className="brand-accent">Codes</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Overview</NavLink>
          {conversions.map(({ path, shortName }) => (
            <NavLink key={path} to={path}>{shortName}</NavLink>
          ))}
        </nav>
        <a className="header-cta" href={`${apiBaseUrl}/`} target="_blank" rel="noreferrer">
          API status <span aria-hidden="true">↗</span>
        </a>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipc" element={<IPC />} />
        <Route path="/crpc" element={<CRPC />} />
        <Route path="/iea" element={<IEA />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
