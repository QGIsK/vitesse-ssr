import path from 'path'
import type { UserConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// @ts-expect-error No types
import LinkAttributes from 'markdown-it-link-attributes'

const config: UserConfig = {
  plugins: [
    WindiCSS(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      wrapperClasses: ' content',
      markdownItSetup(md) {
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
    ssr(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          prefix: false,
          // enabledCollections: ['carbon']
        }),
      ],

      dts: 'src/components.d.ts',
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    svgLoader(),

  ],
  resolve: {
    alias: {
      '~': path.resolve('./src'),
    },
  },
}

export default config
