import React from 'react'
import ReactDOM from 'react-dom'

const widgetizer = (name, mapOptionsToProps, mapTriggerToProps) => Component => {
  const options = Object.values(mapOptionsToProps)
    .reduce((acc, { option, defaultValue }) => ({
      ...acc,
      [option]: defaultValue === undefined ? null : defaultValue
    }), {})
  const events = Object.values(mapTriggerToProps(key => key))
    .reduce((acc, fn) => {
      const key = fn()
      if (acc.indexOf(key) >= 0) return acc
      return [...acc, key]
    }, [])
    .reduce((acc, key) => ({ ...acc, [key]: null }), {})

  $.widget(name, {
    options: {
      ...options,
      ...events
    },

    _create: function () {
      this._render()
    },

    _destroy: function () {
      ReactDOM.unmountComponentAtNode(this.element.get(0))
    },

    _setOptions: function () {
      this._superApply(arguments);
      this._render();
    },

    _setOption: function (key, val) {
      this._super(key, val);
    },

    _render: function () {
      ReactDOM.render(
        <Component
          {...this._getOptionProps()}
          {...this._getTriggerProps()}
        />,
        this.element.get(0)
      )
    },

    _hndTrigger: function (type, data) {
      this._trigger(type, null, data)
    },

    _getOptionProps: function () {
      const opts = Object.keys(mapOptionsToProps)
        .reduce((acc, key) => {
          const { option } = mapOptionsToProps[key]
          return {
            ...acc,
            [option]: this.options[option]
          }
        }, {})
      return opts
    },

    _getTriggerProps: function () {
      const fns = mapTriggerToProps(this._hndTrigger.bind(this))
      const opts = Object.keys(fns)
        .reduce((acc, key) => {
          const fn = fns[key]
          return { ...acc, [key]: fn }
        }, {})
      return opts
    }
  })
}

export default widgetizer
