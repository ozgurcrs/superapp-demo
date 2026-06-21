import * as Repack from '@callstack/repack';

export default (env) => {
  const {mode = 'development', platform, devServer} = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  return {
    mode,
    devtool: false,
    context: Repack.getDirname(import.meta.url),
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(platform),
      exportsFields: ['exports'],
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin({platform, devServer}),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        // dts:false ZORUNLU — DTS plugin'in dynamicRemoteTypeHintsPlugin'i MF
        // runtime'ında RN polyfill'lerinden önce `new WebSocket()` çağırır;
        // o anda global.WebSocket henüz null olduğundan bundle startup'ı çöker
        // ("SurfaceRegistryBinding::startSurface failed. Global was not installed").
        dts: false,
        // resolver-plugin ÇIKARILDI — '@dynamic' entry'sini rebaseRemoteUrl ile
        // bozuyor ("dynamic" → "/y" UnsupportedScheme). core-plugin remote'u
        // index.js'deki ScriptManager resolver üzerinden yükler.
        defaultRuntimePlugins: [
          '@callstack/repack/mf/core-plugin',
          '@callstack/repack/mf/prefetch-plugin',
        ],
        remotes: {
          finans: 'finans@dynamic',
          market: 'market@dynamic',
        },
        shared: {
          react: Repack.Federated.SHARED_REACT,
          'react-native': Repack.Federated.SHARED_REACT_NATIVE,
        },
      }),
    ],
  };
};
