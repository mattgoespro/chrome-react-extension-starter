import { BunPlugin } from "bun";
import path from "path";
import * as sass from "sass";
import fs from "fs-extra";
import { rimraf } from "rimraf";
import extensionManifest from "./public/manifest.json";
import globby from "globby";
const outdir = path.resolve(__dirname, "out");

const sassLoaderPlugin: BunPlugin = {
  name: "Sass Loader",
  setup: async (build) => {
    console.log("Compiling styles...");

    build.onLoad({ filter: /\.module\.scss$/ }, async ({ path: modulePath }) => {
      console.log(`Compiling module styles in '${modulePath}'...`);
      const result = sass.compile(modulePath, { sourceMap: true, sourceMapIncludeSources: true });
      // const cssFileName = path.basename(modulePath, ".scss") + ".css";
      // const cssFilePath = path.join(__dirname, "css", cssFileName);
      // await Bun.write(cssFilePath, result.css);

      return {
        contents: result.css,
        loader: "css"
      };
    });
  }
};

// const manifestBundlePlugin: BunPlugin = Bun.plugin({
//   name: "Manifest Bundle",
//   target: "browser",
//   setup: async (build) => {
// build.onLoad({ filter: /manifest\.json$/ }, async ({ path: manifestPath }) => {
//   console.log("Bundling manifest.json...");
//   const scriptPaths = globby.globbySync("*.js", { cwd: outdir });
//   const manifest = { ...extensionManifest };
//   const { content_scripts, background } = manifest;

//   if (content_scripts) {
//     for (const script of content_scripts) {
//       if (script.js) {
//         script.js = script.js.map((jsPath) => path.join(outdir, jsPath));
//       }
//     }

//     manifest.content_scripts = content_scripts;

//     if (background && background.service_worker) {
//       background.service_worker = path.relative(outdir, path.join(outdir, background.service_worker));
//     }

//     manifest.background = background;

//     const manifestJson = JSON.stringify(manifest, null, 2);

//     return {
//       contents: manifestJson,
//       loader: "json"
//     };
//   }
// });

function build() {
  console.log("Cleaning output directory...");
  rimraf.sync(outdir);

  const publicDir = path.resolve(__dirname, "public");

  const optionsPageTemplate = path.resolve(publicDir, "options-page.html");
  const actionPopupTemplate = path.resolve(publicDir, "action-popup.html");
  const manifest = path.resolve(publicDir, "manifest.json");

  Bun.build({
    plugins: [sassLoaderPlugin],
    // publicPath: publicDir,
    loader: {
      ".json": "json"
    },
    entrypoints: [optionsPageTemplate, actionPopupTemplate],
    outdir,
    naming: {
      // chunk: "[name]-[hash].js",
      asset: "assets/[name]-[hash].[ext]",
      entry: "[name]-[hash].[ext]"
    },
    minify: false,
    splitting: true
  });
}

build();
