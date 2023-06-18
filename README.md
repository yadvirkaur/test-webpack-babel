To set up a project with webpack, Babel, and core-js, follow these steps:

1. Install webpack and webpack-cli as development dependencies:

```shell
npm install -D webpack webpack-cli
```

2. Add the following script in your `package.json` file:

```json
"build": "webpack"
```

3. Install style-loader and css-loader as development dependencies:

```shell
npm install -D style-loader css-loader
```

4. Install html-webpack-plugin as a development dependency:

```shell
npm install -D html-webpack-plugin
```

5. Add the following script in your `package.json` file:

```json
"dev": "webpack serve"
```

Then run the command:

```shell
npm run dev
```

6. Install babel-loader, @babel/core, and @babel/preset-env as development dependencies:

```shell
npm install -D babel-loader @babel/core @babel/preset-env
```

7. For React projects, add the following presets in your webpack configuration:

```js
presets: ['@babel/preset-env', '@babel/preset-react'];
```

8. Import `import 'core-js/stable';` at the top of your `index.js` file.

9. Install the latest version of core-js and save it as a dependency:

```shell
npm install core-js@latest --save
```

By following these steps, you should have a setup with webpack, Babel, and core-js in your project.
