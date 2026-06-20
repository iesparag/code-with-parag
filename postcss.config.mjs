import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

const config = {
  plugins: [
    postcssImport,
    postcssNesting,
    tailwindcss,
    autoprefixer,
  ],
};

export default config;
