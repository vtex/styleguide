const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest
const Buttonv4Transform = require('../button-v4')

describe('Button sizes', () => {
  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button />',
    '<Button size="small" variation="tertiary" />',
    'change default to small'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button size="regular" />',
    '<Button variation="tertiary" size="small" />',
    'change regular to small'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button size="large" />',
    '<Button variation="tertiary" size="regular" />',
    'change large to regular'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button size="x-large" />',
    '<Button variation="tertiary" size="large" />',
    'change x-large to large'
  )
})

describe('Button primary and secondary to variation', () => {
  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button primary />',
    '<Button size="small" variation="primary" />',
    'change primary to variation="primary"'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button secondary />',
    '<Button size="small" variation="secondary" />',
    'change secondary to variation"secondary"'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button />',
    '<Button size="small" variation="tertiary" />',
    'change default to variation="tertiary"'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button primary foo="bar" disabled />',
    '<Button size="small" variation="primary" foo="bar" disabled />',
    'keep other props'
  )

  defineInlineTest(
    Buttonv4Transform,
    {},
    '<Button variation="primary" />',
    '<Button size="small" variation="primary" />',
    'skip buttons with prop variation'
  )
})
