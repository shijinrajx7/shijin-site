const API = 'http://127.0.0.1:8765';

const $ = (selector, element = document) =>
  element.querySelector(selector);

export function jarvisPage() {
  return `
    <div class="jarvis-shell">

      <header class="jarvis-top">
        <div>
          <a class="jarvis-brand" href="#top">SHIJIN</a>
          <span class="jarvis-divider">/</span>
          <span class="jarvis-label">JARVIS</span>
        </div>

        <div class="jarvis-status">
          <span class="jarvis-dot" id="jarvis-dot"></span>
          <span id="jarvis-state">CONNECTING</span>
        </div>

        <div class="jarvis-clock" id="jarvis-clock">
          --:--:--
        </div>
      </header>

      <main class="jarvis-main">

        <section class="jarvis-hero">

          <p class="j-eyebrow">
            PERSONAL AI SYSTEM / LOCAL INTELLIGENCE
          </p>

          <h1>
            JARVIS
            <span>understands.</span>
            executes.
          </h1>

          <div class="jarvis-intro">

            <p>
              A private local command system for conversation,
              automation, system control and intelligent assistance.
            </p>

            <div class="jarvis-meta">
              <span>[ LOCAL ]</span>
              <span>[ PRIVATE ]</span>
              <span>[ READY ]</span>
            </div>

          </div>

        </section>

        <section class="jarvis-metrics">

          <div>
            <span>CPU</span>
            <strong id="j-cpu">--%</strong>
          </div>

          <div>
            <span>MEMORY</span>
            <strong id="j-memory">-- GB</strong>
          </div>

          <div>
            <span>JARVIS API</span>
            <strong id="j-api">OFFLINE</strong>
          </div>

          <div>
            <span>MEMORY ITEMS</span>
            <strong id="j-memory-count">--</strong>
          </div>

        </section>

        <section class="jarvis-workspace">

          <div class="jarvis-chat">

            <div class="j-section-head">
              <span>01 / COMMAND</span>
              <span id="j-model">LOCAL AI</span>
            </div>

            <div class="j-messages" id="j-messages">

              <article class="j-message jarvis-message">

                <small>JARVIS / SYSTEM</small>

                <p>
                  Good evening. All systems are ready.
                  What would you like me to do?
                </p>

              </article>

            </div>

            <form class="j-composer" id="j-form">

              <input
                id="j-input"
                autocomplete="off"
                placeholder="Enter a command..."
              />

              <button
                type="submit"
                id="j-send"
              >
                SEND ↗
              </button>

            </form>

          </div>

          <aside class="jarvis-side">

            <section>

              <p class="j-eyebrow">
                02 / SYSTEM
              </p>

              <div class="j-row">
                <span>AI</span>
                <b id="j-ai-status">OFFLINE</b>
              </div>

              <div class="j-row">
                <span>VOICE</span>
                <b>READY</b>
              </div>

              <div class="j-row">
                <span>SECURITY</span>
                <b>LOCAL</b>
              </div>

              <div class="j-row">
                <span>MODE</span>
                <b>PRIVATE</b>
              </div>

            </section>

            <section>

              <p class="j-eyebrow">
                03 / QUICK COMMANDS
              </p>

              <button
                class="j-action"
                data-command="Give me a system status report"
              >
                SYSTEM STATUS ↗
              </button>

              <button
                class="j-action"
                data-command="Run a quick health check"
              >
                HEALTH CHECK ↗
              </button>

              <button
                class="j-action"
                data-command="What can you help me with?"
              >
                CAPABILITIES ↗
              </button>

              <button
                class="j-action"
                data-command="Tell me the current CPU and memory usage"
              >
                RESOURCE USAGE ↗
              </button>

            </section>

            <section>

              <p class="j-eyebrow">
                04 / CONNECTION
              </p>

              <div class="j-endpoint">

                <span>LOCAL ENDPOINT</span>

                <code>
                  127.0.0.1:8765
                </code>

              </div>

              <p class="j-note">
                Your browser communicates directly with the
                Jarvis service running on this machine.
              </p>

            </section>

          </aside>

        </section>

      </main>

    </div>
  `;
}


function addMessage(who, text, jarvis = false) {

  const box = $('#j-messages');

  if (!box) return;

  const article = document.createElement('article');

  article.className =
    `j-message ${jarvis ? 'jarvis-message' : ''}`;

  const small = document.createElement('small');

  small.textContent = who;

  const p = document.createElement('p');

  p.textContent = text;

  article.appendChild(small);
  article.appendChild(p);

  box.appendChild(article);

  box.scrollTop = box.scrollHeight;
}


async function getStatus() {

  try {

    const response = await fetch(
      `${API}/api/status`,
      {
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error('API offline');
    }

    const data = await response.json();

    $('#jarvis-state').textContent =
      'ONLINE / CONNECTED';

    $('#j-api').textContent =
      'ONLINE';

    $('#j-ai-status').textContent =
      'ONLINE';

    $('#j-cpu').textContent =
      data.cpu !== undefined
        ? `${data.cpu}%`
        : '--%';

    $('#j-memory').textContent =
      data.memory_used_gb !== undefined
        ? `${data.memory_used_gb} GB`
        : '-- GB';

    $('#j-memory-count').textContent =
      data.memory_count !== undefined
        ? data.memory_count
        : '--';

    if (data.model) {

      $('#j-model').textContent =
        String(data.model).toUpperCase();

    }

    $('#jarvis-dot').classList.add('online');

  } catch (error) {

    $('#jarvis-state').textContent =
      'API OFFLINE';

    $('#j-api').textContent =
      'OFFLINE';

    $('#j-ai-status').textContent =
      'OFFLINE';

    $('#jarvis-dot').classList.remove('online');

  }

}


async function sendCommand(command) {

  if (!command.trim()) return;

  const input = $('#j-input');
  const button = $('#j-send');

  addMessage(
    'YOU / COMMAND',
    command
  );

  input.value = '';

  input.disabled = true;

  button.disabled = true;

  button.textContent =
    'THINKING...';

  $('#jarvis-state').textContent =
    'THINKING';

  try {

    const response = await fetch(
      `${API}/api/command`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          command: command,
          speak: true
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {

      throw new Error(
        data.error || 'Jarvis error'
      );

    }

    addMessage(
      'JARVIS / RESPONSE',
      data.response || 'Done.',
      true
    );

    $('#jarvis-state').textContent =
      'ONLINE / CONNECTED';

  } catch (error) {

    console.error(error);

    addMessage(
      'JARVIS / ERROR',
      'I cannot reach the local Jarvis API. Make sure api.py is running.',
      true
    );

    $('#jarvis-state').textContent =
      'API OFFLINE';

  } finally {

    input.disabled = false;

    button.disabled = false;

    button.textContent =
      'SEND ↗';

    input.focus();

    getStatus();

  }

}


export function bindJarvis() {

  const form = $('#j-form');

  if (!form) return;

  form.addEventListener(
    'submit',
    event => {

      event.preventDefault();

      const command =
        $('#j-input').value.trim();

      if (command) {
        sendCommand(command);
      }

    }
  );


  document
    .querySelectorAll('.j-action')
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          const command =
            button.dataset.command;

          $('#j-input').value =
            command;

          sendCommand(command);

        }
      );

    });


  function updateClock() {

    const clock =
      $('#jarvis-clock');

    if (!clock) return;

    clock.textContent =
      new Date().toLocaleTimeString(
        [],
        {
          hour12: false
        }
      );

  }


  updateClock();

  setInterval(
    updateClock,
    1000
  );


  getStatus();

  setInterval(
    getStatus,
    2000
  );

}
