const courses = document.querySelector('#course');

const url =
  'https://jsonserverjevaej-2tkw--3000.local-credentialless.webcontainer.io/api/v1/courses';

axios
  .get(url)
  .then((response) => {
    const data = response.data;
    data.forEach((course) => {
      const option = document.createElement('option');
      option.value = course.id;
      option.text = course.display;
      courses.appendChild(option);
    });
  })
  .catch((error) => console.log(error));

const courseSelect = document.querySelector('#course');
const uvuIdInput = document.querySelector('#uvuId');

courseSelect.addEventListener('change', () => {
  if (courseSelect.value !== '') {
    uvuIdInput.style.display = 'block';
  } else {
    uvuIdInput.style.display = 'none';
  }
});

const regex = /^[0-9]{8}$/;

uvuIdInput.addEventListener('change', (event) => {
  const course = document.querySelector('#course').value;
  const uvuId = document.querySelector('#uvuId').value;
  if (regex.test(event.target.value)) {
    // call your fetch API here
    console.log('success');
    event.target.style.outline = 'none';
    axios
      .get(
        `https://jsonserverjevaej-2tkw--3000.local-credentialless.webcontainer.io/api/v1/logs?courseId=${course}&uvuId=${uvuId}`
      )
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          return response.data;
        } else {
          // remove the elements
          const uvuIdDisplay = document.querySelector('#uvuIdDisplay');
          const logsContainer = document.querySelector('#logs');
          uvuIdDisplay.textContent = '';
          logsContainer.innerHTML = '';
          throw new Error('API call failed');
        }
      })
      .then((data) => {
        const uvuIdDisplay = document.querySelector('#uvuIdDisplay');
        const logsContainer = document.querySelector('#logs');
        let uvuId = data[0].uvuId;
        uvuIdDisplay.textContent = `Studnet Logs for ${uvuId}`;
        data.forEach((log) => {
          const logItem = document.createElement('li');
          logItem.innerHTML = `
          <div id="${log.id}">
          <div ><small>${log.date}</small></div>
          <pre><p >${log.text}</p><br/></pre>
          </div>
        `;

          logsContainer.appendChild(logItem);
          $(`#${log.id}`).toggle();
          // logItem.addEventListener('click', (event) => {
          //   logText.classList.toggle();
          // });
        });
      });
  } else {
    console.log('not success');
    event.target.style.outline = '1px solid red';
  }
});

document
  .getElementById('add_log_btn')
  .addEventListener('click', function (event) {
    console.log('hello world');
    event.preventDefault();
    const course = document.querySelector('#course').value;
    const uvuId = document.querySelector('#uvuId').value;
    const log_textarea = document.querySelector('#log_textarea').value;
    const currentTime = new Date().toLocaleString();
    axios
      .post(
        'https://jsonserverjevaej-2tkw--3000.local-credentialless.webcontainer.io/api/v1/logs',
        {
          courseId: course,
          uvuId: uvuId,
          date: currentTime,
          text: log_textarea,
          id: currentTime + generateRandomId(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  });

function generateRandomId() {
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var text = '';
  for (var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const logTextarea = document.getElementById('log_textarea');
const addLogBtn = document.getElementById('add_log_btn');

addLogBtn.disabled = true; // initially disabled

logTextarea.addEventListener('change', () => {
  if (logTextarea.value !== '') {
    addLogBtn.disabled = false;
  } else {
    addLogBtn.disabled = true;
  }
});

let $ = (sel) => {
  let els;
  if (sel.startsWith('#')) {
    let newString = sel.substring(1);
    els = document.getElementById(newString);
  } else {
    els = [...document.querySelectorAll(sel)];
  }

  function modifyText() {
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
      els.addEventListener('click', modifyText, false);
    },

    click: (callBackFn) => {
      if (sel.startsWith('#')) {
        els.addEventListener('click', callBackFn, false);
      } else {
        els.forEach((el) => el.addEventListener('click', callBackFn, false));
      }
    },
  };
};

function exampleUsage() {
  $('h1').css('color', 'red');

  $('h2').css('color', 'green');

  $('#ll').click(() => alert('click'));

  $('.log').click(() => alert('click'));
}

exampleUsage();
