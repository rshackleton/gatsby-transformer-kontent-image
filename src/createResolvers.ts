import { CreateResolversArgs, GatsbyNode } from 'gatsby';
import { createRemoteFileNode, FileSystemNode } from 'gatsby-source-filesystem';

import { resolveOptions } from './resolveOptions';
import {
  CustomPluginOptions,
  KontentAsset,
  KontentAssetFixed,
  KontentAssetFluid,
  KontentAssetResize,
} from './types';

/**
 * Add custom field resolvers to the GraphQL schema.
 * @param args
 * @param pluginOptions
 * @see https://www.gatsbyjs.org/docs/node-apis/#createResolvers
 */
const createResolvers: GatsbyNode['createResolvers'] = (
  args: CreateResolversArgs,
  pluginOptions: CustomPluginOptions,
): Promise<void> => {
  const {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  } = args;

  const options = resolveOptions(pluginOptions);

  // Extend `KontentAsset` type with fields for Gatsby Image.
  createResolvers({
    KontentAsset: {
      fixed: {
        type: `KontentAssetFixed`,
        args: {
          width: 'Int',
          height: 'Int',
        },
        async resolve(source: KontentAsset): Promise<KontentAssetFixed> {
          throw new Error('"fixed" is currently unsupported.');
          return {
            aspectRatio: 0,
            base64: '',
            height: 0,
            src: '',
            srcSet: '',
            width: 0,
          };
        },
      },
      fluid: {
        type: `KontentAssetFluid`,
        args: {
          maxWidth: 'Int',
          maxHeight: 'Int',
          srcSetBreakpoints: '[Int!]',
        },
        async resolve(source: KontentAsset): Promise<KontentAssetFluid> {
          throw new Error('"fluid" is currently unsupported.');
          return {
            aspectRatio: 0,
            base64: '',
            sizes: '',
            src: '',
            srcSet: '',
          };
        },
      },
      resize: {
        type: `KontentAssetResize`,
        args: {
          width: 'Int',
          height: 'Int',
          base64: 'Boolean',
        },
        async resolve(source: KontentAsset): Promise<KontentAssetResize> {
          throw new Error('"resize" is currently unsupported.');
          return {
            aspectRatio: 0,
            base64: '',
            height: 0,
            src: '',
            width: 0,
          };
        },
      },
    },
  });

  // Extend `KontentAsset` type with field for local `File` node.
  if (options.local) {
    const { createNode } = actions;

    createResolvers({
      KontentAsset: {
        localFile: {
          type: `File`,
          resolve(source: KontentAsset): Promise<FileSystemNode> {
            return createRemoteFileNode({
              url: source.url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            });
          },
        },
      },
    });
  }

  return Promise.resolve();
};

export default createResolvers;
