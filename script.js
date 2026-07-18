(function () {
  "use strict";

  const STORAGE_KEYS = {
    pistes: "orientation_pistes",
    candidatures: "orientation_candidatures",
    formations: "orientation_formations",
    journal: "orientation_journal",
    actions: "orientation_actions",
  };

  const DEFAULT_PISTES = [
    {
      domain: "Informatique / Réparation / Support",
      jobs: [
        "Technicien informatique / support utilisateurs",
        "Technicien d'assistance technique et logicielle",
        "Gestionnaire de parc informatique",
        "Technicien territorial spécialité systèmes d'information",
        "Administrateur systèmes et réseaux (junior)",
        "Référent informatique d'établissement (écoles, mairies, hôpitaux)",
      ],
    },
    {
      domain: "Communication",
      jobs: [
        "Community manager de collectivité",
        "Chargé de communication junior",
        "Chargé de communication numérique / webmaster",
        "Assistant communication",
        "Rédacteur territorial (poste généraliste incluant souvent de la com)",
      ],
    },
    {
      domain: "Administratif (porte d'entrée facile, mobilité possible ensuite)",
      jobs: [
        "Adjoint administratif territorial",
        "Gestionnaire administratif",
      ],
    },
  ];

  const DEFAULT_FORMATIONS = [
    { name: "Bilan de compétences (CPF)", status: "a-faire" },
    { name: "Titre pro CDA (Concepteur Développeur d'Applications)", status: "a-faire" },
    { name: "BTS SIO (Services Informatiques aux Organisations)", status: "a-faire" },
    { name: "POEC / formation AFPA informatique", status: "a-faire" },
    { name: "Autoformation (OpenClassrooms, Simplon...)", status: "a-faire" },
  ];

  const STATUS_OPTIONS = ["À envoyer", "Envoyée", "Relance", "Entretien", "Refus", "Offre reçue"];
  const STATUS_CLASS = {
    "À envoyer": "accent",
    "Envoyée": "accent",
    "Relance": "warning",
    "Entretien": "warning",
    "Refus": "danger",
    "Offre reçue": "success",
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // ---------- State ----------
  let pistes = load(STORAGE_KEYS.pistes, DEFAULT_PISTES.map(d => ({
    domain: d.domain,
    jobs: d.jobs.map(name => ({ id: uid(), name, rating: 0, note: "" })),
  })));
  let candidatures = load(STORAGE_KEYS.candidatures, []);
  let formations = load(STORAGE_KEYS.formations, DEFAULT_FORMATIONS.map(f => ({ id: uid(), ...f })));
  let journal = load(STORAGE_KEYS.journal, []);
  let actions = load(STORAGE_KEYS.actions, [
    { id: uid(), text: "Faire le point sur les métiers qui m'intéressent le plus", done: false },
  ]);

  function persistAll() {
    save(STORAGE_KEYS.pistes, pistes);
    save(STORAGE_KEYS.candidatures, candidatures);
    save(STORAGE_KEYS.formations, formations);
    save(STORAGE_KEYS.journal, journal);
    save(STORAGE_KEYS.actions, actions);
  }

  // ---------- Tabs ----------
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  // ---------- Dashboard ----------
  function renderDashboard() {
    const totalPistes = pistes.reduce((sum, d) => sum + d.jobs.filter(j => j.rating > 0 || j.note).length, 0);
    const envoyees = candidatures.filter(c => c.status && c.status !== "À envoyer").length;
    const entretiens = candidatures.filter(c => c.status === "Entretien" || c.status === "Offre reçue").length;
    const formationsEnCours = formations.filter(f => f.status === "en-cours").length;

    document.getElementById("stat-pistes").textContent = totalPistes;
    document.getElementById("stat-envoyees").textContent = envoyees;
    document.getElementById("stat-entretiens").textContent = entretiens;
    document.getElementById("stat-formations").textContent = formationsEnCours;

    const list = document.getElementById("dashboard-actions");
    list.innerHTML = "";
    if (actions.length === 0) {
      list.innerHTML = '<li class="empty-hint">Aucune action pour le moment.</li>';
    }
    actions.forEach(a => {
      const li = document.createElement("li");
      li.className = a.done ? "done" : "";
      li.innerHTML = `
        <input type="checkbox" ${a.done ? "checked" : ""} data-id="${a.id}">
        <span class="action-text">${escapeHtml(a.text)}</span>
        <button class="btn-icon" data-id="${a.id}" title="Supprimer">✕</button>
      `;
      list.appendChild(li);
    });

    list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", () => {
        const item = actions.find(a => a.id === cb.dataset.id);
        item.done = cb.checked;
        persistAll();
        renderDashboard();
      });
    });
    list.querySelectorAll(".btn-icon").forEach(btn => {
      btn.addEventListener("click", () => {
        actions = actions.filter(a => a.id !== btn.dataset.id);
        persistAll();
        renderDashboard();
      });
    });
  }

  document.getElementById("form-action").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("input-action");
    const text = input.value.trim();
    if (!text) return;
    actions.push({ id: uid(), text, done: false });
    input.value = "";
    persistAll();
    renderDashboard();
  });

  // ---------- Pistes métier ----------
  function renderPistes() {
    const container = document.getElementById("pistes-container");
    container.innerHTML = "";
    pistes.forEach(domainGroup => {
      const domainEl = document.createElement("div");
      domainEl.className = "card piste-domain";
      const title = document.createElement("h3");
      title.textContent = domainGroup.domain;
      domainEl.appendChild(title);

      domainGroup.jobs.forEach(job => {
        const item = document.createElement("div");
        item.className = "piste-item";

        const name = document.createElement("div");
        name.className = "piste-name";
        name.textContent = job.name;
        item.appendChild(name);

        const stars = document.createElement("div");
        stars.className = "stars";
        for (let i = 1; i <= 5; i++) {
          const star = document.createElement("span");
          star.className = "star" + (i <= job.rating ? " filled" : "");
          star.textContent = "★";
          star.dataset.value = i;
          star.addEventListener("click", () => {
            job.rating = job.rating === i ? 0 : i;
            persistAll();
            renderPistes();
            renderDashboard();
          });
          stars.appendChild(star);
        }
        item.appendChild(stars);

        const note = document.createElement("textarea");
        note.className = "piste-note";
        note.placeholder = "Notes (avantages, doutes, contacts...)";
        note.value = job.note;
        note.addEventListener("input", () => {
          job.note = note.value;
          persistAll();
        });
        note.addEventListener("blur", renderDashboard);
        item.appendChild(note);

        domainEl.appendChild(item);
      });

      container.appendChild(domainEl);
    });
  }

  // ---------- Candidatures ----------
  function renderCandidatures() {
    const body = document.getElementById("candidatures-body");
    body.innerHTML = "";
    if (candidatures.length === 0) {
      body.innerHTML = '<tr><td colspan="6" class="empty-hint">Aucune candidature enregistrée. Clique sur "+ Nouvelle candidature".</td></tr>';
      return;
    }
    candidatures.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" data-field="poste" placeholder="Entreprise — Poste" value="${escapeAttr(c.poste)}"></td>
        <td><input type="text" data-field="domaine" placeholder="Ex : Informatique" value="${escapeAttr(c.domaine)}"></td>
        <td><input type="date" data-field="date" value="${escapeAttr(c.date)}"></td>
        <td>
          <select data-field="status" class="status-select">
            ${STATUS_OPTIONS.map(s => `<option value="${s}" ${c.status === s ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </td>
        <td><textarea data-field="notes" placeholder="Notes...">${escapeHtml(c.notes || "")}</textarea></td>
        <td><button class="btn-icon" title="Supprimer">✕</button></td>
      `;

      tr.querySelectorAll("[data-field]").forEach(el => {
        const evt = el.tagName === "SELECT" ? "change" : "input";
        el.addEventListener(evt, () => {
          c[el.dataset.field] = el.value;
          persistAll();
          if (el.dataset.field === "status") renderDashboard();
        });
      });
      tr.querySelector(".btn-icon").addEventListener("click", () => {
        candidatures = candidatures.filter(x => x.id !== c.id);
        persistAll();
        renderCandidatures();
        renderDashboard();
      });

      body.appendChild(tr);
    });
  }

  document.getElementById("btn-add-candidature").addEventListener("click", () => {
    candidatures.unshift({
      id: uid(),
      poste: "",
      domaine: "",
      date: new Date().toISOString().slice(0, 10),
      status: "À envoyer",
      notes: "",
    });
    persistAll();
    renderCandidatures();
    renderDashboard();
  });

  // ---------- Formations ----------
  const FORMATION_STATUS_LABELS = { "a-faire": "À faire", "en-cours": "En cours", "fait": "Fait" };
  const FORMATION_STATUS_ORDER = ["a-faire", "en-cours", "fait"];

  function renderFormations() {
    const container = document.getElementById("formations-container");
    container.innerHTML = "";
    if (formations.length === 0) {
      container.innerHTML = '<p class="empty-hint">Aucune formation pour le moment.</p>';
      return;
    }
    formations.forEach(f => {
      const item = document.createElement("div");
      item.className = "formation-item";
      item.innerHTML = `
        <input type="text" value="${escapeAttr(f.name)}">
        <button class="formation-status" data-status="${f.status}">${FORMATION_STATUS_LABELS[f.status]}</button>
        <button class="btn-icon" title="Supprimer">✕</button>
      `;
      item.querySelector('input[type="text"]').addEventListener("input", e => {
        f.name = e.target.value;
        persistAll();
      });
      item.querySelector(".formation-status").addEventListener("click", e => {
        const idx = FORMATION_STATUS_ORDER.indexOf(f.status);
        f.status = FORMATION_STATUS_ORDER[(idx + 1) % FORMATION_STATUS_ORDER.length];
        e.target.dataset.status = f.status;
        e.target.textContent = FORMATION_STATUS_LABELS[f.status];
        persistAll();
        renderDashboard();
      });
      item.querySelector(".btn-icon").addEventListener("click", () => {
        formations = formations.filter(x => x.id !== f.id);
        persistAll();
        renderFormations();
        renderDashboard();
      });
      container.appendChild(item);
    });
  }

  document.getElementById("btn-add-formation").addEventListener("click", () => {
    formations.push({ id: uid(), name: "", status: "a-faire" });
    persistAll();
    renderFormations();
  });

  // ---------- Journal ----------
  function renderJournal() {
    const list = document.getElementById("journal-list");
    list.innerHTML = "";
    if (journal.length === 0) {
      list.innerHTML = '<p class="empty-hint">Aucune entrée pour le moment.</p>';
      return;
    }
    [...journal].reverse().forEach(entry => {
      const div = document.createElement("div");
      div.className = "journal-entry";
      const date = new Date(entry.date);
      const formatted = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
      div.innerHTML = `
        <div class="journal-date"><span>${formatted}</span><button class="btn-icon" title="Supprimer">✕</button></div>
        <p class="journal-text">${escapeHtml(entry.text)}</p>
      `;
      div.querySelector(".btn-icon").addEventListener("click", () => {
        journal = journal.filter(e => e.id !== entry.id);
        persistAll();
        renderJournal();
      });
      list.appendChild(div);
    });
  }

  document.getElementById("form-journal").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("input-journal");
    const text = input.value.trim();
    if (!text) return;
    journal.push({ id: uid(), text, date: new Date().toISOString() });
    input.value = "";
    persistAll();
    renderJournal();
  });

  // ---------- Export / Import ----------
  document.getElementById("btn-export").addEventListener("click", () => {
    const data = { pistes, candidatures, formations, journal, actions, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reorientation-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById("input-import").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        pistes = data.pistes || pistes;
        candidatures = data.candidatures || candidatures;
        formations = data.formations || formations;
        journal = data.journal || journal;
        actions = data.actions || actions;
        persistAll();
        renderAll();
      } catch (err) {
        alert("Fichier invalide : impossible de lire cette sauvegarde.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  // ---------- Helpers ----------
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function renderAll() {
    renderDashboard();
    renderPistes();
    renderCandidatures();
    renderFormations();
    renderJournal();
  }

  renderAll();
})();
