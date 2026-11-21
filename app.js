const students = [
  { name: 'Léa Martin', note: 'Débutante · Folk', initials: 'LM', color: 'av-coral', progress: 72, grade: 'Cuivre' },
  { name: 'Adam Lefebvre', note: 'Intermédiaire · Pop', initials: 'AL', color: 'av-blue', progress: 56, grade: 'Bronze' },
  { name: 'Théo Bernard', note: 'Débutant · Rock', initials: 'TB', color: 'av-yellow', progress: 38, grade: 'Cuivre' },
  { name: 'Inès Caron', note: 'Intermédiaire · Folk', initials: 'IC', color: 'av-lilac', progress: 84, grade: 'Argent' },
];

const dialog = document.querySelector('#studentDialog');
const toast = document.querySelector('#toast');
const content = document.querySelector('#content');
const dashboardMarkup = content.innerHTML;
let toastTimer;

function renderStudents() {
  const list = content.querySelector('#studentList');
  if (!list) return;
  list.innerHTML = students.map((student) => `
    <div class="student-row">
      <span class="avatar ${student.color}">${student.initials}</span>
      <span class="student-info"><strong>${escapeHTML(student.name)}</strong><span>${escapeHTML(student.note)} · ${student.grade}</span></span>
      <span class="progress-track" aria-label="Progression ${student.progress}%"><i style="width:${student.progress}%"></i></span>
      <span class="progress-label">${student.progress}%</span>
    </div>`).join('');
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function openStudentDialog() {
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else showToast('La création de profil sera bientôt disponible sur cet appareil.');
}

content.addEventListener('click', (event) => {
  if (event.target.closest('#addStudent, #addStudentBottom')) openStudentDialog();
  const pageLink = event.target.closest('[data-page]');
  if (pageLink) navigate(pageLink.dataset.page, event);
});
document.querySelector('#cancelDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#studentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#studentName').value.trim();
  if (!name) return;
  const level = document.querySelector('#studentLevel').value;
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const colors = ['av-coral', 'av-blue', 'av-yellow', 'av-lilac'];
  students.unshift({ name, note: `${level} · Nouveau parcours`, initials, color: colors[Math.floor(Math.random() * colors.length)], progress: 0, grade: 'Cuivre' });
  renderStudents();
  dialog.close();
  event.target.reset();
  showToast(`${name} a rejoint votre classe.`);
});

document.addEventListener('click', (event) => {
  const pageLink = event.target.closest('.sidebar [data-page]');
  if (pageLink) navigate(pageLink.dataset.page, event);
});

function navigate(page, event) {
  event.preventDefault();
  const labels = { accueil: 'Vue d’ensemble', eleves: 'Mes élèves', bibliotheque: 'Bibliothèque', programmes: 'Programmes' };
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === page));
  document.querySelector('#crumb').textContent = labels[page];
  document.querySelector('#sidebar').classList.remove('open');
  if (page === 'accueil') {
    location.hash = 'accueil';
    content.innerHTML = dashboardMarkup;
    document.querySelector('#welcomeDate').textContent = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toLocaleUpperCase('fr-FR');
    renderStudents();
    content.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  location.hash = page;
  if (page === 'eleves') {
    content.innerHTML = `<section class="welcome-row"><div><div class="eyebrow">VOTRE CLASSE</div><h1>Mes élèves <span class="wave">✳</span></h1><p class="welcome-sub">Un parcours qui grandit avec chacun.</p></div><button class="button button-dark" id="addStudent"><span class="plus">＋</span> Ajouter un élève</button></section><article class="panel students-panel"><div class="panel-heading"><div><div class="eyebrow">${students.length} PROFILS</div><h3>La classe</h3></div><span class="text-link">Progression individuelle</span></div><div class="student-list">${students.map((student) => `<div class="student-row"><span class="avatar ${student.color}">${student.initials}</span><span class="student-info"><strong>${escapeHTML(student.name)}</strong><span>${escapeHTML(student.note)} · ${student.grade}</span></span><span class="progress-track"><i style="width:${student.progress}%"></i></span><span class="progress-label">${student.progress}%</span></div>`).join('')}</div></article>`;
    return;
  }
  const info = page === 'bibliotheque' ? ['RESSOURCES PÉDAGOGIQUES', 'Votre bibliothèque', 'Morceaux, accords et exercices à retrouver ici.'] : ['PARCOURS PERSONNALISÉS', 'Les programmes', 'Composez un chemin musical adapté à chaque élève.'];
  content.innerHTML = `<section class="welcome-row"><div><div class="eyebrow">${info[0]}</div><h1>${info[1]} <span class="wave">✳</span></h1><p class="welcome-sub">${info[2]}</p></div></section><article class="panel"><div class="page-placeholder"><h2>On accorde les dernières notes.</h2><p>Cette partie arrive dans une prochaine étape de Cordes en Nord.</p></div></article>`;
}

document.querySelector('#mobileMenu').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));
document.querySelector('#profileButton').addEventListener('click', () => showToast('Espace professeur — Nicolas C.'));
document.querySelector('.icon-button').addEventListener('click', () => showToast('Vous êtes à jour. Rien de nouveau pour le moment.'));
document.querySelector('.calendar-button').addEventListener('click', () => showToast('Agenda du mercredi 12 novembre.'));
document.querySelector('#today').textContent = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date());
document.querySelector('#welcomeDate').textContent = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toLocaleUpperCase('fr-FR');
renderStudents();

