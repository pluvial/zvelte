/** @type WebAssembly.Imports */
const importObject = {
  env: {
    print(result) {
      console.log(`The result is ${result}`);
    },
  },
};

onmessage = async (event) => {
  /** @type WebAssembly.Module */
  const module = event.data;
  const instance = await WebAssembly.instantiate(module, importObject);
  instance.exports.printAdd(2, 3);
};
