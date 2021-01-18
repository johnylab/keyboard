const keyBoardHandlers = new Map();

export const keyCodes = {
    Down: ['Down', 'ArrowDown'],
    Up: ['Up', 'ArrowUp'],
    Left: ['Left', 'ArrowLeft'],
    Right: ['Right', 'ArrowRight'],
    Enter: 'Enter',
    Esc: ['Esc', 'Escape'],
};

const addListener = (keyName, callback) => {
    if (keyName instanceof Array) {
        keyName.forEach((key) => addListener(key, callback));
        return;
    }

    const handlers = keyBoardHandlers.get(keyName) || [];
    keyBoardHandlers.set(keyName, [...handlers, callback]);
};

const removeListener = (keyName, callback) => {
    if (keyName instanceof Array) {
        keyName.forEach((key) => removeListener(key, callback));
    }

    if (!keyBoardHandlers.has(keyName)) {
        return;
    }

    const handlers = keyBoardHandlers.get(keyName);

    if (!callback || !(handlers instanceof Array)) {
        keyBoardHandlers.delete(keyName);
        return;
    }

    if (typeof callback === 'string') {
        keyBoardHandlers.set(keyName, handlers.filter((fn) => fn.name !== callback));
    }

    keyBoardHandlers.set(keyName, handlers.filter((fn) => fn !== callback));
};

window.addEventListener('keyup', (event) => {
    if (event.defaultPrevented || !keyBoardHandlers.has(event.key)) {
        return;
    }

    const handlers = keyBoardHandlers.get(event.key);
    if (!(handlers instanceof Array)) {
        keyBoardHandlers.delete(event.key);
        return;
    }

    handlers.forEach((fn) => fn.call(null, event));
});

export default {
    addListener,
    removeListener,
    keyCodes,
};
