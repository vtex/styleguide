import { getItemTree, getFlat, getToggledState } from '../hooks/checkboxesUtils'

const props = ['children', 'related', 'friends']

props.forEach(prop => {
  test(`Tree is parsed correctly for prop ${prop}`, () => {
    expect(getItemTree(itemsForProp(prop), prop)).toEqual(treeForProp(prop))
  })

  test(`Tree is flattened correctly for prop ${prop}`, () => {
    expect(getFlat(treeForProp(prop), [], prop)).toEqual(
      flattenedTreeForProp(prop)
    )
  })

  test(`The state is toggled correctly on a item without childs on ${prop} prop`, () => {
    expect(getToggledState([], { id: '.0.0', name: 'Alok' }, prop)).toEqual([
      { id: '.0.0', name: 'Alok' },
    ])
    expect(getToggledState([], { id: '.0.1.0', name: 'KVSH' }, prop)).toEqual([
      { id: '.0.1.0', name: 'KVSH' },
    ])
  })

  test(`The state is toggled correctly on a item with childs on ${prop} prop`, () => {
    expect(
      getToggledState(
        [],
        {
          id: '.0',
          name: 'Vintage Culture',
          [prop]: [
            { id: '.0.0', name: 'Alok' },
            {
              id: '.0.1',
              name: 'Cat Dealers',
              [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
            },
          ],
        },
        prop
      )
    ).toEqual([
      {
        id: '.0',
        name: 'Vintage Culture',
        [prop]: [
          { id: '.0.0', name: 'Alok' },
          {
            id: '.0.1',
            name: 'Cat Dealers',
            [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
          },
        ],
      },
      { id: '.0.0', name: 'Alok' },
      {
        id: '.0.1',
        name: 'Cat Dealers',
        [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
      },
      { id: '.0.1.0', name: 'KVSH' },
    ])
  })
})

function treeForProp(prop) {
  return {
    id: 'root',
    [prop]: [
      {
        id: '.0',
        name: 'Vintage Culture',
        [prop]: [
          { id: '.0.0', name: 'Alok' },
          {
            id: '.0.1',
            name: 'Cat Dealers',
            [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
          },
        ],
      },
      {
        id: '.1',
        name: 'Metallica',
        [prop]: [
          {
            id: '.1.0',
            name: 'Iron Maiden',
            [prop]: [
              {
                id: '.1.0.0',
                name: 'Pantera',
                [prop]: [{ id: '.1.0.0.0', name: 'Slayer' }],
              },
            ],
          },
        ],
      },
    ],
  }
}

function itemsForProp(prop) {
  return [
    {
      name: 'Vintage Culture',
      [prop]: [
        { name: 'Alok' },
        { name: 'Cat Dealers', [prop]: [{ name: 'KVSH' }] },
      ],
    },
    {
      name: 'Metallica',
      [prop]: [
        {
          name: 'Iron Maiden',
          [prop]: [{ name: 'Pantera', [prop]: [{ name: 'Slayer' }] }],
        },
      ],
    },
  ]
}

function flattenedTreeForProp(prop) {
  return [
    {
      [prop]: [
        {
          [prop]: [
            { id: '.0.0', name: 'Alok' },
            {
              [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
              id: '.0.1',
              name: 'Cat Dealers',
            },
          ],
          id: '.0',
          name: 'Vintage Culture',
        },
        {
          [prop]: [
            {
              [prop]: [
                {
                  [prop]: [{ id: '.1.0.0.0', name: 'Slayer' }],
                  id: '.1.0.0',
                  name: 'Pantera',
                },
              ],
              id: '.1.0',
              name: 'Iron Maiden',
            },
          ],
          id: '.1',
          name: 'Metallica',
        },
      ],
      id: 'root',
    },
    {
      [prop]: [
        { id: '.0.0', name: 'Alok' },
        {
          [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
          id: '.0.1',
          name: 'Cat Dealers',
        },
      ],
      id: '.0',
      name: 'Vintage Culture',
    },
    { id: '.0.0', name: 'Alok' },
    {
      [prop]: [{ id: '.0.1.0', name: 'KVSH' }],
      id: '.0.1',
      name: 'Cat Dealers',
    },
    { id: '.0.1.0', name: 'KVSH' },
    {
      [prop]: [
        {
          [prop]: [
            {
              [prop]: [{ id: '.1.0.0.0', name: 'Slayer' }],
              id: '.1.0.0',
              name: 'Pantera',
            },
          ],
          id: '.1.0',
          name: 'Iron Maiden',
        },
      ],
      id: '.1',
      name: 'Metallica',
    },
    {
      [prop]: [
        {
          [prop]: [{ id: '.1.0.0.0', name: 'Slayer' }],
          id: '.1.0.0',
          name: 'Pantera',
        },
      ],
      id: '.1.0',
      name: 'Iron Maiden',
    },
    {
      [prop]: [{ id: '.1.0.0.0', name: 'Slayer' }],
      id: '.1.0.0',
      name: 'Pantera',
    },
    { id: '.1.0.0.0', name: 'Slayer' },
  ]
}
