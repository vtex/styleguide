import React, { Component } from 'react'

//eslint-disable-next-line
class Objectives extends Component {
  render () {
    return (
      <div className="pa4 pa5-l cf">
        <h1 className="f1 ffmark mb3 mt0">Visual</h1>
        <hr className="w-40 db bw1 ba b--silver ma0" />
        <section className="mt5">
          <h3 className="f3 ffmark w-100 mid-gray mb3" id="cores">Cores</h3>
          <div className="flex flex-wrap">
            <div className="pa2">
              <div className="w4 h4 pa3 bg-vtex-blue flex justify-end items-end flex-column">
                <span className="white ffmark flex f5 w-100">--vtex-blue</span>
                <span className="white ffmark flex f5 w-100">#003B5E</span>
              </div>
              <span className="mt3 black ffmark flex f5 w-100">Primary Color</span>
            </div>
            <div className="pa2">
              <div className="w4 h4 pa3 bg-vtex-blue flex justify-end items-end flex-column">
                <span className="white ffmark flex f5 w-100">--vtex-blue</span>
                <span className="white ffmark flex f5 w-100">#003B5E</span>
              </div>
              <span className="mt3 black ffmark flex f5 w-100">Primary Color</span>
            </div>
            <div className="pa2">
              <div className="w4 h4 pa3 bg-vtex-blue flex justify-end items-end flex-column">
                <span className="white ffmark flex f5 w-100">--vtex-blue</span>
                <span className="white ffmark flex f5 w-100">#003B5E</span>
              </div>
              <span className="mt3 black ffmark flex f5 w-100">Primary Color</span>
            </div>
            <div className="pa2">
              <div className="w4 h4 pa3 bg-vtex-blue flex justify-end items-end flex-column">
                <span className="white ffmark flex f5 w-100">--vtex-blue</span>
                <span className="white ffmark flex f5 w-100">#003B5E</span>
              </div>
              <span className="mt3 black ffmark flex f5 w-100">Primary Color</span>
            </div>
          </div>
        </section>

        <section className="mt5">
          <h3 className="f3 ffmark w-100 mid-gray mb3" id="tipografia">Tipografia</h3>
          <h4 className="f4 ffmark mb1">Header — FF Mark</h4>
          <p className="ffmark fw1 lh-title">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              1234567890
            </p>
          <code className="bg-light-silver dark-gray br2 pa1">ffmark</code>

          <h4 className="f4 acumin mb1">Body — Acumin</h4>
          <p className="acumin fw1 lh-copy">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz<br />
              1234567890
            </p>
          <code className="bg-light-silver dark-gray br2 pa1">acumin</code>
        </section>

        <section className="mt5 w-80-l w-100">
          <h3 className="f3 ffmark mid-gray mb3" id="hierarquia">Hierarquia</h3>

          <div className="mb5">
            <h1 className="f1 ffmark lh-header mb3">H1 – Design Principles in use</h1>
            <code className="bg-light-silver dark-gray br2 pa1">f1 ffmark lh-header</code>
          </div>

          <div className="mb5">
            <h2 className="f2 ffmark lh-header mb3">H2 – Design Principles in use</h2>
            <code className="bg-light-silver dark-gray br2 pa1">f2 ffmark lh-header</code>
          </div>

          <div className="mb5">
            <h3 className="f3 fw4 ffmark lh-header mb3">H3 – Design Principles in use</h3>
            <code className="bg-light-silver dark-gray br2 pa1">f3 fw4 ffmark lh-header</code>
          </div>

          <div className="mb5">
            <h4 className="f4 fw4 ffmark lh-header mb3">H4 – Design Principles in use</h4>
            <code className="bg-light-silver dark-gray br2 pa1">f4 fw4 ffmark lh-header</code>
          </div>

          <div className="mb5">
            <p className="ffmark fw5 f5 lh-copy mb3">Interface Text – “Whatever the problem, be part of the solution. Don't just sit around raising questions and pointing out obstacles. We've all worked with that person. That person is a drag.” Tina Fey</p>
            <code className="bg-light-silver dark-gray br2 pa1">ffmark fw5 f5 lh-copy</code>
          </div>

          <div className="mb5">
            <p className="acumin lh-copy mb3">Body – “Whatever the problem, be part of the solution. Don't just sit around raising questions and pointing out obstacles. We've all worked with that person. That person is a drag.” Tina Fey</p>
            <code className="bg-light-silver dark-gray br2 pa1">acumin lh-copy</code>
          </div>

          <div className="mb5">
            <small className="acumin lh-copy db mb3">Small Body – “Whatever the problem, be part of the solution. Don't just sit around raising questions and pointing out obstacles. We've all worked with that person. That person is a drag.” Tina Fey</small>
            <code className="bg-light-silver dark-gray br2 pa1">&lt;small className="acumin lh-copy"&gt;</code>
          </div>

        </section>
      </div>
    )
  }
}

export default Objectives
