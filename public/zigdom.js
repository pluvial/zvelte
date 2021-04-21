// adapted from https://github.com/shritesh/zig-wasm-dom

let exports = undefined;

const objects = [];

const pushObject = (object) => objects.push(object);

const getObject = (objId) => objects[objId - 1];

function getString(ptr, len) {
  const slice = exports.memory.buffer.slice(ptr, ptr + len);
  const textDecoder = new TextDecoder();
  return textDecoder.decode(slice);
}

const dispatch = (eventId) => () => {
  exports.dispatchEvent(eventId);
};

/**
 * @param {WebAssembly.Instance} instance
 */
export function launch(instance) {
  exports = instance.exports;
  if (!exports.launch_export()) {
    throw 'Launch Error';
  }
}

/** @type WebAssembly.Imports */
export const importObject = {
  document: {
    query_selector(selector_ptr, selector_len) {
      const selector = getString(selector_ptr, selector_len);
      return pushObject(document.querySelector(selector));
    },
    create_element(tag_name_ptr, tag_name_len) {
      const tag_name = getString(tag_name_ptr, tag_name_len);
      return pushObject(document.createElement(tag_name));
    },
    create_text_node(data_ptr, data_len) {
      const data = getString(data_ptr, data_len);
      return pushObject(document.createTextNode(data));
    },
  },
  element: {
    set_attribute(node_id, name_ptr, name_len, value_ptr, value_len) {
      const node = getObject(node_id);
      const attribute_name = getString(name_ptr, name_len);
      const value = getString(value_ptr, value_len);
      node[attribute_name] = value;
    },
    get_attribute(
      node_id,
      name_ptr,
      name_len,
      result_address_ptr,
      result_address_len_ptr,
    ) {
      const node = getObject(node_id);
      const attribute_name = getString(name_ptr, name_len);
      const result = node[attribute_name];
      // convert result into Uint8Array
      const textEncoder = new TextEncoder();
      const resultArray = textEncoder.encode(result);
      var len = resultArray.length;

      if (len === 0) {
        return false;
      }

      // allocate required number of bytes
      const ptr = exports._wasm_alloc(len);
      if (ptr === 0) {
        throw 'Cannot allocate memory';
      }

      // write the array to the memory
      const mem_result = new DataView(exports.memory.buffer, ptr, len);
      for (let i = 0; i < len; ++i) {
        mem_result.setUint8(i, resultArray[i], true);
      }

      // write the address of the result array to result_address_ptr
      const mem_result_address = new DataView(
        exports.memory.buffer,
        result_address_ptr,
        32 / 8,
      );
      mem_result_address.setUint32(0, ptr, true);

      // write the size of the result array to result_address_ptr_len_ptr
      const mem_result_address_len = new DataView(
        exports.memory.buffer,
        result_address_len_ptr,
        32 / 8,
      );
      mem_result_address_len.setUint32(0, len, true);

      // return if success? (optional)
      return true;
    },
  },
  event_target: {
    add_event_listener(objId, event_ptr, event_len, eventId) {
      const node = getObject(objId);
      const ev = getString(event_ptr, event_len);
      node.addEventListener(ev, dispatch(eventId));
    },
  },
  node: {
    append_child(node_id, child_id) {
      const node = getObject(node_id);
      const child = getObject(child_id);

      if (node === undefined || child === undefined) {
        return 0;
      }

      return pushObject(node.appendChild(child));
    },
  },
  window: {
    alert(msg_ptr, msg_len) {
      const msg = getString(msg_ptr, msg_len);
      alert(msg);
    },
  },
  zig: {
    release_object(object_id) {
      objects[object_id - 1] = undefined;
    },
  },
};
