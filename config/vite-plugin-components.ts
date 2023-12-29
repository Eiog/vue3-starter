import type { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
  NaiveUiResolver,
  PrimeVueResolver,
  VantResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver,
  Vuetify3Resolver,
} from 'unplugin-vue-components/resolvers'
import NutUIResolver from '@nutui/auto-import-resolver'

export function VitePluginComponents(): PluginOption[] {
  return [
    Components({
      dirs: ['src/components', 'src/layouts'],
      extensions: ['vue', 'md'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        NaiveUiResolver(),
        VantResolver(),
        Vuetify3Resolver(),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver(),
        PrimeVueResolver({ prefix: 'P' }),
        ElementPlusResolver(),
        NutUIResolver(),
      ],
    }), // https://github.com/antfu/unplugin-vue-components
  ]
}
