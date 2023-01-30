import $ from './jQueryLite.js';

const addLogBtn = $('#add_log_btn').getByID();
addLogBtn.disabled = true;
const regex = /^[0-9]{8}$/;

const courses = $('#course').getByID();
const url =
  'https://jsonserverjevaej-2tkw--3000.local-credentialless.webcontainer.io/api/v1/courses';
axios
  .get(url)
  .then((response) => {
    const data = response.data;
    data.forEach((course) => {
      const option = $('option').createElement();
      option.value = course.id;
      option.text = course.display;
      courses.appendChild(option);
    });
  })
  .catch((error) => console.log(error));

$('#course').change(() => {
  const courseSelect = $('#course').getByID();
  const uvuIdInput = $('#uvuId').getByID();
  if (courseSelect.value !== '') {
    uvuIdInput.style.display = 'block';
  } else {
    uvuIdInput.style.display = 'none';
  }
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

function initialEverything() {
  $('#log_textarea').change(() => {
    const logTextarea = $('#log_textarea').getByID();
    const addLogBtn = $('#add_log_btn').getByID();
    if (logTextarea.value !== '') {
      addLogBtn.disabled = false;
    } else {
      addLogBtn.disabled = true;
    }
  });

  $('#uvuId').change((event) => {
    const course = $('#course').getValue();
    const uvuId = $('#uvuId').getValue();
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

            const uvuIdDisplay = $('#uvuIdDisplay').getByID();
            const logsContainer = $('#logs').getByID();
            uvuIdDisplay.textContent = '';
            logsContainer.innerHTML = '';
            throw new Error('API call failed');
          }
        })
        .then((data) => {
          const uvuIdDisplay = $('#uvuIdDisplay').getByID();

          const logsContainer = $('#logs').getByID();
          let uvuId = data[0].uvuId;
          uvuIdDisplay.textContent = `Studnet Logs for ${uvuId}`;
          data.forEach((log) => {
            const logItem = $('li').createElement();
            logItem.innerHTML = `
              <div id="${log.id}">
              <div ><small>${log.date}</small></div>
              <pre ><div >${log.text}</div><br/></pre>
              </div>
            `;
            logsContainer.appendChild(logItem);
            $(`#${log.id}`).toggle();
          });
        });
    } else {
      console.log('not success');
      event.target.style.outline = '1px solid red';
    }
  });

  $('#add_log_btn').click((event) => {
    const course = $('#course').getValue();
    const uvuId = $('#uvuId').getValue();
    const log_textarea = $('#log_textarea').getValue();
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
}

initialEverything();
