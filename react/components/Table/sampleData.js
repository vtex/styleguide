/* eslint-disable */
import React from 'react'
import Toggle from '../Toggle'
export default {
  defaultSchema: {
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email',
        width: 350,
      },
      number: {
        type: 'number',
        title: 'Number',
      },
    },
  },
  customSchema: {
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email',
      },
      number: {
        type: 'number',
        title: 'Number',
        headerRenderer: () => <button className="mh4">custom component</button>,
      },
      active: {
        type: 'boolean',
        title: 'Active',
        cellRenderer: ({ cellData }) => <Toggle checked={cellData} label="custom cell component" />,
      },
    },
  },
  items: [
    {
      email: 'olen.stamm21@yahoo.com',
      name: 'Patrick Rothfuss',
      number: 52725,
      index: 0,
      active: true,
    },
    {
      email: 'junius0@gmail.com',
      name: 'Hurricane Skywalker IV',
      number: 84639,
      index: 1,
      active: true,
    },
    {
      email: 'hailee.botsford24@gmail.com',
      name: 'Mr. Ron Smith',
      number: 23851,
      index: 2,
      active: false,
    },
    {
      email: 'judd_gulgowski22@yahoo.com',
      name: 'Tom Braddy',
      number: 10182,
      index: 3,
      active: true,
    },
    {
      email: 'gaetano.mayert71@yahoo.com',
      name: 'Norris Murazik',
      number: 33725,
      index: 4,
      active: false,
    },
    {
      email: 'catharine.leuschke62@hotmail.com',
      name: 'Momochi Zabuza',
      number: 33245,
      index: 5,
      active: false,
    },
    {
      email: 'candido_ryan@hotmail.com',
      name: 'Isaac Mayert IV',
      number: 96637,
      index: 6,
      active: true,
    },
    {
      email: 'freda_ritchie26@yahoo.com',
      name: 'Dr. Lempi Mosciski',
      number: 42623,
      index: 7,
      active: true,
    },
    {
      email: 'elissa28@gmail.com',
      name: 'Nikita Feeney',
      number: 11769,
      index: 8,
      active: false,
    },
    {
      email: 'reginald1@yahoo.com',
      name: 'Janick Lesch',
      number: 85311,
      index: 9,
      active: true,
    },
    {
      email: 'jerad_hyatt@hotmail.com',
      name: 'Golda Carter',
      number: 44288,
      index: 10,
      active: false
    },
    {
      email: 'jaquan.fisher61@yahoo.com',
      name: 'Dr. Cassandra Jerde',
      number: 73372,
      index: 11,
      active: false
    },
    {
      email: 'marlee_ziemann@yahoo.com',
      name: 'Kvothe Kshlerin',
      number: 62416,
      index: 12,
      active: false
    },
    {
      email: 'erman_Beier@yahoo.com',
      name: 'Arch Hegmann',
      number: 82120,
      index: 13,
      active: true
    },
    {
      email: 'arturo_schroeder30@yahoo.com',
      name: 'Alejandro Strosin',
      number: 73701,
      index: 14,
      active: false
    },
    {
      email: 'santos_doyle36@gmail.com',
      name: 'Zidane Vandervort',
      number: 26124,
      index: 15,
      active: true
    },
    {
      email: 'yvonne.gleason@hotmail.com',
      name: 'Tonny Balistreri',
      number: 79484,
      index: 16,
      active: false
    },
    {
      email: 'michaela51@hotmail.com',
      name: 'Emanuel Ullrich',
      number: 57879,
      index: 17,
      active: false
    },
    {
      email: 'erik_kuvalis41@hotmail.com',
      name: 'Beto',
      number: 87262,
      index: 18,
      active: true
    },
    {
      email: 'edwardo_kuvalis@hotmail.com',
      name: 'Mrs. Deion Beahan',
      number: 13464,
      index: 19,
      active: true
    },
    {
      email: 'alexa_ondricka45@hotmail.com',
      name: 'Trent Kerluke',
      number: 9677,
      index: 20,
      active: false
    },
    {
      email: 'darron_brakus63@yahoo.com',
      name: 'Jacquelyn Flatley Jr.',
      number: 55405,
      index: 21,
      active: true
    },
    {
      email: 'jamie.hermann60@gmail.com',
      name: 'Ervin Kuphal',
      number: 76965,
      index: 22,
      active: true
    },
    {
      email: 'cleo.klein@hotmail.com',
      name: 'Terrence Gutmann',
      number: 55731,
      index: 23,
      active: false
    },
    {
      email: 'Alicia.Ullrich@yahoo.com',
      name: 'Oren Beatty V',
      number: 6073,
      index: 24,
      active: false
    },
    {
      email: 'Maynard.Kulas@hotmail.com',
      name: 'Dr. Colby Gottlieb',
      number: 27670,
      index: 25,
      active: false
    },
    {
      email: 'Madonna_Feeney@yahoo.com',
      name: 'Ernestina Rempel',
      number: 75422,
      index: 26,
      active: true
    },
    {
      email: 'Pearlie_Ondricka@hotmail.com',
      name: 'Kathryne Graham',
      number: 46363,
      index: 27,
      active: false
    },
    {
      email: 'Elise21@yahoo.com',
      name: 'Cecelia Marquardt',
      number: 49598,
      index: 28,
      active: false
    },
    {
      email: 'Willis.Cremin@hotmail.com',
      name: 'Bradford Stanton',
      number: 21061,
      index: 29,
      active: true
    },
    {
      email: 'Marcus31@gmail.com',
      name: 'Zachary Bednar',
      number: 35011,
      index: 30,
      active: true
    },
    {
      email: 'Morris15@gmail.com',
      name: 'Roxanne Kozey',
      number: 54952,
      index: 31,
      active: true
    },
    {
      email: 'Marge_Veum47@hotmail.com',
      name: 'Amelia Gutmann',
      number: 41825,
      index: 32,
      active: false
    },
    {
      email: 'Zack27@gmail.com',
      name: 'Armani Kuhic',
      number: 230,
      index: 33,
      active: false
    },
    {
      email: 'Betty.Pouros48@hotmail.com',
      name: 'Antonietta Koch',
      number: 62524,
      index: 34,
      active: false
    },
    {
      email: 'Soledad.Huel@gmail.com',
      name: 'Pansy Kuphal',
      number: 3655,
      index: 35,
      active: true
    },
    {
      email: 'Vaughn_Huel42@yahoo.com',
      name: 'Brody Mohr',
      number: 70076,
      index: 36,
      active: true
    },
    {
      email: 'Thurman24@gmail.com',
      name: 'Gustave Grady',
      number: 32633,
      index: 37,
      active: false
    },
    {
      email: 'Antonette.Aufderhar@hotmail.com',
      name: 'Ms. Neva Thompson',
      number: 15857,
      index: 38,
      active: true
    },
    {
      email: 'Ryan_Kub@gmail.com',
      name: 'Clarissa Boyer',
      number: 46555,
      index: 39,
      active: false
    },
    {
      email: 'Mable_Wilkinson24@hotmail.com',
      name: 'Marcelle Orn',
      number: 19603,
      index: 40,
      active: true
    },
    {
      email: 'Adeline36@yahoo.com',
      name: 'Domenico Olson V',
      number: 37333,
      index: 41,
      active: false
    },
    {
      email: 'Arno.Hegmann@gmail.com',
      name: 'Ms. Marcos Bechtelar',
      number: 82189,
      index: 42,
      active: false
    },
    {
      email: 'Israel.Boyle2@gmail.com',
      name: 'Devon Mante',
      number: 27772,
      index: 43,
      active: true
    },
    {
      email: 'Maxime.Auer@hotmail.com',
      name: 'Isabelle Keeling',
      number: 94458,
      index: 44,
      active: false
    },
    {
      email: 'Jalen.Schmeler7@yahoo.com',
      name: 'Francisco Rodriguez',
      number: 89358,
      index: 45,
      active: false
    },
    {
      email: 'Robin_Dach43@gmail.com',
      name: 'Destany Farrell',
      number: 67488,
      index: 46,
      active: false
    },
    {
      email: 'Sid64@gmail.com',
      name: 'Miss Haylee Sporer',
      number: 11384,
      index: 47,
      active: false
    },
    {
      email: 'Barney_Batz85@gmail.com',
      name: 'Alisa Bayer',
      number: 25164,
      index: 48,
      active: true
    },
    {
      email: 'Darien.Yundt66@gmail.com',
      name: 'Bernhard Weissnat',
      number: 39351,
      index: 49,
      active: false
    },
  ],
}
