# gatsby-transformer-kontent

Converts assets from [Kentico Kontent](https://kontent.ai/) to nodes that can be consumed by [`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image/).

## Install

```
npm install --save @rshackleton/gatsby-transformer-kontent
```

```
yarn add @rshackleton/gatsby-transformer-kontent
```

## How to use

Add the plugin to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-transformer-kontent`,
      options: {
        // See "Options" below.
      },
    },
  ],
};
```

## Options

The plugin currently supports a single option to create local `File` nodes that can be further transformed by [`gatsby-transformer-sharp`](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/).

```js
module.exports = {
  plugins: [
    {
      resolve: `@rshackleton/gatsby-transformer-kontent`,
      options: {
        local: true,
      },
    },
  ],
};
```
