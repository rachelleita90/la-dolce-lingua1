import { useState, useEffect } from "react";

// ── ELEGANT PALETTE ───────────────────────────────────────
const C = {
  black:    "#0C0C0C",
  charcoal: "#1A1A1A",
  smoke:    "#2A2A2A",
  ivory:    "#F7F3EC",
  cream:    "#EDE8DF",
  champagne:"#C9A96E",
  gold:     "#B8965A",
  blue:     "#4A7FA5",
  blueL:    "#7BAEC8",
  blueSoft: "#1C3A50",
  white:    "#FFFFFF",
  grey:     "#6B6B6B",
  greyL:    "#9A9A8A",
  greyXL:   "#C8C8B8",
};

// ── PHOTO SETS (Wikimedia Commons — free, no CORS issues) ──
const PHOTOS = {
  hero:      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rome_Colosseum_evening.jpg/800px-Rome_Colosseum_evening.jpg",
  amalfi:    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Positano%2C_Amalfi_Coast.jpg/800px-Positano%2C_Amalfi_Coast.jpg",
  espresso:  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",
  vespa:     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Vespa_125_1948.jpg/640px-Vespa_125_1948.jpg",
  colosseum: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/800px-Colosseo_2020.jpg",
  trevi:     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Trevi_Fountain%2C_Rome%2C_Italy_2_%28cropped%29.jpg/640px-Trevi_Fountain%2C_Rome%2C_Italy_2_%28cropped%29.jpg",
  pasta:     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_bolognese2.jpg/640px-Spaghetti_bolognese2.jpg",
  market:    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Campo_de%27_Fiori_Rome.jpg/800px-Campo_de%27_Fiori_Rome.jpg",
};

// ── DATA ─────────────────────────────────────────────────
const PHRASES = [
  { en:"Good morning, may I have a coffee?", it:"Buongiorno, posso avere un caffè?", cat:"Al Bar", drama:1, tip:"Say 'caffè' — in Italy that already means espresso" },
  { en:"This is the most delicious thing I've ever eaten!", it:"È la cosa più buona che abbia mai mangiato!", cat:"A Tavola", drama:5, tip:"Use after every pasta — guaranteed new friends" },
  { en:"Where is the bathroom?", it:"Dov'è il bagno?", cat:"Essentials", drama:1, tip:"'Bagno' works everywhere in Italy" },
  { en:"How much does this cost?", it:"Quanto costa?", cat:"Shopping", drama:2, tip:"Add a dramatic pause and sigh for full effect" },
  { en:"I'm completely in love with Rome", it:"Mi sono perdutamente innamorato di Roma", cat:"Emotion", drama:5, tip:"'Perdutamente' means hopelessly — extra romantic" },
  { en:"I don't understand anything", it:"Non capisco assolutamente niente", cat:"Essentials", drama:3, tip:"The dramatic version — hands out, eyebrows raised" },
  { en:"Shall we have one more glass of wine?", it:"Prendiamo ancora un bicchiere di vino?", cat:"Sociale", drama:4, tip:"How all great Italian evenings continue" },
  { en:"The bill, please", it:"Il conto, per favore", cat:"Ristorante", drama:1, tip:"Always ask — they never bring it automatically" },
  { en:"That is absolutely impossible", it:"È assolutamente impossibile!", cat:"Emotion", drama:5, tip:"Both hands up, slight lean back" },
  { en:"My name is...", it:"Mi chiamo...", cat:"Essentials", drama:1, tip:"Literally 'I call myself' — elegant Italian" },
  { en:"What do you recommend?", it:"Cosa consiglia?", cat:"Ristorante", drama:2, tip:"Formal and correct in any restaurant" },
  { en:"Beautiful! Wonderful!", it:"Che bello! Meraviglioso!", cat:"Emotion", drama:4, tip:"Eyes wide, hand to heart — the full Italian experience" },
];

const GRAMMAR = [
  {
    title:"Essere — To Be", tag:"Verb",
    subtitle:"The foundation of Italian",
    table:[["io","sono","I am"],["tu","sei","you are"],["lui / lei","è","he / she is"],["noi","siamo","we are"],["voi","siete","you all are"],["loro","sono","they are"]],
    example:"Sono italiano. — I am Italian.",
    tip:"'Sono' means both 'I am' and 'they are' — context is everything in Italian"
  },
  {
    title:"Avere — To Have", tag:"Verb",
    subtitle:"For possession and past tenses",
    table:[["io","ho","I have"],["tu","hai","you have"],["lui / lei","ha","he / she has"],["noi","abbiamo","we have"],["voi","avete","you all have"],["loro","hanno","they have"]],
    example:"Ho fame. — I am hungry. (lit: I have hunger)",
    tip:"Italians 'have' hunger, thirst, heat, cold — not 'are' them"
  },
  {
    title:"Gender of Nouns", tag:"Structure",
    subtitle:"Everything is masculine or feminine",
    table:[["il / i","masculine","il vino → i vini"],["la / le","feminine","la pasta → le paste"],["l'","before vowels","l'amore, l'uomo"],["lo / gli","special cases","lo studente"]],
    example:"Il cappuccino è buono. La pizza è buona.",
    tip:"Adjectives must agree in gender — buono/buona, bello/bella, italiano/italiana"
  },
  {
    title:"Verbs in -ARE", tag:"Verb",
    subtitle:"The most common verb group",
    table:[["io","-o","parlo — I speak"],["tu","-i","parli — you speak"],["lui/lei","-a","parla — he/she speaks"],["noi","-iamo","parliamo — we speak"],["voi","-ate","parlate — you speak"],["loro","-ano","parlano — they speak"]],
    example:"Parli italiano molto bene! — You speak Italian very well!",
    tip:"Most Italian verbs follow this pattern. Learn it once, apply it to hundreds of verbs"
  },
];

const CONVERSATIONS = [
  { scene:"Al Bar", location:"A coffee bar in Naples, 7am", icon:"☕", photo: PHOTOS.espresso,
    lines:[
      {role:"you",it:"Buongiorno!",en:"Good morning!"},
      {role:"it",it:"Buongiorno! Prego?",en:"Good morning! What would you like?"},
      {role:"you",it:"Un caffè, per favore.",en:"A coffee please."},
      {role:"it",it:"Subito! Vuole anche qualcosa da mangiare?",en:"Right away! Would you like something to eat too?"},
      {role:"you",it:"No grazie, solo il caffè.",en:"No thank you, just the coffee."},
      {role:"it",it:"Eccolo! Sono due euro.",en:"Here you go! That's two euros."},
      {role:"you",it:"Grazie mille!",en:"Thank you so much!"},
    ]},
  { scene:"Le Presentazioni", location:"A terrace in Rome, evening", icon:"🥂", photo: PHOTOS.trevi,
    lines:[
      {role:"you",it:"Ciao! Mi chiamo Anna, piacere.",en:"Hi! I'm Anna, nice to meet you."},
      {role:"it",it:"Piacere mio! Sono Marco. Di dove sei?",en:"The pleasure is mine! I'm Marco. Where are you from?"},
      {role:"you",it:"Sono olandese, ma abito a Milano.",en:"I'm Dutch, but I live in Milan."},
      {role:"it",it:"Ah che bello! E parli benissimo italiano!",en:"Oh how lovely! And you speak Italian beautifully!"},
      {role:"you",it:"Grazie, sto ancora imparando.",en:"Thank you, I'm still learning."},
      {role:"it",it:"Non si direbbe! Sei bravissima.",en:"You wouldn't know it! You're very good."},
    ]},
  { scene:"Al Ristorante", location:"A trattoria in Trastevere", icon:"🍝", photo: PHOTOS.pasta,
    lines:[
      {role:"it",it:"Buonasera! Ha prenotato?",en:"Good evening! Did you make a reservation?"},
      {role:"you",it:"Sì, ho prenotato a nome Smith.",en:"Yes, I booked under the name Smith."},
      {role:"it",it:"Perfetto, la accompagno al tavolo.",en:"Perfect, let me show you to your table."},
      {role:"you",it:"Cosa consiglia stasera?",en:"What do you recommend tonight?"},
      {role:"it",it:"La pasta cacio e pepe è eccellente!",en:"The cacio e pepe pasta is excellent!"},
      {role:"you",it:"Perfetto. E un bicchiere di vino rosso.",en:"Perfect. And a glass of red wine."},
      {role:"it",it:"Ottima scelta! Buon appetito!",en:"Excellent choice! Enjoy your meal!"},
    ]},
];

const GESTURES = [
  {name:"Ma che vuoi?", meaning:"What on earth do you want?!", when:"When someone says something completely illogical", how:"Bring all fingertips together pointing upward, then shake the hand"},
  {name:"Perfetto!", meaning:"Absolutely perfect — often about food", when:"After a sublime meal or when something is exactly right", how:"Fingertips to lips, then open the hand outward with a light kiss"},
  {name:"Vai via!", meaning:"Go away / I'm done with this", when:"When dismissing someone or a situation entirely", how:"Hand held flat, wave firmly downward"},
  {name:"Non me ne frega!", meaning:"I couldn't care less", when:"When something genuinely doesn't concern you", how:"Rub thumb slowly across the fingertips, completely relaxed expression"},
  {name:"Aspetta...", meaning:"Wait just a moment...", when:"To pause someone while you gather your thoughts", how:"Single index finger raised, wave it slowly side to side"},
];

const CULTURA = [
  {emoji:"☕", title:"The Cappuccino Rule", photo: PHOTOS.espresso, fact:"A cappuccino after 11am is one of the most reliable ways to identify a tourist in Italy. Milk-based coffee is exclusively a morning drink. After noon: espresso only. This is not a suggestion.", compare:"Northern Europe: coffee all day long | Italy: cappuccino before noon, never after"},
  {emoji:"🍝", title:"The Sanctity of Pasta", photo: PHOTOS.pasta, fact:"Breaking spaghetti before cooking, adding ketchup, or serving pasta as a side dish — these are not simply wrong choices. They are small cultural violations that Italians will remember. Pasta has rules, and the rules matter.", compare:"Abroad: pasta as accompaniment | Italy: pasta is the protagonist"},
  {emoji:"⏰", title:"Italian Time", photo: PHOTOS.market, fact:"'Arrivo subito' translates as 'coming right now' but means anywhere from five minutes to two hours. Dinner at 8pm means 8:45 at the earliest. This is not impoliteness — it is a different relationship with time entirely.", compare:"Northern Europe: 5 minutes early is polite | Italy: 30 minutes late is arrival"},
  {emoji:"👗", title:"La Bella Figura", photo: PHOTOS.vespa, fact:"Appearing well is not vanity in Italy — it is a form of respect. For yourself, and for the people around you. Italians dress with care to buy bread. What you wear communicates who you are.", compare:"Abroad: comfort and practicality first | Italy: elegance is a daily practice"},
  {emoji:"🏠", title:"Mammismo", photo: PHOTOS.colosseum, fact:"Italian men live at home on average until their early thirties. The mother cooks, cleans, and remains a central figure throughout adult life. This is not a failure of independence — it is a different model of family entirely.", compare:"Northern Europe: leave home at 18-22 | Italy: family home is always home"},
];

const GIOCO = [
  {q:"An Italian orders a cappuccino with lunch", a:false, explain:"Cappuccino is strictly a morning drink. After 11am, only espresso."},
  {q:"You break spaghetti in half before cooking", a:false, explain:"Never break pasta. This is practically a cultural crime in Italy."},
  {q:"You say 'prego' after someone thanks you", a:true, explain:"Exactly right — 'prego' is the elegant way to say 'you're welcome'."},
  {q:"Dinner in Italy typically starts at 6pm", a:false, explain:"Italians dine at 8 to 9pm. Six o'clock is unimaginably early."},
  {q:"You greet a stranger with 'Ciao'", a:false, explain:"'Ciao' is informal. With strangers always use 'Buongiorno' or 'Buonasera'."},
  {q:"Every person orders their own pizza in Italy", a:true, explain:"In Italy pizza is individual — one per person, not shared."},
  {q:"'Salute!' is said when someone sneezes", a:true, explain:"Correct. 'Salute' means both 'health' and is used as 'cheers' too."},
  {q:"Adding olive oil to pasta water is standard", a:false, explain:"Real Italian cooks never do this — it prevents sauce from adhering."},
];

// ── HELPERS ───────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "it-IT"; u.rate = 0.82; u.pitch = 1.05;
  const v = window.speechSynthesis.getVoices().find(x => x.lang.startsWith("it"));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

const DRAMA = ["","Tranquillo","Normale","Con Passione","Drammatico","Opera Pura"];
const DRAMA_C = ["",C.grey,C.blueL,C.champagne,"#C0784A","#9A6BC0"];

function DramaMeter({ level }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{fontSize:10,letterSpacing:2,color:C.grey,textTransform:"uppercase",width:70,flexShrink:0}}>Drama</div>
      <div style={{display:"flex",gap:3,flex:1}}>
        {[1,2,3,4,5].map(i=>(
          <div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=level?DRAMA_C[level]:"#222",transition:"background 0.3s"}}/>
        ))}
      </div>
      <div style={{fontSize:10,color:DRAMA_C[level],fontStyle:"italic",width:80,textAlign:"right",flexShrink:0}}>{DRAMA[level]}</div>
    </div>
  );
}

// ── PHOTO COMPONENT ───────────────────────────────────────
function Photo({ src, height=200, style={} }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{position:"relative",height,overflow:"hidden",...style}}>
      {!loaded && <div style={{position:"absolute",inset:0,background:"#1A1A1A",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:11,color:C.grey,letterSpacing:2}}>LOADING</div></div>}
      <img src={src} onLoad={()=>setLoaded(true)} style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(60%) contrast(1.1)",opacity:loaded?1:0,transition:"opacity 0.6s"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 40%, rgba(12,12,12,0.85) 100%)"}}/>
    </div>
  );
}

// ── TAG ───────────────────────────────────────────────────
function Tag({ children, color=C.blue }) {
  return (
    <span style={{fontSize:9,letterSpacing:3,color,textTransform:"uppercase",fontWeight:"bold",border:`1px solid ${color}`,padding:"2px 6px",borderRadius:2}}>{children}</span>
  );
}

// ── BTN ───────────────────────────────────────────────────
function Btn({ children, onClick, variant="primary", style={} }) {
  const base = {border:"none",borderRadius:2,padding:"13px 20px",cursor:"pointer",fontFamily:"inherit",fontSize:12,letterSpacing:3,textTransform:"uppercase",fontWeight:"bold",transition:"opacity 0.2s",...style};
  const variants = {
    primary:{background:C.blue,color:C.ivory},
    secondary:{background:"transparent",color:C.greyXL,border:`1px solid #333`},
    gold:{background:"transparent",color:C.champagne,border:`1px solid ${C.champagne}`},
  };
  return <button onClick={onClick} style={{...base,...variants[variant]}}>{children}</button>;
}

// ── HOME PAGE ─────────────────────────────────────────────
function HomePage({ setPage }) {
  const [tick, setTick] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setTick(x=>x+1),4000); return()=>clearInterval(t); },[]);
  const quotes = [
    "La lingua più bella del mondo",
    "Impara, mangia, ama, vivi",
    "Parla come un italiano vero",
    "La dolce vita comincia qui",
  ];

  return (
    <div style={{background:C.black,minHeight:"100vh",fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",color:C.ivory}}>

      {/* MASTHEAD */}
      <div style={{padding:"14px 20px",borderBottom:`1px solid #1E1E1E`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:9,letterSpacing:4,color:C.grey,textTransform:"uppercase"}}>Vol. I · Anno 2026</div>
        <div style={{fontSize:9,letterSpacing:4,color:C.grey,textTransform:"uppercase"}}>Roma · Milano · Napoli</div>
      </div>

      {/* HERO IMAGE */}
      <div style={{position:"relative",height:420,overflow:"hidden"}}>
        <img
          src={PHOTOS.hero}
          style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(70%) contrast(1.15) brightness(0.75)"}}
        />
        {/* Grain */}
        <div style={{position:"absolute",inset:0,opacity:0.08,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,pointerEvents:"none"}}/>
        {/* Vignette */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, transparent 30%, transparent 40%, rgba(12,12,12,0.95) 100%)"}}/>

        {/* Hero text */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 24px"}}>
          <div style={{fontSize:10,letterSpacing:4,color:C.blueL,textTransform:"uppercase",marginBottom:10,opacity:0.9}}>
            — {quotes[tick % quotes.length]} —
          </div>
          <h1 style={{margin:0,fontWeight:"900",fontStyle:"italic",color:C.ivory,lineHeight:1,letterSpacing:-2}}>
            <span style={{fontSize:56,display:"block"}}>La Dolce</span>
            <span style={{fontSize:56,display:"block",color:C.champagne}}>Lingua</span>
          </h1>
          <p style={{margin:"12px 0 0",fontSize:12,color:C.greyXL,letterSpacing:1,lineHeight:1.7,maxWidth:300}}>
            Italian for the person who wants to live the language — not just learn it.
          </p>
        </div>
      </div>

      {/* GOLD RULE */}
      <div style={{background:C.champagne,height:2}}/>

      {/* TAGLINE STRIP */}
      <div style={{padding:"12px 20px",background:"#111",borderBottom:`1px solid #1E1E1E`}}>
        <div style={{fontSize:9,letterSpacing:4,color:C.champagne,textTransform:"uppercase",textAlign:"center"}}>
          Frasi · Grammatica · Conversazione · Gesti · Cultura · Il Gioco
        </div>
      </div>

      {/* INTRO */}
      <div style={{padding:"28px 20px"}}>
        <div style={{borderLeft:`2px solid ${C.blue}`,paddingLeft:16,marginBottom:28}}>
          <p style={{margin:0,fontSize:14,color:C.greyXL,lineHeight:1.9,fontStyle:"italic"}}>
            "This is not a typical language app. It is a cultural passport — for the person who understands that to speak Italian well, one must first understand how Italians think, feel, and live."
          </p>
        </div>

        {/* PHOTO GRID */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:24}}>
          {[
            {src:PHOTOS.vespa, label:"La Vita in Movimento"},
            {src:PHOTOS.amalfi, label:"La Costa Amalfitana"},
            {src:PHOTOS.espresso, label:"Il Rito del Caffè"},
            {src:PHOTOS.colosseum, label:"L'Eterna Città"},
          ].map((item,i)=>(
            <div key={i} style={{position:"relative",height:110,overflow:"hidden",borderRadius:2}}>
              <img src={item.src} style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(50%) contrast(1.1)"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(12,12,12,0.85) 0%, transparent 60%)"}}/>
              <div style={{position:"absolute",bottom:6,left:8,fontSize:8,color:C.champagne,letterSpacing:2,textTransform:"uppercase"}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"0 0 24px"}}>
          <div style={{flex:1,height:1,background:"#1E1E1E"}}/>
          <div style={{fontSize:14,color:C.champagne}}>✦</div>
          <div style={{flex:1,height:1,background:"#1E1E1E"}}/>
        </div>

        {/* SECTION CARDS */}
        <div style={{display:"flex",flexDirection:"column",gap:6,paddingBottom:20}}>
          {[
            {page:"phrases",  num:"01", title:"Frasi",          sub:"Essential phrases for real life", photo:PHOTOS.market},
            {page:"grammar",  num:"02", title:"Grammatica",     sub:"Structure, verbs and grammar rules", photo:PHOTOS.colosseum},
            {page:"conversation",num:"03",title:"Conversazione",sub:"Full dialogues in Italian settings", photo:PHOTOS.espresso},
            {page:"gestures", num:"04", title:"I Gesti",        sub:"The Italian language of hands", photo:PHOTOS.trevi},
            {page:"cultura",  num:"05", title:"Cultura",        sub:"What nobody tells you about Italy", photo:PHOTOS.amalfi},
            {page:"gioco",    num:"06", title:"Il Gioco",       sub:"Would an Italian do this? Play & learn", photo:PHOTOS.vespa},
          ].map(item=>(
            <button key={item.page} onClick={()=>setPage(item.page)} style={{
              background:C.charcoal,border:`1px solid #222`,borderRadius:2,
              padding:0,cursor:"pointer",textAlign:"left",fontFamily:"inherit",
              display:"flex",alignItems:"center",overflow:"hidden",
            }}>
              <div style={{width:64,height:64,flexShrink:0,position:"relative",overflow:"hidden"}}>
                <img src={item.photo} style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(60%)"}}/>
              </div>
              <div style={{padding:"12px 14px",flex:1}}>
                <div style={{fontSize:9,color:C.champagne,letterSpacing:3,textTransform:"uppercase",marginBottom:3}}>{item.num}</div>
                <div style={{fontSize:16,fontWeight:"900",fontStyle:"italic",color:C.ivory,lineHeight:1}}>{item.title}</div>
                <div style={{fontSize:10,color:C.grey,letterSpacing:1,marginTop:3}}>{item.sub}</div>
              </div>
              <div style={{padding:"0 16px",color:C.grey,fontSize:18}}>›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PHRASES PAGE ──────────────────────────────────────────
function PhrasesPage() {
  const [idx,setIdx]=useState(0);
  const [show,setShow]=useState(false);
  const [done,setDone]=useState(new Set());
  const p=PHRASES[idx];
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <div style={{flex:1,height:1,background:"#222"}}/>
        <div style={{fontSize:9,letterSpacing:3,color:C.champagne,textTransform:"uppercase"}}>{done.size} of {PHRASES.length} learned</div>
        <div style={{flex:1,height:1,background:"#222"}}/>
      </div>

      {/* Progress bar */}
      <div style={{height:1,background:"#1A1A1A",marginBottom:20}}>
        <div style={{height:"100%",width:`${((idx+1)/PHRASES.length)*100}%`,background:C.blue,transition:"width 0.4s"}}/>
      </div>

      <div style={{background:C.charcoal,border:`1px solid #222`,borderRadius:2,overflow:"hidden",marginBottom:12}}>
        <div style={{borderBottom:`1px solid #1E1E1E`,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Tag>{p.cat}</Tag>
          <DramaMeter level={p.drama}/>
        </div>
        <div style={{padding:"20px 16px"}}>
          <div style={{fontSize:10,letterSpacing:2,color:C.grey,textTransform:"uppercase",marginBottom:8}}>English</div>
          <div style={{fontSize:20,color:C.ivory,lineHeight:1.5,marginBottom:20,fontStyle:"italic"}}>{p.en}</div>
          {!show?(
            <Btn onClick={()=>setShow(true)} style={{width:"100%"}}>Mostra Italiano</Btn>
          ):(
            <div>
              <div style={{height:1,background:"#1E1E1E",marginBottom:16}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:10,letterSpacing:2,color:C.grey,textTransform:"uppercase"}}>Italiano</div>
                <button onClick={()=>speak(p.it)} style={{background:"transparent",border:`1px solid #333`,borderRadius:2,padding:"4px 10px",color:C.champagne,fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:2}}>▶ ASCOLTA</button>
              </div>
              <div style={{fontSize:22,color:C.champagne,fontStyle:"italic",fontWeight:"bold",lineHeight:1.5,marginBottom:16}}>{p.it}</div>
              <div style={{borderLeft:`2px solid ${C.blue}`,paddingLeft:12,fontSize:12,color:C.greyXL,fontStyle:"italic",marginBottom:16}}>
                {p.tip}
              </div>
            </div>
          )}
        </div>
      </div>
      {show&&(
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <Btn variant="secondary" onClick={()=>{setIdx((idx+1)%PHRASES.length);setShow(false);}} style={{flex:1}}>Skip</Btn>
          <Btn onClick={()=>{setDone(d=>new Set([...d,idx]));setTimeout(()=>{setIdx((idx+1)%PHRASES.length);setShow(false);},300);}} style={{flex:2}}>✓ Capito</Btn>
        </div>
      )}
      <div style={{display:"flex",justifyContent:"center",gap:4,paddingTop:4}}>
        {PHRASES.map((_,i)=>(
          <div key={i} onClick={()=>{setIdx(i);setShow(false);}} style={{width:done.has(i)?14:6,height:4,borderRadius:2,background:i===idx?C.blue:done.has(i)?C.champagne:"#222",cursor:"pointer",transition:"all 0.25s"}}/>
        ))}
      </div>
    </div>
  );
}

// ── GRAMMAR PAGE ──────────────────────────────────────────
function GrammarPage() {
  const [idx,setIdx]=useState(0);
  const g=GRAMMAR[idx];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {GRAMMAR.map((item,i)=>(
          <button key={i} onClick={()=>setIdx(i)} style={{
            background:i===idx?"#1C3A50":"transparent",
            border:`1px solid ${i===idx?C.blue:"#222"}`,
            borderRadius:2,padding:"6px 10px",
            color:i===idx?C.blueL:C.grey,
            fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:2,
            whiteSpace:"nowrap",flexShrink:0,textTransform:"uppercase",
          }}>{item.tag}</button>
        ))}
      </div>
      <div style={{background:C.charcoal,border:`1px solid #222`,borderRadius:2,overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"16px 16px 0"}}>
          <div style={{fontSize:9,letterSpacing:3,color:C.champagne,textTransform:"uppercase",marginBottom:4}}>{g.tag}</div>
          <h3 style={{margin:"0 0 4px",fontSize:22,fontStyle:"italic",color:C.ivory}}>{g.title}</h3>
          <div style={{fontSize:10,color:C.grey,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>{g.subtitle}</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <tbody>
              {g.table.map((row,i)=>(
                <tr key={i} style={{borderBottom:`1px solid #1E1E1E`,background:i%2===0?"transparent":"rgba(255,255,255,0.02)"}}>
                  <td style={{padding:"9px 16px",color:C.grey,fontStyle:"italic",width:"25%"}}>{row[0]}</td>
                  <td style={{padding:"9px 16px",color:C.champagne,fontWeight:"bold",width:"30%",fontSize:15}}>{row[1]}</td>
                  <td style={{padding:"9px 16px",color:C.greyXL,fontSize:11,letterSpacing:0.5}}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{padding:16}}>
          <div style={{background:"#111",border:`1px solid #1C3A50`,borderRadius:2,padding:"12px 14px",marginBottom:10}}>
            <div style={{fontSize:9,letterSpacing:3,color:C.blueL,textTransform:"uppercase",marginBottom:6}}>Example</div>
            <div style={{fontSize:14,color:C.ivory,fontStyle:"italic"}}>{g.example}</div>
            <button onClick={()=>speak(g.example.split("—")[0].trim())} style={{background:"transparent",border:"none",color:C.champagne,fontSize:11,cursor:"pointer",fontFamily:"inherit",letterSpacing:2,marginTop:8,padding:0}}>▶ ASCOLTA</button>
          </div>
          <div style={{borderLeft:`2px solid ${C.champagne}`,paddingLeft:12,fontSize:12,color:C.greyXL,fontStyle:"italic"}}>{g.tip}</div>
        </div>
      </div>
    </div>
  );
}

// ── CONVERSATION PAGE ─────────────────────────────────────
function ConversationPage() {
  const [idx,setIdx]=useState(0);
  const [rev,setRev]=useState(0);
  const conv=CONVERSATIONS[idx];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {CONVERSATIONS.map((c,i)=>(
          <button key={i} onClick={()=>{setIdx(i);setRev(0);}} style={{
            background:i===idx?"#1C3A50":"transparent",
            border:`1px solid ${i===idx?C.blue:"#222"}`,
            borderRadius:2,padding:"6px 10px",
            color:i===idx?C.blueL:C.grey,
            fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:1,
            whiteSpace:"nowrap",flexShrink:0,textTransform:"uppercase",
          }}>{c.scene}</button>
        ))}
      </div>
      <Photo src={conv.photo} height={140} style={{borderRadius:2,marginBottom:12}}/>
      <div style={{marginBottom:12}}>
        <div style={{fontSize:9,letterSpacing:3,color:C.champagne,textTransform:"uppercase",marginBottom:2}}>{conv.scene}</div>
        <div style={{fontSize:11,color:C.grey,fontStyle:"italic"}}>{conv.location}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {conv.lines.slice(0,rev+1).map((line,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:line.role==="you"?"flex-end":"flex-start"}}>
            <div style={{fontSize:9,color:C.grey,letterSpacing:2,textTransform:"uppercase",marginBottom:3}}>{line.role==="you"?"You":"Italiano"}</div>
            <div style={{
              background:line.role==="you"?C.blueSoft:C.charcoal,
              border:`1px solid ${line.role==="you"?C.blue:"#222"}`,
              borderRadius:2,padding:"10px 14px",maxWidth:"82%",
            }}>
              <div style={{fontSize:14,color:C.ivory,fontStyle:"italic",marginBottom:5,lineHeight:1.5}}>{line.it}</div>
              <div style={{fontSize:11,color:C.grey,lineHeight:1.4}}>{line.en}</div>
            </div>
            <button onClick={()=>speak(line.it)} style={{background:"none",border:"none",color:C.grey,fontSize:10,cursor:"pointer",marginTop:3,fontFamily:"inherit",letterSpacing:2}}>▶ ASCOLTA</button>
          </div>
        ))}
      </div>
      {rev<conv.lines.length-1?(
        <Btn onClick={()=>setRev(r=>r+1)} style={{width:"100%"}}>Continua →</Btn>
      ):(
        <Btn variant="secondary" onClick={()=>setRev(0)} style={{width:"100%"}}>↩ Ricomincia</Btn>
      )}
    </div>
  );
}

// ── GESTURES PAGE ─────────────────────────────────────────
function GesturesPage() {
  const [idx,setIdx]=useState(0);
  const g=GESTURES[idx];
  return(
    <div>
      <p style={{fontSize:12,color:C.grey,fontStyle:"italic",marginTop:0,marginBottom:20,lineHeight:1.8}}>
        In Italy, the hands speak as fluently as the voice. These are not mere gestures — they are vocabulary.
      </p>
      <Photo src={PHOTOS.trevi} height={160} style={{borderRadius:2,marginBottom:16}}/>
      <div style={{background:C.charcoal,border:`1px solid #222`,borderRadius:2,padding:"20px 16px",marginBottom:12}}>
        <div style={{fontSize:10,color:C.grey,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{idx+1} of {GESTURES.length}</div>
        <h3 style={{margin:"0 0 6px",fontSize:22,color:C.champagne,fontStyle:"italic"}}>"{g.name}"</h3>
        <div style={{fontSize:15,color:C.ivory,fontWeight:"bold",marginBottom:14}}>{g.meaning}</div>
        <button onClick={()=>speak(g.name)} style={{background:"transparent",border:`1px solid #333`,borderRadius:2,padding:"6px 14px",color:C.champagne,fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:3,marginBottom:16}}>▶ ASCOLTA</button>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{borderLeft:`2px solid ${C.blue}`,paddingLeft:12}}>
            <div style={{fontSize:9,letterSpacing:3,color:C.blueL,textTransform:"uppercase",marginBottom:4}}>When to use</div>
            <div style={{fontSize:13,color:C.greyXL,lineHeight:1.7}}>{g.when}</div>
          </div>
          <div style={{borderLeft:`2px solid ${C.champagne}`,paddingLeft:12}}>
            <div style={{fontSize:9,letterSpacing:3,color:C.champagne,textTransform:"uppercase",marginBottom:4}}>How to do it</div>
            <div style={{fontSize:13,color:C.greyXL,lineHeight:1.7}}>{g.how}</div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn variant="secondary" onClick={()=>setIdx((idx-1+GESTURES.length)%GESTURES.length)} style={{flex:1,padding:"12px"}}>←</Btn>
        <div style={{flex:2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.grey,letterSpacing:2}}>{idx+1} / {GESTURES.length}</div>
        <Btn onClick={()=>setIdx((idx+1)%GESTURES.length)} style={{flex:1,padding:"12px"}}>→</Btn>
      </div>
    </div>
  );
}

// ── CULTURA PAGE ──────────────────────────────────────────
function CulturaPage() {
  const [idx,setIdx]=useState(0);
  const c=CULTURA[idx];
  return(
    <div>
      <Photo src={c.photo} height={180} style={{borderRadius:2,marginBottom:16}}/>
      <div style={{background:C.charcoal,border:`1px solid #222`,borderRadius:2,overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"16px 16px 0"}}>
          <span style={{fontSize:28,marginRight:10}}>{c.emoji}</span>
          <h3 style={{display:"inline",fontSize:18,color:C.champagne,fontStyle:"italic"}}>{c.title}</h3>
        </div>
        <div style={{padding:"14px 16px 16px"}}>
          <p style={{margin:"0 0 14px",fontSize:13,color:C.greyXL,lineHeight:1.9}}>{c.fact}</p>
          <div style={{background:"#111",borderRadius:2,padding:"12px 14px"}}>
            <div style={{fontSize:9,color:C.grey,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>The Difference</div>
            <div style={{fontSize:12,color:C.champagne,lineHeight:2}}>{c.compare}</div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <Btn variant="secondary" onClick={()=>setIdx((idx-1+CULTURA.length)%CULTURA.length)} style={{flex:1,padding:"12px"}}>←</Btn>
        <div style={{flex:2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.grey,letterSpacing:2}}>{idx+1} / {CULTURA.length}</div>
        <Btn onClick={()=>setIdx((idx+1)%CULTURA.length)} style={{flex:1,padding:"12px"}}>→</Btn>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:5}}>
        {CULTURA.map((_,i)=>(
          <div key={i} onClick={()=>setIdx(i)} style={{width:i===idx?16:5,height:3,borderRadius:2,background:i===idx?C.champagne:"#222",cursor:"pointer",transition:"all 0.25s"}}/>
        ))}
      </div>
    </div>
  );
}

// ── GIOCO PAGE ────────────────────────────────────────────
function GiocoPage() {
  const [idx,setIdx]=useState(0);
  const [ans,setAns]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const q=GIOCO[idx];

  function answer(val) {
    if(ans!==null)return;
    setAns(val);
    if(val===q.a)setScore(s=>s+1);
  }
  function next() {
    if(idx+1>=GIOCO.length){setDone(true);return;}
    setIdx(i=>i+1);setAns(null);
  }
  function restart(){setIdx(0);setAns(null);setScore(0);setDone(false);}

  if(done) return(
    <div style={{textAlign:"center",paddingTop:20}}>
      <Photo src={PHOTOS.colosseum} height={160} style={{borderRadius:2,marginBottom:20}}/>
      <div style={{fontSize:9,letterSpacing:3,color:C.champagne,textTransform:"uppercase",marginBottom:12}}>Risultato</div>
      <div style={{fontSize:48,fontWeight:"900",fontStyle:"italic",color:C.ivory,marginBottom:4}}>{score}<span style={{fontSize:20,color:C.grey}}> / {GIOCO.length}</span></div>
      <div style={{fontSize:14,color:C.greyXL,fontStyle:"italic",marginBottom:24}}>
        {score>=7?"Bravissimo — you think like an Italian":score>=5?"Non c'è male — keep learning":"Practice makes perfect"}
      </div>
      <Btn onClick={restart} style={{width:"100%"}}>Gioca ancora</Btn>
    </div>
  );

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:10,color:C.grey,letterSpacing:1}}>Domanda {idx+1} / {GIOCO.length}</div>
        <div style={{fontSize:10,color:C.champagne,letterSpacing:1}}>✓ {score} corrette</div>
      </div>
      <div style={{height:1,background:"#1A1A1A",marginBottom:16}}>
        <div style={{height:"100%",width:`${(idx/GIOCO.length)*100}%`,background:C.champagne,transition:"width 0.4s"}}/>
      </div>
      <div style={{background:C.charcoal,border:`1px solid #222`,borderRadius:2,padding:"20px 16px",marginBottom:16,textAlign:"center"}}>
        <div style={{fontSize:9,letterSpacing:3,color:C.grey,textTransform:"uppercase",marginBottom:14}}>Would an Italian do this?</div>
        <div style={{fontSize:17,color:C.ivory,fontStyle:"italic",lineHeight:1.6,fontWeight:"bold"}}>"{q.q}"</div>
      </div>
      {ans===null?(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <button onClick={()=>answer(true)} style={{background:"#0D2018",border:"1px solid #1A3A28",borderRadius:2,padding:"18px 12px",color:"#6DBF8A",fontSize:13,cursor:"pointer",fontFamily:"inherit",letterSpacing:2,textTransform:"uppercase",fontWeight:"bold"}}>
            Sì ✓
          </button>
          <button onClick={()=>answer(false)} style={{background:"#201008",border:"1px solid #3A1A08",borderRadius:2,padding:"18px 12px",color:"#C09060",fontSize:13,cursor:"pointer",fontFamily:"inherit",letterSpacing:2,textTransform:"uppercase",fontWeight:"bold"}}>
            No ✗
          </button>
        </div>
      ):(
        <div>
          <div style={{background:ans===q.a?"#0D2018":"#201008",border:`1px solid ${ans===q.a?"#1A3A28":"#3A1A08"}`,borderRadius:2,padding:"14px 16px",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:"bold",color:ans===q.a?"#6DBF8A":"#C09060",marginBottom:6}}>
              {ans===q.a?"✓ Esatto! Bravissimo.":"✗ Non esattamente."}
            </div>
            <div style={{fontSize:12,color:C.greyXL,lineHeight:1.7,fontStyle:"italic"}}>{q.explain}</div>
          </div>
          <Btn onClick={next} style={{width:"100%"}}>
            {idx+1>=GIOCO.length?"Vedi il risultato →":"Prossima domanda →"}
          </Btn>
        </div>
      )}
    </div>
  );
}

// ── SECTION TITLE ─────────────────────────────────────────
const SECTION_TITLES = {
  phrases:"Frasi", grammar:"Grammatica", conversation:"Conversazione",
  gestures:"I Gesti", cultura:"Cultura", gioco:"Il Gioco",
};

// ── BOTTOM NAV ─────────────────────────────────────────────
const NAV = [
  {p:"phrases",  label:"Frasi"},
  {p:"grammar",  label:"Grammar"},
  {p:"conversation", label:"Chat"},
  {p:"gestures", label:"Gesti"},
  {p:"cultura",  label:"Cultura"},
  {p:"gioco",    label:"Gioco"},
];

// ── APP ROOT ──────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("home");

  const pages = {
    home:<HomePage setPage={setPage}/>,
    phrases:<PhrasesPage/>,
    grammar:<GrammarPage/>,
    conversation:<ConversationPage/>,
    gestures:<GesturesPage/>,
    cultura:<CulturaPage/>,
    gioco:<GiocoPage/>,
  };

  if(page==="home") return pages.home;

  return(
    <div style={{background:C.black,minHeight:"100vh",fontFamily:"'Palatino Linotype',Palatino,Georgia,serif",color:C.ivory}}>
      {/* TOP BAR */}
      <div style={{background:C.black,borderBottom:`1px solid #1E1E1E`,padding:"10px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:100}}>
        <button onClick={()=>setPage("home")} style={{background:"transparent",border:`1px solid #222`,borderRadius:2,padding:"5px 10px",color:C.grey,fontSize:10,cursor:"pointer",fontFamily:"inherit",letterSpacing:2}}>← HOME</button>
        <div style={{fontSize:13,fontWeight:"900",fontStyle:"italic",color:C.ivory,flex:1}}>{SECTION_TITLES[page]}</div>
        <div style={{fontSize:9,letterSpacing:3,color:C.champagne}}>LA DOLCE LINGUA</div>
      </div>

      {/* CONTENT */}
      <div style={{padding:"24px 16px 100px",maxWidth:480,margin:"0 auto"}}>
        {pages[page]}
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.black,borderTop:`1px solid #1E1E1E`,display:"flex",zIndex:100}}>
        {NAV.map(item=>(
          <button key={item.p} onClick={()=>setPage(item.p)} style={{
            flex:1,background:"none",border:"none",
            borderTop:`1px solid ${page===item.p?C.champagne:"transparent"}`,
            padding:"9px 2px 7px",cursor:"pointer",fontFamily:"inherit",
          }}>
            <div style={{fontSize:9,letterSpacing:1,color:page===item.p?C.champagne:C.grey,textTransform:"uppercase"}}>{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}