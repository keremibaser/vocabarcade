/*
 * VocabArcade — Store (v3: Topics + Games)
 * ---------------------------------------------------------------
 * Two layers:
 *   - TOPICS (window.VOCAB_TOPICS): content { tr, en, distractors? }  (editable)
 *   - GAMES  (window.VOCAB_GAMES) : engine TYPES, topic-agnostic      (static catalog)
 *
 * Flow is topic-first: choose a topic, then a game. The game loads that topic.
 * There are NO per-topic game copies. A "resolved game" is built on demand by
 * mixing a topic's words into a game's engine.
 *
 * Scores are keyed by topicId + gameId so each combo keeps its own best.
 */
(function () {
  "use strict";

  const TOPICS_KEY = "VOCABARC_TOPICS_V3";
  const SCORES_KEY = "VOCABARC_SCORES_V3";
  const ACTIVE_KEY = "VOCABARC_ACTIVE_TOPIC_V3";

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // ---- migration from older versions ----
  (function migrate() {
    try {
      ["VOCABARC_GAMES", "VOCABARC_SCORES", "VOCABARC_TOPICS_V2", "VOCABARC_PRESETS_V2", "VOCABARC_SCORES_V2", "VOCABARC_ACTIVE_TOPIC"]
        .forEach(function (k) { if (localStorage.getItem(k)) localStorage.removeItem(k); });
    } catch (e) {}
  })();

  // ---- seed merge: add ANY seed topic (from topics.js) missing from localStorage ----
  // so newly-added topics appear for returning users WITHOUT wiping their edits.
  (function mergeSeed() {
    try {
      const seed = window.VOCAB_TOPICS || [];
      if (!seed.length) return;
      let list = [];
      const raw = localStorage.getItem(TOPICS_KEY);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p)) list = p; }
      const have = {};
      list.forEach(function (t) { have[t.id] = true; });
      let added = 0;
      seed.forEach(function (t) {
        if (!have[t.id]) {
          list.push({ id: t.id, title: t.title, emoji: t.emoji, category: t.category, desc: t.desc,
                       words: (t.words || []).map(function (w) { return { tr: w.tr, en: w.en, distractors: (w.distractors || []).slice() }; }) });
          added++;
        }
      });
      if (added) localStorage.setItem(TOPICS_KEY, JSON.stringify(list));
    } catch (e) {}
  })();

  function loadTopics() {
    try {
      const raw = localStorage.getItem(TOPICS_KEY);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
    } catch (e) {}
    return (window.VOCAB_TOPICS || []).map(function (t) {
      return { id: t.id, title: t.title, emoji: t.emoji, category: t.category, desc: t.desc,
               words: (t.words || []).map(function (w) { return { tr: w.tr, en: w.en, distractors: (w.distractors || []).slice() }; }) };
    });
  }
  function saveTopics(list) { try { localStorage.setItem(TOPICS_KEY, JSON.stringify(list)); } catch (e) {} }

  // ---- vocab builder: passes the full pool so distractors are picked at runtime ----
  function buildVocab(topic) {
    var words = topic.words || [];
    var pool = words.map(function (w) { return w.en; });
    return words.map(function (w) {
      return { from: w.tr, correct: w.en, _pool: pool };
    });
  }

  const Store = {
    // ---------- topics ----------
    topics: function () { return loadTopics(); },
    getTopic: function (id) {
      const ts = loadTopics();
      for (let i = 0; i < ts.length; i++) if (ts[i].id === id) return ts[i];
      return null;
    },
    upsertTopic: function (topic) {
      const ts = loadTopics(); let found = false;
      for (let i = 0; i < ts.length; i++) if (ts[i].id === topic.id) { ts[i] = topic; found = true; break; }
      if (!found) ts.push(topic);
      saveTopics(ts); return topic;
    },
    removeTopic: function (id) { saveTopics(loadTopics().filter(function (t) { return t.id !== id; })); },

    // ---------- active topic (the one chosen first) ----------
    getActiveTopicId: function () {
      try { return localStorage.getItem(ACTIVE_KEY) || null; } catch (e) { return null; }
    },
    setActiveTopicId: function (id) { try { if (id) localStorage.setItem(ACTIVE_KEY, id); else localStorage.removeItem(ACTIVE_KEY); } catch (e) {} },

    // ---------- games catalog ----------
    games: function () { return (window.VOCAB_GAMES || []).map(clone); },
    getGame: function (id) {
      const gs = window.VOCAB_GAMES || [];
      for (let i = 0; i < gs.length; i++) if (gs[i].id === id) return clone(gs[i]);
      return null;
    },

    // ---------- resolve: topic loaded into a game engine ----------
    buildGame: function (topicId, gameId) {
      const topic = Store.getTopic(topicId);
      const game = Store.getGame(gameId);
      if (!topic || !game) return null;
      return {
        id: topicId + "::" + gameId,
        title: game.title,
        type: game.engine,
        accent: game.accent,
        topicId: topic.id,
        topicTitle: topic.title,
        emoji: topic.emoji,
        fromLang: "Turkish",
        toLang: "English",
        category: topic.category,
        desc: topic.desc,
        vocab: buildVocab(topic),
      };
    },

    // ---------- vocab editing (topics) ----------
    getVocabByTopic: function (topicId) {
      const t = Store.getTopic(topicId);
      return t ? (t.words || []).map(clone) : [];
    },
    setVocabByTopic: function (topicId, words) {
      const t = Store.getTopic(topicId);
      if (!t) return;
      t.words = words.map(function (w) {
        return { tr: w.tr, en: w.en, distractors: (w.distractors || []).filter(Boolean).slice(0, 3) };
      });
      Store.upsertTopic(t);
    },
    setTopicMeta: function (topicId, meta) {
      const t = Store.getTopic(topicId);
      if (!t) return;
      ["title", "emoji", "category", "desc"].forEach(function (k) { if (meta[k] !== undefined) t[k] = meta[k]; });
      Store.upsertTopic(t);
    },

    // ---------- scores (per topic+game) ----------
    scoreKey: function (topicId, gameId) { return topicId + "::" + gameId; },
    getScore: function (topicId, gameId) {
      try {
        const raw = localStorage.getItem(SCORES_KEY); if (!raw) return 0;
        const obj = JSON.parse(raw); return obj[Store.scoreKey(topicId, gameId)] || 0;
      } catch (e) { return 0; }
    },
    setScore: function (topicId, gameId, score) {
      let obj = {};
      try { const raw = localStorage.getItem(SCORES_KEY); if (raw) obj = JSON.parse(raw) || {}; } catch (e) {}
      const k = Store.scoreKey(topicId, gameId);
      if (score > (obj[k] || 0)) { obj[k] = score; try { localStorage.setItem(SCORES_KEY, JSON.stringify(obj)); } catch (e) {} }
    },

    // ---------- reset ----------
    resetAll: function () {
      try { localStorage.removeItem(TOPICS_KEY); localStorage.removeItem(SCORES_KEY); localStorage.removeItem(ACTIVE_KEY); } catch (e) {}
    },
    resetTopics: function () { try { localStorage.removeItem(TOPICS_KEY); } catch (e) {} return loadTopics(); },
  };

  window.VocabStore = Store;
})();
