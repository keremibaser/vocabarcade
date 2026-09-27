/*
 * VocabArcade — Host UI controller (v3: topic-first, then game)
 * ---------------------------------------------------------------
 * FLOW: choose a Topic  ->  go to Games  ->  pick a game  ->  the game loads that topic.
 * No per-topic game copies: the active topic is stored once and mixed into any
 * engine at play time (Store.buildGame). Scores are per (topic, game).
 */
(function () {
  "use strict";
  const Store = window.VocabStore;
  const E = window.VocabEngine;

  // ---------- DOM ----------
  const screens = {
    topics: document.getElementById("screen-topics"),
    games: document.getElementById("screen-games"),
    player: document.getElementById("screen-player"),
  };
  const tabBtns = document.querySelectorAll(".tab");
  const topicGrid = document.getElementById("topic-grid");
  const topicFilter = document.getElementById("topic-filter");
  const topicCount = document.getElementById("topic-count");
  const gameGrid = document.getElementById("game-grid");
  const statTopics = document.getElementById("stat-topics");
  const statGames = document.getElementById("stat-games");

  const activeBanner = document.getElementById("active-banner");
  const activeEmoji = document.getElementById("active-emoji");
  const activeName = document.getElementById("active-name");
  const activeWords = document.getElementById("active-words");
  const activeChange = document.getElementById("active-change");
  const noTopic = document.getElementById("no-topic");

  const playerTitle = document.getElementById("player-title");
  const playerType = document.getElementById("player-type");
  const playerSub = document.getElementById("player-sub");
  const iframe = document.getElementById("game-frame");
  const hud = {
    score: document.getElementById("hud-score"), lives: document.getElementById("hud-lives"),
    correct: document.getElementById("hud-correct"), combo: document.getElementById("hud-combo"),
    level: document.getElementById("hud-level"), bar: document.getElementById("hud-bar"),
  };
  const quizOverlay = document.getElementById("quiz-overlay");
  const quizWord = document.getElementById("quiz-word");
  const quizPrompt = document.getElementById("quiz-prompt");
  const quizOptions = document.getElementById("quiz-options");
  const quizResult = document.getElementById("quiz-result");

  const editor = document.getElementById("editor");
  const editorTitle = document.getElementById("editor-title");
  const editorGrid = document.getElementById("editor-grid");
  const editorAddBtn = document.getElementById("editor-add");
  const editorWordCount = document.getElementById("editor-wordcount");
  const editorStatus = document.getElementById("editor-status");

  // ---------- state ----------
  let currentTab = "topics";
  let currentTopicFilter = "All";
  let editorTopicId = null;
  let editorWords = [];
  let activeGame = null;        // resolved game in the player
  let activeTopicId = null;     // the chosen topic

  // =====================================================================
  // TABS + SCREENS
  // =====================================================================
  function showScreen(name) {
    Object.keys(screens).forEach(function (k) { screens[k].style.display = k === name ? (k === "player" ? "flex" : "block") : "none"; });
    document.body.dataset.screen = name;
  }
  function switchTab(tab) {
    currentTab = tab;
    tabBtns.forEach(function (b) { b.classList.toggle("tab--on", b.dataset.tab === tab); });
    showScreen(tab);
    if (tab === "topics") renderTopics();
    else renderGames();
    updateStats();
  }
  tabBtns.forEach(function (b) { b.onclick = function () { switchTab(b.dataset.tab); }; });

  function updateStats() {
    statTopics.textContent = Store.topics().length;
    statGames.textContent = Store.games().length;
  }

  // =====================================================================
  // TOPICS (choose one -> becomes active)
  // =====================================================================
  function topicCategories() {
    const set = {};
    Store.topics().forEach(function (t) { set[t.category || "Other"] = true; });
    return ["All"].concat(Object.keys(set));
  }
  function renderTopicFilter() {
    topicFilter.innerHTML = "";
    topicCategories().forEach(function (cat) {
      const b = document.createElement("button");
      b.className = "chip" + (cat === currentTopicFilter ? " chip--on" : "");
      b.textContent = cat;
      b.onclick = function () { currentTopicFilter = cat; renderTopics(); };
      topicFilter.appendChild(b);
    });
  }
  function topicCard(t) {
    const isActive = t.id === activeTopicId;
    const card = document.createElement("div");
    card.className = "card card--topic" + (isActive ? " card--active" : "");
    card.style.setProperty("--accent", "#e64980");
    card.innerHTML =
      '<div class="card__top">' +
        '<span class="card__type">📚 Topic</span>' +
        '<span class="card__cat">' + esc(t.category || "") + "</span>" +
        (isActive ? '<span class="card__active">✓ chosen</span>' : "") +
      "</div>" +
      '<div class="card__art"><span class="card__art-emoji">' + (t.emoji || "📘") + "</span></div>" +
      '<div class="card__body">' +
        '<h3 class="card__title">' + esc(t.title) + "</h3>" +
        '<p class="card__desc">' + esc(t.desc || "") + "</p>" +
        '<div class="card__meta"><span>' + (t.words ? t.words.length : 0) + " Turkish → English words</span></div>" +
      "</div>" +
      '<div class="card__actions">' +
        '<button class="btn ' + (isActive ? "btn--ghost" : "btn--play") + '" data-act="' + (isActive ? "keep" : "choose") + '">' + (isActive ? "✓ Chosen — choose another" : "① Choose topic") + "</button>" +
        '<button class="btn btn--ghost btn--sm" data-act="edit" title="Edit words">✎ Words</button>' +
        '<button class="btn btn--ghost btn--sm btn--icon" data-act="rename" title="Rename topic">🏷</button>' +
        '<button class="btn btn--ghost btn--sm btn--icon" data-act="delete" title="Delete topic">🗑</button>' +
      "</div>";
    card.querySelector('[data-act="choose"]') && (card.querySelector('[data-act="choose"]').onclick = function () { chooseTopic(t.id); });
    card.querySelector('[data-act="keep"]') && (card.querySelector('[data-act="keep"]').onclick = function () { chooseTopic(t.id); });
    card.querySelector('[data-act="edit"]').onclick = function (e) { e.stopPropagation(); openEditor(t.id); };
    card.querySelector('[data-act="rename"]').onclick = function (e) { e.stopPropagation(); renameTopic(t.id); };
    card.querySelector('[data-act="delete"]').onclick = function (e) { e.stopPropagation(); deleteTopic(t.id); };
    return card;
  }
  function renderTopics() {
    renderTopicFilter();
    topicGrid.innerHTML = "";
    let list = Store.topics();
    if (currentTopicFilter !== "All") list = list.filter(function (t) { return (t.category || "Other") === currentTopicFilter; });
    topicCount.textContent = list.length + (list.length === 1 ? " topic" : " topics");
    if (!list.length) { topicGrid.innerHTML = '<div class="empty">No topics. Click “＋ New topic”.</div>'; return; }
    list.forEach(function (t) { topicGrid.appendChild(topicCard(t)); });
  }
  function chooseTopic(id) {
    activeTopicId = id;
    Store.setActiveTopicId(id);
    // refresh active UI and bounce to Games
    renderTopics();
    switchTab("games");
  }

  // =====================================================================
  // GAMES (load the active topic into the chosen engine)
  // =====================================================================
  function renderGames() {
    const topic = activeTopicId ? Store.getTopic(activeTopicId) : null;
    if (topic) {
      activeBanner.style.display = "flex";
      noTopic.style.display = "none";
      activeEmoji.textContent = topic.emoji || "📘";
      activeName.textContent = topic.title;
      activeWords.textContent = (topic.words ? topic.words.length : 0) + " words";
      activeBanner.style.setProperty("--accent", "#e64980");
    } else {
      activeBanner.style.display = "none";
      noTopic.style.display = "flex";
    }
    gameGrid.innerHTML = "";
    Store.games().forEach(function (g) { gameGrid.appendChild(gameCard(g, topic)); });
  }
  function gameCard(g, topic) {
    const best = topic ? Store.getScore(topic.id, g.id) : 0;
    const card = document.createElement("div");
    card.className = "card card--game" + (g.ready ? "" : " card--soon");
    card.style.setProperty("--accent", g.accent || "#e64980");
    card.innerHTML =
      '<div class="card__top">' +
        '<span class="card__type">' + (g.ready ? "🎮 Game" : "🚧 Soon") + "</span>" +
        (g.ready ? "" : '<span class="card__cat">coming soon</span>') +
      "</div>" +
      '<div class="card__art"><span class="card__art-emoji">' + (g.emoji || "🎮") + "</span></div>" +
      '<div class="card__body">' +
        '<h3 class="card__title">' + esc(g.title) + "</h3>" +
        '<p class="card__desc">' + esc(g.blurb || "") + "</p>" +
        (best > 0 ? '<div class="card__best">🏆 Best ' + best + "</div>" : "") +
      "</div>" +
      '<div class="card__actions">' +
        (g.ready
          ? '<button class="btn btn--play" data-act="play">▶ Play' + (topic ? " this topic" : "") + "</button>"
          : '<button class="btn btn--ghost" disabled>Not ready</button>') +
      "</div>";
    if (g.ready) card.querySelector('[data-act="play"]').onclick = function () { playGame(g.id); };
    return card;
  }
  function playGame(gameId) {
    if (!activeTopicId) { switchTab("topics"); return; }
    const game = Store.buildGame(activeTopicId, gameId);
    if (!game) return;
    playResolved(game);
  }

  // =====================================================================
  // PLAYER
  // =====================================================================
  function playResolved(game) {
    activeGame = game;
    Sound.launch();
    playerTitle.textContent = game.title;
    playerType.textContent = (game.emoji || "🎮") + " " + (game.topicTitle || "");
    playerSub.textContent = "Turkish → English · " + (game.vocab ? game.vocab.length : 0) + " words";
    document.documentElement.style.setProperty("--accent", game.accent || "#e64980");
    setHud({ score: 0, lives: 3, correct: 0, combo: 0, level: 0 });
    closeQuiz();
    showScreen("player");

    const payload = E.encodePayload(JSON.stringify({
      vocab: game.vocab || [], fromLang: "Turkish", toLang: "English", accent: game.accent,
      sound: Sound.isEnabled(),
    }));
    iframe.src = "games/" + game.type + "/" + game.type + ".html?payload=" + encodeURIComponent(payload);
  }
  function quitPlayer(tab) {
    try { iframe.contentWindow.postMessage({ type: E.MSG.QUIT }, "*"); } catch (e) {}
    iframe.src = "about:blank";
    activeGame = null;
    switchTab(tab || currentTab);
  }
  function setHud(d) {
    hud.score.textContent = d.score;
    hud.lives.textContent = d.lives;
    hud.correct.textContent = d.correct;
    hud.combo.textContent = d.combo >= 2 ? ("x" + d.combo) : "—";
    hud.level.textContent = d.level > 0 ? ("Lv." + d.level) : "—";
    hud.bar.style.width = Math.max(0, Math.min(100, (d.score % 1200) / 12)) + "%";
  }

  // ---------- quiz overlay ----------
  let pendingAsk = null;
  function showQuiz(ask) {
    pendingAsk = ask;
    quizWord.textContent = ask.word;
    quizPrompt.textContent = "What does this Turkish word mean in English?";
    quizResult.textContent = ""; quizResult.className = "quiz__result"; quizResult.style.display = "none";
    quizOptions.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    ask.options.forEach(function (opt, i) {
      const b = document.createElement("button");
      b.className = "quiz__opt";
      b.innerHTML = '<span class="quiz__letter">' + letters[i] + "</span><span>" + esc(String(opt)) + "</span>";
      b.onclick = function () { answerQuiz(b, opt, ask.correct); };
      quizOptions.appendChild(b);
    });
    quizOverlay.style.display = "grid";
    requestAnimationFrame(function () { quizOverlay.classList.add("quiz--show"); });
  }
  function closeQuiz() { quizOverlay.style.display = "none"; quizOverlay.classList.remove("quiz--show"); pendingAsk = null; }
  function answerQuiz(btn, choice, correct) {
    const isRight = choice === correct;
    quizOptions.querySelectorAll(".quiz__opt").forEach(function (o) {
      o.disabled = true;
      const label = o.querySelector("span:last-child").textContent;
      if (label === String(correct)) o.classList.add("quiz__opt--right");
      else if (o === btn && !isRight) o.classList.add("quiz__opt--wrong");
    });
    quizResult.textContent = isRight ? "✓ Correct! Well done!" : "✗ Wrong — it was: " + correct;
    quizResult.className = "quiz__result " + (isRight ? "quiz__result--ok" : "quiz__result--bad");
    quizResult.style.display = "block";
    setTimeout(function () {
      try { iframe.contentWindow.postMessage({ type: E.MSG.ANSWER, correct: isRight }, "*"); } catch (e) {}
      closeQuiz();
    }, 2000);
  }

  // =====================================================================
  // EDITOR (topic words)
  // =====================================================================
  function openEditor(topicId) {
    const topic = Store.getTopic(topicId);
    if (!topic) return;
    editorTopicId = topicId;
    editorWords = (topic.words || []).map(function (w) { return { tr: w.tr, en: w.en, distractors: (w.distractors || []).slice() }; });
    editorTitle.textContent = "Edit topic";
    document.getElementById("editor-emoji").value = topic.emoji || "";
    document.getElementById("editor-name").value = topic.title || "";
    document.getElementById("editor-category").value = topic.category || "";
    editorStatus.textContent = "";
    renderEditorRows();
    editor.style.display = "flex";
    requestAnimationFrame(function () { editor.classList.add("editor--show"); });
  }
  function closeEditor() {
    editor.classList.remove("editor--show");
    setTimeout(function () { editor.style.display = "none"; }, 180);
    editorTopicId = null;
  }
  function renderEditorRows() {
    editorGrid.innerHTML = "";
    editorWords.forEach(function (w, i) {
      const row = document.createElement("div");
      row.className = "erow";
      row.innerHTML =
        '<div class="erow__num">' + (i + 1) + "</div>" +
        '<input class="erow__tr" placeholder="Turkish (merhaba)" />' +
        '<input class="erow__en" placeholder="English (hello)" />' +
        '<input class="erow__d1" placeholder="Distractor (optional)" />' +
        '<input class="erow__d2" placeholder="Distractor (optional)" />' +
        '<input class="erow__d3" placeholder="Distractor (optional)" />' +
        '<button class="erow__del" title="Delete">✕</button>';
      row.querySelector(".erow__tr").value = w.tr || "";
      row.querySelector(".erow__en").value = w.en || "";
      row.querySelector(".erow__d1").value = w.distractors[0] || "";
      row.querySelector(".erow__d2").value = w.distractors[1] || "";
      row.querySelector(".erow__d3").value = w.distractors[2] || "";
      function sync() {
        w.tr = row.querySelector(".erow__tr").value.trim();
        w.en = row.querySelector(".erow__en").value.trim();
        w.distractors = [row.querySelector(".erow__d1").value.trim(), row.querySelector(".erow__d2").value.trim(), row.querySelector(".erow__d3").value.trim()];
        updateWordCount();
      }
      row.querySelectorAll("input").forEach(function (inp) { inp.oninput = sync; });
      row.querySelector(".erow__del").onclick = function () { editorWords.splice(i, 1); renderEditorRows(); };
      editorGrid.appendChild(row);
    });
    updateWordCount();
  }
  function updateWordCount() {
    const valid = editorWords.filter(function (w) { return w.tr && w.en; }).length;
    editorWordCount.textContent = valid + " valid / " + editorWords.length + " rows";
  }
  function saveEditor() {
    if (!editorTopicId) return;
    const cleaned = editorWords
      .filter(function (w) { return w.tr && w.en; })
      .map(function (w) { return { tr: w.tr, en: w.en, distractors: w.distractors.filter(Boolean).slice(0, 3) }; });
    const name = document.getElementById("editor-name").value.trim();
    if (!name) {
      editorStatus.textContent = "⚠ Give the topic a name.";
      editorStatus.className = "editor__status editor__status--warn";
      document.getElementById("editor-name").focus();
      return;
    }
    if (!cleaned.length) {
      editorStatus.textContent = "⚠ Add at least one Turkish + English pair.";
      editorStatus.className = "editor__status editor__status--warn";
      return;
    }
    Store.setTopicMeta(editorTopicId, {
      title: name,
      emoji: document.getElementById("editor-emoji").value.trim() || "📘",
      category: document.getElementById("editor-category").value.trim() || "Custom",
    });
    Store.setVocabByTopic(editorTopicId, cleaned);
    editorStatus.textContent = "✓ Saved “" + name + "”.";
    editorStatus.className = "editor__status editor__status--ok";
    setTimeout(function () { closeEditor(); if (currentTab === "topics") renderTopics(); else renderGames(); updateStats(); }, 600);
  }
  function newTopic() {
    const id = "topic-" + Date.now().toString(36);
    Store.upsertTopic({ id: id, title: "", emoji: "📘", category: "Custom", desc: "", words: [{ tr: "", en: "", distractors: [] }] });
    switchTab("topics");
    openEditor(id);
    updateStats();
    renderTopics();
    setTimeout(function () { document.getElementById("editor-name").focus(); }, 60);
  }

  // =====================================================================
  // SMALL CONFIRM / RENAME DIALOG (topic rename + delete)
  // =====================================================================
  const dlg = document.getElementById("dlg");
  const dlgBackdrop = dlg.querySelector(".dlg__backdrop");
  const dlgTitle = document.getElementById("dlg-title");
  const dlgMsg = document.getElementById("dlg-msg");
  const dlgInput = document.getElementById("dlg-input");
  const dlgOk = document.getElementById("dlg-ok");
  const dlgCancel = document.getElementById("dlg-cancel");
  let dlgCallback = null;

  function showDialog(opts, cb) {
    dlgTitle.textContent = opts.title || "";
    dlgMsg.textContent = opts.message || "";
    if (opts.input) { dlgInput.hidden = false; dlgInput.value = opts.value || ""; }
    else { dlgInput.hidden = true; dlgInput.value = ""; }
    dlgOk.textContent = opts.okLabel || "OK";
    dlgOk.className = "btn btn--sm " + (opts.danger ? "btn--danger" : "btn--play");
    dlgCallback = cb;
    dlg.style.display = "block";
    requestAnimationFrame(function () { dlg.classList.add("dlg--show"); });
    if (opts.input) setTimeout(function () { dlgInput.focus(); dlgInput.select(); }, 70);
    else dlgOk.focus();
  }
  function hideDialog() {
    dlg.classList.remove("dlg--show");
    setTimeout(function () { dlg.style.display = "none"; }, 160);
    dlgCallback = null;
  }
  function confirmDialog() {
    const cb = dlgCallback;
    const wantsInput = !dlgInput.hidden;
    const val = dlgInput.value.trim();
    hideDialog();
    if (cb) cb(wantsInput ? val : true);
  }
  dlgOk.addEventListener("click", confirmDialog);
  dlgCancel.addEventListener("click", hideDialog);
  dlgInput.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); confirmDialog(); } });
  dlgBackdrop.addEventListener("click", function (e) { if (e.target === dlgBackdrop) hideDialog(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && dlg.style.display === "block") hideDialog(); });

  function renameTopic(id) {
    const t = Store.topics().find(function (x) { return x.id === id; });
    if (!t) return;
    showDialog({
      title: "🏷 Rename topic",
      message: "Enter a new name for this topic.",
      input: true, value: t.title || "", okLabel: "Rename",
    }, function (name) {
      if (!name) return;
      Store.setTopicMeta(id, { title: name });
      renderTopics();
      updateStats();
    });
  }
  function deleteTopic(id) {
    const t = Store.topics().find(function (x) { return x.id === id; });
    if (!t) return;
    const n = t.words ? t.words.length : 0;
    showDialog({
      title: "🗑 Delete topic",
      message: "Delete “" + (t.title || "this topic") + "” and its " + n + " words? This cannot be undone.",
      okLabel: "Delete", danger: true,
    }, function () {
      Store.removeTopic(id);
      if (activeTopicId === id) { activeTopicId = null; Store.setActiveTopicId(null); }
      renderTopics();
      updateStats();
    });
  }

  // =====================================================================
  // SHARED POLISH — sound + combo burst (driven by engine events, no engine edits)
  // =====================================================================
  const SOUND_KEY = "vocabarcade.sound";
  const Sound = (function () {
    let ctx = null;
    let enabled = true;
    try { enabled = localStorage.getItem(SOUND_KEY) !== "off"; } catch (_) {}
    function ac() {
      if (!enabled) return null;
      if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return null; } }
      if (ctx.state === "suspended") { try { ctx.resume(); } catch (_) {} }
      return ctx;
    }
    // short synthesized blip — no asset files needed
    function blip(freq, dur, type, gain, when) {
      const c = ac(); if (!c) return;
      const t0 = c.currentTime + (when || 0);
      const o = c.createOscillator(), g = c.createGain();
      o.type = type || "sine"; o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain || 0.18, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + (dur || 0.12));
      o.connect(g); g.connect(c.destination);
      o.start(t0); o.stop(t0 + (dur || 0.12) + 0.02);
    }
    const api = {
      setEnabled: function (on) {
        enabled = !!on;
        try { localStorage.setItem(SOUND_KEY, enabled ? "on" : "off"); } catch (_) {}
        if (!enabled && ctx) { try { ctx.close(); } catch (_) {} ctx = null; }
      },
      isEnabled: function () { return enabled; },
      correct: function (combo) {
        const base = 520 + Math.min(combo || 0, 8) * 40;   // rises with combo
        blip(base, 0.10, "triangle", 0.20);
        blip(base * 1.5, 0.12, "sine", 0.14, 0.05);
      },
      wrong:   function () { blip(200, 0.18, "sawtooth", 0.16); blip(150, 0.20, "square", 0.12, 0.06); },
      miss:    function () { blip(330, 0.07, "sine", 0.08); },
      win:     function () { [523, 659, 784, 1046].forEach(function (f, i) { blip(f, 0.18, "triangle", 0.18, i * 0.09); }); },
      lose:    function () { [392, 311, 247, 196].forEach(function (f, i) { blip(f, 0.22, "sawtooth", 0.16, i * 0.10); }); },
      launch:  function () { blip(660, 0.08, "square", 0.10); },
    };
    return api;
  })();

  const comboBurst = document.getElementById("combo-burst");
  function burstPop(text, kind) {
    if (!comboBurst) return;
    const pop = document.createElement("div");
    pop.className = "combo-burst__pop" + (kind === "bad" ? " combo-burst__pop--bad" : kind === "good" ? " combo-burst__pop--good" : "");
    pop.textContent = text;
    comboBurst.appendChild(pop);
    const N = 14, cx = comboBurst.clientWidth / 2, cy = comboBurst.clientHeight * 0.42;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("div");
      s.className = "combo-burst__spark";
      const ang = (Math.PI * 2 * i) / N + Math.random() * 0.4;
      const dist = 70 + Math.random() * 90;
      s.style.left = cx + "px"; s.style.top = cy + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      if (kind === "bad") s.style.background = "#ef4444", s.style.boxShadow = "0 0 10px #ef4444";
      comboBurst.appendChild(s);
    }
    setTimeout(function () { pop.remove(); comboBurst.querySelectorAll(".combo-burst__spark").forEach(function (s) { s.remove(); }); }, 750);
  }

  // =====================================================================
  // EVENTS / MESSAGES
  // =====================================================================
  window.addEventListener("message", function (ev) {
    const d = ev.data;
    if (!d || !d.type) return;
    switch (d.type) {
      case E.MSG.HUD: setHud(d); break;
      case E.MSG.ASK: showQuiz(d); break;
      case E.MSG.RESULT:
        if (activeGame) Store.setScore(activeGame.topicId, activeGame.type, d.score);
        if (d.win) { Sound.win(); } else { Sound.lose(); }
        break;
      case E.MSG.EVENT: {
        const n = d.name;
        if (n === "correct") {
          Sound.correct(d.combo);
          if (d.combo >= 2) burstPop("COMBO ×" + d.combo + "!", "good");
          else burstPop("✓ NICE", "good");
        } else if (n === "wrong") {
          Sound.wrong(); burstPop("✗ WRONG", "bad");
        } else if (n === "miss") {
          Sound.miss();
        } else if (n === "win") {
          // engines may also emit a win event; result handles the main jingle
          burstPop("🏆 YOU WIN!", "good");
        } else if (n === "lose") {
          burstPop("💥 GAME OVER", "bad");
        }
        break;
      }
    }
  });

  document.getElementById("back-btn").onclick = function () { quitPlayer(); };
  document.getElementById("to-topics").onclick = function () { quitPlayer("topics"); };
  document.getElementById("to-games").onclick = function () { quitPlayer("games"); };
  document.getElementById("player-manage").onclick = function () { if (activeGame && activeGame.topicId) openEditor(activeGame.topicId); };
  editorAddBtn.onclick = function () {
    editorWords.push({ tr: "", en: "", distractors: ["", "", ""] });
    renderEditorRows();
    const rows = editorGrid.querySelectorAll(".erow");
    if (rows.length) rows[rows.length - 1].querySelector(".erow__tr").focus();
  };
  document.getElementById("editor-save").onclick = saveEditor;
  document.getElementById("editor-cancel").onclick = closeEditor;
  editor.querySelector(".editor__backdrop").onclick = function (e) { if (e.target === editor.querySelector(".editor__backdrop")) closeEditor(); };
  document.getElementById("new-topic").onclick = newTopic;
  activeChange.onclick = function () { switchTab("topics"); };

  // ---------- Random Game launcher ----------
  const randomBtn = document.getElementById("random-game");
  randomBtn.onclick = function () {
    if (!activeTopicId) { switchTab("topics"); return; }
    const ready = Store.games().filter(function (g) { return g.ready; });
    if (!ready.length) return;
    const pick = ready[Math.floor(Math.random() * ready.length)];
    playGame(pick.id);
  };

  // ---------- Sound toggle ----------
  const soundBtn = document.getElementById("sound-toggle");
  function syncSoundBtn() {
    const on = Sound.isEnabled();
    soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
    soundBtn.textContent = on ? "🔊 Sound: On" : "🔇 Sound: Off";
  }
  syncSoundBtn();
  soundBtn.onclick = function () { Sound.setEnabled(!Sound.isEnabled()); syncSoundBtn(); };

  window.addEventListener("keydown", function (e) { if (e.key === "Escape" && editor.style.display === "flex") closeEditor(); });

  // init
  activeTopicId = Store.getActiveTopicId();
  switchTab("topics");

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
})();
