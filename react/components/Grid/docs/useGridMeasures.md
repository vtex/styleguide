The grid measures are the density, setDensity headerHeight, baseHeight and combinedHeight. They are calculated by the `useGridMeasures` hook.


## Inputs

| Property     | Type                   | Required | Default                                       | Description               |
|--------------|------------------------|----------|-----------------------------------------------|---------------------------|
| size         | number                 | 🚫       | 5                                             | Length of the table items |
| baseDensity  | string                 | 🚫       | 'regular'                                     | Initial Density           |
| densityMap   | Record<string, number> | 🚫       | { compact: 32, regular: 48, comfortable: 76 } | Density configuration     |
| headerHeight | number                 | 🚫       | 36                                            | height of header          |



## Outputs

| Property          | Type                      | Description              |
|-------------------|---------------------------|--------------------------|
| density           | string                    | The current density      |
| setCurrentDensity | (density: string) => void | Sets the current density |
| baseHeight        | number                    | The height of each row   |
| headerHeight      | number                    | Header's height          |
| combinedHeught    | number                    | Full height              |
