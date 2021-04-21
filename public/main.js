import * as zigdom from './zigdom.js';

const url = 'build/main.wasm';

// const global = new WebAssembly.Global({ value: 'i32', mutable: true }, 0);
// const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });
// const table = new WebAssembly.Table({ initial: 5, element: 'anyfunc' });

/** @type WebAssembly.Imports */
const importObject = {
  env: {
    print(result) {
      console.log(`The result is ${result}`);
    },
  },
  ...zigdom.importObject,
};

/// instantiateStreaming
const { module, instance } = await WebAssembly.instantiateStreaming(
  fetch(url),
  importObject,
);

/// compileStreaming + instantiate
// const module = await WebAssembly.compileStreaming(fetch(url));
// const instance = await WebAssembly.instantiate(module, importObject);

/// compileStreaming + worker
// const worker = new Worker('worker.js');
// const module = await WebAssembly.compileStreaming(fetch(url));
// worker.postMessage(module);

/// arrayBuffer + instantiate
// const response = await fetch(url);
// const bytes = await response.arrayBuffer();
// const { instance } = await WebAssembly.instantiate(bytes, importObject);

/// arrayBuffer + compile + instantiate
// const response = await fetch(url);
// const bytes = await response.arrayBuffer();
// const module = await WebAssembly.compile(bytes);
// const instance = await WebAssembly.instantiate(module, importObject);

instance.exports.printAdd(2, 3);

zigdom.launch(instance);
