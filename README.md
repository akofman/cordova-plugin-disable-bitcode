# cordova-plugin-disable-bitcode

> [Cordova plugin](https://www.npmjs.com/package/cordova-plugin-disable-bitcode) to disable bitcode in iOS build settings.

> Why this plugin ?
Bitcode is not supported in every Cordova plugins and if you're using one of these, you will get something like the following error :
```
You must rebuild it with bitcode enabled (Xcode setting ENABLE_BITCODE), obtain
an updated library from the vendor, or disable bitcode for this target.
for architecture arm64 clang: error: linker command failed with exit code 1
```

> :warning: It's not a solution to disable this setting but a workaround waiting for all your plugins updates.

## Installation
  Add [xcode](https://www.npmjs.com/package/xcode), [cordova-lib](https://www.npmjs.com/package/cordova-lib) and [cordova-common](https://www.npmjs.com/package/cordova-common) to your devDependencies:
  `npm install --save-dev xcode cordova-lib cordova-common`

  Then run `cordova plugin add cordova-plugin-disable-bitcode`.

  :warning: In case you are doing a fresh install with a configured config.xml file, please ensure that this plugin is well added after platforms. Also note that the order in the config.xml is important.

## License

MIT © [Alexis Kofman](http://twitter.com/alexiskofman)
