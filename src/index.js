import React from 'react'
import ReactDOM from 'react-dom'
import GroupTable from './components/GroupTable'

var grupos = {
  '1A': [
    { nombre: 'Ariadna', calificacion: 8 },
    { nombre: 'Benjamin', calificacion: 7 },
    { nombre: 'Carla', calificacion: 5 },
    { nombre: 'Domingo', calificacion: 9 },
    { nombre: 'Ernesto', calificacion: 10 }
  ],
  '1B': [
    { nombre: 'Fabiola', calificacion: 8 },
    { nombre: 'Gabriel', calificacion: 6 },
    { nombre: 'Helena', calificacion: 7 },
    { nombre: 'Ignacio', calificacion: 10 },
    { nombre: 'Juan', calificacion: 9 }
  ]
};
window.gp = grupos

function render (props) {
  ReactDOM.render(
    <GroupTable {...props} />,
    document.getElementById('react-table')
  )
}

function hndSave (data) {
  const val = $('#groups').val()
  console.log('Save!', val, data)
  grupos[val] = data.slice()
}

$(document).ready(() => {
  render({
    group: grupos['1A'],
    onSave: hndSave
  })

  // Listener al select
  $('#groups').on('change', function () {
    // Asignar nuevos datos
    var val = $(this).val()
    var data = grupos[val]
    render({
      group: data,
      onSave: hndSave
    })
  })
})
