import InputPassword from '../InputPassword'
import deprecated from '../../modules/deprecated'

export default deprecated({
  useNewComponent: {
    old: 'PasswordInput',
    new: 'InputPassword',
  },
})(InputPassword)
