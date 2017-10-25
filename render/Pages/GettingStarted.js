import React from 'react'
import Heading from 'vtex.onda/packages/onda/src/Heading'

import CodeEmbed from '../Component/CodeEmbed'

export default function GettingStarted () {

  return (
    <section className="pt5 pl4 pr4 pl5-l pr5-l">
      <Heading size="2">Como usar</Heading>
      <br/>

      <p className="f5-ns f4-l lh-copy mw8 black-70">Instale os pacotes</p>
      <CodeEmbed>
          npm i --save tachyons vtex-tachyons onda
      </CodeEmbed>

      <p className="f5-ns f4-l lh-copy mw8 black-70">Dentro da sua aplicação no arquivo root chame os estilos:</p>
      <CodeEmbed lang="disable-import">
          {('import \'tachyons\' \nimport \'vtex-tachyons\'')}
      </CodeEmbed>

      <p className="f5-ns f4-l lh-copy mw8 black-70">e pronto agora só importar os elementos ou componentes que desejar</p>
      <CodeEmbed lang="disable-import">
        {('import { Button, Card, Heading } from \'onda\' \nimport HorizontalBar from \'onda-creditbar\'' )}
      </CodeEmbed>
    </section>
  )
}
