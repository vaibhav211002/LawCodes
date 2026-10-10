import { useState } from 'react'
import api from '../api'
import './page.scss'

function IeaPage() {
  const [section, setSection] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const sectionNumber = section.trim()

    if (!sectionNumber) {
      setError('Enter an IEA section number to search.')
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const response = await api.post('/ieasearch', { iea_section_new: sectionNumber })
      setResults(response.data)
    } catch (requestError) {
      setResults([])
      setError(
        requestError.response?.status === 404
          ? `No IEA section was found for “${sectionNumber}”. Check the section and try again.`
          : 'The conversion service could not be reached. Please try again shortly.',
      )
      console.error('IEA section lookup failed:', requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="conversion-page">
      <div className="conversion-heading">
        <p className="eyebrow">IEA → BSA</p>
        <h1>Find an IEA section</h1>
        <p>Look up the corresponding section in the Bharatiya Sakshya Adhiniyam, 2023.</p>
      </div>
      <form className="conversion-form" onSubmit={handleSubmit}>
        <label htmlFor="iea-section">Indian Evidence Act section</label>
        <div className="form-controls">
          <input
            id="iea-section"
            type="text"
            value={section}
            onChange={(event) => setSection(event.target.value)}
            placeholder="Enter a section number"
            autoComplete="off"
            aria-describedby="iea-hint"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Find section'} {!loading && <span aria-hidden="true">→</span>}
          </button>
        </div>
        <p className="search-hint" id="iea-hint">Enter the section number as it appears in the IEA.</p>
        {error && <p className="search-error" role="alert">{error}</p>}
      </form>
      {results.length > 0 && (
        <section className="result-list" aria-live="polite">
          <h2>Matching sections</h2>
          {results.map((entry, index) => (
            <article className="result-card" key={`${entry.BSA_Section}-${index}`}>
              <h3>BSA Section {entry.BSA_Section}</h3>
              <dl className="result-detail">
                <dt>Subject</dt><dd>{entry.Subject || 'Not provided'}</dd>
                <dt>IEA section</dt><dd>{entry.IEA_Section}</dd>
                <dt>Comparison</dt><dd>{entry.Comparison || 'Not provided'}</dd>
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

export default IeaPage
