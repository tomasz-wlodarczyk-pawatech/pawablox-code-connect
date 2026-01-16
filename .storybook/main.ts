import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    '../packages/storybook/stories/**/*.stories.@(ts|tsx)',
    '../packages/components/src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.css = {
      preprocessorOptions: {
        scss: {
          includePaths: [resolve(__dirname, '../packages/tokens')],
        },
      },
    };
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@tomasz-wlodarczyk-pawatech/tokens': resolve(__dirname, '../packages/tokens'),
        '@tomasz-wlodarczyk-pawatech/components': resolve(__dirname, '../packages/components/src'),
        '@tomasz-wlodarczyk-pawatech/icons': resolve(__dirname, '../packages/icons/src'),
      },
    };
    return config;
  },
  docs: {
    autodocs: true,
  },
};

export default config;
