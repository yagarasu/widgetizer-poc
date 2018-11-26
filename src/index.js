import React from 'react'
import ReactDOM from 'react-dom'
import GroupTable from './components/GroupTable'

ReactDOM.render(
  <GroupTable
    group={[
      { nombre: 'Ariadna', calificacion: 8 },
      { nombre: 'Benjamin', calificacion: 7 },
      { nombre: 'Carla', calificacion: 5 },
      { nombre: 'Domingo', calificacion: 9 },
      { nombre: 'Ernesto', calificacion: 10 }
    ]}
    onSave={data => { console.log('Save!', data) }}
  />,
  document.getElementById('react-table')
)
