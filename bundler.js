var bundle = require("./cjsbundle");

bundle("src/index.js", "bundle.js", {
	w: true, // Watch files
	m: true, // Minify
	a: true // Aggressive mode
});
