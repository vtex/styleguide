import MultiSelect from './components/MultiSelect/index'
import deprecated from './modules/deprecated'

export default deprecated({
  useNewComponent: {
    old: 'MultiSelect',
    new: 'Select',
  },
})(MultiSelect)
