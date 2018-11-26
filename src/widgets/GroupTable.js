import React from 'react'
import ReactDOM from 'react-dom'
import GroupTable from '../components/GroupTable'

$.widget('myapp.grouptable', {
  options: {
    group: [],
    save: null
  },

  _render: function () {
    ReactDOM.render(
      <GroupTable group={this.options.group} onSave={this._hndSave.bind(this)} />,
      this.element.get(0)
    )
  },

  _hndSave: function (data) {
    this._trigger('save', null, { data })
  },

  _create: function () {
    this._render()
  },

  _setOptions: function () {
    this._superApply(arguments);
    this._render();
  },

  _setOption: function (key, val) {
    this._super(key, val);
  },
})
