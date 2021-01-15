module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    "sonarjs",
  ],
  extends: [
    "plugin:sonarjs/recommended",
    'plugin:vue/vue3-recommended',
    // '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'linebreak-style': [ 'error', 'windows' ],
    indent: [ 'error', 2 ],
    semi: [ 'error', 'never' ],
    quotes: [ 'error', 'single' ],
    'quote-props': [ 'error', 'as-needed' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed', { requireForBlockBody: true } ],
    'vue/html-indent': [ 'error', 2 ],
    // 'vue/component-tags-order': [ 'error', {
    //   order: [ 'script', 'template', 'style' ],
    // } ],
    'vue/html-quotes': [ 'error', 'single', { avoidEscape: true } ],
    'vue/html-self-closing': [ 'error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'any',
      },
      svg: 'always',
      math: 'always',
    } ],
    'vue/max-attributes-per-line': [ 'error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    } ],
    'prefer-const': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};

