(function () {
  "use strict";

  const STORAGE_KEYS = {
    pistes: "orientation_pistes",
    candidatures: "orientation_candidatures",
    formations: "orientation_formations",
    journal: "orientation_journal",
    actions: "orientation_actions",
    skills: "orientation_skills",
  };

  const DEFAULT_PISTES = [
    {
      domain: "Informatique / Réparation / Support",
      jobs: [
        {
          name: "Technicien informatique / support utilisateurs",
          description: "Diagnostique et résout les problèmes matériels et logiciels des utilisateurs, au téléphone, à distance ou sur site. Installe, configure et maintient postes, imprimantes et logiciels.",
          competences: [
            "Diagnostic de pannes matérielles et logicielles",
            "Connaissance des systèmes Windows/Linux/Mac et des réseaux de base",
            "Utilisation d'un outil de ticketing (GLPI, ServiceNow...)",
            "Configuration de postes, périphériques et logiciels",
            "Bases de la sécurité informatique (mots de passe, sauvegardes, antivirus)",
          ],
          attitudes: [
            "Patience et pédagogie face à des utilisateurs non-techniques",
            "Sang-froid sous pression (urgences, pannes bloquantes)",
            "Sens du service et de l'écoute",
            "Rigueur dans le suivi des tickets et la documentation",
          ],
        },
        {
          name: "Technicien d'assistance technique et logicielle",
          description: "Apporte un support de niveau 2/3 sur des logiciels métiers ou une infrastructure, souvent à distance (hotline), en approfondissant les diagnostics que le support niveau 1 n'a pas résolus.",
          competences: [
            "Analyse de logs et de comportements applicatifs",
            "Connaissance approfondie d'un ou plusieurs logiciels métiers",
            "Requêtes SQL de base pour investiguer les données",
            "Rédaction de procédures et de fiches de résolution",
            "Communication claire à l'écrit comme à l'oral",
          ],
          attitudes: [
            "Curiosité et goût de creuser un problème jusqu'au bout",
            "Autonomie dans la recherche de solutions",
            "Capacité à vulgariser des sujets techniques",
            "Gestion des priorités quand plusieurs demandes arrivent en même temps",
          ],
        },
        {
          name: "Gestionnaire de parc informatique",
          description: "Recense, suit et renouvelle l'ensemble du matériel informatique (postes, licences, périphériques) d'une structure, et gère le cycle de vie des équipements.",
          competences: [
            "Inventaire et suivi via un outil de gestion de parc",
            "Connaissance des contrats, licences et garanties",
            "Organisation logistique (réception, déploiement, retrait de matériel)",
            "Tableurs et bases de données pour le suivi",
            "Veille sur le matériel et les coûts",
          ],
          attitudes: [
            "Grande rigueur et sens de l'organisation",
            "Anticipation (renouveler avant la panne)",
            "Capacité à négocier avec des fournisseurs",
            "Fiabilité dans le suivi administratif du matériel",
          ],
        },
        {
          name: "Technicien territorial spécialité systèmes d'information",
          description: "Poste de la fonction publique territoriale : assure le support, l'exploitation et parfois le déploiement des systèmes d'information d'une collectivité (mairie, intercommunalité...).",
          competences: [
            "Support utilisateurs et maintenance de parc",
            "Notions de réseaux, serveurs et sauvegardes",
            "Connaissance des logiciels métiers des collectivités",
            "Suivi de projets informatiques simples",
            "Respect des procédures administratives publiques",
          ],
          attitudes: [
            "Sens du service public",
            "Discrétion et respect de la confidentialité des données",
            "Adaptabilité face à des utilisateurs très divers (élus, agents, administrés)",
            "Esprit d'équipe dans un environnement souvent en sous-effectif",
          ],
        },
        {
          name: "Administrateur systèmes et réseaux (junior)",
          description: "Installe, configure et supervise serveurs, réseaux et infrastructures (souvent en appui d'un administrateur confirmé), et veille à la disponibilité et à la sécurité des systèmes.",
          competences: [
            "Administration Windows Server / Linux",
            "Notions de réseaux (TCP/IP, DNS, DHCP, VPN)",
            "Virtualisation (VMware, Hyper-V...)",
            "Scripts d'automatisation (PowerShell, Bash)",
            "Sauvegardes, supervision et bonnes pratiques de sécurité",
          ],
          attitudes: [
            "Rigueur et méthode (une erreur peut impacter tout le monde)",
            "Capacité à rester calme en cas d'incident",
            "Envie d'apprendre en continu (technologies qui évoluent vite)",
            "Sens des responsabilités sur des systèmes critiques",
          ],
        },
        {
          name: "Référent informatique d'établissement (écoles, mairies, hôpitaux)",
          description: "Point de contact informatique unique au sein d'une structure : maintient le matériel et les logiciels en état de marche, forme les usagers et fait le lien avec les prestataires externes.",
          competences: [
            "Polyvalence technique (matériel, logiciels, réseau de base)",
            "Gestion de petits projets (renouvellement de salle informatique, déploiement d'outils)",
            "Pédagogie pour former des non-techniciens",
            "Coordination avec des prestataires ou services informatiques externes",
          ],
          attitudes: [
            "Autonomie (souvent seul sur le poste)",
            "Sens du contact avec des publics variés (enseignants, agents, soignants...)",
            "Débrouillardise",
            "Capacité à faire preuve de pédagogie sans jargon",
          ],
        },
      ],
    },
    {
      domain: "Communication",
      jobs: [
        {
          name: "Community manager de collectivité",
          description: "Anime les réseaux sociaux et la communication numérique d'une collectivité : conçoit des contenus, interagit avec les administrés et valorise les actions publiques.",
          competences: [
            "Rédaction et création de contenus (texte, visuel, vidéo courte)",
            "Maîtrise des réseaux sociaux et de leurs codes",
            "Outils de planification et de modération",
            "Bases de la charte graphique et de l'identité visuelle",
            "Analyse de statistiques d'engagement",
          ],
          attitudes: [
            "Créativité et sens de l'actualité",
            "Réactivité (répondre vite aux commentaires, gérer les situations sensibles)",
            "Diplomatie face aux critiques ou polémiques",
            "Curiosité pour les nouveaux formats et usages numériques",
          ],
        },
        {
          name: "Chargé de communication junior",
          description: "Participe à la conception et à la diffusion de la communication d'une structure : supports print et digitaux, relations presse, événements internes ou publics.",
          competences: [
            "Rédaction adaptée à différents supports",
            "Bases de mise en page et d'outils de création (Canva, suite Adobe...)",
            "Coordination de prestataires (imprimeurs, graphistes)",
            "Organisation d'événements ou d'actions de communication",
            "Suivi de planning et de budget de communication",
          ],
          attitudes: [
            "Sens de l'esthétique et souci du détail",
            "Capacité à travailler avec plusieurs services en même temps",
            "Créativité et force de proposition",
            "Fiabilité sur les délais (une campagne ne peut pas être en retard)",
          ],
        },
        {
          name: "Chargé de communication numérique / webmaster",
          description: "Gère le site internet et les supports numériques d'une structure : mise à jour de contenu, référencement, ergonomie et parfois développement de pages simples.",
          competences: [
            "Utilisation d'un CMS (WordPress ou équivalent)",
            "Notions de HTML/CSS pour ajuster des pages",
            "Bases de référencement (SEO)",
            "Suivi d'audience (Google Analytics ou équivalent)",
            "Retouche d'images et optimisation de contenus web",
          ],
          attitudes: [
            "Logique et rigueur, utiles en informatique comme en communication",
            "Veille active sur les usages numériques",
            "Autonomie pour gérer un site au quotidien",
            "Sens du détail (une faute ou un lien cassé se voit vite)",
          ],
        },
        {
          name: "Assistant communication",
          description: "Assiste le service communication dans ses tâches quotidiennes : mise en forme de documents, mise à jour de supports, aide à l'organisation d'événements et suivi administratif.",
          competences: [
            "Bonne maîtrise des outils bureautiques et de mise en page",
            "Rédaction simple et sans fautes",
            "Organisation et gestion de plannings",
            "Bases des outils numériques (réseaux sociaux, newsletters)",
            "Sens du classement et de l'archivage des supports",
          ],
          attitudes: [
            "Sens de l'initiative dans les tâches confiées",
            "Fiabilité et ponctualité",
            "Esprit d'équipe et capacité à recevoir des consignes précises",
            "Envie d'apprendre les métiers de la communication",
          ],
        },
        {
          name: "Rédacteur territorial (poste généraliste incluant souvent de la com)",
          description: "Poste de catégorie B de la fonction publique territoriale, aux missions variées selon le service : accueil, gestion administrative, communication, urbanisme... avec souvent une dimension rédactionnelle.",
          competences: [
            "Rédaction administrative claire et structurée",
            "Bonne culture générale et connaissance du fonctionnement des collectivités",
            "Utilisation des outils bureautiques",
            "Capacité à s'adapter à des missions variées selon les affectations",
            "Bases de la communication institutionnelle",
          ],
          attitudes: [
            "Polyvalence et adaptabilité",
            "Sens du service public et neutralité",
            "Rigueur administrative",
            "Capacité à évoluer vers des missions différentes au fil de la carrière",
          ],
        },
      ],
    },
    {
      domain: "Administratif (porte d'entrée facile, mobilité possible ensuite)",
      jobs: [
        {
          name: "Adjoint administratif territorial",
          description: "Assure l'accueil, le secrétariat et le suivi administratif d'un service public : courrier, dossiers, accueil du public, saisie et classement de documents.",
          competences: [
            "Maîtrise des outils bureautiques (traitement de texte, tableur)",
            "Accueil physique et téléphonique",
            "Rédaction de courriers administratifs simples",
            "Classement et gestion documentaire",
            "Utilisation de logiciels métiers de gestion administrative",
          ],
          attitudes: [
            "Sens de l'accueil et amabilité",
            "Discrétion et respect de la confidentialité",
            "Rigueur et sens de l'organisation",
            "Calme face à un public parfois exigeant ou en difficulté",
          ],
        },
        {
          name: "Gestionnaire administratif",
          description: "Suit des dossiers administratifs de bout en bout : constitution, vérification, mise à jour et archivage, en lien avec différents services ou usagers.",
          competences: [
            "Suivi rigoureux de dossiers et d'échéances",
            "Maîtrise des outils bureautiques et de bases de données",
            "Rédaction de comptes rendus et de courriers",
            "Compréhension des procédures administratives et réglementaires",
            "Utilisation de tableurs pour le reporting",
          ],
          attitudes: [
            "Rigueur et fiabilité (les erreurs sur un dossier ont des conséquences)",
            "Capacité à gérer plusieurs dossiers en parallèle",
            "Sens des priorités et des échéances",
            "Bonne communication avec les différents interlocuteurs",
          ],
        },
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
    jobs: d.jobs.map(job => ({ id: uid(), rating: 0, note: "", ...job })),
  })));
  let candidatures = load(STORAGE_KEYS.candidatures, []);
  let formations = load(STORAGE_KEYS.formations, DEFAULT_FORMATIONS.map(f => ({ id: uid(), ...f })));
  let journal = load(STORAGE_KEYS.journal, []);
  let actions = load(STORAGE_KEYS.actions, [
    { id: uid(), text: "Faire le point sur les métiers qui m'intéressent le plus", done: false },
  ]);

  // ---------- Compétences ----------
  // status: "inconnu" (pas encore évalué) | "sais" (je sais faire) | "sais-pas" (je ne sais pas encore)
  function collectSkillsFromPistes() {
    const map = new Map();
    pistes.forEach(domainGroup => {
      domainGroup.jobs.forEach(job => {
        (job.competences || []).forEach(c => {
          if (!map.has(c)) map.set(c, new Set());
          map.get(c).add(job.name);
        });
      });
    });
    return map;
  }

  let skills = load(STORAGE_KEYS.skills, null);
  (function initSkills() {
    const fromPistes = collectSkillsFromPistes();
    if (!skills) {
      skills = [];
    }
    // Garder trace des métiers liés + ajouter les nouvelles compétences trouvées dans les pistes
    fromPistes.forEach((jobsSet, name) => {
      let existing = skills.find(s => s.name === name);
      if (!existing) {
        existing = { id: uid(), name, status: "inconnu", notes: "", custom: false, jobs: [] };
        skills.push(existing);
      }
      existing.custom = false;
      existing.jobs = Array.from(jobsSet);
    });
  })();

  function persistAll() {
    save(STORAGE_KEYS.pistes, pistes);
    save(STORAGE_KEYS.candidatures, candidatures);
    save(STORAGE_KEYS.formations, formations);
    save(STORAGE_KEYS.journal, journal);
    save(STORAGE_KEYS.actions, actions);
    save(STORAGE_KEYS.skills, skills);
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
    const competencesSais = skills.filter(s => s.status === "sais").length;
    const competencesAApprendre = skills.filter(s => s.status === "sais-pas").length;

    document.getElementById("stat-pistes").textContent = totalPistes;
    document.getElementById("stat-envoyees").textContent = envoyees;
    document.getElementById("stat-entretiens").textContent = entretiens;
    document.getElementById("stat-formations").textContent = formationsEnCours;
    document.getElementById("stat-competences-sais").textContent = competencesSais;
    document.getElementById("stat-competences-a-apprendre").textContent = competencesAApprendre;

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

        if (job.description) {
          const desc = document.createElement("p");
          desc.className = "piste-description";
          desc.textContent = job.description;
          item.appendChild(desc);
        }

        if (job.competences && job.competences.length) {
          const compBlock = document.createElement("div");
          compBlock.className = "piste-block piste-competences";
          const compTitle = document.createElement("span");
          compTitle.className = "piste-block-title";
          compTitle.textContent = "Compétences à avoir";
          compBlock.appendChild(compTitle);
          const compList = document.createElement("ul");
          job.competences.forEach(c => {
            const li = document.createElement("li");
            li.textContent = c;
            compList.appendChild(li);
          });
          compBlock.appendChild(compList);
          item.appendChild(compBlock);
        }

        if (job.attitudes && job.attitudes.length) {
          const attBlock = document.createElement("div");
          attBlock.className = "piste-block piste-attitudes";
          const attTitle = document.createElement("span");
          attTitle.className = "piste-block-title";
          attTitle.textContent = "Attitudes attendues";
          attBlock.appendChild(attTitle);
          const attList = document.createElement("ul");
          job.attitudes.forEach(a => {
            const li = document.createElement("li");
            li.textContent = a;
            attList.appendChild(li);
          });
          attBlock.appendChild(attList);
          item.appendChild(attBlock);
        }

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

  // ---------- Compétences (tutoriel / apprentissage) ----------
  const STATUS_LABELS = { inconnu: "Non évaluée", sais: "Je sais faire", "sais-pas": "Je ne sais pas encore" };
  let skillFilter = "tous";

  function learningLinks(skillName) {
    const q = encodeURIComponent(skillName);
    return [
      { label: "▶ Tutoriels YouTube", url: `https://www.youtube.com/results?search_query=${q}+tutoriel+débutant` },
      { label: "🎓 Cours OpenClassrooms", url: `https://openclassrooms.com/fr/search?query=${q}` },
      { label: "🔍 Chercher une formation", url: `https://www.google.com/search?q=formation+${q}` },
    ];
  }

  function renderCompetences() {
    document.getElementById("count-tous").textContent = skills.length;
    document.getElementById("count-sais-pas").textContent = skills.filter(s => s.status === "sais-pas").length;
    document.getElementById("count-sais").textContent = skills.filter(s => s.status === "sais").length;
    document.getElementById("count-inconnu").textContent = skills.filter(s => s.status === "inconnu").length;

    document.querySelectorAll("#competences-filters .filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === skillFilter);
    });

    const container = document.getElementById("competences-container");
    container.innerHTML = "";

    const visible = skills.filter(s => skillFilter === "tous" || s.status === skillFilter);
    if (visible.length === 0) {
      container.innerHTML = '<p class="empty-hint">Aucune compétence dans cette catégorie.</p>';
      return;
    }

    visible.forEach(skill => {
      const card = document.createElement("div");
      card.className = "skill-card status-" + skill.status;

      const head = document.createElement("div");
      head.className = "skill-head";

      const name = document.createElement("div");
      name.className = "skill-name";
      name.textContent = skill.name;
      head.appendChild(name);

      if (skill.custom) {
        const del = document.createElement("button");
        del.className = "btn-icon";
        del.title = "Supprimer";
        del.textContent = "✕";
        del.addEventListener("click", () => {
          skills = skills.filter(s => s.id !== skill.id);
          persistAll();
          renderCompetences();
          renderDashboard();
        });
        head.appendChild(del);
      }
      card.appendChild(head);

      if (skill.jobs && skill.jobs.length) {
        const jobs = document.createElement("p");
        jobs.className = "skill-jobs";
        jobs.textContent = "Utile pour : " + skill.jobs.join(", ");
        card.appendChild(jobs);
      }

      const choices = document.createElement("div");
      choices.className = "skill-choices";
      [
        { value: "sais", label: "✓ Je sais faire" },
        { value: "sais-pas", label: "✕ Je ne sais pas encore" },
      ].forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "skill-choice-btn" + (skill.status === opt.value ? " active" : "");
        btn.textContent = opt.label;
        btn.addEventListener("click", () => {
          skill.status = skill.status === opt.value ? "inconnu" : opt.value;
          persistAll();
          renderCompetences();
          renderDashboard();
        });
        choices.appendChild(btn);
      });
      card.appendChild(choices);

      if (skill.status === "sais-pas") {
        const learn = document.createElement("div");
        learn.className = "skill-learn";

        const title = document.createElement("span");
        title.className = "piste-block-title";
        title.textContent = "Pour apprendre";
        learn.appendChild(title);

        const linksWrap = document.createElement("div");
        linksWrap.className = "skill-links";
        learningLinks(skill.name).forEach(link => {
          const a = document.createElement("a");
          a.href = link.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "skill-link";
          a.textContent = link.label;
          linksWrap.appendChild(a);
        });
        learn.appendChild(linksWrap);

        const notes = document.createElement("textarea");
        notes.className = "skill-notes";
        notes.placeholder = "Notes de tuto : ce que tu as appris, la vidéo suivie, ce qui reste à pratiquer...";
        notes.value = skill.notes;
        notes.addEventListener("input", () => {
          skill.notes = notes.value;
          persistAll();
        });
        learn.appendChild(notes);

        card.appendChild(learn);
      }

      container.appendChild(card);
    });
  }

  document.getElementById("competences-filters").addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    skillFilter = btn.dataset.filter;
    renderCompetences();
  });

  document.getElementById("form-skill").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("input-skill");
    const name = input.value.trim();
    if (!name) return;
    if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      input.value = "";
      return;
    }
    skills.push({ id: uid(), name, status: "inconnu", notes: "", custom: true, jobs: [] });
    input.value = "";
    persistAll();
    renderCompetences();
    renderDashboard();
  });

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
    const data = { pistes, candidatures, formations, journal, actions, skills, exportedAt: new Date().toISOString() };
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
        skills = data.skills || skills;
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
    renderCompetences();
    renderCandidatures();
    renderFormations();
    renderJournal();
  }

  renderAll();
})();
