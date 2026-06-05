import { useState } from "react";

/* =========================
   YOUR ORIGINAL DATA
========================= */

const GESTURES = [
  { emoji: "🤌", name: "Ma che vuoi?", meaning: "What do you want?!", when: "When someone says something that makes absolutely no sense to you", how: "Bring all fingertips together pointing up, then shake your hand" },
  { emoji: "👋", name: "Vai via!", meaning: "Go away / Leave me alone", when: "When you're done with a conversation or situation", how: "Hand flat, wave downward dismissively" },
  { emoji: "🫰", name: "Perfetto!", meaning: "Perfect! / Absolutely delicious!", when: "After an amazing meal or when something is just right", how: "Fingertips to lips, then open your hand with a kiss" },
  { emoji: "✌️", name: "Non me ne frega!", meaning: "I couldn't care less!", when: "When something genuinely doesn't matter to you at all", how: "Rub thumb across fingertips, relaxed expression" },
  { emoji: "🤏", name: "Aspetta...", meaning: "Wait a moment...", when: "To make someone pause while you think", how: "Index finger pointing up, wave it slowly side to side" },
];

const PHRASES = [
  { en: "Good morning, can I have a coffee?", it: "Buongiorno, posso avere un caffè?", category: "Bar", tip: "Caffè = espresso in Italy" },
  { en: "Where is the bathroom?", it: "Dov'è il bagno?", category: "Basics", tip: "Bagno works everywhere" },
  { en: "I don't understand anything", it: "Non capisco assolutamente niente", category: "Basics", tip: "Very dramatic version 😄" },
  { en: "I'm in love with Rome!", it: "Mi sono innamorato di Roma!", category: "Emotion", tip: "Change ending for gender" },
];

const CULTURE = [
  { emoji: "☕", title: "Cappuccino Law", text: "Never after 11am in Italy." },
  { emoji: "🍝", title: "Pasta is Sacred", text: "Never break spaghetti." },
  { emoji: "🛵", title: "Vespa Life", text: "Traffic is a suggestion." },
  { emoji: "👗", title: "La Bella Figura", text: "Always look presentable." },
];

/* =========================
   DESIGN SYSTEM
========================= */

const theme = {
  bg: "#0B0A08",
  paper: "#F5EDD6",
  muted: "#B8A892",
  gold: "#C9A24A",
  card: "rgba(245,237,214,0.06)",
  border: "rgba(245,237,214,0.12)"
};

/* =========================
   APP
========================= */

export default function App() {
  const [section, setSection] = useState("home");
  const [index, setIndex] = useState(0);
  const [showIt, setShowIt] = useState(false);

  const phrase = PHRASES[index];

  /* =========================
     HOME (CINEMATIC ENTRY)
  ========================= */

  if (section === "home") {
    return (
      <div style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.paper,
        fontFamily: "Georgia, serif",
        padding: 24
      }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: theme.gold }}>
            LA DOLCE LINGUA
          </div>

          <h1 style={{
            fontSize: 64,
            margin: "20px 0 10px",
            fontWeight: 400,
            lineHeight: 1
          }}>
            Learn Italian<br />
            <span style={{ fontStyle: "italic", color: theme.gold }}>
              like cinema
            </span>
          </h1>

          <p style={{
            maxWidth: 520,
            margin: "0 auto",
            color: theme.muted,
            fontSize: 16,
            lineHeight: 1.8
          }}>
            Not an app.  
            A life in Italy — gestures, espresso bars, and conversations.
          </p>
        </div>

        {/* ENTRY BUTTON */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <button onClick={() => setSection("app")} style={{
            background: theme.gold,
            color: "#000",
            border: "none",
            padding: "14px 28px",
            fontSize: 16,
            cursor: "pointer",
            borderRadius: 30,
            fontWeight: "bold"
          }}>
            Enter Italy 🇮🇹
          </button>
        </div>

      </div>
    );
  }

  /* =========================
     MAIN EXPERIENCE
  ========================= */

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.paper,
      fontFamily: "Georgia, serif",
      padding: 20
    }}>

      {/* TOP BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20,
        fontSize: 12,
        color: theme.muted
      }}>
        <span onClick={() => setSection("home")} style={{ cursor: "pointer" }}>
          ← Home
        </span>
        <span>ITALY MODE</span>
      </div>

      {/* NAV */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20,
        borderBottom: `1px solid ${theme.border}`,
        paddingBottom: 10
      }}>
        {["phrases", "gestures", "culture"].map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{
              background: "none",
              border: "none",
              color: section === s ? theme.gold : theme.muted,
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* =========================
          PHRASES
      ========================= */}
      {section === "phrases" && (
        <div style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          padding: 20,
          borderRadius: 20
        }}>

          <div style={{ fontSize: 12, color: theme.muted }}>
            {phrase.category}
          </div>

          <h2 style={{ fontSize: 22 }}>{phrase.en}</h2>

          {!showIt ? (
            <button onClick={() => setShowIt(true)} style={{
              marginTop: 20,
              background: theme.gold,
              border: "none",
              padding: 12,
              width: "100%",
              cursor: "pointer"
            }}>
              Show Italian
            </button>
          ) : (
            <div>
              <h3 style={{ color: theme.gold }}>{phrase.it}</h3>
              <p style={{ color: theme.muted }}>{phrase.tip}</p>

              <button onClick={() => {
                setIndex((index + 1) % PHRASES.length);
                setShowIt(false);
              }}>
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================
          GESTURES
      ========================= */}
      {section === "gestures" && (
        <div style={{
          background: theme.card,
          padding: 20,
          borderRadius: 20,
          border: `1px solid ${theme.border}`,
          textAlign: "center"
        }}>
          <div style={{ fontSize: 60 }}>{GESTURES[0].emoji}</div>
          <h2 style={{ color: theme.gold }}>{GESTURES[0].name}</h2>
          <p>{GESTURES[0].meaning}</p>
        </div>
      )}

      {/* =========================
          CULTURE
      ========================= */}
      {section === "culture" && (
        <div style={{ display: "grid", gap: 12 }}>
          {CULTURE.map((c, i) => (
            <div key={i} style={{
              background: theme.card,
              padding: 16,
              borderRadius: 16,
              border: `1px solid ${theme.border}`
            }}>
              <div style={{ fontSize: 30 }}>{c.emoji}</div>
              <h3 style={{ color: theme.gold }}>{c.title}</h3>
              <p style={{ color: theme.muted }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}