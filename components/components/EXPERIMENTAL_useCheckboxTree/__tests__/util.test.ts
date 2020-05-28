import { getFlat, getToggledState } from '../util'

const props = ['children', 'related', 'friends']
const comparator = item => candidate => item.name === candidate.name

describe('CheckboxTree util tests', () => {
  it('should flat the tree correctly', () => {
    props.forEach(prop => {
      expect(getFlat(treeForProp(prop), [], prop)).toEqual(
        flattenedTreeForProp(prop)
      )
    })
  })
  it('should toggle state correctly on a item without chidren', () => {
    props.forEach(prop => {
      expect(
        getToggledState([], { name: 'Alok' }, prop, comparator, () => false)
      ).toEqual([{ name: 'Alok' }])
      expect(
        getToggledState([], { name: 'KVSH' }, prop, comparator, () => false)
      ).toEqual([{ name: 'KVSH' }])
    })
  })
  it('should toggle state correctly on a item with chidren', () => {
    props.forEach(prop => {
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
          comparator,
          () => false
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
