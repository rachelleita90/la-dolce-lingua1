if (section === "home") {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F5F0",
        color: "#111111",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >

      {/* HERO */}

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* BACKGROUND IMAGE */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(40%) brightness(0.45)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.65))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 900,
            textAlign: "center",
            padding: "0 30px",
            color: "#fff",
          }}
        >

          <div
            style={{
              letterSpacing: 6,
              textTransform: "uppercase",
              fontSize: 12,
              color: "#D4B06A",
              marginBottom: 24,
            }}
          >
            La Dolce Lingua
          </div>

          <h1
            style={{
              fontSize: "clamp(60px, 10vw, 120px)",
              fontWeight: 400,
              lineHeight: 0.95,
              marginBottom: 30,
            }}
          >
            Learn Italian
            <br />
            through culture,
            <br />
            beauty and life.
          </h1>

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.8,
              color: "#F1E9DD",
              maxWidth: 700,
              margin: "0 auto 50px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Not grammar first.
            <br />
            Life first.
            Language follows.
          </p>

          <button
            onClick={() => setSection("phrases")}
            style={{
              background: "#D4B06A",
              color: "#111",
              border: "none",
              padding: "18px 42px",
              borderRadius: 40,
              fontSize: 18,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
            }}
          >
            Begin Your Journey
          </button>

        </div>
      </section>

      {/* ITALIAN DREAM */}

      <section
        style={{
          padding: "120px 30px",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=1200"
          style={{
            width: "100%",
            borderRadius: 24,
            objectFit: "cover",
            height: 650,
          }}
        />

        <div>

          <div
            style={{
              color: "#D4B06A",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "Inter, sans-serif",
            }}
          >
            The Italian Dream
          </div>

          <h2
            style={{
              fontSize: 64,
              lineHeight: 1,
              marginBottom: 30,
            }}
          >
            Italian is not
            <br />
            a subject.
          </h2>

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.8,
              fontFamily: "Inter, sans-serif",
              color: "#555",
            }}
          >
            It is the language of long lunches,
            summer evenings,
            espresso at the bar,
            and conversations that never really end.
          </p>

        </div>

      </section>

      {/* THREE PANELS */}

      <section
        style={{
          padding: "40px 30px 120px",
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 30,
        }}
      >

        {[
          {
            title: "Language",
            text: "Speak naturally. Not like a textbook.",
            img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
          },
          {
            title: "Culture",
            text: "Understand why Italians live differently.",
            img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=1200"
          },
          {
            title: "Gestures",
            text: "Because words are only half the conversation.",
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200"
          }
        ].map((card) => (
          <div
            key={card.title}
            style={{
              overflow: "hidden",
              borderRadius: 24,
              background: "#fff",
              boxShadow: "0 10px 40px rgba(0,0,0,.08)",
            }}
          >
            <img
              src={card.img}
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 30 }}>
              <h3
                style={{
                  fontSize: 42,
                  marginBottom: 12,
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#666",
                  lineHeight: 1.8,
                }}
              >
                {card.text}
              </p>
            </div>
          </div>
        ))}

      </section>

    </div>
  );
}