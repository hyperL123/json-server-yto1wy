let $ = (sel) => {
  let els;
  if (sel.startsWith('#')) {
    let newString = sel.substring(1);
    els = document.getElementById(newString);
  } else {
    els = [...document.querySelectorAll(sel)];
  }

  function hideText() {
    var pTag = els.querySelector('pre');
    if (pTag.style.display === 'none') {
      pTag.style.display = 'block';
    } else {
      pTag.style.display = 'none';
    }
  }

  return {
    css: (propName, value) => {
      if (sel.startsWith('#')) {
        els.style[propName] = value;
      } else {
        els.forEach((el) => (el.style[propName] = value));
      }
    },

    toggle: () => {
      els.addEventListener('click', hideText, false);
    },

    click: (callBackFn) => {
      if (sel.startsWith('#')) {
        els.addEventListener('click', callBackFn, false);
      } else {
        els.forEach((el) => el.addEventListener('click', callBackFn, false));
      }
    },
    change: (callBackFn) => {
      if (sel.startsWith('#')) {
        els.addEventListener('change', callBackFn, false);
      } else {
        els.forEach((el) => el.addEventListener('change', callBackFn, false));
      }
    },

    getByID: () => {
      return els;
    },
    getValue: () => {
      return els.value;
    },
    createElement: () => {
      return document.createElement(`${sel}`);
    },
  };
};

export default $;
