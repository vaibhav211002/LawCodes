import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function Linker() {
  return (
    <div>
        <div className="heading">
        <Link to='/ipc' className="edit-profile">IPC </Link>
        <Link to='/crpc' className="edit-profile">CRPC </Link>
        <Link to='/iea' className="edit-profile">IEA </Link>
        </div>
    </div>
  )
}

export default Linker