import { useState, useCallback } from "react";

const GESTURES = [
  { emoji: "🤌", name: "Ma che vuoi?", meaning: "What do you want?!", when: "When someone says something that makes absolutely no sense to you", how: "Bring all fingertips together pointing up, then shake your hand" },
  { emoji: "👋", name: "Vai via!", meaning: "Go away / Leave me alone", when: "When you're done with a conversation or situation", how: "Hand flat, wave downward dismissively" },
  { emoji: "🫰", name: "Perfetto!", meaning: "Perfect! / Absolutely delicious!", when: "After an amazing meal or when something is just right", how: "Fingertips to lips, then open your hand with a kiss" },
  { emoji: "✌️", name: "Non me ne frega!", meaning: "I couldn't care less!", when: "When something genuinely doesn't matter to you at all", how: "Rub thumb across fingertips, relaxed expression" },
  { emoji: "🤏", name: "Aspetta...", meaning: "Wait a moment...", when: "To make someone pause while you think", how: "Index finger pointing up, wave it slowly side to side" },
];

const CULTURA_SHOCKS = [
  { emoji: "☕", title: "The Cappuccino Law", fact: "Ordering a cappuccino after 11am? Italians will stare at you like you've committed a crime. Cappuccino is strictly a morning drink. Always. Without exception.", comparison: "🇬🇧 Coffee any time of day | 🇮🇹 Cappuccino only before noon" },
  { emoji: "🍝", title: "Pasta is Sacred", fact: "Ketchup on pasta, breaking spaghetti before cooking, or — God forbid — pineapple on pizza. These are not preferences. These are insults to an entire civilization.", comparison: "🇬🇧 Pasta as a side dish | 🇮🇹 Pasta IS the dish" },
  { emoji: "⏰", title: "Italian Time", fact: "'Arrivo subito' (coming right now) can mean 5 minutes or 2 hours. A dinner at 8pm? Nobody arrives before 8:45. This is not rudeness. This is culture.", comparison: "🇬🇧 5 min early = polite | 🇮🇹 30 min late = on time" },
  { emoji: "👗", title: "La Bella Figura", fact: "Looking good isn't vanity — it's respect. For yourself and for others. Italians dress up to go grocery shopping. Sweatpants in public is a personal crisis.", comparison: "🇬🇧 Comfort first | 🇮🇹 Always presentable, always" },
  { emoji: "🏠", title: "Mammismo", fact: "Italian men live at home until their 30s on average. Mamma cooks, does laundry, and advises on everything. This is not a joke. This is a lifestyle.", comparison: "🇬🇧 Move out at 18-22 | 🇮🇹 Mamma's house is always home" },
  { emoji: "🗣️", title: "Volume Settings", fact: "Italians talk LOUD. In restaurants, on the street, on the phone. What sounds like an argument to you is just a normal Tuesday conversation about what to have for dinner.", comparison: "🇬🇧 Quiet & reserved | 🇮🇹 Expressive & full of passion" },
];

const PHRASES = [
  { en: "Good morning, can I have a coffee?", it: "Buongiorno, posso avere un caffè?", category: "Bar", drama: 1, tip: "Say 'caffè', not 'espresso' — in Italy they're the same thing" },
  { en: "This is the most delicious thing I've ever eaten!", it: "È la cosa più buona che abbia mai mangiato!", category: "Food", drama: 5, tip: "Use this after every pasta dish — instant friendships guaranteed" },
  { en: "Where is the bathroom?", it: "Dov'è il bagno?", category: "Basics", drama: 1, tip: "'Bagno' means bathroom — works everywhere in Italy" },
  { en: "How much does this cost?", it: "Quanto costa?", category: "Shopping", drama: 2, tip: "Add a sigh for extra authenticity" },
  { en: "I'm in love with Rome!", it: "Mi sono innamorato di Roma!", category: "Emotion", drama: 5, tip: "Change to 'innamorata' if you're a woman" },
  { en: "I don't understand anything", it: "Non capisco assolutamente niente", category: "Basics", drama: 3, tip: "'Assolutamente niente' = absolutely nothing — extra dramatic version" },
  { en: "Let's have one more glass of wine", it: "Prendiamo ancora un bicchiere di vino", category: "Social", drama: 4, tip: "This is how all great Italian evenings begin" },
  { en: "You're crazy!", it: "Sei matto!", category: "Emotion", drama: 5, tip: "Say it with a smile or it sounds too serious" },
  { en: "The bill please", it: "Il conto, per favore", category: "Restaurant", drama: 1, tip: "In Italy you must always ask — they never bring it automatically" },
  { en: "That's impossible!", it: "È impossibile!", category: "Emotion", drama: 5, tip: "Use both hands when you say this for full effect" },
  { en: "My name is...", it: "Mi chiamo...", category: "Basics", drama: 1, tip: "Literally 'I call myself' — the standard Italian introduction" },
  { en: "Where are you from?", it: "Di dove sei?", category: "Social", drama: 2, tip: "Use 'Lei è di dove?' in formal situations" },
];

const DRAMA_LABELS = ["", "😐 Calm", "🙂 Normal", "😤 Passion", "😩 Drama", "🎭 Pure Opera"];
const DRAMA_COLORS = ["", "#6B7280", "#3B82F6", "#F59E0B", "#EF4444", "#9333EA"];

function speakItalian(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = "it-IT";
  utter.rate = 0.85;
  utter.pitch = 1.1;
  const voices = window.speechSynthesis.getVoices();
  const italianVoice = voices.find(v => v.lang.startsWith("it"));
  if (italianVoice) utter.voice = italianVoice;
  window.speechSynthesis.speak(utter);
}

function DramaMeter({ level }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ fontSize: 11, color: "#888", letterSpacing: 1, textTransform: "uppercase" }}>Drama Meter</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: 30, height: 10, borderRadius: 5,
            background: i <= level ? DRAMA_COLORS[level] : "#1E0800",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{ fontSize: 13, color: DRAMA_COLORS[level], fontWeight: "bold" }}>{DRAMA_LABELS[level]}</div>
    </div>
  );
}

function generateQuiz(allPhrases, currentIndex) {
  const correct = allPhrases[currentIndex];
  const others = allPhrases.filter((_, i) => i !== currentIndex);
  const wrong = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...wrong.map(p => p.it), correct.it].sort(() => Math.random() - 0.5);
  return { correct, options };
}

export default function App() {
  const [tab, setTab] = useState("frasi");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showIt, setShowIt] = useState(false);
  const [gestureIndex, setGestureIndex] = useState(0);
  const [culturaIndex, setCulturaIndex] = useState(0);
  const [practiced, setPracticed] = useState(new Set());
  const [speaking, setSpeaking] = useState(false);

  // Quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizDone, setQuizDone] = useState(false);

  const phrase = PHRASES[phraseIndex];

  function handleSpeak(text) {
    setSpeaking(true);
    speakItalian(text);
    setTimeout(() => setSpeaking(false), 2000);
  }

  function markPracticed() {
    setPracticed(prev => new Set([...prev, phraseIndex]));
    setTimeout(() => { setPhraseIndex((phraseIndex + 1) % PHRASES.length); setShowIt(false); }, 400);
  }

  function startQuiz() {
    const qi = 0;
    setQuizIndex(qi);
    setQuiz(generateQuiz(PHRASES, qi));
    setSelected(null);
    setQuizResult(null);
    setScore({ correct: 0, total: 0 });
    setQuizDone(false);
    setQuizActive(true);
  }

  function handleQuizAnswer(option) {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === quiz.correct.it;
    setQuizResult(isCorrect ? "correct" : "wrong");
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
  }

  function nextQuizQuestion() {
    const next = quizIndex + 1;
    if (next >= PHRASES.length) {
      setQuizDone(true);
    } else {
      setQuizIndex(next);
      setQuiz(generateQuiz(PHRASES, next));
      setSelected(null);
      setQuizResult(null);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0500", fontFamily: "'Palatino Linotype', Palatino, Georgia, serif", color: "#F5EDD6", overflowX: "hidden" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #C9111A, #8B0000)", padding: "28px 20px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ fontSize: 36 }}>🇮🇹</div>
        <h1 style={{ margin: "4px 0 2px", fontSize: 28, fontWeight: "bold", letterSpacing: 1, color: "#FFD98E", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>La Dolce Lingua</h1>
        <p style={{ margin: 0, color: "#FFAA88", fontSize: 13, fontStyle: "italic" }}>Italian for people who want to actually use it 🤌</p>
        <div style={{ marginTop: 8, fontSize: 12, color: "#FF9999" }}>{practiced.size} / {PHRASES.length} phrases practiced</div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", background: "#150800", borderBottom: "2px solid #2A1500" }}>
        {[
          { id: "frasi", label: "🗣️ Phrases" },
          { id: "quiz", label: "🎯 Quiz" },
          { id: "gesto", label: "🤌 Gestures" },
          { id: "cultura", label: "🔥 Culture" },
        ].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id === "quiz" && !quizActive) startQuiz(); }} style={{
            flex: 1, padding: "13px 4px", background: "none", border: "none",
            borderBottom: tab === t.id ? "3px solid #C9111A" : "3px solid transparent",
            color: tab === t.id ? "#FFD98E" : "#886655",
            fontWeight: tab === t.id ? "bold" : "normal",
            fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 440, margin: "0 auto", padding: "24px 18px" }}>

        {/* PHRASES TAB */}
        {tab === "frasi" && (
          <div>
            <div style={{ background: "linear-gradient(160deg, #1C0A00, #2A1200)", border: "1px solid #5A2800", borderRadius: 20, padding: 24, marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle, ${DRAMA_COLORS[phrase.drama]}33 0%, transparent 70%)`, borderRadius: "0 20px 0 80px" }} />
              <div style={{ display: "inline-block", background: "#2A1500", border: "1px solid #5A2800", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#FF9955", marginBottom: 16, letterSpacing: 1 }}>
                {phrase.category.toUpperCase()}
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: "#886644", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>English</div>
                <div style={{ fontSize: 20, color: "#F5EDD6", fontWeight: "bold", lineHeight: 1.4 }}>{phrase.en}</div>
              </div>
              {!showIt ? (
                <button onClick={() => setShowIt(true)} style={{ background: "#C9111A", border: "none", borderRadius: 12, padding: "14px 20px", color: "#fff", fontWeight: "bold", fontSize: 15, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                  Show Italian 👁️
                </button>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontSize: 11, color: "#886644", letterSpacing: 1, textTransform: "uppercase" }}>Italian</div>
                    <button onClick={() => handleSpeak(phrase.it)} style={{
                      background: speaking ? "#5A2800" : "#2A1500",
                      border: "1px solid #5A2800", borderRadius: 20, padding: "4px 12px",
                      color: speaking ? "#FFD98E" : "#FF9955", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      {speaking ? "🔊 Playing..." : "🔊 Listen"}
                    </button>
                  </div>
                  <div style={{ fontSize: 24, color: "#FFD98E", fontStyle: "italic", fontWeight: "bold", marginBottom: 16, lineHeight: 1.4 }}>{phrase.it}</div>
                  <div style={{ background: "#100500", border: "1px solid #3A1800", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#CC9966", fontStyle: "italic", marginBottom: 20 }}>
                    💡 {phrase.tip}
                  </div>
                  <div style={{ marginBottom: 16 }}><DramaMeter level={phrase.drama} /></div>
                </div>
              )}
            </div>
            {showIt && (
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setPhraseIndex((phraseIndex + 1) % PHRASES.length); setShowIt(false); }} style={{ flex: 1, background: "#1C0A00", border: "1px solid #5A2800", borderRadius: 12, padding: "14px", color: "#886644", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                  Skip →
                </button>
                <button onClick={markPracticed} style={{ flex: 2, background: "linear-gradient(135deg, #2D6A4F, #1B4332)", border: "none", borderRadius: 12, padding: "14px", color: "#95D5B2", fontWeight: "bold", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                  ✓ Got it!
                </button>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {PHRASES.map((_, i) => (
                <div key={i} onClick={() => { setPhraseIndex(i); setShowIt(false); }} style={{
                  width: practiced.has(i) ? 10 : 8, height: practiced.has(i) ? 10 : 8,
                  borderRadius: "50%",
                  background: i === phraseIndex ? "#C9111A" : practiced.has(i) ? "#2D6A4F" : "#3A1800",
                  cursor: "pointer", transition: "all 0.2s",
                }} />
              ))}
            </div>
          </div>
        )}

        {/* QUIZ TAB */}
        {tab === "quiz" && (
          <div>
            {quizDone ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>
                  {score.correct >= PHRASES.length * 0.8 ? "🏆" : score.correct >= PHRASES.length * 0.5 ? "👍" : "💪"}
                </div>
                <h2 style={{ color: "#FFD98E", fontSize: 26, margin: "0 0 8px" }}>Quiz Complete!</h2>
                <div style={{ fontSize: 40, fontWeight: "bold", color: "#C9111A", margin: "12px 0" }}>
                  {score.correct} / {PHRASES.length}
                </div>
                <div style={{ color: "#886644", fontStyle: "italic", marginBottom: 30, fontSize: 15 }}>
                  {score.correct >= PHRASES.length * 0.8 ? "Bravissimo! You're basically Italian now 🤌" :
                   score.correct >= PHRASES.length * 0.5 ? "Non c'è male! Keep practicing 💪" :
                   "Practice the phrases first, then try again!"}
                </div>
                <button onClick={startQuiz} style={{ background: "#C9111A", border: "none", borderRadius: 14, padding: "16px 32px", color: "#fff", fontWeight: "bold", fontSize: 16, cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                  Try Again 🔄
                </button>
              </div>
            ) : quiz ? (
              <div>
                {/* Progress */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: "#886644" }}>Question {quizIndex + 1} of {PHRASES.length}</div>
                  <div style={{ fontSize: 13, color: "#95D5B2", fontWeight: "bold" }}>✓ {score.correct} correct</div>
                </div>
                <div style={{ height: 4, background: "#1E0800", borderRadius: 4, marginBottom: 24 }}>
                  <div style={{ height: "100%", width: `${((quizIndex) / PHRASES.length) * 100}%`, background: "#C9111A", borderRadius: 4, transition: "width 0.4s" }} />
                </div>

                {/* Question */}
                <div style={{ background: "linear-gradient(160deg, #1C0A00, #2A1200)", border: "1px solid #5A2800", borderRadius: 20, padding: 24, marginBottom: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#886644", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>How do you say this in Italian?</div>
                  <div style={{ fontSize: 21, fontWeight: "bold", color: "#F5EDD6", lineHeight: 1.4 }}>{quiz.correct.en}</div>
                </div>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  {quiz.options.map((option, i) => {
                    let bg = "#1C0A00", border = "#3A1800", color = "#F5EDD6";
                    if (selected) {
                      if (option === quiz.correct.it) { bg = "#1B4332"; border = "#40916C"; color = "#95D5B2"; }
                      else if (option === selected) { bg = "#4A1010"; border = "#E63946"; color = "#FF6B6B"; }
                    }
                    return (
                      <button key={i} onClick={() => handleQuizAnswer(option)} style={{
                        background: bg, border: `2px solid ${border}`, borderRadius: 14,
                        padding: "15px 18px", color, fontSize: 15, fontStyle: "italic",
                        cursor: selected ? "default" : "pointer", textAlign: "left",
                        transition: "all 0.25s", fontFamily: "inherit",
                      }}>
                        {option}
                        {selected && option === quiz.correct.it && (
                          <button onClick={(e) => { e.stopPropagation(); handleSpeak(option); }} style={{
                            float: "right", background: "none", border: "none", color: "#95D5B2",
                            fontSize: 16, cursor: "pointer", padding: 0,
                          }}>🔊</button>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizResult && (
                  <div>
                    <div style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: quizResult === "correct" ? "#95D5B2" : "#FF6B6B", marginBottom: 12 }}>
                      {quizResult === "correct" ? "✓ Esatto! Perfetto!" : `✗ Not quite — it was: ${quiz.correct.it}`}
                    </div>
                    <div style={{ background: "#100500", border: "1px solid #3A1800", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#CC9966", fontStyle: "italic", marginBottom: 14 }}>
                      💡 {quiz.correct.tip}
                    </div>
                    <button onClick={nextQuizQuestion} style={{ background: "#C9111A", border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: "bold", fontSize: 16, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                      {quizIndex + 1 >= PHRASES.length ? "See Results 🏆" : "Next Question →"}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* GESTURES TAB */}
        {tab === "gesto" && (
          <div>
            <p style={{ color: "#886644", fontSize: 14, fontStyle: "italic", marginTop: 0, marginBottom: 20, textAlign: "center" }}>
              Italians say more with their hands than with words. Learn the real language.
            </p>
            <div style={{ background: "linear-gradient(160deg, #1C0A00, #2A1200)", border: "1px solid #5A2800", borderRadius: 20, padding: 28, textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 72, marginBottom: 12 }}>{GESTURES[gestureIndex].emoji}</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 26, color: "#FFD98E", fontStyle: "italic" }}>"{GESTURES[gestureIndex].name}"</h2>
              <div style={{ fontSize: 18, color: "#FF9955", fontWeight: "bold", marginBottom: 20 }}>{GESTURES[gestureIndex].meaning}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <button onClick={() => handleSpeak(GESTURES[gestureIndex].name)} style={{ background: "#2A1500", border: "1px solid #5A2800", borderRadius: 20, padding: "6px 16px", color: "#FF9955", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                  🔊 Hear it
                </button>
              </div>
              <div style={{ background: "#100500", borderRadius: 14, padding: "14px 16px", marginBottom: 14, textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#886644", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>When to use</div>
                <div style={{ fontSize: 14, color: "#F5EDD6" }}>{GESTURES[gestureIndex].when}</div>
              </div>
              <div style={{ background: "#100500", borderRadius: 14, padding: "14px 16px", textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#886644", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>How to do it</div>
                <div style={{ fontSize: 14, color: "#F5EDD6" }}>{GESTURES[gestureIndex].how}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setGestureIndex((gestureIndex - 1 + GESTURES.length) % GESTURES.length)} style={{ flex: 1, background: "#1C0A00", border: "1px solid #5A2800", borderRadius: 12, padding: 14, color: "#886644", fontSize: 20, cursor: "pointer" }}>←</button>
              <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#886644", fontSize: 13 }}>{gestureIndex + 1} / {GESTURES.length}</div>
              <button onClick={() => setGestureIndex((gestureIndex + 1) % GESTURES.length)} style={{ flex: 1, background: "#C9111A", border: "none", borderRadius: 12, padding: 14, color: "#fff", fontSize: 20, cursor: "pointer" }}>→</button>
            </div>
          </div>
        )}

        {/* CULTURE TAB */}
        {tab === "cultura" && (
          <div>
            <p style={{ color: "#886644", fontSize: 14, fontStyle: "italic", marginTop: 0, marginBottom: 20, textAlign: "center" }}>
              Understand Italians from the inside out 🔥
            </p>
            <div style={{ background: "linear-gradient(160deg, #1C0A00, #2A1200)", border: "1px solid #5A2800", borderRadius: 20, padding: 24, marginBottom: 16 }}>
              <div style={{ fontSize: 52, textAlign: "center", marginBottom: 12 }}>{CULTURA_SHOCKS[culturaIndex].emoji}</div>
              <h2 style={{ margin: "0 0 14px", fontSize: 22, color: "#FFD98E", textAlign: "center" }}>{CULTURA_SHOCKS[culturaIndex].title}</h2>
              <p style={{ color: "#F5EDD6", fontSize: 15, lineHeight: 1.7, margin: "0 0 20px" }}>{CULTURA_SHOCKS[culturaIndex].fact}</p>
              <div style={{ background: "#100500", border: "1px solid #3A1800", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "#886644", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>🇬🇧 vs 🇮🇹</div>
                <div style={{ fontSize: 14, color: "#FF9955", fontWeight: "bold", lineHeight: 1.8 }}>{CULTURA_SHOCKS[culturaIndex].comparison}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setCulturaIndex((culturaIndex - 1 + CULTURA_SHOCKS.length) % CULTURA_SHOCKS.length)} style={{ flex: 1, background: "#1C0A00", border: "1px solid #5A2800", borderRadius: 12, padding: 14, color: "#886644", fontSize: 20, cursor: "pointer" }}>←</button>
              <div style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#886644", fontSize: 13 }}>{culturaIndex + 1} / {CULTURA_SHOCKS.length} culture shocks</div>
              <button onClick={() => setCulturaIndex((culturaIndex + 1) % CULTURA_SHOCKS.length)} style={{ flex: 1, background: "#C9111A", border: "none", borderRadius: 12, padding: 14, color: "#fff", fontSize: 20, cursor: "pointer" }}>→</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
              {CULTURA_SHOCKS.map((_, i) => (
                <div key={i} onClick={() => setCulturaIndex(i)} style={{ width: 8, height: 8, borderRadius: "50%", background: i === culturaIndex ? "#C9111A" : "#3A1800", cursor: "pointer", transition: "background 0.2s" }} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}