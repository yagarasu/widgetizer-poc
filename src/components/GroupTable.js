import React, { Component, Fragment } from 'react'

class GroupTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.group.reduce((acc, cur) => ({
        ...acc, [cur.nombre]: parseInt(cur.calificacion, 10)
      }), {})
    }
    this.hndSave = this.hndSave.bind(this)
    this.hndChange = this.hndChange.bind(this)
  }

  hndSave (e) {
    const { data } = this.state
    this.props.onSave(Object.keys(data).reduce((acc, cur) => ([
      ...acc, { nombre: cur, calificacion: data[cur] }
    ]), []))
  }

  hndChange (key) {
    return e => {
      this.setState({
        data: {
          ...this.state.data,
          [key]: parseInt(e.target.value, 10)
        }
      })
    }
  }

  render () {
    const { data } = this.state
    const avg = Object.values(data).reduce((acc, cur) => acc + cur, 0) / Object.keys(data).length
    return (
      <Fragment>
        <table className="grouptable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map(key => (
              <tr key={key}>
                <td className="name">{key}</td>
                <td>
                  <input value={data[key]} className="grade" onChange={this.hndChange(key)} onFocus={e => e.target.select()} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Promedio</th>
              <th className="avg">{avg}</th>
            </tr>
          </tfoot>
        </table>
        <button type="button" onClick={this.hndSave}>Guardar</button>
      </Fragment>
    )
  }
}

GroupTable.defaultProps = {
  group: [],
  onSave: () => {/* NOOP */}
}

export default GroupTable
