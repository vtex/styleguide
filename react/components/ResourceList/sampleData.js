/* eslint-disable */
import React from 'react'
import Badge from '../Badge'
import ArrowDown from '../icon/ArrowDown'

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
            <div className="truncate ph4">
              <span
                className="pointer"
                onClick={() =>
                  alert(
                    'You can customize header components. For example, call an external sort function',
                  )
                }
              >
                {`${label} `}
                <ArrowDown size={11} />
              </span>
            </div>
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
              <Badge bgColor={cellData.color} color="#fff">
                <span className="nowrap">{cellData.label}</span>
              </Badge>
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
  ],
}
