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
    entry: './src/modules/finans/index.ts',
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
        name: 'finans',
        dts: false,
        filename: 'finans.container.bundle',
        exposes: {
          './FinansScreen': './src/modules/finans/screens/FinansScreen',
        },
        shared: {
          react: Repack.Federated.SHARED_REACT,
          'react-native': Repack.Federated.SHARED_REACT_NATIVE,
        },
      }),
    ],
  };
};
