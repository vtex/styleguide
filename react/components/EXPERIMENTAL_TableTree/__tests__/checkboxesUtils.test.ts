import { getItemTree, getFlat, getToggledState } from '../hooks/checkboxesUtils'

test('Tree is parsed correctly', () => {
  expect(getItemTree(exampleItems)).toEqual(exampleTree)
})

test('Tree is flats correctly', () => {
  expect(getFlat(exampleTree)).toEqual(flatTree)
})

test('The state is toggled correctly on a item without children', () => {
  expect(getToggledState([], { id: '.0.0', name: 'Alok' })).toEqual([
    { id: '.0.0', name: 'Alok' },
  ])
  expect(getToggledState([], { id: '.0.1.0', name: 'KVSH' })).toEqual([
    { id: '.0.1.0', name: 'KVSH' },
  ])
})

test('The state is toggled correctly on a item with children', () => {
  expect(
    getToggledState([], {
      id: '.0',
      name: 'Vintage Culture',
      children: [
        { id: '.0.0', name: 'Alok' },
        {
          id: '.0.1',
          name: 'Cat Dealers',
          children: [{ id: '.0.1.0', name: 'KVSH' }],
        },
      ],
    })
  ).toEqual([
    {
      id: '.0',
      name: 'Vintage Culture',
      children: [
        { id: '.0.0', name: 'Alok' },
        {
          id: '.0.1',
          name: 'Cat Dealers',
          children: [{ id: '.0.1.0', name: 'KVSH' }],
        },
      ],
    },
    { id: '.0.0', name: 'Alok' },
    {
      id: '.0.1',
      name: 'Cat Dealers',
      children: [{ id: '.0.1.0', name: 'KVSH' }],
    },
    { id: '.0.1.0', name: 'KVSH' },
  ])
})

const exampleItems = [
  {
    name: 'Vintage Culture',
    children: [
      { name: 'Alok' },
      { name: 'Cat Dealers', children: [{ name: 'KVSH' }] },
    ],
  },
  {
    name: 'Metallica',
    children: [
      {
        name: 'Iron Maiden',
        children: [{ name: 'Pantera', children: [{ name: 'Slayer' }] }],
      },
    ],
  },
]

const exampleTree = {
  id: 'root',
  children: [
    {
      id: '.0',
      name: 'Vintage Culture',
      children: [
        { id: '.0.0', name: 'Alok' },
        {
          id: '.0.1',
          name: 'Cat Dealers',
          children: [{ id: '.0.1.0', name: 'KVSH' }],
        },
      ],
    },
    {
      id: '.1',
      name: 'Metallica',
      children: [
        {
          id: '.1.0',
          name: 'Iron Maiden',
          children: [
            {
              id: '.1.0.0',
              name: 'Pantera',
              children: [{ id: '.1.0.0.0', name: 'Slayer' }],
            },
          ],
        },
      ],
    },
  ],
}

const flatTree = [
  {
    children: [
      {
        children: [
          { id: '.0.0', name: 'Alok' },
          {
            children: [{ id: '.0.1.0', name: 'KVSH' }],
            id: '.0.1',
            name: 'Cat Dealers',
          },
        ],
        id: '.0',
        name: 'Vintage Culture',
      },
      {
        children: [
          {
            children: [
              {
                children: [{ id: '.1.0.0.0', name: 'Slayer' }],
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
    children: [
      { id: '.0.0', name: 'Alok' },
      {
        children: [{ id: '.0.1.0', name: 'KVSH' }],
        id: '.0.1',
        name: 'Cat Dealers',
      },
    ],
    id: '.0',
    name: 'Vintage Culture',
  },
  { id: '.0.0', name: 'Alok' },
  {
    children: [{ id: '.0.1.0', name: 'KVSH' }],
    id: '.0.1',
    name: 'Cat Dealers',
  },
  { id: '.0.1.0', name: 'KVSH' },
  {
    children: [
      {
        children: [
          {
            children: [{ id: '.1.0.0.0', name: 'Slayer' }],
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
    children: [
      {
        children: [{ id: '.1.0.0.0', name: 'Slayer' }],
        id: '.1.0.0',
        name: 'Pantera',
      },
    ],
    id: '.1.0',
    name: 'Iron Maiden',
  },
  {
    children: [{ id: '.1.0.0.0', name: 'Slayer' }],
    id: '.1.0.0',
    name: 'Pantera',
  },
  { id: '.1.0.0.0', name: 'Slayer' },
]
