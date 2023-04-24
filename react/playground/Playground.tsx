import React from 'react'

import PageHeader from '../PageHeader'
import Layout from '../Layout'
import Button from '../Button'
import Slider from '../Slider'

const SliderTest = () => {
  const [max, setMax] = React.useState(10)
  const defaultValues = [2, 8]

  const handleSubmit = e => {
    e.preventDefault()

    setMax(value => value + 10)
  }

  return (
    <>
      <form className="flex items-end mb5">
        <Button
          type="Increase max value +10"
          onClick={handleSubmit}
          variation="primary"
          size="small">
          Increase max value +10
        </Button>
      </form>

      <div className="mt8">
        <Slider
          min={0}
          max={max}
          alwaysShowCurrentValue={false}
          range
          defaultValues={defaultValues}
        />
      </div>
    </>
  )
}

const Playground = () => (
  <Layout fullWidth pageHeader={<PageHeader title="Playground" />}>
    <SliderTest />
  </Layout>
)

export default Playground
