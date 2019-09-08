Run this command to build for development. Keep in mind that development builds are huge because they include an inline source map to help with debugging. You do not want to publish development builds because they can dramatically impact loading performance. Passing --watch will also re-run the build any time a source file is changed:

`npx webpack --mode=development --watch`

Run this command to build for production. This command also supports --watch if you need it. Make sure to run a production build before publishing an update:

`npx webpack --mode=production`
