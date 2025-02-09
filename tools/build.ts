import { BunPlugin } from "bun";
import path from "path";
import * as sass from "sass";
import fs from "fs-extra";
import rimraf from "rimraf";

const outdir = path.resolve(__dirname, "..", "out");

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

function build() {
  rimraf.sync(outdir);
  const srcDir = path.resolve(__dirname, "..", "src");
  const rendererDir = path.resolve(srcDir, "renderer");
  const optionsPage = path.resolve(rendererDir, "options-page", "index.tsx");
  const actionPopup = path.resolve(rendererDir, "action-popup", "index.tsx");
  const publicDir = path.resolve(__dirname, "..", "public");
  const optionsPageTemplate = path.resolve(publicDir, "options-page.html");
  const actionPopupTemplate = path.resolve(publicDir, "action-popup.html");

  Bun.build({
    plugins: [sassLoaderPlugin],
    entrypoints: [optionsPageTemplate, actionPopupTemplate, optionsPage, actionPopup],
    naming: {
      asset: "assets/[name].[ext]"
      // entry: "[name].[ext]"
    },
    outdir,
    minify: false,
    splitting: true
  });
}

build();
