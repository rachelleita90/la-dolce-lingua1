import { useState } from 'react'
import heroImg from './assets/hero-piazza.png'
import mascotImg from './assets/mascot-woman.png'
import caffeImg from './assets/caffe-bar.png'
import passeggiataImg from './assets/passeggiata.png'
import pranzoImg from './assets/pranzo-family.png'
import gestureImg from './assets/gesture-man.png'

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Page = 'home' | 'flashcards' | 'quiz'
type DeckKey = 'daily' | 'verbs' | 'food' | 'culture' | 'b1' | 'b2'

interface Card {
  word: string
  phonetic: string
  translation: string
  category: string
  example: string
  cultureNote: string
}

interface QuizQuestion {
  question: string
  options: string[]
  answer: number
  tip: string
}

interface GestureQuestion {
  emoji: string
  italian: string
  phonetic: string
  options: string[]
  answer: number
  tip: string
}

// ─── IMAGE PATHS ─────────────────────────────────────────────────────────────
const IMG = {
  hero:        heroImg,
  mascot:      mascotImg,
  caffe:       caffeImg,
  passeggiata: passeggiataImg,
  pranzo:      pranzoImg,
  gesture:     gestureImg,
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const DECKS: Record<DeckKey, Card[]> = {
  daily: [
    { word: 'ciao', phonetic: '/ˈtʃaː.o/', translation: 'hello / bye', category: 'Informal greeting', example: '"Ciao! Come stai?" — Hi! How are you?', cultureNote: 'In Italy, ciao is only for friends and family — never strangers or formal settings. For those, use buongiorno or salve.' },
    { word: 'grazie', phonetic: '/ˈɡrat.tsje/', translation: 'thank you', category: 'Expression', example: '"Grazie mille!" — Thank you very much!', cultureNote: 'Grazie mille means "a thousand thanks." Italians love dramatic gratitude — and mean every word of it.' },
    { word: 'prego', phonetic: '/ˈprɛ.ɡo/', translation: "you're welcome / please / go ahead", category: 'Expression', example: '"Prego, si accomodi." — Please, take a seat.', cultureNote: 'Prego is one of Italy\'s most versatile words — welcome, please, after you, or "yes?" when answering the phone.' },
    { word: 'magari', phonetic: '/maˈɡa.ri/', translation: 'if only / maybe / I wish', category: 'Adverb', example: '"Vuoi venire?" "Magari!" — Want to come? "If only!"', cultureNote: 'Magari carries beautiful wistfulness — the Italian art of longing for something wonderful that may not happen.' },
    { word: 'bello', phonetic: '/ˈbɛl.lo/', translation: 'beautiful / wonderful', category: 'Adjective', example: '"Che bello!" — How wonderful!', cultureNote: 'Italians use bello for people, food, moments, weather. It\'s the all-purpose expression of Italian delight.' },
    { word: 'subito', phonetic: '/ˈsu.bi.to/', translation: 'immediately / right away', category: 'Adverb', example: '"Arrivo subito!" — I\'m on my way!', cultureNote: 'In Italy, subito is more of a feeling than a promise. Time flows differently here — and that\'s part of the beauty.' },
  ],
  verbs: [
    { word: 'essere', phonetic: '/ˈɛs.se.re/', translation: 'to be', category: 'Verb · infinitive', example: '"Io sono italiana." — I am Italian.', cultureNote: 'Essere vs stare — both mean "to be" but stare suggests a temporary state. "Come stai?" uses stare because moods are temporary!' },
    { word: 'mangiare', phonetic: '/man.ˈdʒa.re/', translation: 'to eat', category: 'Verb · infinitive', example: '"Voglio mangiare la pizza." — I want to eat pizza.', cultureNote: 'Food is identity in Italy. Mangiare bene (eat well) is practically a life philosophy — and a nonna\'s highest compliment.' },
    { word: 'volere', phonetic: '/voˈle.re/', translation: 'to want', category: 'Verb · infinitive', example: '"Voglio un caffè." — I want a coffee.', cultureNote: 'Volere bene literally means "to want good" — but it\'s how Italians say "I love you" to family. Romantic love uses amare.' },
    { word: 'capire', phonetic: '/kaˈpi.re/', translation: 'to understand', category: 'Verb · infinitive', example: '"Capisco!" — I understand!', cultureNote: '"Hai capito?" (Did you get it?) is something Italian mothers, teachers, and taxi drivers all say. Warm, direct, very Italian.' },
    { word: 'sapere', phonetic: '/saˈpe.re/', translation: 'to know (a fact)', category: 'Verb · infinitive', example: '"Sai dov\'è la stazione?" — Do you know where the station is?', cultureNote: 'Italian has two "to know" verbs: sapere for facts and skills, conoscere for people and places. More precise than English.' },
    { word: 'andare', phonetic: '/anˈda.re/', translation: 'to go', category: 'Verb · infinitive', example: '"Andiamo!" — Let\'s go!', cultureNote: '"Andiamo!" is the Italian battle cry of enthusiasm — used for everything from leaving a restaurant to starting an adventure.' },
  ],
  food: [
    { word: 'caffè', phonetic: '/kafˈfɛ/', translation: 'espresso / coffee', category: 'Noun (m)', example: '"Un caffè, per favore." — One espresso, please.', cultureNote: 'Never order a caffè latte after 11am — it\'s a breakfast drink. Italians judge gently. Stand at the bar and drink like a local.' },
    { word: 'pranzo', phonetic: '/ˈpran.dzo/', translation: 'lunch', category: 'Noun (m)', example: '"Il pranzo è pronto." — Lunch is ready.', cultureNote: 'Pranzo is the most important meal in Italy — a sacred two-hour affair with multiple courses, wine, and spirited conversation.' },
    { word: 'dolce', phonetic: '/ˈdol.tʃe/', translation: 'sweet / dessert', category: 'Adjective & noun', example: '"Qualcosa di dolce?" — Something sweet?', cultureNote: 'La dolce vita — "the sweet life" — was immortalised by Fellini in 1960. It captures the Italian ideal: beauty, pleasure, living well.' },
    { word: 'assaggiare', phonetic: '/as.sadˈdʒa.re/', translation: 'to taste / try', category: 'Verb · infinitive', example: '"Vuoi assaggiare?" — Do you want to taste?', cultureNote: 'Offering a taste of your food is an act of love in Italy. Refusing it — especially at a nonna\'s table — is close to an insult.' },
    { word: 'aperitivo', phonetic: '/a.pe.riˈti.vo/', translation: 'aperitif / pre-dinner drink', category: 'Noun (m)', example: '"Facciamo l\'aperitivo?" — Shall we have an aperitivo?', cultureNote: 'The aperitivo hour (6–8pm) is sacred in northern Italy. A Campari spritz with free snacks — this is civilisation at its finest.' },
    { word: 'abbondante', phonetic: '/ab.bonˈdan.te/', translation: 'abundant / generous', category: 'Adjective', example: '"Una porzione abbondante." — A generous portion.', cultureNote: 'Abundance is generosity in Italian culture. A meal that leaves you slightly too full is a meal given with love.' },
  ],
  culture: [
    { word: 'passeggiata', phonetic: '/pas.sedˈdʒa.ta/', translation: 'the evening stroll', category: 'Noun (f)', example: '"Andiamo a fare una passeggiata?" — Shall we take a stroll?', cultureNote: 'La passeggiata is daily social ritual — the evening walk to see and be seen. Not exercise, but the art of being present.' },
    { word: 'sprezzatura', phonetic: '/spret.tsaˈtu.ra/', translation: 'effortless elegance', category: 'Noun (f)', example: 'He dressed with true sprezzatura — nothing forced.', cultureNote: 'Coined in 1528 by Castiglione, sprezzatura is the art of making difficult things look completely effortless. The essence of Italian style.' },
    { word: 'abbiocco', phonetic: '/ab.ˈbjɔk.ko/', translation: 'post-lunch drowsiness', category: 'Noun (m)', example: '"Ho l\'abbiocco." — I\'ve got that sleepy post-lunch feeling.', cultureNote: 'The abbiocco is the drowsiness that follows a long lunch. It\'s not laziness — it\'s physiology. That\'s what the afternoon rest is for.' },
    { word: 'menefreghismo', phonetic: '/me.ne.freˈɡiz.mo/', translation: 'the art of not caring', category: 'Noun (m)', example: 'Pure menefreghismo — he shrugged and ordered another wine.', cultureNote: 'From me ne frego (I don\'t care). Sometimes this captures the Italian genius: don\'t stress what cannot be changed.' },
    { word: 'campanilismo', phonetic: '/kam.pa.niˈliz.mo/', translation: 'local pride / parochialism', category: 'Noun (m)', example: 'Il campanilismo romano è leggendario. — Roman local pride is legendary.', cultureNote: 'From campanile (bell tower) — Italians are fiercely proud of their own town, dialect, and food. Even the pasta shape changes every 20km.' },
    { word: 'dolce far niente', phonetic: '/ˈdol.tʃe far ˈnjɛn.te/', translation: 'the sweetness of doing nothing', category: 'Phrase', example: '"Oggi, dolce far niente." — Today, sweet idleness.', cultureNote: 'One of Italy\'s great gifts to the world: the idea that rest is not laziness but an art form. Sit in the sun. Do nothing. Do it beautifully.' },
  ],
  b1: [
    { word: 'nonostante', phonetic: '/no.noˈstan.te/', translation: 'despite / in spite of', category: 'Preposition · B1', example: '"Nonostante la pioggia, siamo usciti." — Despite the rain, we went out.', cultureNote: 'B1 is where Italian starts to flow. Nonostante and similar conjunctions let you build complex, nuanced thoughts — real Italian, not tourist Italian.' },
    { word: 'tuttavia', phonetic: '/tut.taˈvi.a/', translation: 'however / nevertheless', category: 'Adverb · B1', example: '"È difficile; tuttavia, ci provo." — It\'s hard; nevertheless, I\'ll try.', cultureNote: 'Italian connectors like tuttavia, eppure, and anzi give speech its elegant flow. Masters of these sound genuinely fluent.' },
    { word: 'rendersi conto', phonetic: '/ˈren.der.si ˈkon.to/', translation: 'to realise / become aware', category: 'Verb phrase · B1', example: '"Mi sono reso conto che aveva ragione." — I realised she was right.', cultureNote: 'Italian reflexive verb phrases like rendersi conto carry a sense of gradual internal dawning — more poetic than the English "realise".' },
    { word: 'eppure', phonetic: '/epˈpu.re/', translation: 'and yet / even so', category: 'Conjunction · B1', example: '"Lo sapevo, eppure l\'ho fatto." — I knew it, and yet I did it.', cultureNote: 'Eppure is the word of the beautiful contradiction — knowing you shouldn\'t, doing it anyway. Very human. Very Italian.' },
    { word: 'insomma', phonetic: '/inˈsom.ma/', translation: 'in short / so / anyway', category: 'Adverb · B1', example: '"Insomma, non mi è piaciuto." — In short, I didn\'t like it.', cultureNote: 'Insomma is the verbal shrug of Italian — it wraps up a long explanation with satisfying finality. Use it and sound immediately more fluent.' },
    { word: 'a proposito', phonetic: '/a proˈpo.zi.to/', translation: 'by the way / speaking of which', category: 'Phrase · B1', example: '"A proposito, hai visto Marco?" — By the way, have you seen Marco?', cultureNote: 'This phrase changes a conversation\'s direction gracefully. Italians use it to introduce new topics without awkward pauses.' },
  ],
  b2: [
    { word: 'suscitare', phonetic: '/suʃ.tʃiˈta.re/', translation: 'to arouse / provoke / evoke', category: 'Verb · B2 formal', example: '"Il discorso ha suscitato molte polemiche." — The speech sparked much controversy.', cultureNote: 'At B2 you enter the Italian of newspapers, literature, and intellectual debate. Suscitare appears constantly in Italian journalism.' },
    { word: 'avvincente', phonetic: '/av.vinˈtʃen.te/', translation: 'gripping / compelling / captivating', category: 'Adjective · B2', example: '"Un romanzo avvincente." — A gripping novel.', cultureNote: 'Italian literary vocabulary is extraordinarily rich. Avvincente, from avvincere (to enchain), captures how a great book holds you prisoner.' },
    { word: 'di primo acchito', phonetic: '/di ˈpri.mo akˈki.to/', translation: 'at first glance / right away', category: 'Idiom · B2', example: '"Di primo acchito non mi era piaciuto." — At first, I hadn\'t liked it.', cultureNote: 'Italian idioms at B2 reveal the true personality of the language — playful, precise, poetic. Acchito comes from billiards: the opening shot.' },
    { word: 'a prescindere da', phonetic: '/a preˈʃin.de.re da/', translation: 'regardless of / aside from', category: 'Phrase · B2', example: '"A prescindere dal tempo, partiremo." — Regardless of the weather, we\'ll leave.', cultureNote: 'Mastering fixed phrases like this is the bridge between intermediate and advanced Italian — the difference that makes you sound educated.' },
    { word: 'contraddistinguere', phonetic: '/kon.trad.disˈtiŋ.ɡwe.re/', translation: 'to distinguish / characterise', category: 'Verb · B2', example: '"Lo stile che lo contraddistingue." — The style that sets him apart.', cultureNote: 'Long compound verbs like this one are the hallmark of formal Italian writing. Mastering them unlocks newspapers, literature, and academia.' },
    { word: "nell'ambito di", phonetic: '/nel.ˈlam.bi.to di/', translation: 'within the scope of / in the field of', category: 'Phrase · B2 formal', example: '"Nell\'ambito della cultura italiana." — Within the scope of Italian culture.', cultureNote: 'This phrase is everywhere in Italian academic and professional writing. It signals precision and formality — essential at C1 level.' },
  ],
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  { question: 'What does "grazie mille" literally mean?', options: ['Many thanks', 'A thousand thanks', 'Big thank you', 'Thank you forever'], answer: 1, tip: 'Mille = a thousand. Italians love dramatic gratitude — "a thousand thanks" is perfectly normal.' },
  { question: 'When should you NOT order a caffè latte?', options: ['Before breakfast', 'After 11am', 'On Sundays', 'During lunch'], answer: 1, tip: 'Milky coffee is strictly a breakfast drink in Italy. After 11am, order an espresso and stand at the bar like a local.' },
  { question: 'What is "la passeggiata"?', options: ['A type of pasta', 'The morning jog', 'The evening stroll', 'Sunday lunch'], answer: 2, tip: 'La passeggiata is Italy\'s beloved evening ritual — strolling to see and be seen. Social life at its most elegant.' },
  { question: 'What does "sprezzatura" mean?', options: ['Post-lunch drowsiness', 'Effortless elegance', 'Local pride', 'Doing nothing beautifully'], answer: 1, tip: 'Sprezzatura — coined in 1528 — describes the art of making difficult things look completely natural. The essence of Italian style.' },
  { question: '"Eppure" means…', options: ['because', 'therefore', 'and yet', 'although'], answer: 2, tip: 'Eppure is the word of the beautiful Italian contradiction — doing what you know you shouldn\'t. Very human, very Italian.' },
  { question: 'What is "il pranzo" in Italian culture?', options: ['A quick snack', 'The most important meal of the day', 'Breakfast', 'An evening aperitivo'], answer: 1, tip: 'Lunch — il pranzo — is king in Italy. A multi-course, two-hour affair with family, wine, and conversation. Work comes after.' },
]

const GESTURE_QUESTIONS: GestureQuestion[] = [
  { emoji: '🤌', italian: 'Ma che vuoi?', phonetic: '/ma ke ˈvwɔi/', options: ['What do you want?', 'I love it!', 'No problem', "Let's go!"], answer: 0, tip: 'The pinched fingers — ma che vuoi? — is Italy\'s most famous gesture. It means "what do you want?" or pure exasperation, depending on speed and context.' },
  { emoji: '✋', italian: 'Piano piano', phonetic: '/ˈpja.no ˈpja.no/', options: ['Very fast', 'Slowly, slowly', 'Long ago', 'Far away'], answer: 1, tip: 'Piano piano — slowly slowly — is a full Italian philosophy. A flat hand moving gently downward signals "calm down, take it easy."' },
  { emoji: '👁️', italian: 'Occhio!', phonetic: '/ˈɔk.kjo/', options: ['Look at that!', 'Watch out!', 'How beautiful!', 'I understand'], answer: 1, tip: 'Pulling the lower eyelid down — occhio! (eye!) — means "be careful" or "watch out". A friendly warning between friends.' },
  { emoji: '🤌', italian: 'Che buono!', phonetic: '/ke ˈbwɔ.no/', options: ['How ugly!', 'How delicious!', "I'm full", 'What a mess!'], answer: 1, tip: "Fingers pressed to lips then opened outward — the chef's kiss. Che buono! means \"how delicious!\" — for food, wine, anything wonderful." },
  { emoji: '🖐️', italian: 'Me ne frego', phonetic: '/me ne ˈfrɛ.ɡo/', options: ['I agree completely', "I don't care at all", 'Very good!', 'Come here'], answer: 1, tip: 'The chin flick paired with me ne frego signals total dismissal. From menefreghismo — the Italian art of not caring. Use only with close friends!' },
]

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --t: #B8470A;
    --tm: #D4632A;
    --tl: #F5EBE3;
    --tp: #FDF8F4;
    --ink: #1A1208;
    --mu: #6B5A4A;
    --fa: #9C8778;
    --bd: #E4D5C8;
    --cr: #FFFCF9;
    --sa: #3D6B4F;
    --sl: #EBF4EF;
    --go: #C4861A;
    --gl: #FBF2E0;
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'DM Sans', system-ui, sans-serif;
  }

  body {
    font-family: var(--font-sans);
    background: var(--cr);
    color: var(--ink);
    min-height: 100vh;
  }

  .nav { background: var(--cr); border-bottom: 1.5px solid var(--bd); padding: 0 28px; display: flex; align-items: center; justify-content: space-between; height: 62px; position: sticky; top: 0; z-index: 100; }
  .nav-logo-wrap { display: flex; align-items: center; gap: 12px; }
  .nav-avatar { width: 38px; height: 38px; border-radius: 50%; overflow: hidden; border: 2px solid var(--bd); flex-shrink: 0; background: var(--tl); }
  .nav-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
  .nav-logo { font-family: var(--font-serif); font-size: 1.35rem; color: var(--t); font-style: italic; line-height: 1; cursor: pointer; }
  .nav-logo small { display: block; font-family: var(--font-sans); font-size: 0.58rem; letter-spacing: 0.18em; color: var(--fa); font-style: normal; text-transform: uppercase; margin-top: 2px; font-weight: 400; }
  .nav-tabs { display: flex; gap: 3px; }
  .nav-tab { font-size: 0.8rem; font-weight: 500; padding: 6px 14px; border-radius: 7px; border: none; background: transparent; color: var(--mu); cursor: pointer; transition: all 0.15s; font-family: var(--font-sans); }
  .nav-tab:hover { background: var(--tl); color: var(--t); }
  .nav-tab.active { background: var(--t); color: #fff; }
  .nav-right { display: flex; align-items: center; gap: 8px; }
  .streak-badge { background: var(--gl); border: 1px solid #E8CC8A; color: #7A4E08; font-size: 0.72rem; font-weight: 600; padding: 5px 13px; border-radius: 20px; }
  .xp-badge { background: var(--tl); border: 1px solid var(--bd); color: var(--t); font-size: 0.72rem; font-weight: 500; padding: 5px 13px; border-radius: 20px; }

  .hero { position: relative; height: 420px; overflow: hidden; }
  .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center center; display: block; }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(26,18,8,0.75) 0%, rgba(26,18,8,0.55) 45%, rgba(26,18,8,0.05) 100%); }
  .hero-content { position: absolute; top: 0; left: 0; height: 100%; width: 58%; display: flex; flex-direction: column; justify-content: center; padding: 44px 48px; }
  .eyebrow { font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 10px; font-weight: 500; }
  .hero-h1 { font-family: var(--font-serif); font-size: 3rem; line-height: 1.1; color: #fff; margin-bottom: 18px; }
  .hero-h1 em { color: #F5C87A; font-style: italic; }
  .passport-quote { font-family: var(--font-serif); font-size: 0.9rem; font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.7; margin-bottom: 24px; padding-left: 14px; border-left: 2px solid #F5C87A; max-width: 380px; }
  .hero-cta { background: var(--t); color: #fff; border: none; padding: 12px 28px; border-radius: 10px; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; transition: all 0.2s; }
  .hero-cta:hover { background: #8C3506; transform: translateY(-2px); }
  .hero-badge { position: absolute; bottom: 22px; right: 28px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 12px; padding: 10px 18px; text-align: center; backdrop-filter: blur(6px); }
  .hero-badge-val { font-family: var(--font-serif); font-size: 1.6rem; color: #fff; font-weight: 600; line-height: 1; }
  .hero-badge-lbl { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-top: 2px; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1.5px solid var(--bd); background: #fff; }
  .stat { padding: 16px 20px; text-align: center; border-right: 1px solid var(--bd); }
  .stat:last-child { border-right: none; }
  .stat-val { font-family: var(--font-serif); font-size: 1.8rem; font-weight: 600; color: var(--ink); line-height: 1; }
  .stat-lbl { font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fa); margin-top: 4px; }

  .today-strip { background: var(--tp); border-bottom: 1.5px solid var(--bd); padding: 14px 28px; display: flex; align-items: center; gap: 16px; }
  .today-label { font-size: 0.75rem; font-weight: 500; color: var(--mu); white-space: nowrap; }
  .today-track { flex: 1; height: 8px; background: var(--bd); border-radius: 4px; overflow: hidden; }
  .today-fill { height: 100%; background: var(--t); border-radius: 4px; width: 64%; }
  .today-pct { font-family: var(--font-serif); font-size: 1.1rem; font-weight: 600; color: var(--t); white-space: nowrap; }
  .today-btn { background: var(--t); color: #fff; border: none; padding: 7px 18px; border-radius: 8px; font-family: var(--font-sans); font-size: 0.78rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
  .today-btn:hover { background: #8C3506; }

  .section { padding: 28px; }
  .section-title { font-family: var(--font-serif); font-size: 1.4rem; color: var(--ink); margin-bottom: 4px; }
  .section-sub { font-size: 0.8rem; color: var(--fa); margin-bottom: 18px; }

  .cult-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .cult-card { border: 1.5px solid var(--bd); border-radius: 14px; overflow: hidden; cursor: pointer; transition: all 0.2s; background: #fff; }
  .cult-card:hover { border-color: var(--tm); transform: translateY(-3px); }
  .cult-img { height: 128px; overflow: hidden; position: relative; }
  .cult-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cult-img-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
  .cult-img-tag { position: absolute; top: 8px; left: 8px; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 8px; border-radius: 8px; background: rgba(26,18,8,0.55); color: rgba(255,255,255,0.92); }
  .cult-body { padding: 14px 16px; }
  .cult-title { font-family: var(--font-serif); font-size: 1rem; font-weight: 600; color: var(--ink); margin-bottom: 5px; }
  .cult-text { font-size: 0.75rem; color: var(--mu); line-height: 1.55; }

  .gesture-wrap { padding: 0 28px 28px; }
  .gesture-box { background: #fff; border: 1.5px solid var(--bd); border-radius: 16px; overflow: hidden; }
  .gesture-header { background: var(--t); padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; }
  .gesture-header-title { font-family: var(--font-serif); font-size: 1.15rem; color: #fff; font-style: italic; }
  .gesture-score { font-size: 0.8rem; color: rgba(255,255,255,0.82); font-weight: 500; }
  .gesture-body { padding: 22px 24px; }
  .gesture-round { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fa); margin-bottom: 12px; font-weight: 500; }
  .gesture-display { display: flex; align-items: center; gap: 20px; margin-bottom: 18px; }
  .gesture-emoji { font-size: 3.5rem; width: 90px; height: 90px; background: var(--tl); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--bd); flex-shrink: 0; }
  .gesture-italian { font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: var(--ink); }
  .gesture-phonetic { font-size: 0.76rem; color: var(--fa); margin-top: 3px; }
  .gesture-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
  .gesture-opt { padding: 11px 14px; border-radius: 9px; border: 1.5px solid var(--bd); background: var(--tp); font-size: 0.83rem; cursor: pointer; text-align: left; color: var(--ink); transition: all 0.15s; font-family: var(--font-sans); }
  .gesture-opt:hover:not(.answered) { border-color: var(--tm); background: var(--tl); }
  .gesture-opt.correct { border-color: var(--sa); background: var(--sl); color: #1A4A2E; font-weight: 600; }
  .gesture-opt.wrong { border-color: #D85A5A; background: #FCEAEA; color: #7A1A1A; }
  .gesture-opt.dim { opacity: 0.35; cursor: default; }
  .gesture-dots { display: flex; gap: 6px; margin-top: 14px; }
  .gesture-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--bd); }
  .gesture-dot.done { background: var(--t); }
  .gesture-dot.current { background: var(--tm); }

  .wod { background: var(--t); border-radius: 14px; padding: 24px 28px; color: #fff; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center; margin: 0 28px 28px; }
  .wod-tag { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7; margin-bottom: 8px; font-weight: 500; }
  .wod-word { font-family: var(--font-serif); font-size: 2.6rem; font-style: italic; }
  .wod-phon { font-size: 0.76rem; opacity: 0.75; margin-top: 4px; }
  .wod-trans { font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 6px; }
  .wod-ex { font-size: 0.8rem; opacity: 0.82; font-style: italic; line-height: 1.55; }

  .lv-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 16px; }
  .lv-card { border: 1.5px solid var(--bd); border-radius: 12px; padding: 16px 10px; text-align: center; cursor: pointer; transition: all 0.2s; background: #fff; position: relative; }
  .lv-card:hover:not(.locked) { border-color: var(--tm); transform: translateY(-2px); }
  .lv-card.active { border-color: var(--t); background: var(--tp); }
  .lv-card.done::after { content: '✓'; position: absolute; top: 7px; right: 9px; font-size: 0.65rem; color: var(--sa); font-weight: 700; }
  .lv-card.locked { opacity: 0.5; cursor: not-allowed; }
  .lv-icon { font-size: 2rem; margin-bottom: 7px; }
  .lv-name { font-family: var(--font-serif); font-size: 0.92rem; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .lv-code { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fa); }
  .lv-bar { height: 4px; background: var(--tl); border-radius: 2px; margin-top: 10px; overflow: hidden; }
  .lv-fill { height: 100%; border-radius: 2px; background: var(--t); }
  .lv-fill.done { background: var(--sa); }

  .page-header { background: var(--tp); border-bottom: 1.5px solid var(--bd); padding: 18px 28px; display: flex; align-items: center; gap: 16px; }
  .page-header h2 { font-family: var(--font-serif); font-size: 1.2rem; white-space: nowrap; }
  .progress-track { flex: 1; height: 7px; background: var(--bd); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--t); border-radius: 4px; transition: width 0.4s; }
  .page-counter { font-size: 0.76rem; color: var(--fa); white-space: nowrap; }

  .deck-tabs { display: flex; gap: 4px; padding: 14px 28px; border-bottom: 1px solid var(--bd); background: #fff; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .deck-tab { font-size: 0.76rem; font-weight: 500; padding: 6px 14px; border-radius: 20px; border: 1px solid var(--bd); background: transparent; color: var(--mu); cursor: pointer; white-space: nowrap; transition: all 0.15s; font-family: var(--font-sans); }
  .deck-tab:hover { border-color: var(--t); color: var(--t); }
  .deck-tab.active { background: var(--t); border-color: var(--t); color: #fff; }

  .fc-body { padding: 28px; display: flex; flex-direction: column; align-items: center; }
  .fc-hint { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--fa); margin-bottom: 14px; text-align: center; font-weight: 500; }
  .card-scene { perspective: 1200px; width: 100%; max-width: 480px; height: 250px; margin-bottom: 20px; cursor: pointer; }
  .card-3d { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
  .card-3d.flipped { transform: rotateY(180deg); }
  .card-face { position: absolute; inset: 0; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
  .card-front { background: #fff; border: 1.5px solid var(--bd); }
  .card-back { background: var(--t); transform: rotateY(180deg); }
  .card-face-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 12px; font-weight: 500; }
  .card-front .card-face-tag { color: var(--fa); }
  .card-back .card-face-tag { color: rgba(255,255,255,0.65); }
  .card-word { font-family: var(--font-serif); font-size: 3rem; font-style: italic; }
  .card-front .card-word { color: var(--ink); }
  .card-back .card-word { color: #fff; }
  .card-phonetic { font-size: 0.78rem; margin-top: 5px; }
  .card-front .card-phonetic { color: var(--fa); }
  .card-back .card-phonetic { color: rgba(255,255,255,0.72); }
  .card-example { font-size: 0.8rem; margin-top: 12px; text-align: center; line-height: 1.55; font-style: italic; color: rgba(255,255,255,0.84); max-width: 320px; }

  .rate-btns { display: flex; gap: 10px; width: 100%; max-width: 480px; }
  .rate-btn { flex: 1; padding: 11px; border-radius: 10px; border: 1.5px solid; font-family: var(--font-sans); font-size: 0.83rem; font-weight: 600; cursor: pointer; transition: all 0.15s; opacity: 0.35; }
  .rate-btn.enabled { opacity: 1; }
  .rate-btn.red { border-color: #E09090; color: #7A1A1A; background: #FCEAEA; }
  .rate-btn.amber { border-color: #D4B06A; color: #5C380A; background: var(--gl); }
  .rate-btn.green { border-color: #7ABF96; color: #1A4A2E; background: var(--sl); }
  .rate-btn.red.enabled:hover { background: #D85A5A; color: #fff; border-color: #D85A5A; }
  .rate-btn.amber.enabled:hover { background: var(--go); color: #fff; border-color: var(--go); }
  .rate-btn.green.enabled:hover { background: var(--sa); color: #fff; border-color: var(--sa); }

  .culture-note { background: var(--gl); border: 1.5px solid #E0C07A; border-radius: 12px; padding: 14px 18px; width: 100%; max-width: 480px; margin-top: 16px; }
  .cn-tag { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--go); margin-bottom: 6px; font-weight: 600; }
  .cn-text { font-size: 0.82rem; color: #4A3008; line-height: 1.55; }

  .quiz-body { max-width: 580px; margin: 0 auto; padding: 28px; }
  .quiz-eyebrow { font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--fa); margin-bottom: 6px; font-weight: 500; }
  .quiz-question { font-family: var(--font-serif); font-size: 1.75rem; color: var(--ink); line-height: 1.25; margin-bottom: 6px; }
  .quiz-sub { font-size: 0.8rem; color: var(--fa); margin-bottom: 22px; }
  .quiz-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .quiz-opt { padding: 13px 16px; border-radius: 10px; border: 1.5px solid var(--bd); background: #fff; font-size: 0.9rem; cursor: pointer; text-align: left; color: var(--ink); transition: all 0.15s; font-family: var(--font-sans); }
  .quiz-opt:hover:not(.answered) { border-color: var(--tm); background: var(--tp); }
  .quiz-opt.correct { border-color: var(--sa); background: var(--sl); color: #1A4A2E; font-weight: 600; }
  .quiz-opt.wrong { border-color: #D85A5A; background: #FCEAEA; color: #7A1A1A; }
  .quiz-opt.dim { opacity: 0.35; cursor: default; }
  .quiz-feedback { border-radius: 10px; padding: 13px 16px; font-size: 0.85rem; line-height: 1.55; margin-bottom: 14px; }
  .quiz-feedback.good { background: var(--sl); border: 1px solid #A0C8B0; color: #1A4A2E; }
  .quiz-feedback.bad { background: #FCEAEA; border: 1px solid #E0A0A0; color: #7A1A1A; }
  .quiz-next { width: 100%; padding: 12px; border-radius: 10px; background: var(--t); color: #fff; border: none; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .quiz-next:hover { background: #8C3506; }

  .result-box { text-align: center; padding: 40px 24px; background: #fff; border: 1.5px solid var(--bd); border-radius: 16px; }
  .result-icon { font-size: 3rem; margin-bottom: 12px; }
  .result-score { font-family: var(--font-serif); font-size: 4.5rem; color: var(--t); line-height: 1; }
  .result-of { font-size: 0.85rem; color: var(--fa); margin-bottom: 6px; }
  .result-msg { font-family: var(--font-serif); font-style: italic; font-size: 1.4rem; color: var(--ink); margin: 8px 0 24px; }

  .done-screen { width: 100%; max-width: 480px; background: #fff; border: 1.5px solid var(--bd); border-radius: 16px; padding: 36px 28px; text-align: center; margin-top: 8px; }
  .done-screen h3 { font-family: var(--font-serif); font-size: 2rem; font-style: italic; color: var(--ink); margin-bottom: 8px; }
  .done-screen p { font-size: 0.85rem; color: var(--mu); margin-bottom: 22px; line-height: 1.6; }

  .btn-primary { background: var(--t); color: #fff; border: none; padding: 11px 26px; border-radius: 10px; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary:hover { background: #8C3506; transform: translateY(-1px); }
`

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [deckKey, setDeckKey] = useState<DeckKey>('daily')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [fcDone, setFcDone] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)
  const [quizDone, setQuizDone] = useState(false)
  const [gestureIndex, setGestureIndex] = useState(0)
  const [gestureScore, setGestureScore] = useState(0)
  const [gestureAnswered, setGestureAnswered] = useState(false)
  const [gestureSelected, setGestureSelected] = useState<number | null>(null)
  const [gestureDone, setGestureDone] = useState(false)

  const deck = DECKS[deckKey]
  const card = deck[cardIndex]

  const flipCard = () => { if (!flipped) setFlipped(true) }
  const rateCard = () => {
    if (!flipped) return
    if (cardIndex + 1 >= deck.length) { setFcDone(true); return }
    setCardIndex(i => i + 1); setFlipped(false)
  }
  const changeDeck = (key: DeckKey) => { setDeckKey(key); setCardIndex(0); setFlipped(false); setFcDone(false) }

  const answerQuiz = (i: number) => {
    if (quizAnswered) return
    setQuizAnswered(true); setQuizSelected(i)
    if (i === QUIZ_QUESTIONS[quizIndex].answer) setQuizScore(s => s + 1)
  }
  const nextQuiz = () => {
    if (quizIndex + 1 >= QUIZ_QUESTIONS.length) { setQuizDone(true); return }
    setQuizIndex(i => i + 1); setQuizAnswered(false); setQuizSelected(null)
  }
  const resetQuiz = () => { setQuizIndex(0); setQuizScore(0); setQuizAnswered(false); setQuizSelected(null); setQuizDone(false) }

  const answerGesture = (i: number) => {
    if (gestureAnswered) return
    setGestureAnswered(true); setGestureSelected(i)
    if (i === GESTURE_QUESTIONS[gestureIndex].answer) setGestureScore(s => s + 1)
  }
  const nextGesture = () => {
    if (gestureIndex + 1 >= GESTURE_QUESTIONS.length) { setGestureDone(true); return }
    setGestureIndex(i => i + 1); setGestureAnswered(false); setGestureSelected(null)
  }
  const resetGesture = () => { setGestureIndex(0); setGestureScore(0); setGestureAnswered(false); setGestureSelected(null); setGestureDone(false) }

  const goTo = (p: Page) => {
    setPage(p)
    if (p === 'flashcards') { setCardIndex(0); setFlipped(false); setFcDone(false) }
    if (p === 'quiz') resetQuiz()
  }

  const currentQ = QUIZ_QUESTIONS[quizIndex]
  const currentG = GESTURE_QUESTIONS[gestureIndex]
  const fcProgress = Math.round((cardIndex / deck.length) * 100)
  const qzProgress = Math.round((quizIndex / QUIZ_QUESTIONS.length) * 100)
  const resultMsgs = ['Keep going!', 'Bene! Good effort.', 'Molto bene!', 'Quasi perfetto!', 'Ottimo!', 'Magnifico! Perfetto!']

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-logo-wrap">
          <div className="nav-avatar">
            <img src={IMG.hero} alt="La Dolce Lingua" />
          </div>
          <div className="nav-logo" onClick={() => goTo('home')}>
            La Dolce Lingua
            <small>Italian for English speakers</small>
          </div>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab ${page === 'home' ? 'active' : ''}`} onClick={() => goTo('home')}>Home</button>
          <button className={`nav-tab ${page === 'flashcards' ? 'active' : ''}`} onClick={() => goTo('flashcards')}>Flashcards</button>
          <button className={`nav-tab ${page === 'quiz' ? 'active' : ''}`} onClick={() => goTo('quiz')}>Quiz</button>
        </div>
        <div className="nav-right">
          <span className="streak-badge">🔥 7-day streak</span>
          <span className="xp-badge">✦ 340 XP</span>
        </div>
      </nav>

      {page === 'home' && (
        <>
          <div className="hero">
            <img className="hero-img" src={IMG.hero} alt="Italian village street with Vespa, lemon trees and laundry" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="eyebrow">Bentornato · Welcome back</div>
              <h1 className="hero-h1">Speak Italian<br />like a <em>vero</em><br />italiano.</h1>
              <p className="passport-quote">"This is not a typical language app. It is a cultural passport — for the person who understands that to speak Italian well, one must first understand how Italians think, feel, and live."</p>
              <button className="hero-cta" onClick={() => goTo('flashcards')}>▶ Today's lesson</button>
            </div>
            <div className="hero-badge">
              <div className="hero-badge-val">A2</div>
              <div className="hero-badge-lbl">Current level</div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat"><div className="stat-val">142</div><div className="stat-lbl">Words learned</div></div>
            <div className="stat"><div className="stat-val">7</div><div className="stat-lbl">Day streak 🔥</div></div>
            <div className="stat"><div className="stat-val">81%</div><div className="stat-lbl">Accuracy</div></div>
            <div className="stat"><div className="stat-val">340</div><div className="stat-lbl">XP earned</div></div>
          </div>

          <div className="today-strip">
            <div className="today-label">Today's goal</div>
            <div className="today-track"><div className="today-fill" /></div>
            <div className="today-pct">64%</div>
            <button className="today-btn" onClick={() => goTo('flashcards')}>Continue →</button>
          </div>

          <div className="section">
            <div className="section-title">Cultura italiana 🇮🇹</div>
            <div className="section-sub">Language lives inside culture. Learn both.</div>
            <div className="cult-grid">
              {[
                { img: IMG.caffe, bg: '#F5EBE3', emoji: '☕', tag: 'Food & Drink', title: 'Il caffè — not just coffee', text: 'Italians stand at the bar, knock back an espresso in two sips, and leave. "Un caffè" always means espresso.' },
                { img: IMG.passeggiata, bg: '#FBF2E0', emoji: '🌅', tag: 'Daily Life', title: 'La passeggiata', text: 'Every evening, Italians stroll the main street — not for exercise, but for being seen and living slowly.' },
                { img: IMG.pranzo, bg: '#EBF4EF', emoji: '🍝', tag: 'Family & Food', title: 'Il pranzo domenicale', text: 'Sunday lunch is sacred — long, loud, multi-course. Family first, phones stay in pockets.' },
              ].map((c, i) => (
                <div className="cult-card" key={i} onClick={() => goTo('flashcards')}>
                  <div className="cult-img">
                    <img src={c.img} alt={c.title} onError={(e) => {
                      const el = e.target as HTMLImageElement
                      el.style.display = 'none'
                      const fb = el.parentElement!.querySelector('.cult-img-fallback') as HTMLElement
                      if (fb) { fb.style.display = 'flex'; fb.style.background = c.bg }
                    }} />
                    <div className="cult-img-fallback" style={{ display: 'none', background: c.bg }}>{c.emoji}</div>
                    <div className="cult-img-tag">{c.tag}</div>
                  </div>
                  <div className="cult-body">
                    <div className="cult-title">{c.title}</div>
                    <div className="cult-text">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gesture-wrap">
            <div className="section-title" style={{ marginBottom: 4 }}>🤌 Gesture game — <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>i gesti italiani</em></div>
            <div className="section-sub" style={{ marginBottom: 14 }}>Match the gesture to its meaning. Can you read an Italian without words?</div>
            <div className="gesture-box">
              <div className="gesture-header">
                <div className="gesture-header-title">What does this gesture mean?</div>
                <div className="gesture-score">{gestureScore} / {GESTURE_QUESTIONS.length} correct</div>
              </div>
              <div className="gesture-body">
                {gestureDone ? (
                  <div style={{ textAlign: 'center', padding: '16px 0' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--ink)', marginBottom: 8 }}>
                      {gestureScore === GESTURE_QUESTIONS.length ? 'Perfetto!' : 'Bravo!'}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--mu)', marginBottom: 18 }}>You scored {gestureScore} / {GESTURE_QUESTIONS.length} on the gesture game.</p>
                    <button className="btn-primary" onClick={resetGesture}>↺ Play again</button>
                  </div>
                ) : (
                  <>
                    <div className="gesture-round">Round {gestureIndex + 1} of {GESTURE_QUESTIONS.length}</div>
                    <div className="gesture-display">
                      <div className="gesture-emoji">{currentG.emoji}</div>
                      <div>
                        <div className="gesture-italian">{currentG.italian}</div>
                        <div className="gesture-phonetic">{currentG.phonetic}</div>
                      </div>
                    </div>
                    <div className="gesture-opts">
                      {currentG.options.map((opt, i) => {
                        let cls = 'gesture-opt'
                        if (gestureAnswered) {
                          if (i === currentG.answer) cls += ' correct'
                          else if (i === gestureSelected) cls += ' wrong'
                          else cls += ' dim'
                          cls += ' answered'
                        }
                        return <button key={i} className={cls} onClick={() => answerGesture(i)}>{opt}</button>
                      })}
                    </div>
                    {gestureAnswered && (
                      <div style={{ borderRadius: 10, padding: '12px 16px', fontSize: '0.83rem', lineHeight: 1.55, marginBottom: 12, background: gestureSelected === currentG.answer ? 'var(--sl)' : '#FCEAEA', border: `1px solid ${gestureSelected === currentG.answer ? '#A0C8B0' : '#E0A0A0'}`, color: gestureSelected === currentG.answer ? '#1A4A2E' : '#7A1A1A' }}>
                        {gestureSelected === currentG.answer ? '✓ Esatto! ' : `✗ The answer is "${currentG.options[currentG.answer]}". `}{currentG.tip}
                      </div>
                    )}
                    {gestureAnswered && (
                      <button className="btn-primary" onClick={nextGesture}>
                        {gestureIndex + 1 < GESTURE_QUESTIONS.length ? 'Next gesture →' : 'See results →'}
                      </button>
                    )}
                    <div className="gesture-dots">
                      {GESTURE_QUESTIONS.map((_, i) => (
                        <div key={i} className={`gesture-dot${i < gestureIndex ? ' done' : i === gestureIndex ? ' current' : ''}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="wod">
            <div>
              <div className="wod-tag">✦ Word of the day</div>
              <div className="wod-word">magari</div>
              <div className="wod-phon">/maˈɡa.ri/</div>
            </div>
            <div>
              <div className="wod-trans">if only · maybe · I wish</div>
              <div className="wod-ex">"Vuoi venire a Roma?" "Magari!" — Would you like to come to Rome? "If only I could!"</div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Your journey</div>
            <div className="section-sub">Master each level to unlock the next — language and culture deepen together.</div>
            <div className="lv-grid">
              {[
                { icon: '🌱', name: 'Principiante', code: 'A1', pct: 100, state: 'done' },
                { icon: '☕', name: 'Esploratore', code: 'A2', pct: 40, state: 'active' },
                { icon: '🍝', name: 'Conversatore', code: 'B1', pct: 0, state: 'locked' },
                { icon: '🎭', name: 'Avanzato', code: 'B2', pct: 0, state: 'locked' },
                { icon: '🏛️', name: 'Maestro', code: 'C1–C2', pct: 0, state: 'locked' },
              ].map((lv, i) => (
                <div key={i} className={`lv-card ${lv.state}`} onClick={() => lv.state !== 'locked' && goTo('flashcards')}>
                  <div className="lv-icon">{lv.icon}</div>
                  <div className="lv-name">{lv.name}</div>
                  <div className="lv-code">{lv.code}</div>
                  <div className="lv-bar">
                    <div className={`lv-fill${lv.state === 'done' ? ' done' : ''}`} style={{ width: `${lv.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {page === 'flashcards' && (
        <>
          <div className="page-header">
            <h2>Flashcards</h2>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${fcProgress}%` }} /></div>
            <div className="page-counter">{Math.min(cardIndex + 1, deck.length)} / {deck.length}</div>
          </div>
          <div className="deck-tabs">
            {([
              ['daily', '📅 Daily set · A2'],
              ['verbs', '🔤 Verbs · A2'],
              ['food', '🍝 Food & drink'],
              ['culture', '🎭 Culture words'],
              ['b1', '📖 B1 — Intermediate'],
              ['b2', '✍️ B2 — Upper'],
            ] as [DeckKey, string][]).map(([key, label]) => (
              <button key={key} className={`deck-tab ${deckKey === key ? 'active' : ''}`} onClick={() => changeDeck(key)}>{label}</button>
            ))}
          </div>
          <div className="fc-body">
            {fcDone ? (
              <div className="done-screen">
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎉</div>
                <h3>Bravo!</h3>
                <p>You completed the <strong>{deckKey}</strong> deck.<br />Your streak grows stronger. Ready to test yourself?</p>
                <button className="btn-primary" onClick={() => goTo('quiz')}>Take the quiz →</button>
              </div>
            ) : (
              <>
                <div className="fc-hint">{flipped ? 'How well did you know it?' : 'Tap the card to reveal the answer'}</div>
                <div className="card-scene" onClick={flipCard}>
                  <div className={`card-3d ${flipped ? 'flipped' : ''}`}>
                    <div className="card-face card-front">
                      <div className="card-face-tag">🇮🇹 Italian</div>
                      <div className="card-word">{card.word}</div>
                      <div className="card-phonetic">{card.phonetic}</div>
                    </div>
                    <div className="card-face card-back">
                      <div className="card-face-tag">🇬🇧 English</div>
                      <div className="card-word" style={{ fontSize: '2rem' }}>{card.translation}</div>
                      <div className="card-phonetic">{card.category}</div>
                      <div className="card-example">{card.example}</div>
                    </div>
                  </div>
                </div>
                <div className="rate-btns">
                  <button className={`rate-btn red ${flipped ? 'enabled' : ''}`} onClick={rateCard}>✗ Didn't know</button>
                  <button className={`rate-btn amber ${flipped ? 'enabled' : ''}`} onClick={rateCard}>~ Hard</button>
                  <button className={`rate-btn green ${flipped ? 'enabled' : ''}`} onClick={rateCard}>✓ Got it!</button>
                </div>
                {flipped && (
                  <div className="culture-note">
                    <div className="cn-tag">✦ Culture note</div>
                    <div className="cn-text">{card.cultureNote}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {page === 'quiz' && (
        <>
          <div className="page-header">
            <h2>Daily Quiz</h2>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${quizDone ? 100 : qzProgress}%` }} /></div>
            <div className="page-counter">{Math.min(quizIndex + 1, QUIZ_QUESTIONS.length)} / {QUIZ_QUESTIONS.length}</div>
          </div>
          <div className="quiz-body">
            {quizDone ? (
              <div className="result-box">
                <div className="result-icon">🏆</div>
                <div className="result-score">{quizScore}/{QUIZ_QUESTIONS.length}</div>
                <div className="result-of">correct answers</div>
                <div className="result-msg">{resultMsgs[Math.min(quizScore, resultMsgs.length - 1)]}</div>
                <button className="btn-primary" style={{ margin: '0 auto' }} onClick={resetQuiz}>↺ Try again</button>
              </div>
            ) : (
              <>
                <div className="quiz-eyebrow">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</div>
                <div className="quiz-question">{currentQ.question}</div>
                <div className="quiz-sub">Choose the correct answer</div>
                <div className="quiz-opts">
                  {currentQ.options.map((opt, i) => {
                    let cls = 'quiz-opt'
                    if (quizAnswered) {
                      if (i === currentQ.answer) cls += ' correct'
                      else if (i === quizSelected) cls += ' wrong'
                      else cls += ' dim'
                      cls += ' answered'
                    }
                    return <button key={i} className={cls} onClick={() => answerQuiz(i)}>{opt}</button>
                  })}
                </div>
                {quizAnswered && (
                  <div className={`quiz-feedback ${quizSelected === currentQ.answer ? 'good' : 'bad'}`}>
                    {quizSelected === currentQ.answer
                      ? `✓ Esatto! ${currentQ.tip}`
                      : `✗ The answer is "${currentQ.options[currentQ.answer]}". ${currentQ.tip}`}
                  </div>
                )}
                {quizAnswered && (
                  <button className="quiz-next" onClick={nextQuiz}>
                    {quizIndex + 1 < QUIZ_QUESTIONS.length ? 'Next question →' : 'See results →'}
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
