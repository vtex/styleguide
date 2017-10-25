import React from 'react'
import Heading from 'vtex.onda/packages/onda/src/Heading'

import CodeEmbed from '../Component/CodeEmbed'

export default function GettingStarted () {

  return (
    <section className="pt5 pl4 pr4 pl5-l pr5-l">
      <Heading size="2">Grid System</Heading>
      <br/>
      <p className="f5-ns f4-l lh-copy mw8 black-70">Todos os componentes do Onda <b>herdam a largura do pai</b> e tentam ser o máximo <b>margin-less</b> possível. Obrigando que definições de espaço e Grid sejam definidas pela página.</p>

      <p className="f5-ns f4-l lh-copy mw8 black-70">O Tachyons, possui um sistema de <a className="blue link dim" href="http://tachyons.io/docs/layout/grid/">Grid e margin</a> com base no Funtional CSS. Ou seja você não precisa se preocupar com valores, apenas com o que você deseja construir.</p>

      <p className="f5-ns f4-l lh-copy mw8 black-70">Por exemplo, caso você queira criar um formulário de duas colunas basta:</p>

      <CodeEmbed showCode>
          {(
            'import Input from "/Input/index.js" \n import Label from "/Label/index.js" \n <div className="cf w-100">\n\t<div className="fl w-50 pa2">\n\t\t<Label required>Nome</Label>\n\t\t<Input placeholder="Digite seu nome" type="text" required />\n\t</div>\n\t<div className="fl w-50 pa2">\n\t\t<Label required>Idade</Label>\n\t\t<Input placeholder="Digite sua idade" type="text" required />\n\t</div> \n</div>'
          )}
      </CodeEmbed>

      <p className="f5-ns f4-l lh-copy mw8 black-70">Por default as classes do Tachyons são mobile first. Para ter este mesmo formuário em duas colunas no destkop e uma coluna no mobile é preciso substituir as classes <code>w-50</code> por <code>w-100</code> e acrescentar <code>w-50-ns</code> (o breakpoint not small)</p>

      <CodeEmbed showCode>
          {(
            'import Input from "/Input/index.js" \n import Label from "/Label/index.js" \n // Redimensione a tela :) \n <div className="cf w-100">\n\t<div className="fl w-100 w-50-ns pa2">\n\t\t<Label required>Nome</Label>\n\t\t<Input placeholder="Digite seu nome" type="text" required />\n\t</div>\n\t<div className="fl w-100 w-50-ns pa2">\n\t\t<Label required>Idade</Label>\n\t\t<Input placeholder="Digite sua idade" type="text" required />\n\t</div> \n</div>'
          )}
      </CodeEmbed>

      <p className="f5-ns f4-l lh-copy mw8 black-70 pb6">Para mais informações e modelos de acesse <a className="blue link dim" href="http://tachyons.io/docs/layout/grid/">Grid Tachyons</a></p>

    </section>
  )
}
