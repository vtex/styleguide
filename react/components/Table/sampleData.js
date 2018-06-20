/* eslint-disable */
import React from 'react'
import Badge from '../Badge'
import Button from '../Button'
import CaretDown from '../icon/CaretDown'

const badgeData = [
  {
    color: '#F71963',
    label: 'Rebel pink',
  },
  {
    color: '#00BBD4',
    label: 'Young blue',
  },
  {
    color: '#D6D8E0',
    label: 'Cold gray',
  },
  {
    color: '#142032',
    label: 'Serious black',
  },
]

export default {
  defaultSchema: {
    properties: {
      name: {
        type: 'string',
        title: 'Name',
      },
      email: {
        type: 'string',
        title: 'Email',
        width: 35,
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
        headerRenderer: ({ label }) => {
          return (
            <Button
              block
              variation="secondary"
              onClick={() => alert('You can customize header components. For example, call an external sort function')}>
              <span className="mr3">{label}</span>
              <CaretDown color="#368df7" />
            </Button>
          )
        },
      },
      email: {
        type: 'string',
        title: 'Email',
        width: 35,
      },
      color: {
        type: 'object',
        title: 'Color',
        cellRenderer: ({ cellData }) => {
          return (
            <div className="mh4">
              <Badge bgColor={cellData.color} color="#fff">{cellData.label}</Badge>
            </div>
          )
        },
      },
    },
  },
  items: [
    {
      email: 'olen.stamm21@yahoo.com',
      name: 'Patrick Rothfuss',
      number: 52725,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'junius0@gmail.com',
      name: 'Hurricane Skywalker IV',
      number: 84639,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'hailee.botsford24@gmail.com',
      name: 'Mr. Ron Smith',
      number: 23851,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'judd_gulgowski22@yahoo.com',
      name: 'Tom Braddy',
      number: 10182,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'gaetano.mayert71@yahoo.com',
      name: 'Norris Murazik',
      number: 33725,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'catharine.leuschke62@hotmail.com',
      name: 'Momochi Zabuza',
      number: 33245,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'candido_ryan@hotmail.com',
      name: 'Isaac Mayert IV',
      number: 96637,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'freda_ritchie26@yahoo.com',
      name: 'Dr. Lempi Mosciski',
      number: 42623,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'elissa28@gmail.com',
      name: 'Nikita Feeney',
      number: 11769,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'reginald1@yahoo.com',
      name: 'Janick Lesch',
      number: 85311,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'jerad_hyatt@hotmail.com',
      name: 'Golda Carter',
      number: 44288,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'jaquan.fisher61@yahoo.com',
      name: 'Dr. Cassandra Jerde',
      number: 73372,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'marlee_ziemann@yahoo.com',
      name: 'Kvothe Kshlerin',
      number: 62416,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'erman_Beier@yahoo.com',
      name: 'Arch Hegmann',
      number: 82120,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'arturo_schroeder30@yahoo.com',
      name: 'Alejandro Strosin',
      number: 73701,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'santos_doyle36@gmail.com',
      name: 'Zidane Vandervort',
      number: 26124,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'yvonne.gleason@hotmail.com',
      name: 'Tonny Balistreri',
      number: 79484,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'michaela51@hotmail.com',
      name: 'Emanuel Ullrich',
      number: 57879,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'erik_kuvalis41@hotmail.com',
      name: 'Beto',
      number: 87262,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'edwardo_kuvalis@hotmail.com',
      name: 'Mrs. Deion Beahan',
      number: 13464,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'alexa_ondricka45@hotmail.com',
      name: 'Trent Kerluke',
      number: 9677,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'darron_brakus63@yahoo.com',
      name: 'Jacquelyn Flatley Jr.',
      number: 55405,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'jamie.hermann60@gmail.com',
      name: 'Ervin Kuphal',
      number: 76965,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'cleo.klein@hotmail.com',
      name: 'Terrence Gutmann',
      number: 55731,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Alicia.Ullrich@yahoo.com',
      name: 'Oren Beatty V',
      number: 6073,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Maynard.Kulas@hotmail.com',
      name: 'Dr. Colby Gottlieb',
      number: 27670,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Madonna_Feeney@yahoo.com',
      name: 'Ernestina Rempel',
      number: 75422,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Pearlie_Ondricka@hotmail.com',
      name: 'Kathryne Graham',
      number: 46363,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Elise21@yahoo.com',
      name: 'Cecelia Marquardt',
      number: 49598,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Willis.Cremin@hotmail.com',
      name: 'Bradford Stanton',
      number: 21061,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Marcus31@gmail.com',
      name: 'Zachary Bednar',
      number: 35011,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Morris15@gmail.com',
      name: 'Roxanne Kozey',
      number: 54952,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Marge_Veum47@hotmail.com',
      name: 'Amelia Gutmann',
      number: 41825,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Zack27@gmail.com',
      name: 'Armani Kuhic',
      number: 230,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Betty.Pouros48@hotmail.com',
      name: 'Antonietta Koch',
      number: 62524,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Soledad.Huel@gmail.com',
      name: 'Pansy Kuphal',
      number: 3655,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Vaughn_Huel42@yahoo.com',
      name: 'Brody Mohr',
      number: 70076,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Thurman24@gmail.com',
      name: 'Gustave Grady',
      number: 32633,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Antonette.Aufderhar@hotmail.com',
      name: 'Ms. Neva Thompson',
      number: 15857,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Ryan_Kub@gmail.com',
      name: 'Clarissa Boyer',
      number: 46555,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Mable_Wilkinson24@hotmail.com',
      name: 'Marcelle Orn',
      number: 19603,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Adeline36@yahoo.com',
      name: 'Domenico Olson V',
      number: 37333,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Arno.Hegmann@gmail.com',
      name: 'Ms. Marcos Bechtelar',
      number: 82189,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Israel.Boyle2@gmail.com',
      name: 'Devon Mante',
      number: 27772,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Maxime.Auer@hotmail.com',
      name: 'Isabelle Keeling',
      number: 94458,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Jalen.Schmeler7@yahoo.com',
      name: 'Francisco Rodriguez',
      number: 89358,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Robin_Dach43@gmail.com',
      name: 'Destany Farrell',
      number: 67488,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Sid64@gmail.com',
      name: 'Miss Haylee Sporer',
      number: 11384,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Barney_Batz85@gmail.com',
      name: 'Alisa Bayer',
      number: 25164,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
    {
      email: 'Darien.Yundt66@gmail.com',
      name: 'Bernhard Weissnat',
      number: 39351,
      color: badgeData[Math.floor(Math.random() * badgeData.length)],
    },
  ],
}
