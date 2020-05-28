import Progress from '../Progress'
import deprecated from '../../modules/deprecated'

export default deprecated({
  useNewComponent: {
    old: 'ProgressBar',
    new: 'Progress',
  },
})(Progress)
