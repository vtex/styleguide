VTEX's charts are based on [VEGA Lite](https://vega.github.io/vega-lite/).

You can use the [Vega Lite Wrapper](https://github.com/vtex-apps/vega-lite-wrapper) to obtain responsive charts.

A live example can be seen on the home page of the admin.

## Usage with IO app

**manifest.json**

> `"dependencies": { "vtex.vega-lite-wrapper": "1.x" }`

**A component**

> `import { VegaLiteWrapper } from 'vtex.vega-lite-wrapper'`

> `<VegaLiteWrapper data={someData} spec={someDataSpec} />`
