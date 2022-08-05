const esbuild = require("esbuild");

(async () => {
  try {
    await esbuild.build({
      entryPoints: ["src/browser.ts"],
      outfile: "lib/index.min.js",
      bundle: true,
      minify: true,
      sourcemap: "external",
      target: "es2015",
    });
  } catch {
    process.exit(1);
  }
})();
