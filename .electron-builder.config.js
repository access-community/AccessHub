/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  const {getVersion} = await import('./version/getVersion.mjs');

  return {
    appId: 'fr.access-community.hub',
    directories: {
      output: 'dist',
      buildResources: 'buildResources',
    },
    files: ['packages/**/dist/**'],
    extraMetadata: {
      version: getVersion(),
    },
    publish: {
      provider: 'github',
      owner: 'access-community',
      repo: 'AccessHub',
    },

    win: {
      target: 'portable',
      icon: 'buildResources/icon.png',
    },
  };
};
