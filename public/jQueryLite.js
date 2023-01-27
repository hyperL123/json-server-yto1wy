// let $ = (sel) => [...document.querySelectorAll(sel)];

// window.onload =

let $ = (sel) => {
  let els = [...document.querySelectorAll(sel)];

  return {
    css: (propName, value) => {
      els.forEach((el) => (el.style[propName] = value));
    },

    toggle: () => {
      alert('toggle');

      els.forEach((el) => el); //does nothing; placeholder

      //TODO if showing, hide

      //TODO if hidden, show
    },

    click: (callBackFn) => {
      els.forEach(callBackFn); //does nothing; placeholder

      //TODO assign the click event the selected elements
    },
  };
};

function exampleUsage() {
  $('h1').css('color', 'red');

  $('h2').css('color', 'green');

  $('#second').toggle();

  $('div').toggle();

  $('.log').click(() => alert('click')); //alert callback is a form of stubbing
}

exampleUsage();
