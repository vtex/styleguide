export const products = [
  {
    id: 1,
    name: 'Macbook Pro 13 inch',
    categories: ['laptop'],
    manufacturer: 'apple',
    qty: 200,
    costPrice: 800,
    retailPrice: 1299,
    wholesalePrice: 1000,
  },
  {
    id: 2,
    name: 'Pixel 4',
    categories: ['smartphone'],
    manufacturer: 'google',
    qty: 100,
    costPrice: 600,
    retailPrice: 799,
    wholesalePrice: 700,
  },
  {
    id: 3,
    name: 'Macbook Pro 16 inch',
    categories: ['laptop'],
    manufacturer: 'apple',
    qty: 10,
    costPrice: 1800,
    retailPrice: 2399,
    wholesalePrice: 2000,
  },
  {
    id: 4,
    name: 'Ipad Pro 12.9 inch',
    categories: ['tablet'],
    manufacturer: 'apple',
    qty: 210,
    costPrice: 600,
    retailPrice: 999,
    wholesalePrice: 750,
  },
  {
    id: 5,
    name: 'XPS 15',
    categories: ['laptop'],
    manufacturer: 'dell',
    qty: 500,
    costPrice: 500,
    retailPrice: 1050,
    wholesalePrice: 950,
  },
  {
    id: 6,
    name: 'Disabled Item',
    categories: ['laptop'],
    manufacturer: 'example',
    qty: 0,
    costPrice: 500,
    retailPrice: 1050,
    wholesalePrice: 950,
  },
  {
    id: 7,
    name: 'IPhone 11 Pro',
    categories: ['smartphone'],
    manufacturer: 'apple',
    qty: 450,
    costPrice: 700,
    retailPrice: 1100,
    wholesalePrice: 950,
  },
]

export const productTree = [
  {
    id: 1,
    name: 'Macbook Pro 13 inch',
    categories: ['laptop'],
    manufacturer: 'apple',
    qty: 200,
    costPrice: 800,
    retailPrice: 1299,
    wholesalePrice: 1000,
    related: [
      {
        id: 2,
        name: 'Macbook Pro 16 inch',
        categories: ['laptop'],
        manufacturer: 'apple',
        qty: 10,
        costPrice: 1800,
        retailPrice: 2399,
        wholesalePrice: 2000,
      },
      {
        id: 3,
        name: 'IPhone 11 Pro',
        categories: ['smartphone'],
        manufacturer: 'apple',
        qty: 450,
        costPrice: 700,
        retailPrice: 1100,
        wholesalePrice: 950,
        related: [
          {
            id: 4,
            name: 'Ipad Pro 12.9 inch',
            categories: ['tablet'],
            manufacturer: 'apple',
            qty: 210,
            costPrice: 600,
            retailPrice: 999,
            wholesalePrice: 750,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'Pixel 4',
    categories: ['smartphone'],
    manufacturer: 'google',
    qty: 100,
    costPrice: 600,
    retailPrice: 799,
    wholesalePrice: 700,
  },
  {
    id: 6,
    name: 'XPS 15',
    categories: ['laptop'],
    manufacturer: 'dell',
    qty: 500,
    costPrice: 500,
    retailPrice: 1050,
    wholesalePrice: 950,
  },
  {
    id: 7,
    name: 'Quiet Comfort',
    categories: ['headphone'],
    manufacturer: 'bose',
    qty: 120,
    costPrice: 100,
    retailPrice: 300,
    wholesalePrice: 250,
  },
]

export const payments = [
  {
    id: 1,
    icon: 'FaCcPaypal',
    name: 'Paypal',
    status: 'ACTIVE',
  },
  {
    id: 2,
    icon: 'FaCcMastercard',
    name: 'Mastercard',
    status: 'ACTIVE',
  },
  {
    id: 3,
    icon: 'FaCcDinersClub',
    name: 'Dinners Club',
    status: 'ACTIVE',
  },
  {
    id: 4,
    icon: 'FaCcDiscover',
    name: 'Discover',
    status: 'INACTIVE',
  },
  {
    id: 5,
    icon: 'FaCcAmazonPay',
    name: 'Amazon Pay',
    status: 'INACTIVE',
  },
  {
    id: 6,
    icon: 'FaCcApplePay',
    name: 'Apple Pay',
    status: 'ACTIVE',
  },
  {
    id: 7,
    icon: 'FaCcVisa',
    name: 'Visa',
    status: 'ACTIVE',
  },
  {
    id: 8,
    icon: 'FaCcAmex',
    name: 'American Express',
    status: 'INACTIVE',
  },
]

export const customers = [
  {
    id: 1,
    name: "T'Chala",
    email: 'black.panther@gmail.com',
    location: '🇰🇪Wakanda',
  },
  {
    id: 2,
    name: 'Peter Parker',
    email: 'spider.man@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 3,
    name: 'Shang-Chi',
    email: 'kung.fu@gmail.com',
    location: '🇨🇳China',
  },
  {
    id: 4,
    name: 'Natasha Romanoff',
    email: 'black.widown@gmail.com',
    location: '🇷🇺Russia',
  },
  {
    id: 5,
    name: 'Stephen Strange',
    email: 'dr.strange@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 6,
    name: 'Steve Rogers',
    email: 'cap.america@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 7,
    name: 'Abdul Alhazred',
    email: 'abdul@gmail.com',
    location: '🇸🇦Saudi Arabia',
  },
  {
    id: 8,
    name: 'Carol Danvers',
    email: 'cap.marvel@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 9,
    name: 'Scott Lang',
    email: 'ant.man@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 10,
    name: 'En Sabah Nuh',
    email: 'sabah@gmail.com',
    location: '🇨🇺Cuba',
  },
  {
    id: 11,
    name: 'Abdul Qamar',
    email: 'qamar@gmail.com',
    location: '🇸🇦Saudi Arabia',
  },
  {
    id: 12,
    name: 'Goose the Cat',
    email: 'meow@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 13,
    name: 'Brian Braddock',
    email: 'cap.britain@gmail.com',
    location: '🇬🇧Great Britain',
  },
  {
    id: 14,
    name: 'Marc Spector',
    email: 'moon.knight@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 15,
    name: 'John Walker',
    email: 'american.agent@gmail.com',
    location: '🇺🇸USA',
  },
  {
    id: 16,
    name: 'Dane Whitman',
    email: 'black.knight@gmail.com',
    location: '🇺🇸USA',
  },
]
