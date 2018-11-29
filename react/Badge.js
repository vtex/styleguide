import Tag from './components/Tag/index'
import deprecated from './modules/deprecated'

export default deprecated(
  {
    useNewComponent: {
      Badge: 'Tag',
    },
  },
  Tag
)
