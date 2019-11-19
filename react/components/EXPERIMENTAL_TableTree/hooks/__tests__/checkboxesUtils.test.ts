import { getFlat, getToggledState } from '../checkboxesUtils'

const props = ['children', 'related', 'friends']
const comparator = item => candidate => item.name === candidate.name

props.forEach(prop => {
  test(`Tree is flattened correctly for prop ${prop}`, () => {
    expect(getFlat(treeForProp(prop), [], prop)).toEqual(
      flattenedTreeForProp(prop)
    )
  })

  test(`The state is toggled correctly on a item without childs on ${prop} prop`, () => {
    expect(getToggledState([], { name: 'Alok' }, prop, comparator)).toEqual([
      { name: 'Alok' },
    ])
    expect(getToggledState([], { name: 'KVSH' }, prop, comparator)).toEqual([
      { name: 'KVSH' },
    ])
  })

  test(`The state is toggled correctly on a item with childs on ${prop} prop`, () => {
    expect(
      getToggledState(
        [],
        {
          name: 'Vintage Culture',
          [prop]: [
            { name: 'Alok' },
            {
              name: 'Cat Dealers',
              [prop]: [{ name: 'KVSH' }],
            },
          ],
        },
        prop,
        comparator
      )
    ).toEqual([
      {
        name: 'Vintage Culture',
        [prop]: [
          { name: 'Alok' },
          {
            name: 'Cat Dealers',
            [prop]: [{ name: 'KVSH' }],
          },
        ],
      },
      { name: 'Alok' },
      {
        name: 'Cat Dealers',
        [prop]: [{ name: 'KVSH' }],
      },
      { name: 'KVSH' },
    ])
  })
})

function treeForProp(prop: string) {
  return {
    vtexTableTreeRoot: 'root',
    [prop]: [
      {
        name: 'Vintage Culture',
        [prop]: [
          { name: 'Alok' },
          {
            name: 'Cat Dealers',
            [prop]: [{ name: 'KVSH' }],
          },
        ],
      },
      {
        name: 'Metallica',
        [prop]: [
          {
            name: 'Iron Maiden',
            [prop]: [
              {
                name: 'Pantera',
                [prop]: [{ name: 'Slayer' }],
              },
            ],
          },
        ],
      },
    ],
  }
}

function flattenedTreeForProp(prop: string) {
  return [
    {
      [prop]: [
        {
          [prop]: [
            { name: 'Alok' },
            {
              [prop]: [{ name: 'KVSH' }],

              name: 'Cat Dealers',
            },
          ],

          name: 'Vintage Culture',
        },
        {
          [prop]: [
            {
              [prop]: [
                {
                  [prop]: [{ name: 'Slayer' }],

                  name: 'Pantera',
                },
              ],

              name: 'Iron Maiden',
            },
          ],
          name: 'Metallica',
        },
      ],
      vtexTableTreeRoot: 'root',
    },
    {
      [prop]: [
        { name: 'Alok' },
        {
          [prop]: [{ name: 'KVSH' }],

          name: 'Cat Dealers',
        },
      ],
      name: 'Vintage Culture',
    },
    { name: 'Alok' },
    {
      [prop]: [{ name: 'KVSH' }],
      name: 'Cat Dealers',
    },
    { name: 'KVSH' },
    {
      [prop]: [
        {
          [prop]: [
            {
              [prop]: [{ name: 'Slayer' }],
              name: 'Pantera',
            },
          ],
          name: 'Iron Maiden',
        },
      ],
      name: 'Metallica',
    },
    {
      [prop]: [
        {
          [prop]: [{ name: 'Slayer' }],

          name: 'Pantera',
        },
      ],
      name: 'Iron Maiden',
    },
    {
      [prop]: [{ name: 'Slayer' }],
      name: 'Pantera',
    },
    { name: 'Slayer' },
  ]
}
