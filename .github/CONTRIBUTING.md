# Contributing to VTEX Styleguide

Want to contribute to VTEX Styleguide? There are a few things you need to know.

### Release Schedule

Thursday release: patch version weekly on each Thursday for routine bug fix (anytime for urgent bug fix).

Tuesday release: minor version at the Tuesday of every week for new features.

Major version releases are not included in this schedule.

### Open Development

All work on VTEX Styleguide happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

### Branch Organization

According to our [release schedule](#release-schedule), we maintain two branches: `master` and `features`. Bug fixes should have `master` as it base branch, while new features should be merged into `features`.

### Storybook Organization

#### Story file location

Our stories are located alongside with the components they document and the Playground are located in `react/playground`.

Example:

```
•
└── react
    └── components
        └── Button
            ├── index.tsx
            ├── index.test.tsx
            └── button.stories.tsx
```

#### Conventions

1. The `Default` stories must allow to edit all the component props through Knobs.
2. The name of the stories that shows different states or variations should start with `with`. Examples: `withTitle`, `withCustomColor`.
3. Don't use external images in the stories, prefer to add images in the `.storybook/public/` folder.
4. Component stories must be in a single file with the name `{componentName}.stories.tsx`. Examples: `button.stories.tsx`, `modal.stories.tsx`.
5. Try not to add custom CSS in the stories.
6. The stories must be written in typescript.

Help us add the missing component stories through this [issue](https://github.com/vtex/styleguide/issues/1157).
