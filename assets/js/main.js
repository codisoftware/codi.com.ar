document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('nav__links--open');
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('reveal--visible'); });
  }

  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.querySelector('[name="nombre"]').value;
      var empresa = form.querySelector('[name="empresa"]').value;
      var email = form.querySelector('[name="email"]').value;
      var mensaje = form.querySelector('[name="mensaje"]').value;
      var subject = encodeURIComponent('Consulta desde codi.com.ar — ' + nombre + (empresa ? ' (' + empresa + ')' : ''));
      var body = encodeURIComponent('Nombre: ' + nombre + '\nEmpresa: ' + empresa + '\nEmail: ' + email + '\n\n' + mensaje);
      window.location.href = 'mailto:info@codi.com.ar?subject=' + subject + '&body=' + body;
      var status = form.querySelector('.form__status');
      if (status) {
        status.textContent = 'Se abrió tu cliente de correo con el mensaje listo para enviar. También podés escribirnos directo a info@codi.com.ar';
      }
    });
  }

  initProductMock();
  initVideoDemo();
});

function initVideoDemo() {
  var videos = document.querySelectorAll('[data-video-demo]');
  if (!videos.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  videos.forEach(function (video) {
    var swapToPoster = function () {
      var img = document.createElement('img');
      img.src = video.getAttribute('poster');
      img.alt = video.getAttribute('aria-label') || '';
      video.replaceWith(img);
    };

    video.addEventListener('error', swapToPoster, true);

    if (reduced) {
      video.pause();
      return;
    }

    if ('IntersectionObserver' in window) {
      var vObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var p = video.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.25 });
      vObserver.observe(video);
    } else {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
  });
}

function initProductMock() {
  var mock = document.querySelector('[data-product-mock]');
  if (!mock) return;

  var chat = mock.querySelector('[data-pm-chat]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var script = [
    { who: 'in', sender: 'María · WhatsApp', text: 'Hola, quería saber el saldo de mi factura.' },
    { who: 'out', sender: 'Agente Codi', text: 'Hola María. Tu saldo es $18.450 y vence el 15. ¿Querés abonarlo ahora?' },
    { who: 'in', sender: 'María · WhatsApp', text: 'Sí, y agendame el recordatorio del próximo mes.' },
    { who: 'out', sender: 'Agente Codi', text: 'Listo: pago recibido y recordatorio agendado. Quedó registrado en tu cuenta.' }
  ];

  function msgNode(m) {
    var div = document.createElement('div');
    div.className = 'pm-msg pm-msg--' + m.who;
    var sender = document.createElement('span');
    sender.className = 'pm-msg__sender';
    sender.textContent = m.sender;
    div.appendChild(sender);
    div.appendChild(document.createTextNode(m.text));
    return div;
  }

  function typingNode(agent) {
    var div = document.createElement('div');
    div.className = 'pm-typing' + (agent ? ' pm-typing--agent' : '');
    for (var i = 0; i < 3; i++) div.appendChild(document.createElement('span'));
    return div;
  }

  function renderStatic() {
    chat.innerHTML = '';
    script.forEach(function (m) { chat.appendChild(msgNode(m)); });
  }

  if (reduced) {
    renderStatic();
    return;
  }

  var cycleId = 0;
  var timers = [];
  var running = false;

  function schedule(fn, ms) {
    var id = cycleId;
    timers.push(setTimeout(function () {
      if (id === cycleId && running) fn();
    }, ms));
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function runCycle() {
    cycleId++;
    clearTimers();
    chat.innerHTML = '';
    var t = 600;

    script.forEach(function (m, i) {
      var typing = typingNode(m.who === 'out');
      schedule(function () {
        chat.appendChild(typing);
        typing.classList.add('pm-typing--visible');
      }, t);
      t += i === 0 ? 1200 : 1500;
      schedule(function () {
        typing.remove();
        chat.appendChild(msgNode(m));
      }, t);
      t += 1100;
    });

    schedule(function () {
      }, t);
    schedule(runCycle, t + 3200);
  }

  if ('IntersectionObserver' in window) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !running) {
          running = true;
          runCycle();
        } else if (!entry.isIntersecting && running) {
          running = false;
          cycleId++;
          clearTimers();
        }
      });
    }, { threshold: 0.25 });
    heroObserver.observe(mock);
  } else {
    running = true;
    runCycle();
  }
}
