import fs from 'fs';
import path from 'path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { transformFileSync, transformFromAst, transformFromAstSync } from '@babel/core';

let id = 0;

type Asset = {
  id: number;
  filepath: string;
  code: string;
  dependencyList: string[];
  mapping?: {
    [relativePath: string]: number
  };
}

/**
 * Parse single file into an asset
 *
 * read file content
 * parse import statements into dependency list (using AST)
 * assigning ID to asset
 * compile code to ES5 (using Babel)
 *
 * @param filepath relative path
 */
function createAsset(filepath: string): Asset {
  // read in file content
  const content = fs.readFileSync(filepath, 'utf-8');

  // parse content into ast
  const ast = parser.parse(content, {
    sourceType: 'module'
  });

  // traverse AST to construct dependency list
  const dependencyList: string[] = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencyList.push(node.source.value);
    }
  });

  // transpile content into ES5 code
  const babelResult = transformFromAstSync(ast, undefined,
    { 'presets': ['@babel/preset-env'] }
  );

  return {
    id: id++,
    dependencyList,
    filepath,
    code: babelResult?.code ?? ''
  };
}

/**
 * Build dependency graph from entry
 * @param entry entry to the module graph
 * @return moduleGraph a list of modules with their mapping resolved
 */
function createModuleGraph(entry: string): Asset[] {

  const entryAsset = createAsset(entry);

  const queue: Asset[] = [entryAsset];

  // use que to recursively parse dependencies
  for (const asset of queue) {
    const baseDir = path.dirname(asset.filepath);

    asset.dependencyList.forEach((relativePath) => {
      // resolve the full path for the dependency
      const absPath = path.resolve(baseDir, relativePath);

      // create sub asset
      const subAsset = createAsset(absPath);

      // build mapping for imported assets
      asset.mapping = {};
      asset.mapping[relativePath] = subAsset.id;

      // push imported asset to queue
      queue.push(subAsset);
    });
  }

  return queue;
}

/**
 * Bundle the modules into an IIFE
 * @param moduleGraph
 */
function createBundle(moduleGraph: Asset[]) {

  // convert module graph into key-value pairs
  // key: the module ID
  // value: the wrapped module code and mapping
  let keyValuePairs = '';
  for (let module of moduleGraph) {
    const key = module.id;
    const value = `[
      function(require, module, exports) {
         ${module.code}
      },
      ${JSON.stringify(module.mapping)}
    ]`;
    keyValuePairs += `${key}:${value},`;
  }
  const moduleMap = `{${keyValuePairs}}`

  // create the main IIFE for bootstrapping the application
  const theBundle = `(function(moduleMap) {
    function require(id) {
      const [moduleWrapper, mapping] = moduleMap[id];

      function localRequire(relativePath) {
        return require(mapping[relativePath]);
      }
      const module = { exports: {} };
      moduleWrapper(localRequire, module, module.exports);

      return module.exports;
    }

    require(0);
  })(${moduleMap})`

  return theBundle;
}

const entryFile = path.resolve(__dirname, '../sample/entry.js');
const moduleGraph = createModuleGraph(entryFile);
const bundle = createBundle(moduleGraph);

console.log(bundle);
