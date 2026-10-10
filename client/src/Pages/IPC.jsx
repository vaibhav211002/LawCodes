import { useState } from 'react'
import api from '../api'
import './page.scss'

function IpcPage() {
  const [section, setSection] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const sectionNumber = section.trim()

    if (!sectionNumber) {
      setError('Enter an IPC section number to search.')
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const response = await api.post('/ipcSection', { ipc_Section: sectionNumber })
      setResults(response.data)
    } catch (requestError) {
      setResults([])
      setError(
        requestError.response?.status === 404
          ? `No IPC section was found for “${sectionNumber}”. Check the section and try again.`
          : 'The conversion service could not be reached. Please try again shortly.',
      )
      console.error('IPC section lookup failed:', requestError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="conversion-page">
      <div className="conversion-heading">
        <p className="eyebrow">IPC → BNS</p>
        <h1>Find an IPC section</h1>
        <p>Look up the corresponding section in the Bharatiya Nyaya Sanhita, 2023.</p>
      </div>
      <form className="conversion-form" onSubmit={handleSubmit}>
        <label htmlFor="ipc-section">Indian Penal Code section</label>
        <div className="form-controls">
          <input
            id="ipc-section"
            type="text"
            value={section}
            onChange={(event) => setSection(event.target.value)}
            placeholder="For example, 302 or 171B"
            autoComplete="off"
            aria-describedby="ipc-hint"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching…' : 'Find section'} {!loading && <span aria-hidden="true">→</span>}
          </button>
        </div>
        <p className="search-hint" id="ipc-hint">Enter the section number, including any letter suffix.</p>
        {error && <p className="search-error" role="alert">{error}</p>}
      </form>
      {results.length > 0 && (
        <section className="result-list" aria-live="polite">
          <h2>Matching sections</h2>
          {results.map((entry, index) => (
            <article className="result-card" key={`${entry.bnsSection}-${index}`}>
              <h3>BNS Section {entry.bnsSection}</h3>
              <dl className="result-detail">
                <dt>Subject</dt><dd>{entry.Subject || 'Not provided'}</dd>
                <dt>IPC section</dt><dd>{entry.IpcSection}</dd>
                <dt>Change</dt><dd>{entry.change || 'Not provided'}</dd>
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

export default IpcPage
