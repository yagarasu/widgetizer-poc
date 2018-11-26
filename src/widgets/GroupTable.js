import widgetizer from '../widgetizer'
import GroupTable from '../components/GroupTable'

const mapOptionsToProps = {
  group: { option: 'group', default: [] }
}

const mapTriggerToProps = trigger => ({
  onSave: data => trigger('save', { data }),
})

widgetizer(
  'myapp.grouptable',
  mapOptionsToProps,
  mapTriggerToProps
)(GroupTable)
