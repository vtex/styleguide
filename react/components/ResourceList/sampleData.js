import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../Badge'

const ColorBadgeCellComponent = ({ cellData }) => {
  return (
    <div className="mh4">
      <Badge bgColor={cellData.color} color="#fff">
        <span className="nowrap">{cellData.label}</span>
      </Badge>
    </div>
  )
}
ColorBadgeCellComponent.displayName = 'ColorBadgeCellComponent'
ColorBadgeCellComponent.propTypes = {
  cellData: PropTypes.any,
}

const generateRandomColorObject = () => {
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
  return badgeData[Math.floor(Math.random() * badgeData.length)]
}

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
      color: {
        type: 'object',
        title: 'Color',
        hidden: true,
        cellRenderer: ColorBadgeCellComponent,
      },
    },
  },
  items: [
    {
      email: 'olen.stamm21@yahoo.com',
      name: 'Patrick Rothfuss',
      number: 1.52725,
      color: generateRandomColorObject(),
    },
    {
      email: 'junius0@gmail.com',
      name: 'Hurricane Skywalker IV',
      number: 2.84639,
      color: generateRandomColorObject(),
    },
    {
      email: 'hailee.botsford24@gmail.com',
      name: 'Mr. Ron Smith',
      number: 3.23851,
      color: generateRandomColorObject(),
    },
    {
      email: 'judd_gulgowski22@yahoo.com',
      name: 'Tom Braddy',
      number: 4.10182,
      color: generateRandomColorObject(),
    },
    {
      email: 'gaetano.mayert71@yahoo.com',
      name: 'Norris Murazik',
      number: 5.33725,
      color: generateRandomColorObject(),
    },
    {
      email: 'catharine.leuschke62@hotmail.com',
      name: 'Momochi Zabuza',
      number: 6.33245,
      color: generateRandomColorObject(),
    },
    {
      email: 'candido_ryan@hotmail.com',
      name: 'Isaac Mayert IV',
      number: 7.96637,
      color: generateRandomColorObject(),
    },
    {
      email: 'freda_ritchie26@yahoo.com',
      name: 'Dr. Lempi Mosciski',
      number: 8.42623,
      color: generateRandomColorObject(),
    },
    {
      email: 'elissa28@gmail.com',
      name: 'Nikita Feeney',
      number: 9.11769,
      color: generateRandomColorObject(),
    },
    {
      email: 'reginald1@yahoo.com',
      name: 'Janick Lesch',
      number: 10.85311,
      color: generateRandomColorObject(),
    },
    {
      email: 'jerad_hyatt@hotmail.com',
      name: 'Golda Carter',
      number: 11.44288,
      color: generateRandomColorObject(),
    },
    {
      email: 'jaquan.fisher61@yahoo.com',
      name: 'Dr. Cassandra Jerde',
      number: 12.73372,
      color: generateRandomColorObject(),
    },
    {
      email: 'marlee_ziemann@yahoo.com',
      name: 'Kvothe Kshlerin',
      number: 13.62416,
      color: generateRandomColorObject(),
    },
    {
      email: 'erman_Beier@yahoo.com',
      name: 'Arch Hegmann',
      number: 14.8212,
      color: generateRandomColorObject(),
    },
    {
      email: 'arturo_schroeder30@yahoo.com',
      name: 'Alejandro Strosin',
      number: 15.73701,
      color: generateRandomColorObject(),
    },
    {
      email: 'santos_doyle36@gmail.com',
      name: 'Zidane Vandervort',
      number: 16.26124,
      color: generateRandomColorObject(),
    },
    {
      email: 'yvonne.gleason@hotmail.com',
      name: 'Tonny Balistreri',
      number: 17.79484,
      color: generateRandomColorObject(),
    },
    {
      email: 'michaela51@hotmail.com',
      name: 'Emanuel Ullrich',
      number: 18.57879,
      color: generateRandomColorObject(),
    },
    {
      email: 'erik_kuvalis41@hotmail.com',
      name: 'Beto',
      number: 19.87262,
      color: generateRandomColorObject(),
    },
    {
      email: 'edwardo_kuvalis@hotmail.com',
      name: 'Mrs. Deion Beahan',
      number: 20.13464,
      color: generateRandomColorObject(),
    },
    {
      email: 'alexa_ondricka45@hotmail.com',
      name: 'Trent Kerluke',
      number: 21.9677,
      color: generateRandomColorObject(),
    },
    {
      email: 'darron_brakus63@yahoo.com',
      name: 'Jacquelyn Flatley Jr.',
      number: 22.55405,
      color: generateRandomColorObject(),
    },
    {
      email: 'jamie.hermann60@gmail.com',
      name: 'Ervin Kuphal',
      number: 23.76965,
      color: generateRandomColorObject(),
    },
    {
      email: 'cleo.klein@hotmail.com',
      name: 'Terrence Gutmann',
      number: 24.55731,
      color: generateRandomColorObject(),
    },
    {
      email: 'Alicia.Ullrich@yahoo.com',
      name: 'Oren Beatty V',
      number: 25.6073,
      color: generateRandomColorObject(),
    },
  ],
}
