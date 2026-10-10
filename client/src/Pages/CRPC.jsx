import { useState } from 'react'
import api from '../api'
import './page.scss'

function CrpcPage() {
  const [section, setSection] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const sectionNumber = section.trim()

    if (!sectionNumber) {
      setError('Enter a CrPC section number to search.')
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const response = await api.post('/crpcSection', { CrPC_section_new: sectionNumber })
      setResults(response.data)
    } catch (requestError) {
      setResults([])
      setError(
        requestError.response?.status === 404
          ? `No CrPC section was found for “${sectionNumber}”. Check the section and try again.`
          : 'The conversion service could not be reached. Please try again shortly.',
      )
      console.error('CrPC section lookup failed:', requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="conversion-page">
      <div className="conversion-heading">
        <p className="eyebrow">CrPC → BNSS</p>
        <h1>Find a CrPC section</h1>
        <p>Look up the corresponding section in the Bharatiya Nagarik Suraksha Sanhita, 2023.</p>
      </div>
      <form className="conversion-form" onSubmit={handleSubmit}>
        <label htmlFor="crpc-section">Code of Criminal Procedure section</label>
        <div className="form-controls">
          <input
            id="crpc-section"
            type="text"
            value={section}
            onChange={(event) => setSection(event.target.value)}
            placeholder="Enter a section number"
            autoComplete="off"
            aria-describedby="crpc-hint"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Find section'} {!loading && <span aria-hidden="true">→</span>}
          </button>
        </div>
        <p className="search-hint" id="crpc-hint">Enter the section number as it appears in the CrPC.</p>
        {error && <p className="search-error" role="alert">{error}</p>}
      </form>
      {results.length > 0 && (
        <section className="result-list" aria-live="polite">
          <h2>Matching sections</h2>
          {results.map((entry, index) => (
            <article className="result-card" key={`${entry.BNSS_section}-${index}`}>
              <h3>BNSS Section {entry.BNSS_section}</h3>
              <dl className="result-detail">
                <dt>Subject</dt><dd>{entry.subject || 'Not provided'}</dd>
                <dt>CrPC section</dt><dd>{entry.CrPC_section}</dd>
                <dt>Comparison</dt><dd>{entry.comparison || 'Not provided'}</dd>
              </dl>
            </article>
          ))}
        </section>
      )}
      {searched && !loading && !error && results.length === 0 && (
        <p className="empty-state" role="status">No matching sections were returned.</p>
      )}
    </main>
  )
}

export default CrpcPage
