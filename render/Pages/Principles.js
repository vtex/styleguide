import React, { Component } from 'react'
import solidSVG from '../assets/svg/solid.svg'
import globalSVG from '../assets/svg/global.svg'
import trustSVG from '../assets/svg/trust.svg'
import directSVG from '../assets/svg/direct.svg'
import boldSVG from '../assets/svg/bold.svg'

//eslint-disable-next-line
class Principles extends Component {
  render () {
    return (
      <div className="Principles">
        <div className="mt0 w-100 pa5 overflow-hidden">
          <h1 className="f2-m f2-l ffmark ttu fl w-auto mt0 br mb0-ns bw1 b--silver pr4 mr4 tracked lh-solid" id="principios">Princípios<br />de Design</h1>
          <h2 className="f2-m f2-l ffmark ttu fw2 fl w-auto mt0 mb0-ns lh-solid">Como fazemos &<br />Por que fazemos</h2>
        </div>
        <section className="vh-100-ns pv4 pa0-ns relative overflow-hidden">
          <img alt="Solid" src={solidSVG} className="w-100 w-100-ns ilust vcenter-ns pv5 pa0-ns" />
          <div className="vcenter-ns pl4">
            <div className="pa3 pa4-l pb5">
              <h3 className="f1 ma0 mb3">Sólido</h3>
              <h4 className="gray f3 fw5 ma0 mb2 lh-title measure-narrow">Pense modular.<br /> Seja extensível.<br /> Construa escalável.</h4>
              <p className="f4 ma0 lh-copy measure-narrow">Crie sem limitações, pensando sempre em produtos escaláveis que cresçam com o ecossistema.</p>
            </div>
          </div>
        </section>

        <section className="vh-100-ns pv4 pa0-ns relative overflow-hidden" >
          <img alt="Global" src={globalSVG} className="w-100 w-100-ns ilust vcenter-ns pv5 pa0-ns" />
          <div className="vcenter-ns pl4">
            <div className="pa3 pa4-l pb5">
              <h3 className="f1 ma0 mb3">Global</h3>
              <h4 className="gray f3 fw5 ma0 mb2 lh-title measure-narrow">Nós acreditamos em diversidade. <br />Global significa local.</h4>
              <p className="f4 ma0 lh-copy measure-narrow">Onde quer que esteja, sempre pense no contexto local. Isto significa conhecer nossos usuários, falar sua língua e ser relevante para sua cultura.</p>
            </div>
          </div>
        </section>

        <section className="vh-100-ns pv4 pa0-ns relative overflow-hidden" >
          <img alt="Trustworthy" src={trustSVG} className="w-100 w-100-ns ilust vcenter-ns pv5 pa0-ns" />

          <div className="vcenter-ns pl4">
            <div className="bg-white pa3 pa4-l pb5">
              <h3 className="f1 ma0 mb3">Confiável</h3>
              <h4 className="gray f3 fw5 ma0 mb2 lh-title measure-narrow">Conquiste a confiança das pessoas.</h4>
              <p className="f4 ma0 lh-copy measure-narrow">As pessoas devem se sentir seguras enquanto usam nossas interfaces. Estamos todos juntos nessa, pensando e fazendo nosso melhor pelo ecossistema.</p>
            </div>
          </div>
        </section>

        <section className="vh-100-ns pv4 pa0-ns relative overflow-hidden" >
          <img alt="Direct" src={directSVG} className="w-100 w-100-ns ilust vcenter-ns pv5 pa0-ns" />

          <div className="vcenter-ns pl4">
            <div className="bg-white pa3 pa4-l pb5">
              <h3 className="f1 ma0 mb3">Direto</h3>
              <h4 className="gray f3 fw5 ma0 mb2 lh-title measure-narrow">Ajudamos pessoas a resolver problemas.</h4>
              <p className="f4 ma0 lh-copy measure-narrow">Foque no que é necessário para o usuário completar seu trabalho. Queremos que as pessoas completem suas atividades com o mínimo de esforço e o máximo de eficiência.</p>
            </div>
          </div>
        </section>

        <section className="vh-100-ns bg-black pv4 pa0-ns relative overflow-hidden" >
          <img alt="Bold" src={boldSVG} className="w-100 w-100-ns ilust vcenter-ns pv5 pa0-ns" />

          <div className="vcenter-ns pl4">
            <div className="pa3 pa4-l pb5">
              <h3 className="f1 ma0 mb3 white">Audacioso</h3>
              <h4 className="gray f3 fw5 ma0 mb2 lh-title measure-narrow white">Experimentação sem medo.</h4>
              <p className="f4 ma0 lh-copy measure-narrow white">Sempre haverá riscos — só lembre que você é sempre o dono do resultado. É melhor pedir desculpas que pedir licença.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Principles
