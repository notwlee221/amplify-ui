const path = require('path');
const { execSync } = require('child_process');

const gitHead = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const BRANCH = gitHead === 'HEAD' ? 'main' : gitHead;

const withNextPluginPreval = require('next-plugin-preval/config')();

module.exports = withNextPluginPreval({
  env: { BRANCH },
  // Differentiate pages with frontmatter & layout vs. normal MD(X)
  pageExtensions: ['page.mdx', 'page.tsx'],

  swcMinify: true,

  // don't want to fix typescript errors right now...
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          // IMPORTANT:
          // These are ONLY used for the Dev server and MUST
          // be kept in sync with customHttp.yml
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // for 'Content-Security-Policy', see _document.page.tsx
        ],
      },
    ];
  },

  // These redirects are because of the IA change from previous docs
  async redirects() {
    return [
      // Normalizing URLs
      // these need to come before the generic redirects
      {
        source: '/ui/primitives/stepperField',
        destination: '/components/stepperfield',
        permanent: true,
      },
      {
        source: '/ui/primitives/toggleButton',
        destination: '/components/togglebutton',
        permanent: true,
      },
      {
        source: '/ui/primitives/visuallyHidden',
        destination: '/components/visuallyhidden',
        permanent: true,
      },
      /*
       * source: /ui/theme/alternativeStyling and theming/alternative-styling
       * destination: '/guides/css-in-js'
       */
      {
        source:
          '/:page(ui/theme/alternativeStyling|theming/alternative-styling)',
        destination: '/guides/css-in-js',
        permanent: true,
      },
      // Generic redirects from old IA
      {
        source: '/ui',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ui/components/:page*',
        destination: '/components/:page*',
        permanent: true,
      },
      {
        source: '/ui/getting-started/:page*',
        destination: '/getting-started/:page*',
        permanent: true,
      },
      {
        source: '/ui/primitives/:page*',
        destination: '/components/:page*',
        permanent: true,
      },
      {
        source: '/ui/theme/:page*',
        destination: '/theming/:page*',
        permanent: true,
      },
      /**
       * source: a url has one of the folder's names (components, getting-started, guides, theming)
       * destination: add '[platform]' to the the beginning
       */
      {
        source: '/:nav(components|getting-started|guides|theming)/:page*',
        destination: '/[platform]/:nav/:page*',
        permanent: true,
      },
      /**
       * source: a url points one of the folder's names (components, getting-started, guides, theming)'s index file
       * destination: add '[platform]' to the beginning
       */
      {
        source: '/:nav(components|getting-started|guides|theming)',
        destination: '/[platform]/:nav',
        permanent: true,
      },
    ];
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },

  webpack(config) {
    const defaultRehypePlugins = [
      require('mdx-prism'),
      // TODO: these are older versions of these packages because the newer versions
      // are ESM only.
      require('rehype-slug'),
      require('rehype-autolink-headings'),
    ];
    const defaultRemarkPlugins = [
      require('remark-code-import'),
      require('remark-gfm'),
      require('remark-mdx-images'),
      [
        require('remark-github'),
        {
          repository: 'aws-amplify/amplify-ui',
        },
      ],
    ];

    // See: https://mdxjs.com/docs/getting-started/#nextjs
    config.module.rules.push({
      test: /\.page.mdx$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            rehypePlugins: defaultRehypePlugins,
            // Pages have reqiure layout & frontmatter
            remarkPlugins: defaultRemarkPlugins.concat([
              // Remove frontmatter from MDX
              require('remark-frontmatter'),
              // Extract to `frontmatter` export
              [
                require('remark-mdx-frontmatter').remarkMdxFrontmatter,
                { name: 'frontmatter' },
              ],
              require('./src/plugins/remark-layout'),
            ]),
          },
        },
      ],
    });

    config.module.rules.push({
      exclude: /\.page.mdx$/,
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            rehypePlugins: defaultRehypePlugins,
            remarkPlugins: defaultRemarkPlugins,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.feature$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    });

    config.module.rules.push({
      test: /\.json5?$/i,
      loader: 'json5-loader',
      options: {
        // TypeError: Cannot read property 'split' of undefined
        // ../node_modules/axios/lib/helpers/validator.js (15:0)
        esModule: false,
      },
      type: 'javascript/auto',
    });

    return config;
  },
});
