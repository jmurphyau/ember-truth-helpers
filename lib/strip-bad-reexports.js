/* eslint-env node */
const resolve = require('resolve');
const { transform } = require('@babel/core');
const Funnel = require('broccoli-funnel');
const { writeFileSync, readFileSync, existsSync, unlinkSync } = require('fs');
const { join } = require('path');


module.exports = class StripBadReexports extends Funnel {
  constructor(tree, files) {
    super(tree);
    this.filesToStrip = files;
  }
  build() {
    super.build();
    for (let file of this.filesToStrip) {
      let srcFile = join(this.inputPaths[0], file);
      if (!existsSync(srcFile)) {
        continue;
      }
      let src = readFileSync(srcFile, 'utf8');
      let plugins = [[stripBadReexportsTransform, { resolveBase: this.outputPath }]];
      let destFile = join(this.outputPath, file);
      unlinkSync(destFile);
      writeFileSync(destFile, transform(src, { plugins }).code);
    }
  }
  shouldLinkRoots() {
    // We want to force funnel to copy things rather than just linking the whole
    // directory, because we're planning to mutate it.
    return false;
  }
}

function stripBadReexportsTransform() {
  return {
    visitor: {
      ExportNamedDeclaration(path, state) {
        if (
          path.node.source &&
          path.node.source.type === 'StringLiteral'
        ) {
          try {
            resolve.sync(path.node.source.value, { basedir: state.opts.resolveBase });
          } catch (err) {
            path.remove();
          }
        }
      },
    },
  };
}
