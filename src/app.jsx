const W={
  bg:'#0B0805',surface:'#14100B',surfaceRaised:'#1B1611',surfaceWarm:'#241B14',
  border:'rgba(245,239,230,0.06)',borderStrong:'rgba(245,239,230,0.12)',borderHi:'rgba(245,239,230,0.18)',
  fg:'#F5EFE6',fgDim:'#C9BFB0',muted:'#8A7F70',dim:'#5A4F44',faint:'#3A322B',
  orange:'#F97316',orangeDeep:'#C24A0A',orangeSoft:'rgba(249,115,22,0.14)',
  gold:'#E8B560',violet:'#A992E8',violetSoft:'rgba(169,146,232,0.14)',
  green:'#5DD39E',red:'#FF7A8A',
};
const F={
  serif:"'Instrument Serif','New York',Georgia,serif",
  sans:"'Geist','Inter',system-ui,-apple-system,sans-serif",
  mono:"'JetBrains Mono',ui-monospace,'SF Mono',monospace",
};

const PRICE_PACK='pri_01kse29m0mqgz7a4vw2wsqkyvs';
const PRICE_SUB='pri_01kse2kx281zafyyw46kzczasj';
const PADDLE_TOKEN='live_33120c8ba6c31f03ad8da6a395f';
const MAX=1240;
const PREVIEW_VIDEO_ID='PjyMxANVbKw';

// ── Lead capture (Supabase — public anon key, insert-only via RLS) ─────────
const SUPABASE_URL='https://ngkdxnuamwjqrirgvivi.supabase.co';
const SUPABASE_ANON='sb_publishable_Rn6ZRDzkl-gYzVdBqU7TRA_0qeNlSuz';

async function saveQuizLead({email,score,profile,answers,lang}){
  try{
    // ignore-duplicates: one row per email — retakes don't duplicate the lead
    // (and no public UPDATE permission is ever granted)
    const res=await fetch(`${SUPABASE_URL}/rest/v1/quiz_leads?on_conflict=email`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'apikey':SUPABASE_ANON,
        'Authorization':`Bearer ${SUPABASE_ANON}`,
        'Prefer':'return=minimal,resolution=ignore-duplicates',
      },
      body:JSON.stringify({email,score,profile,answers,lang}),
    });
    return res.ok;
  }catch{return false;}
}

// ── i18n ────────────────────────────────────────────────────────────────────

const I18N={
en:{
  checkoutLoading:'Secure checkout is loading — give it a second and tap again.',
  nav:{links:[{label:'The App',id:'features'},{label:'Screens',id:'app-screens'},{label:'Quiz',id:'quiz'},{label:'The Method',id:'the-method'},{label:'Pricing',id:'pricing'}],signIn:'Sign in',begin:'Begin'},
  hero:{badge:'OFFICIAL LAUNCH · FOUNDER PRICING IS LIVE NOW',badgeM:'LAUNCH · FOUNDER PRICING LIVE',h1pre:'The operating system for the ',h1word:'person',h1mid:" you're ",h1end:'becoming.',sub:'Mindshift is the daily environment where you reset your mind, install discipline, and rewrite the patterns that have been quietly running your life.',cta:'Begin your reset',watch:'Watch preview',note:'ONE-TIME $25 · 30 PRO DAYS INCLUDED · THEN $9/MO · CANCEL ANYTIME',stats:[{v:'30 days',l:'PRO INCLUDED',s:'from day one'},{v:'$25',l:'FOUNDER PRICE',s:'one-time payment'},{v:'$9',l:'FROM MONTH 2',s:'cancel anytime'},{v:'100%',l:'AUTOMATED',s:'PDFs sent instantly'}]},
  ticker:['🔥 "12-day streak so far — first habit app that stuck."','✦ "The Weekly Reset is the feature I didn\'t know I needed."','🧠 "I stopped drifting. My week has a direction now."','⚡ "The mantra reads like a note from myself, not a quote poster."','◎ "One missed day in three weeks. That\'s progress for me."','🔥 "It asks who you want to become first. The habits follow."','✦ "I keep the printed Mental Software page next to my desk."','🧠 "Ten minutes on Sunday and my week makes sense."'],
  bento:{eyebrow:'The system',h2:'Your identity operating system.',h2i:'On the web.',sub:'The dashboard is where transformation happens every day. Four modules built to compound: habits, identity, weekly review, and a mantra that evolves with you.',dashTitle:'Mindshift Dashboard',dashTag:'Web · 30 days Pro included',dashBody:'Not another productivity tool. Four modules that work together to change who you are — built around your identity, not your to-do list.',features:[{label:'Habit Tracker',desc:'Daily check-ins, streaks & 7-day view'},{label:'Mental OS',desc:'Goals, identity, values & vision'},{label:'Weekly Reset',desc:'5 reflection questions, weekly review'},{label:'Weekly Mantra',desc:'AI-generated from your Mental OS'}],pdfTitle:'Bonus PDFs',pdfTag:'Included · Instant delivery',pdfBody:'Two printable documents included with your purchase. Use them alongside the dashboard to anchor your identity work on paper.',pdfItems:[{t:'Mental Software',s:'Goals · Identity · Mantra'},{t:'Habit Tracker',s:'31-day radial chart'}],mantraTitle:'Weekly Mantra',mantraTag:'AI · Updates with Weekly Reset',mantraBody:'Every week, after you complete your Weekly Reset, the AI reads your Mental OS and generates a new mantra calibrated to exactly where you are. Not generic motivation — a precise signal built from your own answers.',mantraQuote:'"I act with discipline over doubt, trust myself over validation, and build my future through consistent action today."',mantraMeta:'AI-GENERATED · WEEK 1 · YOUR MENTAL OS'},
  screens:{eyebrow:'Inside the dashboard',h2:'Your daily environment',h2i:'for transformation.',side:'Not another productivity tool — the system that changes who you are at the identity level.',items:[{label:'Dashboard · Today',sublabel:'AI Mantra · Streak · XP · Quick nav'},{label:'Habit Tracker',sublabel:'Daily check-ins · 7-day view · Calendar'},{label:'Mental OS',sublabel:'Goals · Identity · Values · Vision'},{label:'Weekly Reset',sublabel:'5 reflection questions · Weekly review'}]},
  preview:{eyebrow:'Live demo',h2:'Every screen built',h2i:'for one thing.',body:"Every screen inside the Mindshift dashboard is designed to reinforce one thing: who you're becoming. Habits, XP, a weekly mantra — all wired to your identity.",tabs:['Today','Habits','Mental OS','Weekly']},
  demo:{eyebrow:'Try it yourself',h2:'Feel the first',h2i:'check-in.',sub:'This is a live piece of the real dashboard. Complete the three starter habits and watch what one perfect day feels like.',habits:[{n:'Meditate 10 min',e:'🧘'},{n:'Read 20 pages',e:'📖'},{n:'Move your body',e:'💪'}],xpLabel:'XP TODAY',streakLabel:'STREAK',dayDone:'Perfect day. This is the feeling — every single day.',dayDoneSub:'Now imagine 30 of these in a row, wired to your identity.',cta:'Make it real — begin your reset',reset:'Reset demo',hint:'Tap a habit to complete it'},
  video:{eyebrow:'See it in action',h2:'Watch how the',h2i:'reset works.',sub:'A walkthrough of the full Mindshift experience — from purchase to your first Mental OS session.',ph:'Dashboard walkthrough video',phSub:'Full Mindshift system · ~3 min'},
  pdfs:{eyebrow:'Included with your purchase',h2:'Two documents.',h2i:'Included free.',side:'Both PDFs land in your inbox the moment you purchase — no waiting, no manual steps. Use them alongside the dashboard to anchor your transformation on paper too.',docs:[{title:'Mental Software',tag:'Identity · Goals · Daily Mantra',desc:'Your monthly identity operating manual. Define your goals, declare who you\'re becoming, name the limiting patterns you\'re breaking, and anchor your daily mantra. One structured page — your entire mental direction for the month.',features:['Goals Section — 3 goal slots to define your monthly direction with full clarity','"Who Do I Want to Become?" — write your identity declaration in your own words','Limiting Patterns I\'m Breaking — name and dismantle what has been running you','Daily Mantra — the sentence that recalibrates your mind every single morning']},{title:'Habit Tracker',tag:'31 Days · 8 Habits · Radial Chart',desc:'A 31-day radial tracker for up to 8 simultaneous habits. Each day is a segment, each habit a concentric ring. Fill it as you go. By month\'s end, you have a complete visual record of your discipline — every gap visible, every streak earned.',features:['31-day radial chart — see your full month pattern at a single glance','Track up to 8 habits simultaneously in the same circular layout','Things to Improve — set your growth focus areas for the month ahead','Things to be Grateful — anchor your mindset in what is already working']}]},
  quiz:{eyebrow:'Free 2-minute diagnostic',h2:'What is actually',h2i:'running your mind?',sub:'Five questions. No right answers — only honest ones. At the end you get your Mental OS Score and exactly where your system is leaking.',start:'Start the diagnostic',qLabel:'QUESTION',questions:[{q:'When you set a goal, what usually happens?',opts:[{t:'I follow through until it\'s done',s:3},{t:'Strong start — I fade around week two',s:1},{t:'I keep planning but rarely start',s:0},{t:'Depends entirely on my motivation that day',s:1}]},{q:'Your first 30 minutes after waking up look like…',opts:[{t:'Phone in hand, scrolling',s:0},{t:'Rushing — the day starts without me',s:1},{t:'Some routine, but inconsistent',s:2},{t:'A ritual I chose and control',s:3}]},{q:'How often does your inner voice work against you?',opts:[{t:'Constantly — it runs the show',s:0},{t:'Every time things get hard',s:1},{t:'Sometimes, but I catch it',s:2},{t:'Rarely — I\'ve trained it',s:3}]},{q:'Who chose the beliefs you operate on today?',opts:[{t:'Honestly? Never thought about it',s:0},{t:'My past and my environment',s:1},{t:'Partly me, partly inherited',s:2},{t:'I consciously chose them',s:3}]},{q:'At this exact pace, one year from now you\'ll be…',opts:[{t:'In the same place. Honestly.',s:0},{t:'Slightly better, mostly the same',s:1},{t:'Noticeably better',s:2},{t:'A different person',s:3}]}],gateTitle:'Your Mental OS diagnostic is ready.',gateSub:'Enter your email and we\'ll unlock your score, your operating profile, and the exact points where your system is leaking.',gatePlaceholder:'your@email.com',gateCta:'Show my result',gateNote:'No spam. Your result + occasional signal from Mindshift. Unsubscribe anytime.',gateError:'Enter a valid email to unlock your result.',scoreLabel:'YOUR MENTAL OS SCORE',profiles:[{min:0,name:'Survival Mode',desc:'Your mind is running on default settings — reacting, not directing. Your goals lose to your environment almost every time, and your inner voice is working for the old you.',leak:'Biggest leak: no system. Willpower is doing a job that structure should do.'},{min:40,name:'Autopilot',desc:'You function, you produce, you get through the week — but the week is driving you. The patterns deciding your day were installed years ago, and nobody asked you.',leak:'Biggest leak: no weekly checkpoint. You drift because nothing resets your direction.'},{min:67,name:'Builder',desc:'You already act with intention and you\'ve tasted consistency. What breaks you is the gap between good weeks and bad ones — you rebuild momentum from zero too often.',leak:'Biggest leak: no identity anchor. Your habits depend on mood instead of who you\'ve decided to be.'},{min:87,name:'Architect',desc:'You operate deliberately — rare. Your edge now is compounding: protecting the system you\'ve built and upgrading it faster than life degrades it.',leak:'Biggest leak: maintenance. Even strong systems decay without a weekly reset ritual.'}],resultBridge:'This is exactly what Mindshift was built to fix.',resultCta:'Fix it — begin your reset · $25',retake:'Retake the quiz',saving:'Unlocking…'},
  method:{eyebrow:'The method',h2:'Simple.',h2i:'Progressive. Real.',side:'From purchase to your first reset in under 10 minutes. No setup wizards, no onboarding friction.',steps:[{title:'Pay $25 — everything arrives in minutes',desc:'Secure checkout via Paddle. Immediately after payment you receive an email with direct download links to both Mental OS PDFs. Fully automated — no waiting, no manual steps, no support tickets.'},{title:'Access your dashboard and sign in with your email',desc:'Go to app.mindshiftlabs.lat, sign in with the same email you used to purchase, create your password, and you\'re in — Pro access activated automatically from the first login.'},{title:'30 days to rewrite your identity',desc:'Full dashboard access, both PDFs, and a personalized mantra every week. At the end of day 30, Paddle charges $9/month automatically. Cancel anytime from the dashboard — no friction, no hidden steps.'}]},
  calc:{eyebrow:'Do the math',h2:'The cost of not changing',h2i:'is the one nobody calculates.',age:'Your age',hours:'Hours lost per day to autopilot',hoursSub:'scrolling, drifting, reacting — be honest',line1:'At this pace, over the next 5 years you will hand over',days:'full days',line2:'of your one life to autopilot. That\'s',months:'months',line3:'— awake, but not choosing.',anchor:'Mindshift costs $25. Once. That\'s less than 3 cents per hour recovered in the first 90 days.',cta:'Stop the leak — begin your reset'},
  testimonials:{eyebrow:'From the community',h2:'The quiet work',h2i:'speaks.',bar:[{v:'+100',l:'CUSTOMERS',sub:'and growing'},{v:'4.6',l:'AVG RATING',sub:'across reviews'},{v:'7-day',l:'MONEY BACK',sub:'no questions asked'}],items:[{name:'Ana L.',role:'Designer',stars:5,text:'The weekly review is the part that stuck with me. I used to drift from one week to the next. Now I have a small ritual that keeps me honest about where my time actually went.'},{name:'Marcus T.',role:'Software Engineer',stars:4,text:'Clean design, no bloat. It\'s basically a habit tracker plus an identity journal, but the way they\'re wired together made me actually open it every day. 12-day streak so far.'},{name:'Sofia R.',role:'Small Business Owner',stars:5,text:'The Mental Software PDF surprised me. Writing down the patterns I was breaking felt uncomfortable in a good way. I keep the printed page next to my desk now.'},{name:'Camille V.',role:'Marketing Manager',stars:4,text:'I was skeptical about the AI mantra, honestly. But because it\'s built from my own answers it reads less like a quote poster and more like a note from myself. That part won me over.'},{name:'Ryan S.',role:'Student',stars:5,text:'I\'m 22 and I\'ve quit every habit app after a week. What\'s different here is the streak plus the weekly questions — breaking the chain actually costs me something now.'},{name:'Priya N.',role:'Product Manager',stars:5,text:'Five questions on a Sunday night, ten minutes, and my week suddenly has a direction. The Weekly Reset is the feature I didn\'t know I needed.'},{name:'Carlos D.',role:'Freelance Designer',stars:4,text:'Simple and focused. I\'d like a mobile app eventually, but the web dashboard works fine on my phone and the habit view is the first one I\'ve kept using past week two.'},{name:'Emma W.',role:'Coach',stars:5,text:'I bought it for the PDFs and stayed for the dashboard. The identity-first framing gives my clients language for what they\'re trying to change. Fair price for what it does.'},{name:'Liam O.',role:'Sales Executive',stars:4,text:'The streak counter keeps me more accountable than I expected. I\'ve missed one day in three weeks — for someone who used to quit everything after three days, that\'s progress.'},{name:'Natalia F.',role:'Yoga Instructor',stars:5,text:'It doesn\'t push productivity for productivity\'s sake. It asks who you want to become first, and the habits follow from that. That order matters more than I realized.'}]},
  manifesto:{eyebrow:'Manifesto',lines:["We don't believe in motivation. We believe in systems.","We didn't build another productivity tool. We built the environment where transformation actually happens.","Your problem was never discipline. It's that nobody taught you how to operate your own mind.","Mindshift is the manual you should have been given."],sig:'MINDSHIFT LABS · BUILT FOR THE QUIET WORK'},
  pricing:{eyebrow:'Launch pricing',h2:'One decision.',h2i:'Once.',once:'one-time',founder:'FOUNDER PRICE · LIMITED TIME',includes:['Complete Mental OS System — 2 printable PDFs delivered instantly to your inbox','30 days of Pro access to the web dashboard from the first login','Personalized AI Mantra that updates with every Weekly Reset','Habit tracking + streaks + XP (10 XP per habit completed)','Personal Mental OS dashboard: identity, values, vision & goals','All future updates included — forever'],cta:'Get full access',fine:'FROM DAY 31 · $9/MO · CANCEL FROM THE APP',fine2:'SECURE CHECKOUT VIA PADDLE · 7-DAY MONEY BACK',quote:'"The cost of not changing is the only one most people forget to calculate."'},
  faq:{eyebrow:'FAQ',h2:'Questions',h2i:'answered.',more:'Something else?',items:[{q:'How do I receive the PDFs?',a:'Immediately after payment you receive an email with direct download links to both Mental OS documents. Fully automated — no waiting, no manual delivery, no support needed.'},{q:'How do I access the dashboard?',a:"Go to app.mindshiftlabs.lat in any browser, sign in with the same email you used to purchase, create your password, and you're in — Pro access activated automatically from the first login. No download required."},{q:'What happens after 30 days?',a:'The $9/month subscription activates automatically via Paddle. You can cancel anytime from inside the dashboard — no friction, no hidden steps, no calls with a sales team.'},{q:'What countries can purchase?',a:'Any country in the world. We accept all major international credit and debit cards and local payment methods. Payments processed by Paddle, a global payments platform.'},{q:'Is there a money-back guarantee?',a:"Yes. If within the first 7 days it's not right for you, we'll refund you in full — no questions asked. Email support@mindshiftlabs.lat and we process within 3-5 business days."},{q:'Does it work on any device?',a:'Yes — the dashboard is fully web-based. It works on any device with a browser: desktop, tablet, or mobile. No download required.'}]},
  closing:{h2:'The next 90 days will pass ',h2i:'anyway.',sub:'You can spend them rebuilding the operating system between your ears. Or you can spend them the way you spent the last 90.',cta:'Begin · $25 today',note:'$25 TODAY · 30 PRO DAYS · THEN $9/MO · CANCEL ANYTIME · 7-DAY MONEY BACK'},
  footer:{blurb:'The daily environment for rewriting the operating system between your ears. Built for everyone who does the work.',badge:'FOUNDER PRICING LIVE',cols:[{h:'PRODUCT',l:[{t:'Features',href:'#features'},{t:'The System',href:'#pdfs'},{t:'The Method',href:'#the-method'},{t:'Pricing',href:'#pricing'},{t:'Dashboard',href:'#app-screens'}]},{h:'COMPANY',l:[{t:'Manifesto',href:'#manifesto'},{t:'Quiz',href:'#quiz'},{t:'Press',href:'mailto:press@mindshiftlabs.lat'},{t:'Contact',href:'mailto:support@mindshiftlabs.lat'}]},{h:'LEGAL',l:[{t:'Privacy Notice',href:'/privacy.html'},{t:'Terms of Service',href:'/terms.html'},{t:'Refund Policy',href:'/refunds.html'},{t:'Data export',href:'mailto:support@mindshiftlabs.lat'}]}],copy:'© 2026 MINDSHIFT LABS · BUILT FOR THE QUIET WORK',langLabel:'Language'},
},
es:{
  checkoutLoading:'El checkout seguro está cargando — dale un segundo y vuelve a tocar.',
  nav:{links:[{label:'La App',id:'features'},{label:'Pantallas',id:'app-screens'},{label:'Quiz',id:'quiz'},{label:'El Método',id:'the-method'},{label:'Precio',id:'pricing'}],signIn:'Entrar',begin:'Empezar'},
  hero:{badge:'LANZAMIENTO OFICIAL · PRECIO FUNDADOR ACTIVO',badgeM:'LANZAMIENTO · PRECIO FUNDADOR',h1pre:'El sistema operativo para la ',h1word:'persona',h1mid:' en la que te estás ',h1end:'convirtiendo.',sub:'Mindshift es el entorno diario donde reseteas tu mente, instalas disciplina y reescribes los patrones que llevan años dirigiendo tu vida en silencio.',cta:'Empieza tu reset',watch:'Ver preview',note:'PAGO ÚNICO $25 · 30 DÍAS PRO INCLUIDOS · LUEGO $9/MES · CANCELA CUANDO QUIERAS',stats:[{v:'30 días',l:'PRO INCLUIDO',s:'desde el día uno'},{v:'$25',l:'PRECIO FUNDADOR',s:'pago único'},{v:'$9',l:'DESDE EL MES 2',s:'cancela cuando quieras'},{v:'100%',l:'AUTOMATIZADO',s:'PDFs enviados al instante'}]},
  ticker:['🔥 "Racha de 12 días — la primera app de hábitos que me funciona."','✦ "El Weekly Reset es la función que no sabía que necesitaba."','🧠 "Dejé de ir a la deriva. Mi semana tiene dirección."','⚡ "El mantra se lee como una nota mía, no como un póster de frases."','◎ "Un solo día fallado en tres semanas. Para mí eso es progreso."','🔥 "Primero te pregunta quién quieres ser. Los hábitos siguen solos."','✦ "Tengo la página de Mental Software impresa junto a mi escritorio."','🧠 "Diez minutos el domingo y mi semana tiene sentido."'],
  bento:{eyebrow:'El sistema',h2:'Tu sistema operativo de identidad.',h2i:'En la web.',sub:'El dashboard es donde la transformación ocurre cada día. Cuatro módulos que se potencian entre sí: hábitos, identidad, revisión semanal y un mantra que evoluciona contigo.',dashTitle:'Mindshift Dashboard',dashTag:'Web · 30 días Pro incluidos',dashBody:'No es otra app de productividad. Cuatro módulos que trabajan juntos para cambiar quién eres — construidos alrededor de tu identidad, no de tu lista de tareas.',features:[{label:'Habit Tracker',desc:'Check-ins diarios, rachas y vista de 7 días'},{label:'Mental OS',desc:'Metas, identidad, valores y visión'},{label:'Weekly Reset',desc:'5 preguntas de reflexión, revisión semanal'},{label:'Mantra Semanal',desc:'Generado por IA desde tu Mental OS'}],pdfTitle:'PDFs de regalo',pdfTag:'Incluidos · Entrega instantánea',pdfBody:'Dos documentos imprimibles incluidos con tu compra. Úsalos junto al dashboard para anclar tu trabajo de identidad también en papel.',pdfItems:[{t:'Mental Software',s:'Metas · Identidad · Mantra'},{t:'Habit Tracker',s:'Gráfico radial de 31 días'}],mantraTitle:'Mantra Semanal',mantraTag:'IA · Se actualiza con el Weekly Reset',mantraBody:'Cada semana, al completar tu Weekly Reset, la IA lee tu Mental OS y genera un mantra calibrado exactamente a donde estás. No es motivación genérica — es una señal precisa construida con tus propias respuestas.',mantraQuote:'"Actúo con disciplina sobre la duda, confío en mí antes que en la validación, y construyo mi futuro con acción consistente hoy."',mantraMeta:'GENERADO POR IA · SEMANA 1 · TU MENTAL OS'},
  screens:{eyebrow:'Dentro del dashboard',h2:'Tu entorno diario',h2i:'de transformación.',side:'No es otra herramienta de productividad — es el sistema que cambia quién eres a nivel de identidad.',items:[{label:'Dashboard · Hoy',sublabel:'Mantra IA · Racha · XP · Navegación'},{label:'Habit Tracker',sublabel:'Check-ins diarios · 7 días · Calendario'},{label:'Mental OS',sublabel:'Metas · Identidad · Valores · Visión'},{label:'Weekly Reset',sublabel:'5 preguntas · Revisión semanal'}]},
  preview:{eyebrow:'Demo en vivo',h2:'Cada pantalla construida',h2i:'para una sola cosa.',body:'Cada pantalla del dashboard de Mindshift está diseñada para reforzar una sola cosa: en quién te estás convirtiendo. Hábitos, XP, un mantra semanal — todo conectado a tu identidad.',tabs:['Hoy','Hábitos','Mental OS','Semanal']},
  demo:{eyebrow:'Pruébalo tú mismo',h2:'Siente el primer',h2i:'check-in.',sub:'Esto es una pieza viva del dashboard real. Completa los tres hábitos de inicio y siente lo que es un día perfecto.',habits:[{n:'Meditar 10 min',e:'🧘'},{n:'Leer 20 páginas',e:'📖'},{n:'Mover el cuerpo',e:'💪'}],xpLabel:'XP HOY',streakLabel:'RACHA',dayDone:'Día perfecto. Esta es la sensación — todos los días.',dayDoneSub:'Ahora imagina 30 de estos seguidos, conectados a tu identidad.',cta:'Hazlo real — empieza tu reset',reset:'Reiniciar demo',hint:'Toca un hábito para completarlo'},
  video:{eyebrow:'Míralo en acción',h2:'Mira cómo funciona',h2i:'el reset.',sub:'Un recorrido por la experiencia Mindshift completa — desde la compra hasta tu primera sesión de Mental OS.',ph:'Video del dashboard',phSub:'Sistema Mindshift completo · ~3 min'},
  pdfs:{eyebrow:'Incluidos con tu compra',h2:'Dos documentos.',h2i:'Incluidos gratis.',side:'Ambos PDFs llegan a tu correo en el momento en que compras — sin esperas, sin pasos manuales. Úsalos junto al dashboard para anclar tu transformación también en papel.',docs:[{title:'Mental Software',tag:'Identidad · Metas · Mantra Diario',desc:'Tu manual mensual de identidad. Define tus metas, declara en quién te conviertes, nombra los patrones limitantes que estás rompiendo y ancla tu mantra diario. Una página estructurada — toda tu dirección mental del mes.',features:['Sección de Metas — 3 espacios para definir tu dirección mensual con claridad total','"¿Quién quiero ser?" — escribe tu declaración de identidad con tus propias palabras','Patrones limitantes que rompo — nombra y desmonta lo que te ha estado dirigiendo','Mantra Diario — la frase que recalibra tu mente cada mañana']},{title:'Habit Tracker',tag:'31 Días · 8 Hábitos · Gráfico Radial',desc:'Un tracker radial de 31 días para hasta 8 hábitos simultáneos. Cada día es un segmento, cada hábito un anillo concéntrico. Llénalo sobre la marcha. Al final del mes tienes un registro visual completo de tu disciplina — cada hueco visible, cada racha ganada.',features:['Gráfico radial de 31 días — ve el patrón de tu mes completo de un vistazo','Sigue hasta 8 hábitos simultáneos en el mismo diseño circular','Cosas por mejorar — define tus focos de crecimiento del mes siguiente','Cosas que agradecer — ancla tu mentalidad en lo que ya funciona']}]},
  quiz:{eyebrow:'Diagnóstico gratis de 2 minutos',h2:'¿Qué está dirigiendo',h2i:'tu mente en realidad?',sub:'Cinco preguntas. No hay respuestas correctas — solo honestas. Al final recibes tu Mental OS Score y exactamente por dónde se fuga tu sistema.',start:'Empezar el diagnóstico',qLabel:'PREGUNTA',questions:[{q:'Cuando te pones una meta, ¿qué suele pasar?',opts:[{t:'La cumplo hasta terminarla',s:3},{t:'Empiezo fuerte — me apago en la semana dos',s:1},{t:'Sigo planeando pero rara vez empiezo',s:0},{t:'Depende totalmente de mi motivación ese día',s:1}]},{q:'Tus primeros 30 minutos al despertar son…',opts:[{t:'Teléfono en mano, scrolleando',s:0},{t:'Corriendo — el día empieza sin mí',s:1},{t:'Algo de rutina, pero inconsistente',s:2},{t:'Un ritual que yo elegí y controlo',s:3}]},{q:'¿Qué tan seguido tu voz interior juega en tu contra?',opts:[{t:'Constantemente — ella manda',s:0},{t:'Cada vez que las cosas se ponen difíciles',s:1},{t:'A veces, pero la detecto',s:2},{t:'Rara vez — la he entrenado',s:3}]},{q:'¿Quién eligió las creencias con las que operas hoy?',opts:[{t:'¿Honestamente? Nunca lo pensé',s:0},{t:'Mi pasado y mi entorno',s:1},{t:'En parte yo, en parte heredadas',s:2},{t:'Las elegí conscientemente',s:3}]},{q:'A este ritmo exacto, en un año estarás…',opts:[{t:'En el mismo lugar. Honestamente.',s:0},{t:'Un poco mejor, casi igual',s:1},{t:'Notablemente mejor',s:2},{t:'Siendo otra persona',s:3}]}],gateTitle:'Tu diagnóstico de Mental OS está listo.',gateSub:'Escribe tu email y desbloqueamos tu puntaje, tu perfil operativo y los puntos exactos por donde se fuga tu sistema.',gatePlaceholder:'tu@email.com',gateCta:'Ver mi resultado',gateNote:'Sin spam. Tu resultado + señales ocasionales de Mindshift. Date de baja cuando quieras.',gateError:'Escribe un email válido para desbloquear tu resultado.',scoreLabel:'TU MENTAL OS SCORE',profiles:[{min:0,name:'Modo Supervivencia',desc:'Tu mente corre con la configuración de fábrica — reaccionando, no dirigiendo. Tus metas pierden contra tu entorno casi siempre, y tu voz interior trabaja para tu versión antigua.',leak:'Fuga principal: no hay sistema. La fuerza de voluntad hace el trabajo que debería hacer la estructura.'},{min:40,name:'Piloto Automático',desc:'Funcionas, produces, sobrevives la semana — pero la semana te maneja a ti. Los patrones que deciden tu día se instalaron hace años, y nadie te preguntó.',leak:'Fuga principal: no hay checkpoint semanal. Vas a la deriva porque nada resetea tu dirección.'},{min:67,name:'Constructor',desc:'Ya actúas con intención y has probado la consistencia. Lo que te rompe es la brecha entre semanas buenas y malas — reconstruyes el impulso desde cero demasiado seguido.',leak:'Fuga principal: no hay ancla de identidad. Tus hábitos dependen del ánimo y no de quién decidiste ser.'},{min:87,name:'Arquitecto',desc:'Operas deliberadamente — eso es raro. Tu ventaja ahora es la capitalización: proteger el sistema que construiste y mejorarlo más rápido de lo que la vida lo degrada.',leak:'Fuga principal: mantenimiento. Hasta los sistemas fuertes decaen sin un ritual semanal de reset.'}],resultBridge:'Esto es exactamente lo que Mindshift fue construido para arreglar.',resultCta:'Arréglalo — empieza tu reset · $25',retake:'Repetir el quiz',saving:'Desbloqueando…'},
  method:{eyebrow:'El método',h2:'Simple.',h2i:'Progresivo. Real.',side:'De la compra a tu primer reset en menos de 10 minutos. Sin asistentes de configuración, sin fricción.',steps:[{title:'Paga $25 — todo llega en minutos',desc:'Checkout seguro vía Paddle. Inmediatamente después del pago recibes un email con los enlaces de descarga de ambos PDFs del Mental OS. Totalmente automatizado — sin esperas, sin pasos manuales, sin tickets de soporte.'},{title:'Accede a tu dashboard con tu email',desc:'Entra a app.mindshiftlabs.lat, inicia sesión con el mismo email de tu compra, crea tu contraseña y listo — acceso Pro activado automáticamente desde el primer login.'},{title:'30 días para reescribir tu identidad',desc:'Acceso completo al dashboard, ambos PDFs y un mantra personalizado cada semana. Al final del día 30, Paddle cobra $9/mes automáticamente. Cancela cuando quieras desde el dashboard — sin fricción, sin pasos ocultos.'}]},
  calc:{eyebrow:'Haz las cuentas',h2:'El costo de no cambiar',h2i:'es el que nadie calcula.',age:'Tu edad',hours:'Horas perdidas al día en piloto automático',hoursSub:'scrolleando, a la deriva, reaccionando — sé honesto',line1:'A este ritmo, en los próximos 5 años vas a entregar',days:'días completos',line2:'de tu única vida al piloto automático. Eso es',months:'meses',line3:'— despierto, pero sin elegir.',anchor:'Mindshift cuesta $25. Una vez. Menos de 3 centavos por hora recuperada en los primeros 90 días.',cta:'Detén la fuga — empieza tu reset'},
  testimonials:{eyebrow:'De la comunidad',h2:'El trabajo silencioso',h2i:'habla.',bar:[{v:'+100',l:'CLIENTES',sub:'y creciendo'},{v:'4.6',l:'RATING PROMEDIO',sub:'entre reseñas'},{v:'7 días',l:'GARANTÍA',sub:'sin preguntas'}],items:[{name:'Ana L.',role:'Diseñadora',stars:5,text:'La revisión semanal es lo que se me quedó. Antes iba a la deriva de una semana a otra. Ahora tengo un pequeño ritual que me mantiene honesta sobre a dónde se fue mi tiempo.'},{name:'Marcus T.',role:'Ingeniero de Software',stars:4,text:'Diseño limpio, sin relleno. Es básicamente un tracker de hábitos más un diario de identidad, pero la forma en que están conectados hizo que lo abra todos los días. Racha de 12 días.'},{name:'Sofia R.',role:'Dueña de negocio',stars:5,text:'El PDF de Mental Software me sorprendió. Escribir los patrones que estaba rompiendo fue incómodo en el buen sentido. Tengo la página impresa junto a mi escritorio.'},{name:'Camille V.',role:'Gerente de Marketing',stars:4,text:'Era escéptica con el mantra de IA, honestamente. Pero como se construye con mis propias respuestas, se lee menos como un póster de frases y más como una nota mía. Eso me ganó.'},{name:'Ryan S.',role:'Estudiante',stars:5,text:'Tengo 22 y he abandonado todas las apps de hábitos en una semana. Lo diferente aquí es la racha más las preguntas semanales — romper la cadena ahora me cuesta algo.'},{name:'Priya N.',role:'Product Manager',stars:5,text:'Cinco preguntas un domingo por la noche, diez minutos, y mi semana de pronto tiene dirección. El Weekly Reset es la función que no sabía que necesitaba.'},{name:'Carlos D.',role:'Diseñador Freelance',stars:4,text:'Simple y enfocado. Me gustaría una app móvil algún día, pero el dashboard web funciona bien en mi teléfono y la vista de hábitos es la primera que sigo usando después de la semana dos.'},{name:'Emma W.',role:'Coach',stars:5,text:'Lo compré por los PDFs y me quedé por el dashboard. El enfoque de identidad primero le da a mis clientes lenguaje para lo que intentan cambiar. Precio justo por lo que hace.'},{name:'Liam O.',role:'Ejecutivo de Ventas',stars:4,text:'El contador de racha me hace más responsable de lo que esperaba. He fallado un día en tres semanas — para alguien que abandonaba todo a los tres días, eso es progreso.'},{name:'Natalia F.',role:'Instructora de Yoga',stars:5,text:'No empuja productividad por productividad. Primero te pregunta quién quieres ser, y los hábitos siguen de esa claridad. Ese orden importa más de lo que creía.'}]},
  manifesto:{eyebrow:'Manifiesto',lines:['No creemos en la motivación. Creemos en los sistemas.','No construimos otra herramienta de productividad. Construimos el entorno donde la transformación realmente ocurre.','Tu problema nunca fue la disciplina. Es que nadie te enseñó a operar tu propia mente.','Mindshift es el manual que debieron darte.'],sig:'MINDSHIFT LABS · CONSTRUIDO PARA EL TRABAJO SILENCIOSO'},
  pricing:{eyebrow:'Precio de lanzamiento',h2:'Una decisión.',h2i:'Una vez.',once:'pago único',founder:'PRECIO FUNDADOR · TIEMPO LIMITADO',includes:['Sistema Mental OS completo — 2 PDFs imprimibles entregados al instante en tu correo','30 días de acceso Pro al dashboard web desde el primer login','Mantra IA personalizado que se actualiza con cada Weekly Reset','Seguimiento de hábitos + rachas + XP (10 XP por hábito completado)','Dashboard personal de Mental OS: identidad, valores, visión y metas','Todas las actualizaciones futuras incluidas — para siempre'],cta:'Obtener acceso completo',fine:'DESDE EL DÍA 31 · $9/MES · CANCELA DESDE LA APP',fine2:'CHECKOUT SEGURO VÍA PADDLE · GARANTÍA DE 7 DÍAS',quote:'"El costo de no cambiar es el único que la mayoría olvida calcular."'},
  faq:{eyebrow:'FAQ',h2:'Preguntas',h2i:'respondidas.',more:'¿Algo más?',items:[{q:'¿Cómo recibo los PDFs?',a:'Inmediatamente después del pago recibes un email con los enlaces de descarga directa de ambos documentos del Mental OS. Totalmente automatizado — sin esperas, sin entrega manual, sin soporte necesario.'},{q:'¿Cómo accedo al dashboard?',a:'Entra a app.mindshiftlabs.lat desde cualquier navegador, inicia sesión con el mismo email de tu compra, crea tu contraseña y listo — acceso Pro activado automáticamente desde el primer login. Sin descargas.'},{q:'¿Qué pasa después de 30 días?',a:'La suscripción de $9/mes se activa automáticamente vía Paddle. Puedes cancelar cuando quieras desde dentro del dashboard — sin fricción, sin pasos ocultos, sin llamadas con ventas.'},{q:'¿Desde qué países se puede comprar?',a:'Desde cualquier país del mundo. Aceptamos las principales tarjetas de crédito y débito internacionales y métodos de pago locales. Pagos procesados por Paddle, una plataforma global de pagos.'},{q:'¿Hay garantía de devolución?',a:'Sí. Si en los primeros 7 días no es para ti, te devolvemos el 100% — sin preguntas. Escribe a support@mindshiftlabs.lat y procesamos en 3-5 días hábiles.'},{q:'¿Funciona en cualquier dispositivo?',a:'Sí — el dashboard es completamente web. Funciona en cualquier dispositivo con navegador: computadora, tablet o móvil. Sin descargas.'}]},
  closing:{h2:'Los próximos 90 días van a pasar ',h2i:'de todos modos.',sub:'Puedes pasarlos reconstruyendo el sistema operativo entre tus orejas. O puedes pasarlos como pasaste los últimos 90.',cta:'Empezar · $25 hoy',note:'$25 HOY · 30 DÍAS PRO · LUEGO $9/MES · CANCELA CUANDO QUIERAS · GARANTÍA 7 DÍAS'},
  footer:{blurb:'El entorno diario para reescribir el sistema operativo entre tus orejas. Construido para todos los que hacen el trabajo.',badge:'PRECIO FUNDADOR ACTIVO',cols:[{h:'PRODUCTO',l:[{t:'Funciones',href:'#features'},{t:'El Sistema',href:'#pdfs'},{t:'El Método',href:'#the-method'},{t:'Precio',href:'#pricing'},{t:'Dashboard',href:'#app-screens'}]},{h:'COMPAÑÍA',l:[{t:'Manifiesto',href:'#manifesto'},{t:'Quiz',href:'#quiz'},{t:'Prensa',href:'mailto:press@mindshiftlabs.lat'},{t:'Contacto',href:'mailto:support@mindshiftlabs.lat'}]},{h:'LEGAL',l:[{t:'Aviso de Privacidad',href:'/privacy.html'},{t:'Términos de Servicio',href:'/terms.html'},{t:'Política de Reembolso',href:'/refunds.html'},{t:'Exportar datos',href:'mailto:support@mindshiftlabs.lat'}]}],copy:'© 2026 MINDSHIFT LABS · CONSTRUIDO PARA EL TRABAJO SILENCIOSO',langLabel:'Idioma'},
},
pt:{
  checkoutLoading:'O checkout seguro está carregando — espere um segundo e toque de novo.',
  nav:{links:[{label:'O App',id:'features'},{label:'Telas',id:'app-screens'},{label:'Quiz',id:'quiz'},{label:'O Método',id:'the-method'},{label:'Preço',id:'pricing'}],signIn:'Entrar',begin:'Começar'},
  hero:{badge:'LANÇAMENTO OFICIAL · PREÇO DE FUNDADOR ATIVO',badgeM:'LANÇAMENTO · PREÇO DE FUNDADOR',h1pre:'O sistema operacional para a ',h1word:'pessoa',h1mid:' que você está se ',h1end:'tornando.',sub:'O Mindshift é o ambiente diário onde você reseta sua mente, instala disciplina e reescreve os padrões que dirigem sua vida em silêncio há anos.',cta:'Comece seu reset',watch:'Ver prévia',note:'PAGAMENTO ÚNICO $25 · 30 DIAS PRO INCLUÍDOS · DEPOIS $9/MÊS · CANCELE QUANDO QUISER',stats:[{v:'30 dias',l:'PRO INCLUÍDO',s:'desde o primeiro dia'},{v:'$25',l:'PREÇO DE FUNDADOR',s:'pagamento único'},{v:'$9',l:'A PARTIR DO MÊS 2',s:'cancele quando quiser'},{v:'100%',l:'AUTOMATIZADO',s:'PDFs enviados na hora'}]},
  ticker:['🔥 "Sequência de 12 dias — o primeiro app de hábitos que funcionou pra mim."','✦ "O Weekly Reset é o recurso que eu não sabia que precisava."','🧠 "Parei de vagar. Minha semana tem direção agora."','⚡ "O mantra parece um bilhete meu, não um pôster de frases."','◎ "Um dia perdido em três semanas. Pra mim isso é progresso."','🔥 "Primeiro pergunta quem você quer ser. Os hábitos vêm depois."','✦ "Mantenho a página do Mental Software impressa na minha mesa."','🧠 "Dez minutos no domingo e minha semana faz sentido."'],
  bento:{eyebrow:'O sistema',h2:'Seu sistema operacional de identidade.',h2i:'Na web.',sub:'O dashboard é onde a transformação acontece todos os dias. Quatro módulos que se potencializam: hábitos, identidade, revisão semanal e um mantra que evolui com você.',dashTitle:'Mindshift Dashboard',dashTag:'Web · 30 dias Pro incluídos',dashBody:'Não é mais um app de produtividade. Quatro módulos que trabalham juntos para mudar quem você é — construídos em torno da sua identidade, não da sua lista de tarefas.',features:[{label:'Habit Tracker',desc:'Check-ins diários, sequências e visão de 7 dias'},{label:'Mental OS',desc:'Metas, identidade, valores e visão'},{label:'Weekly Reset',desc:'5 perguntas de reflexão, revisão semanal'},{label:'Mantra Semanal',desc:'Gerado por IA a partir do seu Mental OS'}],pdfTitle:'PDFs bônus',pdfTag:'Incluídos · Entrega instantânea',pdfBody:'Dois documentos imprimíveis incluídos na sua compra. Use-os junto com o dashboard para ancorar seu trabalho de identidade também no papel.',pdfItems:[{t:'Mental Software',s:'Metas · Identidade · Mantra'},{t:'Habit Tracker',s:'Gráfico radial de 31 dias'}],mantraTitle:'Mantra Semanal',mantraTag:'IA · Atualiza com o Weekly Reset',mantraBody:'Toda semana, ao completar seu Weekly Reset, a IA lê seu Mental OS e gera um novo mantra calibrado exatamente para onde você está. Não é motivação genérica — é um sinal preciso construído com suas próprias respostas.',mantraQuote:'"Ajo com disciplina acima da dúvida, confio em mim acima da validação, e construo meu futuro com ação consistente hoje."',mantraMeta:'GERADO POR IA · SEMANA 1 · SEU MENTAL OS'},
  screens:{eyebrow:'Dentro do dashboard',h2:'Seu ambiente diário',h2i:'de transformação.',side:'Não é mais uma ferramenta de produtividade — é o sistema que muda quem você é no nível da identidade.',items:[{label:'Dashboard · Hoje',sublabel:'Mantra IA · Sequência · XP · Navegação'},{label:'Habit Tracker',sublabel:'Check-ins diários · 7 dias · Calendário'},{label:'Mental OS',sublabel:'Metas · Identidade · Valores · Visão'},{label:'Weekly Reset',sublabel:'5 perguntas · Revisão semanal'}]},
  preview:{eyebrow:'Demo ao vivo',h2:'Cada tela construída',h2i:'para uma só coisa.',body:'Cada tela do dashboard Mindshift foi desenhada para reforçar uma só coisa: quem você está se tornando. Hábitos, XP, um mantra semanal — tudo conectado à sua identidade.',tabs:['Hoje','Hábitos','Mental OS','Semanal']},
  demo:{eyebrow:'Experimente você mesmo',h2:'Sinta o primeiro',h2i:'check-in.',sub:'Isto é uma parte viva do dashboard real. Complete os três hábitos iniciais e sinta o que é um dia perfeito.',habits:[{n:'Meditar 10 min',e:'🧘'},{n:'Ler 20 páginas',e:'📖'},{n:'Mover o corpo',e:'💪'}],xpLabel:'XP HOJE',streakLabel:'SEQUÊNCIA',dayDone:'Dia perfeito. Essa é a sensação — todos os dias.',dayDoneSub:'Agora imagine 30 desses seguidos, conectados à sua identidade.',cta:'Torne real — comece seu reset',reset:'Reiniciar demo',hint:'Toque em um hábito para completá-lo'},
  video:{eyebrow:'Veja em ação',h2:'Veja como funciona',h2i:'o reset.',sub:'Um tour pela experiência Mindshift completa — da compra à sua primeira sessão de Mental OS.',ph:'Vídeo do dashboard',phSub:'Sistema Mindshift completo · ~3 min'},
  pdfs:{eyebrow:'Incluídos na sua compra',h2:'Dois documentos.',h2i:'Incluídos grátis.',side:'Os dois PDFs chegam no seu email no momento da compra — sem espera, sem passos manuais. Use-os junto com o dashboard para ancorar sua transformação também no papel.',docs:[{title:'Mental Software',tag:'Identidade · Metas · Mantra Diário',desc:'Seu manual mensal de identidade. Defina suas metas, declare quem você está se tornando, nomeie os padrões limitantes que está quebrando e ancore seu mantra diário. Uma página estruturada — toda a sua direção mental do mês.',features:['Seção de Metas — 3 espaços para definir sua direção mensal com clareza total','"Quem eu quero me tornar?" — escreva sua declaração de identidade com suas palavras','Padrões limitantes que estou quebrando — nomeie e desmonte o que vem te dirigindo','Mantra Diário — a frase que recalibra sua mente toda manhã']},{title:'Habit Tracker',tag:'31 Dias · 8 Hábitos · Gráfico Radial',desc:'Um tracker radial de 31 dias para até 8 hábitos simultâneos. Cada dia é um segmento, cada hábito um anel concêntrico. Preencha ao longo do mês. No final, você tem um registro visual completo da sua disciplina — cada lacuna visível, cada sequência conquistada.',features:['Gráfico radial de 31 dias — veja o padrão do mês inteiro de uma olhada','Acompanhe até 8 hábitos simultâneos no mesmo layout circular','Coisas a melhorar — defina seus focos de crescimento para o próximo mês','Coisas a agradecer — ancore sua mentalidade no que já funciona']}]},
  quiz:{eyebrow:'Diagnóstico grátis de 2 minutos',h2:'O que está realmente',h2i:'dirigindo sua mente?',sub:'Cinco perguntas. Não há respostas certas — só honestas. No final você recebe seu Mental OS Score e exatamente onde seu sistema está vazando.',start:'Começar o diagnóstico',qLabel:'PERGUNTA',questions:[{q:'Quando você define uma meta, o que costuma acontecer?',opts:[{t:'Eu vou até o fim',s:3},{t:'Começo forte — desisto na segunda semana',s:1},{t:'Fico planejando mas raramente começo',s:0},{t:'Depende totalmente da minha motivação no dia',s:1}]},{q:'Seus primeiros 30 minutos ao acordar são…',opts:[{t:'Celular na mão, rolando o feed',s:0},{t:'Correndo — o dia começa sem mim',s:1},{t:'Alguma rotina, mas inconsistente',s:2},{t:'Um ritual que eu escolhi e controlo',s:3}]},{q:'Com que frequência sua voz interior joga contra você?',opts:[{t:'Constantemente — ela manda',s:0},{t:'Sempre que as coisas ficam difíceis',s:1},{t:'Às vezes, mas eu percebo',s:2},{t:'Raramente — eu a treinei',s:3}]},{q:'Quem escolheu as crenças com que você opera hoje?',opts:[{t:'Sinceramente? Nunca pensei nisso',s:0},{t:'Meu passado e meu ambiente',s:1},{t:'Em parte eu, em parte herdadas',s:2},{t:'Eu as escolhi conscientemente',s:3}]},{q:'Neste ritmo exato, daqui a um ano você estará…',opts:[{t:'No mesmo lugar. Sinceramente.',s:0},{t:'Um pouco melhor, quase igual',s:1},{t:'Visivelmente melhor',s:2},{t:'Sendo outra pessoa',s:3}]}],gateTitle:'Seu diagnóstico de Mental OS está pronto.',gateSub:'Digite seu email e desbloqueamos seu score, seu perfil operacional e os pontos exatos onde seu sistema está vazando.',gatePlaceholder:'seu@email.com',gateCta:'Ver meu resultado',gateNote:'Sem spam. Seu resultado + sinais ocasionais do Mindshift. Cancele quando quiser.',gateError:'Digite um email válido para desbloquear seu resultado.',scoreLabel:'SEU MENTAL OS SCORE',profiles:[{min:0,name:'Modo Sobrevivência',desc:'Sua mente roda nas configurações de fábrica — reagindo, não dirigindo. Suas metas perdem para o seu ambiente quase sempre, e sua voz interior trabalha para a sua versão antiga.',leak:'Maior vazamento: não há sistema. A força de vontade faz o trabalho que a estrutura deveria fazer.'},{min:40,name:'Piloto Automático',desc:'Você funciona, produz, atravessa a semana — mas a semana dirige você. Os padrões que decidem seu dia foram instalados anos atrás, e ninguém te perguntou.',leak:'Maior vazamento: não há checkpoint semanal. Você vaga porque nada reseta sua direção.'},{min:67,name:'Construtor',desc:'Você já age com intenção e provou a consistência. O que te quebra é a lacuna entre semanas boas e ruins — você reconstrói o impulso do zero com muita frequência.',leak:'Maior vazamento: não há âncora de identidade. Seus hábitos dependem do humor e não de quem você decidiu ser.'},{min:87,name:'Arquiteto',desc:'Você opera deliberadamente — isso é raro. Sua vantagem agora é capitalizar: proteger o sistema que construiu e melhorá-lo mais rápido do que a vida o degrada.',leak:'Maior vazamento: manutenção. Até sistemas fortes decaem sem um ritual semanal de reset.'}],resultBridge:'É exatamente isso que o Mindshift foi construído para consertar.',resultCta:'Conserte — comece seu reset · $25',retake:'Refazer o quiz',saving:'Desbloqueando…'},
  method:{eyebrow:'O método',h2:'Simples.',h2i:'Progressivo. Real.',side:'Da compra ao seu primeiro reset em menos de 10 minutos. Sem assistentes de configuração, sem atrito.',steps:[{title:'Pague $25 — tudo chega em minutos',desc:'Checkout seguro via Paddle. Logo após o pagamento você recebe um email com os links de download dos dois PDFs do Mental OS. Totalmente automatizado — sem espera, sem passos manuais, sem tickets de suporte.'},{title:'Acesse seu dashboard com seu email',desc:'Vá para app.mindshiftlabs.lat, entre com o mesmo email da compra, crie sua senha e pronto — acesso Pro ativado automaticamente desde o primeiro login.'},{title:'30 dias para reescrever sua identidade',desc:'Acesso completo ao dashboard, os dois PDFs e um mantra personalizado toda semana. No fim do dia 30, o Paddle cobra $9/mês automaticamente. Cancele quando quiser pelo dashboard — sem atrito, sem passos escondidos.'}]},
  calc:{eyebrow:'Faça as contas',h2:'O custo de não mudar',h2i:'é o que ninguém calcula.',age:'Sua idade',hours:'Horas perdidas por dia no piloto automático',hoursSub:'rolando o feed, vagando, reagindo — seja honesto',line1:'Neste ritmo, nos próximos 5 anos você vai entregar',days:'dias inteiros',line2:'da sua única vida ao piloto automático. Isso é',months:'meses',line3:'— acordado, mas sem escolher.',anchor:'O Mindshift custa $25. Uma vez. Menos de 3 centavos por hora recuperada nos primeiros 90 dias.',cta:'Pare o vazamento — comece seu reset'},
  testimonials:{eyebrow:'Da comunidade',h2:'O trabalho silencioso',h2i:'fala.',bar:[{v:'+100',l:'CLIENTES',sub:'e crescendo'},{v:'4.6',l:'NOTA MÉDIA',sub:'entre avaliações'},{v:'7 dias',l:'GARANTIA',sub:'sem perguntas'}],items:[{name:'Ana L.',role:'Designer',stars:5,text:'A revisão semanal foi o que ficou comigo. Eu vagava de uma semana para outra. Agora tenho um pequeno ritual que me mantém honesta sobre para onde meu tempo foi.'},{name:'Marcus T.',role:'Engenheiro de Software',stars:4,text:'Design limpo, sem excesso. É basicamente um tracker de hábitos mais um diário de identidade, mas o jeito que se conectam me fez abrir todos os dias. Sequência de 12 dias.'},{name:'Sofia R.',role:'Dona de negócio',stars:5,text:'O PDF do Mental Software me surpreendeu. Escrever os padrões que eu estava quebrando foi desconfortável no bom sentido. Mantenho a página impressa na minha mesa.'},{name:'Camille V.',role:'Gerente de Marketing',stars:4,text:'Eu era cética com o mantra de IA, sinceramente. Mas como é construído com as minhas respostas, parece menos um pôster de frases e mais um bilhete meu. Isso me conquistou.'},{name:'Ryan S.',role:'Estudante',stars:5,text:'Tenho 22 anos e larguei todos os apps de hábitos em uma semana. O diferente aqui é a sequência mais as perguntas semanais — quebrar a corrente agora me custa algo.'},{name:'Priya N.',role:'Product Manager',stars:5,text:'Cinco perguntas num domingo à noite, dez minutos, e minha semana de repente tem direção. O Weekly Reset é o recurso que eu não sabia que precisava.'},{name:'Carlos D.',role:'Designer Freelancer',stars:4,text:'Simples e focado. Queria um app mobile um dia, mas o dashboard web funciona bem no meu celular e a tela de hábitos é a primeira que continuo usando depois da segunda semana.'},{name:'Emma W.',role:'Coach',stars:5,text:'Comprei pelos PDFs e fiquei pelo dashboard. A abordagem de identidade primeiro dá aos meus clientes linguagem para o que tentam mudar. Preço justo pelo que entrega.'},{name:'Liam O.',role:'Executivo de Vendas',stars:4,text:'O contador de sequência me cobra mais do que eu esperava. Perdi um dia em três semanas — para alguém que largava tudo em três dias, isso é progresso.'},{name:'Natalia F.',role:'Instrutora de Yoga',stars:5,text:'Não empurra produtividade por produtividade. Primeiro pergunta quem você quer se tornar, e os hábitos vêm dessa clareza. Essa ordem importa mais do que eu pensava.'}]},
  manifesto:{eyebrow:'Manifesto',lines:['Não acreditamos em motivação. Acreditamos em sistemas.','Não construímos mais uma ferramenta de produtividade. Construímos o ambiente onde a transformação realmente acontece.','Seu problema nunca foi disciplina. É que ninguém te ensinou a operar a sua própria mente.','O Mindshift é o manual que deveriam ter te dado.'],sig:'MINDSHIFT LABS · CONSTRUÍDO PARA O TRABALHO SILENCIOSO'},
  pricing:{eyebrow:'Preço de lançamento',h2:'Uma decisão.',h2i:'Uma vez.',once:'pagamento único',founder:'PREÇO DE FUNDADOR · TEMPO LIMITADO',includes:['Sistema Mental OS completo — 2 PDFs imprimíveis entregues na hora no seu email','30 dias de acesso Pro ao dashboard web desde o primeiro login','Mantra IA personalizado que atualiza a cada Weekly Reset','Hábitos + sequências + XP (10 XP por hábito completado)','Dashboard pessoal de Mental OS: identidade, valores, visão e metas','Todas as atualizações futuras incluídas — para sempre'],cta:'Obter acesso completo',fine:'A PARTIR DO DIA 31 · $9/MÊS · CANCELE PELO APP',fine2:'CHECKOUT SEGURO VIA PADDLE · GARANTIA DE 7 DIAS',quote:'"O custo de não mudar é o único que a maioria esquece de calcular."'},
  faq:{eyebrow:'FAQ',h2:'Perguntas',h2i:'respondidas.',more:'Algo mais?',items:[{q:'Como recebo os PDFs?',a:'Logo após o pagamento você recebe um email com os links de download direto dos dois documentos do Mental OS. Totalmente automatizado — sem espera, sem entrega manual, sem suporte necessário.'},{q:'Como acesso o dashboard?',a:'Vá para app.mindshiftlabs.lat em qualquer navegador, entre com o mesmo email da compra, crie sua senha e pronto — acesso Pro ativado automaticamente desde o primeiro login. Sem downloads.'},{q:'O que acontece depois de 30 dias?',a:'A assinatura de $9/mês ativa automaticamente via Paddle. Você pode cancelar quando quiser de dentro do dashboard — sem atrito, sem passos escondidos, sem ligações com vendas.'},{q:'De quais países dá para comprar?',a:'De qualquer país do mundo. Aceitamos os principais cartões de crédito e débito internacionais e métodos de pagamento locais. Pagamentos processados pela Paddle, uma plataforma global.'},{q:'Tem garantia de devolução?',a:'Sim. Se nos primeiros 7 dias não for para você, devolvemos 100% — sem perguntas. Escreva para support@mindshiftlabs.lat e processamos em 3-5 dias úteis.'},{q:'Funciona em qualquer dispositivo?',a:'Sim — o dashboard é totalmente web. Funciona em qualquer dispositivo com navegador: computador, tablet ou celular. Sem downloads.'}]},
  closing:{h2:'Os próximos 90 dias vão passar ',h2i:'de qualquer jeito.',sub:'Você pode passá-los reconstruindo o sistema operacional entre as suas orelhas. Ou pode passá-los como passou os últimos 90.',cta:'Começar · $25 hoje',note:'$25 HOJE · 30 DIAS PRO · DEPOIS $9/MÊS · CANCELE QUANDO QUISER · GARANTIA 7 DIAS'},
  footer:{blurb:'O ambiente diário para reescrever o sistema operacional entre as suas orelhas. Construído para todos que fazem o trabalho.',badge:'PREÇO DE FUNDADOR ATIVO',cols:[{h:'PRODUTO',l:[{t:'Recursos',href:'#features'},{t:'O Sistema',href:'#pdfs'},{t:'O Método',href:'#the-method'},{t:'Preço',href:'#pricing'},{t:'Dashboard',href:'#app-screens'}]},{h:'EMPRESA',l:[{t:'Manifesto',href:'#manifesto'},{t:'Quiz',href:'#quiz'},{t:'Imprensa',href:'mailto:press@mindshiftlabs.lat'},{t:'Contato',href:'mailto:support@mindshiftlabs.lat'}]},{h:'LEGAL',l:[{t:'Aviso de Privacidade',href:'/privacy.html'},{t:'Termos de Serviço',href:'/terms.html'},{t:'Política de Reembolso',href:'/refunds.html'},{t:'Exportar dados',href:'mailto:support@mindshiftlabs.lat'}]}],copy:'© 2026 MINDSHIFT LABS · CONSTRUÍDO PARA O TRABALHO SILENCIOSO',langLabel:'Idioma'},
},
};

let CURRENT_LANG='en';
const LangCtx=React.createContext({t:I18N.en,lang:'en',setLang:()=>{}});
function useT(){return React.useContext(LangCtx);}

function LangProvider({children}){
  const[lang,setLangState]=React.useState(()=>{
    try{
      // URL override first (e.g. mindshiftlabs.lat/?lang=es for campaigns), then saved preference
      const url=new URLSearchParams(window.location.search).get('lang');
      if(url&&I18N[url]){localStorage.setItem('ms_lang',url);return url;}
      const saved=localStorage.getItem('ms_lang');
      if(saved&&I18N[saved])return saved;
    }catch{}
    return 'en';
  });
  const setLang=React.useCallback(l=>{
    if(!I18N[l])return;
    setLangState(l);
    CURRENT_LANG=l;
    try{localStorage.setItem('ms_lang',l);}catch{}
    document.documentElement.lang=l;
  },[]);
  React.useEffect(()=>{CURRENT_LANG=lang;document.documentElement.lang=lang;},[]);
  const value=React.useMemo(()=>({t:I18N[lang],lang,setLang}),[lang,setLang]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

// ── Hooks ──────────────────────────────────────────────────────────────────

function useIsMobile(bp=760){
  const[m,setM]=React.useState(typeof window!=='undefined'&&window.innerWidth<bp);
  React.useEffect(()=>{const f=()=>setM(window.innerWidth<bp);window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f);},[bp]);
  return m;
}

function useActiveSection(ids){
  const[active,setActive]=React.useState('');
  React.useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-30% 0px -60% 0px'});
    ids.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  return active;
}

function useReveal(delay=0){
  const ref=React.useRef(null);
  const[v,setV]=React.useState(false);
  React.useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setTimeout(()=>setV(true),delay);obs.disconnect();}},{threshold:0.1});
    obs.observe(el);return()=>obs.disconnect();
  },[delay]);
  return[ref,v];
}

function useRevealDir(dir='up',delay=0){
  const ref=React.useRef(null);
  const[v,setV]=React.useState(false);
  React.useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setTimeout(()=>setV(true),delay);obs.disconnect();}},{threshold:0.08});
    obs.observe(el);return()=>obs.disconnect();
  },[delay]);
  return[ref,v,dir];
}

function useCountUp(target,active,duration=1400){
  const[val,setVal]=React.useState(0);
  React.useEffect(()=>{
    if(!active)return;
    let start=null;
    const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/duration,1);setVal(Math.floor(p*target));if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  },[active,target,duration]);
  return val;
}

// ── Utils ──────────────────────────────────────────────────────────────────

function openCheckout(){
  if(typeof Paddle==='undefined'){
    // Paddle script not loaded yet (slow network / blocker) — tell the user instead of failing silently
    alert(I18N[CURRENT_LANG].checkoutLoading);
    return;
  }
  const locale=CURRENT_LANG==='pt'?'pt':CURRENT_LANG==='es'?'es':'en';
  Paddle.Checkout.open({items:[{priceId:PRICE_PACK,quantity:1},{priceId:PRICE_SUB,quantity:1}],settings:{displayMode:'overlay',theme:'dark',locale},successUrl:'https://app.mindshiftlabs.lat/signup'});
}

// ── Icons ─────────────────────────────────────────────────────────────────

const WIcon={
  arrowR:(s=16,c='currentColor',sw=1.8)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check:(s=14,c='currentColor',sw=2.6)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/></svg>,
  sparkle:(s=18,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l1.7 7L21 12l-7.3 1L12 22l-1.7-9L3 12l7.3-1z"/></svg>,
  flame:(s=18,c=W.orange)=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2c0 4-5 4-5 9 0 1.4.5 2.6 1.4 3.5C8.5 13.6 8 12 8 10.5 8 14 5 15 5 18.5 5 21.5 8 23 12 23s7-1.5 7-4.5C19 13 13 13 13 2z"/></svg>,
  bolt:(s=18,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
  brain:(s=20,c='currentColor',sw=1.6)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 4.5a2.5 2.5 0 00-2.5 2.5v.5A2.5 2.5 0 004 10v.5A2.5 2.5 0 005 13a2.5 2.5 0 00-1 2v.5A2.5 2.5 0 006.5 18 2.5 2.5 0 009 20.5h.5V4.5z" stroke={c} strokeWidth={sw}/><path d="M15 4.5a2.5 2.5 0 012.5 2.5v.5A2.5 2.5 0 0120 10v.5a2.5 2.5 0 01-1 2 2.5 2.5 0 011 2v.5a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 0115 20.5h-.5V4.5z" stroke={c} strokeWidth={sw}/></svg>,
  play:(s=18,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M8 5v14l11-7z"/></svg>,
  x:(s=18,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth={2} strokeLinecap="round"/></svg>,
  quote:(s=32,c='currentColor')=><svg width={s} height={s} viewBox="0 0 32 32" fill={c} opacity={0.12}><path d="M9.6 20.8C6.8 20.8 5 18.6 5 15.8c0-4.4 3-8.8 8.4-12L15 5.6C10.6 7.8 8.2 10.6 7.6 14c.4-.2.9-.2 1.4-.2 2.6 0 4.6 1.8 4.6 4.4 0 1.4-.5 2.6-1.4 3.4-.8.8-1.6 1.2-2.6 1.2zM21.6 20.8c-2.8 0-4.6-2.2-4.6-5 0-4.4 3-8.8 8.4-12L27 5.6c-4.4 2.2-6.8 5-7.4 8.4.4-.2.9-.2 1.4-.2 2.6 0 4.6 1.8 4.6 4.4 0 1.4-.5 2.6-1.4 3.4-.8.8-1.8 1.2-2.6 1.2z"/></svg>,
  star:(s=14,c=W.gold)=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
  pdf:(s=20,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth={1.5}/><path d="M14 2v6h6M9 13h6M9 17h4" stroke={c} strokeWidth={1.5} strokeLinecap="round"/></svg>,
  image:(s=20,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth={1.5}/><circle cx="8.5" cy="8.5" r="1.5" fill={c}/><path d="M21 15l-5-5L5 21" stroke={c} strokeWidth={1.5} strokeLinejoin="round"/></svg>,
  video:(s=20,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="14" height="14" rx="2" stroke={c} strokeWidth={1.5}/><path d="M16 10l5-3v10l-5-3V10z" stroke={c} strokeWidth={1.5} strokeLinejoin="round"/></svg>,
  phone:(s=20,c='currentColor')=><svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="2" stroke={c} strokeWidth={1.5}/><line x1="9" y1="18" x2="15" y2="18" stroke={c} strokeWidth={1.5} strokeLinecap="round"/></svg>,
};

// ── Primitives ─────────────────────────────────────────────────────────────

function Glow({top,left,right,bottom,w=600,h=600,color=W.orange,opacity=0.18,blur=4,animate=false}){
  const a=Math.round(opacity*255).toString(16).padStart(2,'0');
  return <div style={{position:'absolute',top,left,right,bottom,width:w,height:h,borderRadius:'50%',background:`radial-gradient(circle,${color}${a} 0%,${color}00 60%)`,pointerEvents:'none',filter:`blur(${blur}px)`,animation:animate?'glow-pulse 4s ease-in-out infinite':'none',willChange:'opacity'}}/>;
}

function AnimatedGlow({top,left,right,bottom,w=700,h=700,color=W.orange,opacity=0.16,blur=5,which='a'}){
  const a=Math.round(opacity*255).toString(16).padStart(2,'0');
  const anim=which==='a'?'float-a 9s ease-in-out infinite':which==='b'?'float-b 12s ease-in-out infinite':'float-c 15s ease-in-out infinite';
  return <div style={{position:'absolute',top,left,right,bottom,width:w,height:h,borderRadius:'50%',background:`radial-gradient(circle,${color}${a} 0%,${color}00 65%)`,pointerEvents:'none',filter:`blur(${blur}px)`,animation:anim,willChange:'transform'}}/>;
}

function Eyebrow({children,color=W.muted,style}){
  return <div style={{fontFamily:F.mono,fontSize:11,letterSpacing:2.2,textTransform:'uppercase',color,...style}}>{children}</div>;
}

function Tag({children,color=W.fg,bg=W.surfaceRaised,border,style}){
  return <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'5px 11px',borderRadius:999,background:bg,border:border?`1px solid ${border}`:'none',fontFamily:F.mono,fontSize:10,letterSpacing:1.4,textTransform:'uppercase',color,...style}}>{children}</span>;
}

function Stars({n=5}){
  return <div style={{display:'inline-flex',gap:2}}>{Array.from({length:n},(_,i)=><span key={i}>{WIcon.star(13,W.gold)}</span>)}</div>;
}

// ── Media Placeholder ─────────────────────────────────────────────────────

function MediaPlaceholder({label,sublabel,aspect='16/9',type='image',large=false,color=W.orange}){
  const[hov,setHov]=React.useState(false);
  const soft=color==='#F97316'?'rgba(249,115,22,0.12)':color==='#A992E8'?'rgba(169,146,232,0.12)':'rgba(232,181,96,0.12)';
  const softBorder=color==='#F97316'?'rgba(249,115,22,0.28)':color==='#A992E8'?'rgba(169,146,232,0.28)':'rgba(232,181,96,0.28)';
  return(
    <div
      className="placeholder-zone"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        aspectRatio:aspect,
        border:`1.5px dashed ${hov?color:softBorder}`,
        borderRadius:large?24:16,
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,
        position:'relative',overflow:'hidden',
        transition:'border-color 0.3s ease,box-shadow 0.3s ease',
        boxShadow:hov?`0 0 40px ${soft} inset`:'none',
        cursor:'default',
      }}
    >
      <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 50%,${soft} 0%,transparent 70%)`,opacity:hov?1:0,transition:'opacity 0.4s ease',pointerEvents:'none'}}/>
      <div style={{width:large?64:52,height:large?64:52,borderRadius:'50%',background:soft,border:`1px solid ${softBorder}`,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',zIndex:1,transition:'transform 0.3s ease',transform:hov?'scale(1.08)':'scale(1)'}}>
        {type==='video'
          ? WIcon.play(large?26:20,color)
          : type==='pdf'
          ? WIcon.pdf(large?24:18,color)
          : type==='phone'
          ? WIcon.phone(large?24:18,color)
          : WIcon.image(large?24:18,color)
        }
      </div>
      <div style={{textAlign:'center',position:'relative',zIndex:1,padding:'0 24px'}}>
        <div style={{fontFamily:F.mono,fontSize:large?11:10,color,letterSpacing:1.6,textTransform:'uppercase',fontWeight:600}}>{label}</div>
        {sublabel&&<div style={{fontFamily:F.sans,fontSize:12,color:W.muted,marginTop:5,lineHeight:1.5}}>{sublabel}</div>}
      </div>
    </div>
  );
}

// ── PDF Previews ─────────────────────────────────────────────────────────

function HabitTrackerSVG(){
  const cx=140,cy=140,rIn=24,rOut=110,rings=8,days=31,totalAngle=270;
  const rStep=(rOut-rIn)/rings,dStep=totalAngle/days;
  function xy(r,deg){const rad=(deg-90)*Math.PI/180;return[cx+r*Math.cos(rad),cy+r*Math.sin(rad)];}
  function sector(r1,r2,a1,a2){
    const[x1,y1]=xy(r1,a1),[x2,y2]=xy(r1,a2),[x3,y3]=xy(r2,a2),[x4,y4]=xy(r2,a1);
    const lg=(a2-a1)>180?1:0;
    return `M${x1},${y1} A${r1},${r1} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 ${lg} 0 ${x4},${y4}Z`;
  }
  const cells=[],labels=[],habitLines=[];
  for(let r=0;r<rings;r++){
    for(let d=0;d<days;d++){
      const a1=dStep*d,a2=dStep*(d+1);
      cells.push(sector(rIn+rStep*r,rIn+rStep*(r+1),a1,a2));
    }
    const midY=cy-(rIn+rStep*(r+0.5));
    habitLines.push({x1:cx-66,y1:midY,x2:cx,y2:midY});
  }
  for(let d=0;d<days;d++){
    const[lx,ly]=xy(rOut+11,dStep*(d+0.5));
    labels.push({x:lx,y:ly,n:d+1});
  }
  return(
    <svg width="100%" viewBox="0 0 275 265" style={{display:'block'}}>
      {cells.map((d,i)=><path key={i} d={d} fill="#fff" stroke="#444" strokeWidth="0.45"/>)}
      {habitLines.map((l,i)=><line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#444" strokeWidth="0.45"/>)}
      {labels.map((l,i)=><text key={i} x={l.x} y={l.y} fontSize="7" textAnchor="middle" dominantBaseline="middle" fill="#333" fontFamily="Arial,sans-serif">{l.n}</text>)}
    </svg>
  );
}

function HabitTrackerPreview(){
  return(
    <div style={{background:'#fff',borderRadius:10,padding:'20px 18px 16px',fontFamily:'Arial,sans-serif',color:'#1a1a1a',boxShadow:'0 16px 56px rgba(0,0,0,0.55)',width:'100%'}}>
      <div style={{textAlign:'center',marginBottom:8,fontWeight:700,fontSize:12,letterSpacing:2,fontFamily:'Georgia,serif',textTransform:'uppercase'}}>
        Month: <span style={{fontWeight:400,borderBottom:'1px solid #555',paddingBottom:1,letterSpacing:1}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div style={{textAlign:'center',fontSize:8.5,lineHeight:1.5,color:'#444',marginBottom:10,fontStyle:'italic',padding:'0 8px'}}>
        "The habits you develop determine your future. Change your habits and you'll change your life." — <strong style={{fontStyle:'normal'}}>Brian Tracy</strong>
      </div>
      <HabitTrackerSVG/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:8}}>
        {['THINGS TO IMPROVE','THINGS TO BE GRATEFUL'].map((t,i)=>(
          <div key={i} style={{border:'1px solid #444',borderRadius:4,padding:'8px 10px',minHeight:64}}>
            <div style={{fontSize:7.5,fontWeight:700,letterSpacing:0.8,marginBottom:4}}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MentalSoftwarePreview(){
  return(
    <div style={{background:'#fff',borderRadius:10,padding:'22px 20px',fontFamily:'Arial,sans-serif',color:'#1a1a1a',boxShadow:'0 16px 56px rgba(0,0,0,0.55)',width:'100%'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{textDecoration:'underline',fontWeight:700,fontSize:14,letterSpacing:2,fontFamily:'Georgia,serif',textTransform:'uppercase'}}>Mental Software</div>
        <div style={{width:30,height:30,borderRadius:'50%',border:'2.5px solid #F5C842',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:16}}>🙂</div>
      </div>
      <div style={{textAlign:'center',fontWeight:700,fontSize:10,letterSpacing:1.5,marginBottom:10,textTransform:'uppercase'}}>Goals</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:12}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{border:'2px solid #1a1a1a',borderRadius:14,height:68}}/>
        ))}
      </div>
      <div style={{border:'1px solid #1a1a1a',borderRadius:4,padding:'10px',marginBottom:10,minHeight:80}}>
        <div style={{textAlign:'center',fontWeight:700,fontSize:9,letterSpacing:0.5,marginBottom:3}}>WHO DO I WANT TO BECOME?</div>
        <div style={{textAlign:'center',fontSize:8,color:'#555'}}>(identity)</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {["Limiting Patterns I'm Breaking","Daily Mantra"].map((t,i)=>(
          <div key={i} style={{border:'1px solid #1a1a1a',borderRadius:4,padding:'8px 10px',minHeight:68}}>
            <div style={{fontWeight:700,fontSize:8,letterSpacing:0.3,marginBottom:4}}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── App Screen Mockups ────────────────────────────────────────────────────

function AppScreenToday(){
  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';
  const navItems=[{icon:'⊙',l:'Habits'},{icon:'◈',l:'Mental OS'},{icon:'▦',l:'Weekly'},{icon:'✦',l:'Mantra'}];
  return(
    <div style={{background:BG,height:'100%',padding:'14px 12px',display:'flex',flexDirection:'column',gap:0,fontFamily:F.sans}}>
      <div style={{fontFamily:F.serif,fontSize:17,color:W.fg,marginBottom:1,lineHeight:1.2}}>Good afternoon, <span style={{fontStyle:'italic',color:W.orange}}>you.</span></div>
      <div style={{fontFamily:F.sans,fontSize:9.5,color:W.muted,marginBottom:11}}>3 of 3 habits done today</div>
      <div style={{background:CARD,borderRadius:10,padding:'10px 12px',marginBottom:8,border:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:7}}>
          <span style={{color:W.orange,fontSize:8}}>✦</span>
          <span style={{fontFamily:F.mono,fontSize:7,color:W.muted,letterSpacing:1.4}}>YOUR MANTRA</span>
        </div>
        <div style={{fontFamily:F.serif,fontStyle:'italic',fontSize:10.5,color:W.orange,lineHeight:1.5}}>"I act with discipline over doubt, trust myself over validation, and build my future through consistent action today."</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7,marginBottom:8}}>
        <div style={{background:CARD,borderRadius:10,padding:'9px 11px',border:`1px solid ${BORDER}`}}>
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}>
            <span style={{fontSize:10}}>🔥</span>
            <span style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1.2}}>STREAK</span>
          </div>
          <div style={{fontFamily:F.serif,fontSize:22,color:W.orange,lineHeight:1}}>2d</div>
          <div style={{fontFamily:F.sans,fontSize:8.5,color:W.muted,marginTop:2}}>2 days strong</div>
        </div>
        <div style={{background:CARD,borderRadius:10,padding:'9px 11px',border:`1px solid ${BORDER}`}}>
          <div style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}>
            <span style={{fontSize:10}}>⚡</span>
            <span style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1.2}}>XP TODAY</span>
          </div>
          <div style={{fontFamily:F.serif,fontSize:22,color:W.gold,lineHeight:1}}>+30</div>
          <div style={{fontFamily:F.sans,fontSize:8.5,color:W.muted,marginTop:2}}>3 habits done</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
        {navItems.map((n,i)=>(
          <div key={i} style={{background:CARD,borderRadius:10,padding:'10px 11px',border:`1px solid ${BORDER}`}}>
            <div style={{fontSize:13,marginBottom:6,color:i===0?W.green:i===1?W.violet:W.orange}}>{n.icon}</div>
            <div style={{fontFamily:F.sans,fontSize:11,fontWeight:600,color:W.fg,marginBottom:2}}>{n.l}</div>
            <div style={{fontFamily:F.sans,fontSize:8.5,color:W.muted}}>{i===0?'3/3 today':i===1?'Your identity':i===2?'Reflect & reset':'Today\'s message'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppScreenHabits(){
  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';
  const habits=[{n:'meditate',done:true},{n:'read',done:true},{n:'2L water',done:true}];
  const days=['S','M','T','W','T','F','S'];
  const dayColors=['#2a2a2a','#2a2a2a','#2a2a2a','#2a2a2a','#2a2a2a',W.green,W.orange];
  return(
    <div style={{background:BG,height:'100%',padding:'14px 12px',fontFamily:F.sans}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
        <div style={{width:36,height:36,borderRadius:'50%',border:`2.5px solid ${W.green}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <span style={{fontFamily:F.serif,fontSize:13,color:W.green,fontWeight:400}}>3<span style={{fontSize:8,color:W.muted}}>/3</span></span>
        </div>
        <div>
          <div style={{fontFamily:F.mono,fontSize:7,color:W.muted,letterSpacing:1,marginBottom:2}}>SATURDAY, JUN 6</div>
          <div style={{fontFamily:F.serif,fontSize:15,color:W.fg}}>Your <span style={{fontStyle:'italic',color:W.green}}>habits</span></div>
          <div style={{fontFamily:F.sans,fontSize:8,color:W.green}}>✓ All done — great work.</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7,marginBottom:8}}>
        {[{l:'THIS WEEK',v:'29',c:W.green},{l:'THIS MONTH',v:'33',c:W.violet}].map((s,i)=>(
          <div key={i} style={{background:CARD,borderRadius:8,padding:'8px 10px',border:`1px solid ${BORDER}`}}>
            <div style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1,marginBottom:3}}>{s.l}</div>
            <div style={{fontFamily:F.serif,fontSize:16,color:s.c,lineHeight:1}}>{s.v}<span style={{fontSize:9,color:W.muted}}>%</span></div>
            <div style={{height:2,background:'rgba(255,255,255,0.08)',borderRadius:1,marginTop:5}}>
              <div style={{height:'100%',width:`${s.v}%`,background:s.c,borderRadius:1}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:CARD,borderRadius:8,padding:'8px 10px',marginBottom:8,border:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <span style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1}}>7-DAY VIEW</span>
          <span style={{fontFamily:F.sans,fontSize:8,color:W.muted}}>2 perfect days</span>
        </div>
        <div style={{display:'flex',gap:3,marginBottom:4}}>
          {dayColors.map((c,i)=>(
            <div key={i} style={{flex:1,height:16,borderRadius:3,background:c}}/>
          ))}
        </div>
        <div style={{display:'flex',gap:3}}>
          {days.map((d,i)=>(
            <div key={i} style={{flex:1,fontFamily:F.mono,fontSize:6,color:W.dim,textAlign:'center'}}>{d}</div>
          ))}
        </div>
      </div>
      {habits.map((h,i)=>(
        <div key={i} style={{background:CARD,borderRadius:8,padding:'8px 10px',marginBottom:5,border:`1px solid ${BORDER}`,display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:16,height:16,borderRadius:4,background:W.green,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span style={{color:'#0B0805',fontSize:9,fontWeight:700}}>✓</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:11,color:W.muted,textDecoration:'line-through',flex:1}}>{h.n}</span>
          <span style={{fontSize:10,color:'rgba(255,255,255,0.2)'}}>×</span>
        </div>
      ))}
    </div>
  );
}

function AppScreenOS(){
  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';
  const goals=['build my business up to 5k','get in shape','build discipline'];
  const sections=[
    {icon:'◈',iconBg:'rgba(169,146,232,0.2)',iconColor:W.violet,title:'Identity',sub:'Who you are becoming',text:'I am someone who acts with discipline, stays present, trusts the process, and builds a meaningful life through consistent action.'},
    {icon:'◆',iconBg:'rgba(249,115,22,0.2)',iconColor:W.orange,title:'Values',sub:'What you stand for',text:'Discipline, authenticity, growth, presence. I do what I say I will do. I value truth over comfort, progress over perfection.'},
    {icon:'◎',iconBg:'rgba(249,115,22,0.15)',iconColor:W.gold,title:'Vision',sub:'Where you are going',text:'In 3 years, I am physically strong, emotionally grounded, and financially free. I lead successful businesses that create real impact.'},
  ];
  return(
    <div style={{background:BG,height:'100%',padding:'14px 12px',fontFamily:F.sans,overflowY:'auto'}}>
      <div style={{fontFamily:F.mono,fontSize:7,color:W.muted,letterSpacing:1.5,marginBottom:5}}>SYSTEM</div>
      <div style={{fontFamily:F.serif,fontSize:17,color:W.fg,marginBottom:2}}>your <span style={{fontStyle:'italic',color:W.violet}}>Mental OS</span></div>
      <div style={{fontFamily:F.sans,fontSize:8.5,color:W.muted,marginBottom:11}}>Tap any section to edit</div>
      <div style={{background:CARD,borderRadius:10,padding:'9px 11px',marginBottom:7,border:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:8}}>
          <span style={{fontSize:9}}>🎯</span>
          <span style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1.2,flex:1}}>YOUR GOALS</span>
          <span style={{fontFamily:F.sans,fontSize:8,color:W.orange,background:'rgba(249,115,22,0.15)',padding:'2px 7px',borderRadius:4}}>✎ Edit</span>
        </div>
        {goals.map((g,i)=>(
          <div key={i} style={{display:'flex',gap:7,marginBottom:i<2?5:0}}>
            <span style={{fontFamily:F.mono,fontSize:7,color:W.orange,letterSpacing:0.5,flexShrink:0}}>0{i+1}</span>
            <span style={{fontFamily:F.sans,fontSize:9.5,color:W.fg}}>{g}</span>
          </div>
        ))}
      </div>
      {sections.map((s,i)=>(
        <div key={i} style={{background:CARD,borderRadius:10,padding:'9px 11px',marginBottom:6,border:`1px solid ${BORDER}`}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
            <div style={{width:22,height:22,borderRadius:6,background:s.iconBg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:10,color:s.iconColor}}>{s.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:F.serif,fontSize:11,color:W.fg,fontStyle:'italic'}}>{s.title}</div>
              <div style={{fontFamily:F.sans,fontSize:7.5,color:W.muted}}>{s.sub}</div>
            </div>
            <span style={{fontSize:10,color:W.muted}}>›</span>
          </div>
          <div style={{fontFamily:F.sans,fontSize:8.5,color:W.fgDim,lineHeight:1.45}}>{s.text}</div>
        </div>
      ))}
    </div>
  );
}

function AppScreenStats(){
  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';
  const questions=[
    'What was my biggest win this week?',
    'What did I learn about myself?',
    'Where did I act out of alignment with my identity?',
    'What is the one thing I will focus on next week?',
  ];
  return(
    <div style={{background:BG,height:'100%',padding:'14px 12px',fontFamily:F.sans}}>
      <div style={{fontFamily:F.mono,fontSize:7,color:W.muted,letterSpacing:1.5,marginBottom:5}}>REVIEW</div>
      <div style={{fontFamily:F.serif,fontSize:17,color:W.fg,marginBottom:2}}>Weekly <span style={{fontStyle:'italic',color:W.orange}}>Reset</span></div>
      <div style={{fontFamily:F.sans,fontSize:9,color:W.muted,marginBottom:10}}>June 6, 2026</div>
      <div style={{background:CARD,borderRadius:8,padding:'8px 10px',marginBottom:9,border:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
          <span style={{fontFamily:F.mono,fontSize:7,color:W.muted,letterSpacing:1}}>THIS WEEK</span>
          <span style={{fontFamily:F.mono,fontSize:7,color:W.muted}}>0/5</span>
        </div>
        <div style={{height:2,background:'rgba(255,255,255,0.08)',borderRadius:1}}/>
      </div>
      {questions.map((q,i)=>(
        <div key={i} style={{background:CARD,borderRadius:8,padding:'9px 10px',marginBottom:6,border:`1px solid ${BORDER}`}}>
          <div style={{fontFamily:F.mono,fontSize:7,color:W.orange,letterSpacing:1,marginBottom:5}}>0{i+1}</div>
          <div style={{fontFamily:F.serif,fontSize:10,color:W.fg,fontStyle:'italic',marginBottom:6,lineHeight:1.4}}>{q}</div>
          <div style={{height:26,background:'rgba(255,255,255,0.04)',borderRadius:5,border:`1px solid ${BORDER}`,display:'flex',alignItems:'center',paddingLeft:8}}>
            <span style={{fontFamily:F.sans,fontSize:8,color:W.dim}}>Write your reflection...</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Modals ────────────────────────────────────────────────────────────────

function VideoModal({onClose}){
  React.useEffect(()=>{
    document.body.style.overflow='hidden';
    const onKey=e=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',onKey);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',onKey);};
  },[]);
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.94)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(10px)',animation:'reveal-fade 0.3s ease both'}}>
      <div onClick={e=>e.stopPropagation()} style={{position:'relative',width:'100%',maxWidth:420,borderRadius:20,overflow:'hidden',background:W.surface,border:`1px solid ${W.borderStrong}`,boxShadow:`0 40px 80px rgba(0,0,0,0.8)`,animation:'reveal-up 0.35s cubic-bezier(.22,1,.36,1) both'}}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:12,zIndex:10,width:36,height:36,borderRadius:'50%',background:'rgba(0,0,0,0.6)',border:`1px solid ${W.borderStrong}`,color:W.fg,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {WIcon.x(16,W.fg)}
        </button>
        {PREVIEW_VIDEO_ID?(
          <div style={{aspectRatio:'9/16'}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${PREVIEW_VIDEO_ID}?autoplay=1&rel=0`} frameBorder="0" allow="autoplay;fullscreen;picture-in-picture" allowFullScreen style={{display:'block'}}/></div>
        ):(
          <div style={{aspectRatio:'9/16',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,padding:40}}>
            <div style={{width:88,height:88,borderRadius:'50%',background:W.orangeSoft,border:`1px solid ${W.orange}40`,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {WIcon.play(40,W.orange)}
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:F.serif,fontSize:30,color:W.fg,marginBottom:8}}>Preview coming soon</div>
              <div style={{fontFamily:F.sans,fontSize:15,color:W.muted}}>The system walkthrough video launches soon</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Top Nav ───────────────────────────────────────────────────────────────

function TopNav(){
  const m=useIsMobile();
  const{t}=useT();
  const[scrolled,setScrolled]=React.useState(false);
  const scrollActive=useActiveSection(['features','pdfs','app-screens','quiz','the-method','pricing','manifesto']);
  const[clicked,setClicked]=React.useState(null);
  const activeSection=clicked||scrollActive;
  const navLinks=t.nav.links;
  React.useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',f,{passive:true});
    return()=>window.removeEventListener('scroll',f);
  },[]);
  React.useEffect(()=>{if(scrollActive===clicked)setClicked(null);},[scrollActive]);
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,backdropFilter:'blur(20px) saturate(180%)',WebkitBackdropFilter:'blur(20px) saturate(180%)',background:scrolled?'rgba(11,8,5,0.96)':'rgba(11,8,5,0.7)',borderBottom:`1px solid ${scrolled?W.borderStrong:W.border}`,transition:'background 0.3s ease,border-color 0.3s ease'}}>
      <div style={{maxWidth:MAX,margin:'0 auto',padding:m?'12px 18px':'14px 32px',display:'flex',alignItems:'center',gap:m?12:32}}>
        <a href="#" style={{display:'inline-flex',alignItems:'center',gap:10,textDecoration:'none',flexShrink:0}}>
          <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3EBjo9aNlz0xa2ETMs6YgN4DukS/hf_20260528_235658_f0d787e4-21c6-4b37-9bf8-970979c13604.jpeg" alt="Mindshift Labs" style={{width:30,height:30,borderRadius:8,objectFit:'cover'}}/>
          <span style={{fontFamily:F.sans,fontSize:15,fontWeight:600,color:W.fg,letterSpacing:-0.2}}>Mindshift{m?'':' Labs'}</span>
          {!m&&<span style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:1.4,padding:'2px 6px',borderRadius:4,background:W.surface,border:`1px solid ${W.border}`,marginLeft:4}}>BETA</span>}
        </a>
        {!m&&<div style={{display:'flex',gap:24,marginLeft:16}}>
          {navLinks.map(({label,id})=>{
            const isActive=activeSection===id;
            return(
              <a key={label} href={`#${id}`} onClick={()=>setClicked(id)} style={{fontFamily:F.sans,fontSize:13.5,color:isActive?W.orange:W.muted,textDecoration:'none',fontWeight:isActive?600:500,cursor:'pointer',transition:'color 0.2s',borderBottom:isActive?`1px solid ${W.orange}`:'1px solid transparent',paddingBottom:2}}>{label}</a>
            );
          })}
        </div>}
        <div style={{flex:1}}/>
        <a href="https://app.mindshiftlabs.lat/login" style={{height:36,padding:'0 16px',borderRadius:999,background:'transparent',border:`1px solid ${W.borderStrong}`,color:W.fgDim,fontFamily:F.sans,fontSize:13,fontWeight:500,cursor:'pointer',display:'inline-flex',alignItems:'center',textDecoration:'none',marginRight:8,transition:'border-color 0.2s,color 0.2s'}}>
          {t.nav.signIn}
        </a>
        <button onClick={openCheckout} className="btn-main" style={{height:36,padding:'0 18px',borderRadius:999,border:0,background:W.fg,color:W.bg,fontFamily:F.sans,fontSize:13,fontWeight:600,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6,boxShadow:`0 4px 16px rgba(249,115,22,0.15)`}}>
          {t.nav.begin} {WIcon.arrowR(13,W.bg,2)}
        </button>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────

function Hero({onWatchPreview}){
  const m=useIsMobile();
  const{t}=useT();
  const[ref,v]=useReveal(80);
  const stats=t.hero.stats;
  return(
    <section style={{position:'relative',overflow:'hidden',padding:m?'112px 20px 56px':'188px 32px 100px'}}>
      <AnimatedGlow top={-320} left={'28%'} w={m?600:1100} h={m?600:1100} color={W.orange} opacity={0.15} blur={28} which="a"/>
      <AnimatedGlow bottom={-200} left={-180} w={700} h={700} color={W.violet} opacity={0.07} blur={28} which="b"/>
      <AnimatedGlow top={80} right={-120} w={500} h={500} color={W.gold} opacity={0.05} blur={32} which="c"/>
      <div style={{position:'absolute',inset:0,opacity:0.25,mixBlendMode:'overlay',background:`repeating-radial-gradient(circle at 50% 50%,${W.faint} 0,${W.faint} 1px,transparent 1px,transparent 3.5px)`,pointerEvents:'none'}}/>
      <div ref={ref} style={{position:'relative',maxWidth:MAX,margin:'0 auto',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'7px 14px',borderRadius:999,background:'rgba(11,8,5,0.7)',border:`1px solid ${W.borderStrong}`,animation:v?'reveal-up 0.6s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
          <span style={{width:7,height:7,borderRadius:7,background:W.orange,animation:'pulse-dot 2s ease-in-out infinite'}}/>
          <span style={{fontFamily:F.mono,fontSize:m?9:11,color:W.fgDim,letterSpacing:1.6}}>
            {m?t.hero.badgeM:t.hero.badge}
          </span>
        </div>
        <h1 style={{margin:m?'24px auto 0':'32px auto 0',fontFamily:F.serif,fontWeight:400,fontSize:m?52:110,lineHeight:0.98,letterSpacing:m?-1.8:-4,color:W.fg,maxWidth:1040,animation:v?'reveal-up 0.7s 0.1s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
          {t.hero.h1pre}<span style={{fontStyle:'italic',color:W.orange}}>{t.hero.h1word}</span>{t.hero.h1mid}<span style={{fontStyle:'italic'}}>{t.hero.h1end}</span>
        </h1>
        <p style={{margin:m?'22px auto 0':'34px auto 0',fontFamily:F.sans,fontSize:m?16:20,lineHeight:1.55,color:W.fgDim,maxWidth:600,fontWeight:400,animation:v?'reveal-up 0.7s 0.2s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
          {t.hero.sub}
        </p>
        <div style={{marginTop:m?28:40,display:'inline-flex',flexDirection:m?'column':'row',gap:m?10:14,alignItems:'center',width:m?'100%':'auto',animation:v?'reveal-up 0.7s 0.3s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
          <button onClick={openCheckout} className="btn-main" style={{height:56,padding:'0 30px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:16,fontWeight:700,letterSpacing:-0.2,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,boxShadow:`0 16px 40px ${W.orange}55,inset 0 1px 0 ${W.gold}aa`,cursor:'pointer',width:m?'100%':'auto'}}>
            {t.hero.cta} {WIcon.arrowR(16,'#fff',2.4)}
          </button>
          <button onClick={onWatchPreview} style={{height:56,padding:'0 24px',borderRadius:999,background:'transparent',color:W.fg,border:`1px solid ${W.borderStrong}`,fontFamily:F.sans,fontSize:15,cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,width:m?'100%':'auto',transition:'border-color 0.25s,background 0.25s'}}>
            <span style={{width:24,height:24,borderRadius:'50%',background:W.surfaceRaised,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{width:0,height:0,borderLeft:`7px solid ${W.fg}`,borderTop:'4px solid transparent',borderBottom:'4px solid transparent',marginLeft:2}}/>
            </span>
            {t.hero.watch}
          </button>
        </div>
        <div style={{marginTop:m?20:28,fontFamily:F.mono,fontSize:m?10:11.5,color:W.muted,letterSpacing:1.4,animation:v?'reveal-up 0.7s 0.4s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
          {t.hero.note}
        </div>
      </div>
      <div style={{position:'relative',maxWidth:900,margin:m?'44px auto 0':'80px auto 0',display:m?'grid':'flex',gridTemplateColumns:m?'repeat(2,1fr)':'none',alignItems:'stretch',borderRadius:20,background:'rgba(11,8,5,0.55)',border:`1px solid ${W.border}`,overflow:'hidden',animation:v?'reveal-up 0.7s 0.5s cubic-bezier(.22,1,.36,1) both':'none',opacity:v?undefined:0}}>
        {stats.map((s,i)=>(
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2,padding:m?'18px 16px':'20px 32px',borderRight:!m&&i<3?`1px solid ${W.border}`:'none',borderBottom:m&&i<2?`1px solid ${W.border}`:'none',flex:m?undefined:1,position:'relative',overflow:'hidden'}}>
            {i===0&&<div style={{position:'absolute',inset:0,background:`linear-gradient(135deg,${W.orange}05,transparent)`,pointerEvents:'none'}}/>}
            <span style={{fontFamily:F.serif,fontSize:m?26:34,color:W.fg,letterSpacing:-0.8,lineHeight:1,position:'relative'}}>{s.v}</span>
            <span style={{fontFamily:F.mono,fontSize:9,color:W.orange,letterSpacing:1.6}}>{s.l}</span>
            <span style={{fontFamily:F.sans,fontSize:12,color:W.muted}}>{s.s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Social Proof Ticker ───────────────────────────────────────────────────

function SocialTicker(){
  const{t}=useT();
  const items=[...t.ticker,...t.ticker];
  return(
    <div style={{padding:'16px 0',borderTop:`1px solid ${W.border}`,borderBottom:`1px solid ${W.border}`,background:W.surface}}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {items.map((t,i)=>(
            <span key={i} style={{display:'inline-flex',alignItems:'center',padding:'0 36px',fontFamily:F.sans,fontSize:13.5,color:W.fgDim,whiteSpace:'nowrap'}}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mantra Update Demo ────────────────────────────────────────────────────

function MantraUpdateDemo(){
  const[phase,setPhase]=React.useState(0);
  // 0 = week 1 mantra shown
  // 1 = completing weekly reset (progress fills)
  // 2 = generating new mantra (flash)
  // 3 = week 2 mantra shown
  const[progress,setProgress]=React.useState(0);
  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';

  React.useEffect(()=>{
    let t;
    if(phase===0){t=setTimeout(()=>setPhase(1),2800);}
    else if(phase===1){
      setProgress(0);
      let p=0;
      const iv=setInterval(()=>{
        p+=4;
        setProgress(Math.min(p,100));
        if(p>=100){clearInterval(iv);setTimeout(()=>setPhase(2),400);}
      },60);
      return()=>clearInterval(iv);
    }
    else if(phase===2){t=setTimeout(()=>setPhase(3),900);}
    else if(phase===3){t=setTimeout(()=>{setPhase(0);setProgress(0);},2800);}
    return()=>clearTimeout(t);
  },[phase]);

  const mantras=[
    {week:1,text:'"I act with discipline over doubt, trust myself over validation, and build my future through consistent action."'},
    {week:2,text:'"Every choice I make today is a vote for the person I am becoming. I choose intentionally and with purpose."'},
  ];
  const current=phase<=1?mantras[0]:mantras[1];
  const isUpdated=phase===3;
  const isGenerating=phase===2;

  return(
    <div style={{background:BG,borderRadius:16,padding:'18px',border:`1px solid ${BORDER}`,fontFamily:F.sans}}>
      {/* Header */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div style={{fontFamily:F.mono,fontSize:7.5,color:W.muted,letterSpacing:1.3}}>YOUR MANTRA</div>
        <div style={{fontFamily:F.mono,fontSize:7,color:isUpdated?W.green:W.muted,letterSpacing:1,display:'flex',alignItems:'center',gap:4,transition:'color 0.4s'}}>
          {isUpdated&&<span style={{fontSize:9}}>✦</span>}
          WEEK {current.week}
        </div>
      </div>

      {/* Mantra text */}
      <div style={{
        minHeight:72,
        fontFamily:F.serif,
        fontStyle:'italic',
        fontSize:13,
        color:isGenerating?'transparent':isUpdated?W.orange:W.fg,
        lineHeight:1.55,
        marginBottom:14,
        transition:'color 0.35s ease',
        position:'relative',
      }}>
        {isGenerating?(
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            <span style={{fontFamily:F.mono,fontSize:9,color:W.gold,letterSpacing:1.5,animation:'pulse-dot 1s ease-in-out infinite'}}>✦</span>
            <span style={{fontFamily:F.mono,fontSize:8.5,color:W.gold,letterSpacing:1.2}}>Generating week {phase===2?2:1} mantra...</span>
          </div>
        ):current.text}
      </div>

      <div style={{height:1,background:BORDER,marginBottom:14}}/>

      {/* Weekly Reset progress */}
      <div style={{background:CARD,borderRadius:10,padding:'11px 14px',border:`1px solid ${BORDER}`}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:phase===1?10:0}}>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{fontFamily:F.mono,fontSize:7,color:W.orange,letterSpacing:1}}>▦ WEEKLY RESET</span>
          </div>
          {phase===0&&<span style={{fontFamily:F.sans,fontSize:9,color:W.muted,fontStyle:'italic'}}>waiting →</span>}
          {phase===1&&<span style={{fontFamily:F.mono,fontSize:7,color:W.orange,letterSpacing:1}}>{Math.round(progress)}%</span>}
          {(phase===2||phase===3)&&<span style={{fontFamily:F.mono,fontSize:7,color:W.green,letterSpacing:1}}>✓ Done</span>}
        </div>

        {phase===1&&(
          <div>
            <div style={{height:3,background:'rgba(255,255,255,0.06)',borderRadius:2,marginBottom:8,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${progress}%`,background:`linear-gradient(90deg,${W.orange},${W.gold})`,borderRadius:2,transition:'width 0.1s linear'}}/>
            </div>
            {['What was my biggest win?','What did I learn about myself?','Where did I act out of alignment?'].map((q,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
                <div style={{width:12,height:12,borderRadius:3,background:progress>33*(i+1)?W.green:'transparent',border:`1px solid ${progress>33*(i+1)?W.green:BORDER}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.3s'}}>
                  {progress>33*(i+1)&&<span style={{color:'#0B0805',fontSize:7,fontWeight:700,lineHeight:1}}>✓</span>}
                </div>
                <span style={{fontFamily:F.sans,fontSize:8.5,color:progress>33*(i+1)?W.muted:W.dim,textDecoration:progress>33*(i+1)?'line-through':'none',transition:'color 0.3s'}}>{q}</span>
              </div>
            ))}
          </div>
        )}
        {phase===0&&(
          <div style={{fontFamily:F.sans,fontSize:8.5,color:W.dim,marginTop:4}}>5 questions · takes 5 minutes</div>
        )}
        {(phase===2||phase===3)&&(
          <div style={{fontFamily:F.sans,fontSize:8.5,color:W.green,marginTop:4}}>✓ 5/5 questions answered · mantra {isUpdated?'updated':'updating'}...</div>
        )}
      </div>
    </div>
  );
}

// ── Features Bento ────────────────────────────────────────────────────────

function MiniPhone({children,activeTab=0}){
  const PHONE_BG='#160f08';
  return(
    <div style={{background:PHONE_BG,borderRadius:32,border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden',boxShadow:`0 32px 64px rgba(0,0,0,0.65),0 0 40px rgba(249,115,22,0.08)`}}>
      <div style={{padding:'10px 14px 4px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.mono,fontSize:8,color:'rgba(255,255,255,0.4)'}}>9:41</span>
        <div style={{display:'flex',gap:3,alignItems:'center'}}>
          {[4,3,2].map(i=><div key={i} style={{width:2,height:i*2,background:'rgba(255,255,255,0.3)',borderRadius:1}}/>)}
          <div style={{width:11,height:5,borderRadius:1.5,border:'1px solid rgba(255,255,255,0.22)',marginLeft:2,display:'flex',alignItems:'center',padding:'0 1px'}}>
            <div style={{width:6,height:3,background:'#5DD39E',borderRadius:1}}/>
          </div>
        </div>
      </div>
      <div style={{width:56,height:14,background:PHONE_BG,borderRadius:'0 0 9px 9px',margin:'-1px auto 0',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:28,height:3,background:'rgba(255,255,255,0.08)',borderRadius:2}}/>
      </div>
      <div style={{height:340,overflow:'hidden'}}>{children}</div>
      <div style={{display:'flex',justifyContent:'space-around',padding:'7px 0 13px',borderTop:'1px solid rgba(255,255,255,0.05)',background:PHONE_BG}}>
        {['Today','Habits','OS','Stats'].map((t,i)=>(
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
            <div style={{width:20,height:20,borderRadius:5,background:i===activeTab?'#F97316':'rgba(255,255,255,0.04)',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.2s'}}>
              <div style={{width:7,height:7,borderRadius:2,background:i===activeTab?'#fff':'rgba(255,255,255,0.18)'}}/>
            </div>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:5.5,color:i===activeTab?'#F5EFE6':'rgba(255,255,255,0.18)',letterSpacing:0.4}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoFeatures(){
  const m=useIsMobile();
  const{t}=useT();
  const[r0,v0]=useReveal(0);
  const[r1,v1]=useReveal(80);
  const[r2,v2]=useReveal(180);
  const[r3,v3]=useReveal(260);
  const icons=[{icon:'⊙',color:'#5DD39E'},{icon:'◈',color:'#A992E8'},{icon:'▦',color:'#F97316'},{icon:'✦',color:'#E8B560'}];
  const appFeatures=t.bento.features.map((f,i)=>({...f,...icons[i]}));
  return(
    <section id="features" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`}}>
      <div style={{maxWidth:MAX,margin:'0 auto'}}>
        <div ref={r0} className={`reveal-el${v0?' visible':''}`} style={{marginBottom:m?40:60}}>
          <Eyebrow style={{marginBottom:14}}>{t.bento.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:68,lineHeight:1.01,letterSpacing:m?-1:-2.2,color:W.fg,margin:'0 0 18px',maxWidth:760}}>
            {t.bento.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.bento.h2i}</span>
          </h2>
          <p style={{fontFamily:F.sans,fontSize:m?15:17,lineHeight:1.65,color:W.fgDim,maxWidth:580,margin:0}}>
            {t.bento.sub}
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,1fr)',gap:m?12:14}}>

          {/* Card 1 — APP (large, 2 cols) */}
          <div ref={r1} className={`card-lift reveal-fade${v1?' visible':''}`} style={{gridColumn:m?'1':'1/3',background:W.surface,border:`1px solid ${W.borderStrong}`,borderRadius:20,overflow:'hidden',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.orange}60,transparent)`}}/>
            <div style={{padding:m?'28px 24px':'36px 40px',display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
                  <div style={{width:48,height:48,borderRadius:14,background:W.orangeSoft,border:`1px solid ${W.orange}30`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {WIcon.bolt(24,W.orange)}
                  </div>
                  <div>
                    <div style={{fontFamily:F.serif,fontSize:m?22:28,color:W.fg,fontWeight:400}}>{t.bento.dashTitle}</div>
                    <Tag color={W.orange} bg={W.orangeSoft} border={`${W.orange}30`} style={{marginTop:5}}>{t.bento.dashTag}</Tag>
                  </div>
                </div>
                <p style={{fontFamily:F.sans,fontSize:m?14:16,lineHeight:1.72,color:W.fgDim,margin:'0 0 24px'}}>
                  {t.bento.dashBody}
                </p>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {appFeatures.map((f,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:32,height:32,borderRadius:9,background:`${f.color}15`,border:`1px solid ${f.color}25`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:13,color:f.color}}>{f.icon}</div>
                      <div>
                        <div style={{fontFamily:F.sans,fontSize:13.5,fontWeight:600,color:W.fg,marginBottom:1}}>{f.label}</div>
                        <div style={{fontFamily:F.sans,fontSize:12,color:W.muted}}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'center',marginTop:m?32:0,gap:16}}>
                <div style={{width:m?160:178,animation:'float-phone 6s ease-in-out infinite'}}>
                  <MiniPhone activeTab={0}><AppScreenToday/></MiniPhone>
                </div>
                {!m&&<div style={{width:178,marginTop:32,animation:'float-phone 6s ease-in-out infinite',animationDelay:'1.5s'}}>
                  <MiniPhone activeTab={1}><AppScreenHabits/></MiniPhone>
                </div>}
              </div>
            </div>
          </div>

          {/* Card 2 — PDFs (compact, 1 col) */}
          <div ref={r2} className={`card-lift reveal-fade${v2?' visible':''}`} style={{gridColumn:m?'1':'3',background:W.surface,border:`1px solid ${W.border}`,borderRadius:20,overflow:'hidden',position:'relative',display:'flex',flexDirection:'column'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.violet}40,transparent)`}}/>
            <div style={{padding:m?'28px 24px':'32px 28px',flex:1,display:'flex',flexDirection:'column'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:40,height:40,borderRadius:10,background:W.violetSoft,border:`1px solid ${W.violet}25`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {WIcon.brain(20,W.violet,1.6)}
                </div>
                <div>
                  <div style={{fontFamily:F.serif,fontSize:m?18:20,color:W.fg,fontWeight:400}}>{t.bento.pdfTitle}</div>
                  <Tag color={W.violet} bg={W.violetSoft} border={`${W.violet}25`} style={{marginTop:3}}>{t.bento.pdfTag}</Tag>
                </div>
              </div>
              <p style={{fontFamily:F.sans,fontSize:m?13:13.5,lineHeight:1.7,color:W.fgDim,margin:'0 0 20px',flex:1}}>
                {t.bento.pdfBody}
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
                {t.bento.pdfItems.map((p,i)=>({...p,icon:i===0?'📄':'🔄'})).map((p,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,background:W.surfaceRaised,border:`1px solid ${W.border}`}}>
                    <span style={{fontSize:16}}>{p.icon}</span>
                    <div>
                      <div style={{fontFamily:F.sans,fontSize:12.5,fontWeight:600,color:W.fg}}>{p.t}</div>
                      <div style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:0.8,marginTop:1}}>{p.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{padding:'0 20px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              <div style={{transform:'rotate(-2deg)',transition:'transform 0.3s'}} onMouseEnter={e=>e.currentTarget.style.transform='rotate(0deg)'} onMouseLeave={e=>e.currentTarget.style.transform='rotate(-2deg)'}>
                <MentalSoftwarePreview/>
              </div>
              <div style={{transform:'rotate(2deg)',marginTop:12,transition:'transform 0.3s'}} onMouseEnter={e=>e.currentTarget.style.transform='rotate(0deg)'} onMouseLeave={e=>e.currentTarget.style.transform='rotate(2deg)'}>
                <HabitTrackerPreview/>
              </div>
            </div>
          </div>

          {/* Card 3 — Weekly Mantra (full width) */}
          <div ref={r3} className={`card-lift reveal-fade${v3?' visible':''}`} style={{gridColumn:m?'1':'1/4',background:W.surface,border:`1px solid ${W.border}`,borderRadius:20,overflow:'hidden',position:'relative'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.gold}50,transparent)`}}/>
            <div style={{padding:m?'28px 24px':'36px 40px',display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'rgba(232,181,96,0.12)',border:`1px solid ${W.gold}30`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {WIcon.sparkle(22,W.gold)}
                  </div>
                  <div>
                    <div style={{fontFamily:F.serif,fontSize:m?20:24,color:W.fg,fontWeight:400}}>{t.bento.mantraTitle}</div>
                    <Tag color={W.gold} bg="rgba(232,181,96,0.1)" border={`${W.gold}30`} style={{marginTop:4}}>{t.bento.mantraTag}</Tag>
                  </div>
                </div>
                <p style={{fontFamily:F.sans,fontSize:m?14:15.5,lineHeight:1.7,color:W.fgDim,margin:'0 0 20px'}}>
                  {t.bento.mantraBody}
                </p>
                <div style={{padding:'16px 20px',borderRadius:12,background:'rgba(232,181,96,0.06)',border:`1px solid ${W.gold}20`,fontFamily:F.serif,fontStyle:'italic',fontSize:m?15:17,color:W.fg,lineHeight:1.55}}>
                  {t.bento.mantraQuote}
                  <div style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:1.2,marginTop:10,fontStyle:'normal'}}>{t.bento.mantraMeta}</div>
                </div>
              </div>
              <div style={{marginTop:m?24:0}}><MantraUpdateDemo/></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── PDF Showcase ──────────────────────────────────────────────────────────

const PDF_META=[
  {n:'01',color:W.violet,PreviewComp:MentalSoftwarePreview},
  {n:'02',color:W.orange,PreviewComp:HabitTrackerPreview},
];

function PDFRow({pdf,idx,m}){
  const even=idx%2===0;
  const[rImg,vImg]=useReveal(80);
  const[rContent,vContent]=useReveal(180);
  const soft=pdf.color==='#F97316'?'rgba(249,115,22,0.12)':pdf.color==='#A992E8'?'rgba(169,146,232,0.12)':'rgba(232,181,96,0.12)';
  const softBorder=pdf.color==='#F97316'?'rgba(249,115,22,0.2)':pdf.color==='#A992E8'?'rgba(169,146,232,0.2)':'rgba(232,181,96,0.2)';
  const content=(
    <div ref={rContent} className={`reveal-${even&&!m?'left':'right'}-el${vContent?' visible':''}`} style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:20}}>
        <span style={{fontFamily:F.serif,fontSize:48,color:softBorder,lineHeight:1,fontWeight:400}}>{pdf.n}</span>
        <Tag color={pdf.color} bg={soft} border={softBorder}>{pdf.tag}</Tag>
      </div>
      <h3 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?28:44,lineHeight:1.04,letterSpacing:m?-0.5:-1.2,color:W.fg,margin:'0 0 16px'}}>{pdf.title}</h3>
      <p style={{fontFamily:F.sans,fontSize:m?14:15.5,lineHeight:1.72,color:W.fgDim,margin:'0 0 28px'}}>{pdf.desc}</p>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {pdf.features.map((f,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:12}}>
            <div style={{width:20,height:20,borderRadius:6,background:soft,border:`1px solid ${softBorder}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
              {WIcon.check(10,pdf.color,2.8)}
            </div>
            <span style={{fontFamily:F.sans,fontSize:m?13:14.5,lineHeight:1.6,color:W.fgDim}}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const PreviewComp=pdf.PreviewComp;
  const image=(
    <div ref={rImg} className={`reveal-scale-el${vImg?' visible':''}`} style={{maxWidth:m?'100%':420,margin:'0 auto',width:'100%'}}>
      <PreviewComp/>
    </div>
  );
  return(
    <div style={{display:m?'flex':'grid',flexDirection:m?'column':undefined,gridTemplateColumns:m?undefined:'1fr 1fr',gap:m?32:72,alignItems:'center',padding:m?'52px 0':'80px 0',borderBottom:`1px solid ${W.border}`}}>
      {m?<>{image}{content}</>:even?<>{image}{content}</>:<>{content}{image}</>}
    </div>
  );
}

function PDFShowcase(){
  const m=useIsMobile();
  const{t}=useT();
  const[hRef,hV]=useReveal(0);
  const pdfs=t.pdfs.docs.map((d,i)=>({...d,...PDF_META[i]}));
  return(
    <section id="pdfs" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-100} left={'60%'} w={600} h={500} color={W.violet} opacity={0.06} blur={24} which="c"/>
      <div style={{maxWidth:MAX,margin:'0 auto',position:'relative'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`} style={{marginBottom:m?12:0}}>
          <Eyebrow style={{marginBottom:14}}>{t.pdfs.eyebrow}</Eyebrow>
          <div style={{display:m?'block':'flex',justifyContent:'space-between',alignItems:'flex-end',gap:40}}>
            <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:64,lineHeight:1.01,letterSpacing:m?-1:-2,color:W.fg,margin:'0 0 16px',maxWidth:640}}>
              {t.pdfs.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.pdfs.h2i}</span>
            </h2>
            <p style={{fontFamily:F.sans,fontSize:m?15:16,lineHeight:1.65,color:W.muted,maxWidth:500,margin:'0 0 0 -60px',paddingBottom:m?0:8}}>
              {t.pdfs.side}
            </p>
          </div>
        </div>
        {pdfs.map((pdf,i)=><PDFRow key={i} pdf={pdf} idx={i} m={m}/>)}
      </div>
    </section>
  );
}

// ── App Screenshots ───────────────────────────────────────────────────────

const SCREEN_META=[
  {Comp:AppScreenToday,color:W.orange},
  {Comp:AppScreenHabits,color:W.green},
  {Comp:AppScreenOS,color:W.violet},
  {Comp:AppScreenStats,color:W.gold},
];

function PhoneShell({children,color=W.orange}){
  return(
    <div style={{background:W.surface,borderRadius:36,border:`1px solid ${W.borderStrong}`,overflow:'hidden',boxShadow:`0 32px 64px rgba(0,0,0,0.65),0 0 0 1px ${W.border},0 0 40px ${color}15`,position:'relative'}}>
      <div style={{padding:'10px 16px 6px',display:'flex',justifyContent:'space-between',alignItems:'center',background:W.bg,borderBottom:`1px solid ${W.border}`}}>
        <span style={{fontFamily:F.mono,fontSize:9,color:W.fgDim}}>9:41</span>
        <div style={{display:'flex',gap:4,alignItems:'center'}}>
          {[4,3,2].map(i=><div key={i} style={{width:2.5,height:i*2.5,background:W.fgDim,borderRadius:1}}/>)}
          <div style={{width:12,height:6,borderRadius:2,border:`1px solid ${W.fgDim}`,marginLeft:2,display:'flex',alignItems:'center',padding:'0 1px'}}>
            <div style={{width:7,height:3.5,background:W.green,borderRadius:1}}/>
          </div>
        </div>
      </div>
      <div style={{width:70,height:20,background:W.bg,borderRadius:'0 0 14px 14px',margin:'-2px auto 0',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:36,height:4,background:W.surfaceWarm,borderRadius:2}}/>
      </div>
      <div style={{height:420,overflow:'hidden'}}>{children}</div>
      <div style={{display:'flex',justifyContent:'space-around',padding:'10px 0 16px',borderTop:`1px solid ${W.border}`,background:W.bg}}>
        {['Today','Habits','OS','Stats'].map((t,i)=>(
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
            <div style={{width:18,height:18,borderRadius:4,background:W.surface,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:7,height:7,borderRadius:1,background:W.muted}}/>
            </div>
            <span style={{fontFamily:F.mono,fontSize:6.5,color:W.dim,letterSpacing:0.6}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenCard({s,i}){
  const[r,v]=useReveal(i*90);
  const Comp=s.Comp;
  return(
    <div ref={r} className={`reveal-scale-el${v?' visible':''}`}>
      <PhoneShell color={s.color||W.orange}>
        <Comp/>
      </PhoneShell>
      <div style={{marginTop:14,paddingLeft:2}}>
        <div style={{fontFamily:F.sans,fontSize:13,fontWeight:600,color:W.fg}}>{s.label}</div>
        <div style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:1,marginTop:3}}>{s.sublabel}</div>
      </div>
    </div>
  );
}

function AppScreenshots(){
  const m=useIsMobile();
  const{t}=useT();
  const[hRef,hV]=useReveal(0);
  const APP_SCREENS=t.screens.items.map((s,i)=>({...s,...SCREEN_META[i]}));
  return(
    <section id="app-screens" style={{padding:m?'80px 0':'120px 32px',borderTop:`1px solid ${W.border}`,overflow:'hidden'}}>
      <div style={{maxWidth:MAX,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`} style={{padding:m?'0 20px':0,marginBottom:m?36:52}}>
          <Eyebrow style={{marginBottom:14}}>{t.screens.eyebrow}</Eyebrow>
          <div style={{display:m?'block':'flex',justifyContent:'space-between',alignItems:'flex-end',gap:40}}>
            <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:64,lineHeight:1.01,letterSpacing:m?-1:-2,color:W.fg,margin:0}}>
              {t.screens.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.screens.h2i}</span>
            </h2>
            {!m&&<p style={{fontFamily:F.sans,fontSize:16,lineHeight:1.65,color:W.muted,maxWidth:360,margin:0,paddingBottom:8}}>
              {t.screens.side}
            </p>}
          </div>
        </div>
        {m?(
          <div className="screenshot-scroll" style={{padding:'0 20px 16px'}}>
            {APP_SCREENS.map((s,i)=>{
              const Comp=s.Comp;
              return(
                <div key={i} className="screenshot-item" style={{width:200}}>
                  <PhoneShell>
                    <Comp/>
                  </PhoneShell>
                  <div style={{marginTop:10,paddingLeft:4}}>
                    <div style={{fontFamily:F.sans,fontSize:12,fontWeight:600,color:W.fg}}>{s.label}</div>
                    <div style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:1,marginTop:2}}>{s.sublabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ):(
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}>
            {APP_SCREENS.map((s,i)=><ScreenCard key={i} s={s} i={i}/>)}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Video Section ─────────────────────────────────────────────────────────

function VideoSection({onWatchPreview}){
  const m=useIsMobile();
  const{t}=useT();
  const[ref,v]=useReveal(0);
  return(
    <section style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-100} left={'40%'} w={700} h={500} color={W.orange} opacity={0.07} blur={28} which="b"/>
      <div style={{maxWidth:MAX,margin:'0 auto',position:'relative'}}>
        <div ref={ref} className={`reveal-el${v?' visible':''}`} style={{textAlign:'center',marginBottom:m?32:48}}>
          <Eyebrow style={{marginBottom:14,justifyContent:'center',display:'flex'}}>{t.video.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?34:56,lineHeight:1.05,letterSpacing:m?-0.8:-1.6,color:W.fg,margin:'0 auto 14px',maxWidth:560}}>
            {t.video.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.video.h2i}</span>
          </h2>
          <p style={{fontFamily:F.sans,fontSize:m?14:16,color:W.muted,maxWidth:440,margin:'0 auto'}}>
            {t.video.sub}
          </p>
        </div>

        <div
          onClick={onWatchPreview}
          className="reveal-scale-el visible"
          style={{
            position:'relative',
            borderRadius:m?16:24,
            overflow:'hidden',
            cursor:'pointer',
            border:`1px solid ${W.borderStrong}`,
            boxShadow:`0 40px 80px rgba(0,0,0,0.5)`,
            transition:'transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s ease',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.01)';e.currentTarget.style.boxShadow=`0 48px 100px rgba(0,0,0,0.6),0 0 60px rgba(249,115,22,0.08)`;}}
          onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow=`0 40px 80px rgba(0,0,0,0.5)`;}}
        >
          <MediaPlaceholder label={t.video.ph} sublabel={t.video.phSub} aspect="16/9" type="video" large color={W.orange}/>
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:m?64:80,height:m?64:80,borderRadius:'50%',background:'rgba(11,8,5,0.8)',border:`1px solid ${W.borderStrong}`,backdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 8px 32px rgba(0,0,0,0.5),0 0 0 1px ${W.border}`,transition:'transform 0.2s ease,background 0.2s'}}>
              {WIcon.play(m?28:36,W.orange)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── App Interactive Preview ───────────────────────────────────────────────

function AppPreview(){
  const m=useIsMobile();
  const{t}=useT();
  const[active,setActive]=React.useState(0);
  const[animKey,setAnimKey]=React.useState(0);
  const[headerRef,headerV]=useReveal(0);
  const[phoneRef,phoneV]=useReveal(200);

  function switchTab(i){if(i===active)return;setActive(i);setAnimKey(k=>k+1);}

  const screens=t.preview.tabs.map((label,i)=>({label,color:SCREEN_META[i].color,Comp:SCREEN_META[i].Comp}));

  const BG='#160f08';
  const BORDER_PHONE='rgba(255,255,255,0.1)';

  return(
    <section style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,overflow:'hidden'}}>
      <div style={{maxWidth:MAX,margin:'0 auto',display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
        <div ref={headerRef} className={`reveal-el${headerV?' visible':''}`}>
          <Eyebrow style={{marginBottom:16}}>{t.preview.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?36:54,lineHeight:1.05,letterSpacing:m?-1:-1.6,color:W.fg,margin:'0 0 16px'}}>
            {t.preview.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.preview.h2i}</span>
          </h2>
          <p style={{fontFamily:F.sans,fontSize:m?14:15.5,lineHeight:1.7,color:W.fgDim,margin:'0 0 28px'}}>
            {t.preview.body}
          </p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {screens.map((s,i)=>(
              <button key={i} onClick={()=>switchTab(i)} style={{padding:'8px 18px',borderRadius:999,border:`1px solid ${active===i?s.color:W.border}`,background:active===i?`${s.color}18`:'transparent',color:active===i?s.color:W.muted,fontFamily:F.mono,fontSize:10,letterSpacing:1.2,cursor:'pointer',transition:'all 0.25s cubic-bezier(.22,1,.36,1)',fontWeight:active===i?600:400}}>{s.label}</button>
            ))}
          </div>
        </div>
        <div ref={phoneRef} className={`reveal-fade${phoneV?' visible':''}`} style={{display:'flex',justifyContent:m?'center':'flex-end',marginTop:m?44:0}}>
          <div style={{width:m?260:278,background:BG,borderRadius:42,border:`1px solid ${BORDER_PHONE}`,overflow:'hidden',boxShadow:`0 48px 96px rgba(0,0,0,0.75),0 0 0 1px rgba(255,255,255,0.05)`,animation:'float-phone 6s ease-in-out infinite'}}>
            {/* Status bar */}
            <div style={{padding:'12px 18px 6px',display:'flex',justifyContent:'space-between',alignItems:'center',background:BG}}>
              <span style={{fontFamily:F.mono,fontSize:10,color:'rgba(255,255,255,0.5)'}}>9:41</span>
              <div style={{display:'flex',gap:4,alignItems:'center'}}>
                {[4,3,2].map(i=><div key={i} style={{width:2.5,height:i*2.5,background:'rgba(255,255,255,0.4)',borderRadius:1}}/>)}
                <div style={{width:13,height:6,borderRadius:2,border:'1px solid rgba(255,255,255,0.3)',marginLeft:2,display:'flex',alignItems:'center',padding:'0 1px'}}>
                  <div style={{width:8,height:4,background:W.green,borderRadius:1}}/>
                </div>
              </div>
            </div>
            {/* Notch */}
            <div style={{width:80,height:22,background:BG,borderRadius:'0 0 14px 14px',margin:'-2px auto 0',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:44,height:4,background:'rgba(255,255,255,0.12)',borderRadius:2}}/>
            </div>
            {/* Screen content */}
            <div key={animKey} style={{height:360,overflow:'hidden',animation:'slide-screen 0.3s cubic-bezier(.22,1,.36,1) both'}}>
              {React.createElement(screens[active].Comp)}
            </div>
            {/* Nav bar */}
            <div style={{display:'flex',justifyContent:'space-around',padding:'10px 0 18px',borderTop:'1px solid rgba(255,255,255,0.06)',background:BG}}>
              {screens.map((s,i)=>(
                <div key={i} onClick={()=>switchTab(i)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',transition:'opacity 0.2s'}}>
                  <div style={{width:28,height:28,borderRadius:8,background:active===i?W.orange:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.25s ease'}}>
                    <div style={{width:10,height:10,borderRadius:2,background:active===i?'#fff':'rgba(255,255,255,0.3)'}}/>
                  </div>
                  <span style={{fontFamily:F.mono,fontSize:6.5,color:active===i?W.fg:'rgba(255,255,255,0.25)',letterSpacing:0.6}}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────

function StepItem({s,i,last,m}){
  const[r,v]=useReveal(i*120);
  return(
    <div ref={r} className={`reveal-el${v?' visible':''}`} style={{display:'grid',gridTemplateColumns:m?'52px 1fr':'90px 1fr',gap:m?18:36,padding:m?'32px 0':'44px 0',borderBottom:!last?`1px solid ${W.border}`:'none',alignItems:'start',position:'relative'}}>
      <div style={{fontFamily:F.serif,fontSize:m?44:64,color:`${W.orange}25`,lineHeight:1,paddingTop:4}}>{s.n}</div>
      <div>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
          <div style={{width:28,height:28,borderRadius:8,background:W.orangeSoft,border:`1px solid ${W.orange}30`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            {s.icon}
          </div>
          <h3 style={{fontFamily:F.serif,fontSize:m?20:26,fontWeight:400,color:W.fg,margin:0}}>{s.title}</h3>
        </div>
        <p style={{fontFamily:F.sans,fontSize:m?14:15.5,lineHeight:1.72,color:W.fgDim,margin:0}}>{s.desc}</p>
      </div>
    </div>
  );
}

function HowItWorks(){
  const m=useIsMobile();
  const{t}=useT();
  const[hRef,hV]=useReveal(0);
  const stepIcons=[WIcon.bolt(14,W.orange),WIcon.phone(14,W.orange),WIcon.flame(14,W.orange)];
  const steps=t.method.steps.map((s,i)=>({...s,n:'0'+(i+1),icon:stepIcons[i]}));
  return(
    <section id="the-method" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`}}>
      <div style={{maxWidth:MAX,margin:'0 auto'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`} style={{marginBottom:m?8:0}}>
          <Eyebrow style={{marginBottom:14}}>{t.method.eyebrow}</Eyebrow>
          <div style={{display:m?'block':'flex',justifyContent:'space-between',alignItems:'flex-end',gap:40}}>
            <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:64,lineHeight:1.01,letterSpacing:m?-1:-2,color:W.fg,margin:'0 0 16px'}}>
              {t.method.h2} <span style={{fontStyle:'italic',color:W.orange}}>{t.method.h2i}</span>
            </h2>
            {!m&&<p style={{fontFamily:F.sans,fontSize:16,lineHeight:1.65,color:W.muted,maxWidth:380,margin:0,paddingBottom:8}}>
              {t.method.side}
            </p>}
          </div>
        </div>
        <div>
          {steps.map((s,i)=><StepItem key={i} s={s} i={i} last={i===steps.length-1} m={m}/>)}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────

function TestimonialCard({t}){
  const avatarColors=[
    `linear-gradient(135deg,${W.orange}50,${W.violet}50)`,
    `linear-gradient(135deg,${W.violet}50,${W.green}50)`,
    `linear-gradient(135deg,${W.gold}50,${W.orange}50)`,
    `linear-gradient(135deg,${W.green}50,${W.violet}50)`,
  ];
  const colorIdx=t.name.charCodeAt(0)%4;
  return(
    <div className="card-lift" style={{background:W.surface,border:`1px solid ${W.border}`,borderRadius:20,padding:'28px 28px',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',width:320,flexShrink:0}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.violet}40,transparent)`}}/>
      <div style={{position:'absolute',top:18,right:18}}>{WIcon.quote(28,W.fg)}</div>
      <Stars n={t.stars}/>
      <p style={{fontFamily:F.serif,fontSize:16,lineHeight:1.6,color:W.fg,margin:'14px 0 0',fontStyle:'italic',flex:1}}>"{t.text}"</p>
      <div style={{display:'flex',alignItems:'center',gap:10,marginTop:20,paddingTop:16,borderTop:`1px solid ${W.border}`}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:avatarColors[colorIdx],display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.serif,fontSize:15,color:W.fg,fontStyle:'italic',flexShrink:0}}>
          {t.name[0]}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:13,fontWeight:600,color:W.fg}}>{t.name}</div>
          <div style={{fontFamily:F.mono,fontSize:9.5,color:W.muted,letterSpacing:0.8}}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function Testimonials(){
  const m=useIsMobile();
  const{t}=useT();
  const TESTIMONIALS=t.testimonials.items;
  const[hRef,hV]=useReveal(0);
  const trackRef=React.useRef(null);
  const[isPaused,setIsPaused]=React.useState(false);
  const posRef=React.useRef(0);
  const rafRef=React.useRef(null);
  const CARD_W=336; // card width + gap
  const TOTAL=TESTIMONIALS.length;

  React.useEffect(()=>{
    const track=trackRef.current;
    if(!track)return;
    let lastTs=null;
    const speed=0.1; // px per ms
    function step(ts){
      if(!lastTs)lastTs=ts;
      const dt=ts-lastTs;
      lastTs=ts;
      if(!isPaused){
        posRef.current+=speed*dt;
        if(posRef.current>=CARD_W*TOTAL)posRef.current=0;
        track.style.transform=`translateX(-${posRef.current}px)`;
      }
      rafRef.current=requestAnimationFrame(step);
    }
    rafRef.current=requestAnimationFrame(step);
    return()=>cancelAnimationFrame(rafRef.current);
  },[isPaused]);

  const doubled=[...TESTIMONIALS,...TESTIMONIALS];

  return(
    <section style={{padding:m?'80px 0':'120px 0',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-100} left={'60%'} w={600} h={400} color={W.violet} opacity={0.06} blur={20} which="c"/>
      <div style={{maxWidth:MAX,margin:'0 auto',position:'relative',padding:m?'0 20px':0}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`} style={{marginBottom:m?36:52,textAlign:'center'}}>
          <Eyebrow style={{marginBottom:16,textAlign:'center'}}>{t.testimonials.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:60,lineHeight:1.04,letterSpacing:m?-1:-1.8,color:W.fg,margin:'0 0 28px'}}>
            {t.testimonials.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{t.testimonials.h2i}</span>
          </h2>
          {/* Social proof bar */}
          <div style={{display:'inline-flex',alignItems:'center',gap:m?16:32,padding:m?'14px 20px':'16px 32px',borderRadius:16,background:W.surface,border:`1px solid ${W.border}`,flexWrap:'wrap',justifyContent:'center'}}>
            {t.testimonials.bar.map((s,i)=>(
              <React.Fragment key={i}>
                {i>0&&<div style={{width:1,height:32,background:W.border,display:m?'none':'block'}}/>}
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:F.serif,fontSize:m?26:32,color:W.orange,lineHeight:1,letterSpacing:-0.5}}>{s.v}</div>
                  <div style={{fontFamily:F.mono,fontSize:9,color:W.muted,letterSpacing:1.2,marginTop:3}}>{s.l}</div>
                  <div style={{fontFamily:F.sans,fontSize:11,color:W.dim,marginTop:1}}>{s.sub}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel — full width */}
      <div style={{overflow:'hidden',mask:'linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)',WebkitMask:'linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)'}}>
        <div
          ref={trackRef}
          onMouseEnter={()=>setIsPaused(true)}
          onMouseLeave={()=>setIsPaused(false)}
          style={{display:'flex',gap:16,width:'max-content',padding:'8px 0 24px',cursor:'grab'}}
        >
          {doubled.map((t,i)=><TestimonialCard key={i} t={t}/>)}
        </div>
      </div>
    </section>
  );
}

// ── Manifesto ─────────────────────────────────────────────────────────────

function ManifestoLine({l,i,m}){
  const[r,v]=useReveal(i*90);
  return(
    <p ref={r} className={`reveal-el${v?' visible':''}`} style={{fontFamily:F.serif,fontWeight:400,fontSize:m?22:34,lineHeight:1.3,letterSpacing:m?-0.5:-0.8,color:i===0||i===3?W.fg:W.fgDim,margin:'0 0 28px',fontStyle:i===3?'italic':'normal'}}>
      {l}
    </p>
  );
}

function Manifesto(){
  const m=useIsMobile();
  const{t}=useT();
  const lines=t.manifesto.lines;
  return(
    <section id="manifesto" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-100} left={'30%'} w={600} h={400} color={W.violet} opacity={0.06} blur={20} which="a"/>
      <div style={{maxWidth:800,margin:'0 auto',position:'relative'}}>
        <Eyebrow style={{marginBottom:28}}>{t.manifesto.eyebrow}</Eyebrow>
        {lines.map((l,i)=><ManifestoLine key={i} l={l} i={i} m={m}/>)}
        <div style={{marginTop:44,paddingTop:32,borderTop:`1px solid ${W.border}`,fontFamily:F.mono,fontSize:11,color:W.dim,letterSpacing:1.6}}>
          {t.manifesto.sig}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────

function Pricing(){
  const m=useIsMobile();
  const{t}=useT();
  const[hRef,hV]=useReveal(0);
  const[cRef,cV]=useReveal(200);
  const includes=t.pricing.includes;
  return(
    <section id="pricing" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-200} left={'50%'} w={900} h={700} color={W.orange} opacity={0.11} blur={24} which="b"/>
      <div style={{maxWidth:MAX,margin:'0 auto',position:'relative'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`}>
          <Eyebrow style={{marginBottom:16,textAlign:'center'}}>{t.pricing.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:68,lineHeight:1.01,letterSpacing:m?-1:-2.2,color:W.fg,margin:'0 0 64px',textAlign:'center'}}>
            {t.pricing.h2} <span style={{fontStyle:'italic',color:W.orange}}>{t.pricing.h2i}</span>
          </h2>
        </div>
        <div ref={cRef} className={`reveal-el${cV?' visible':''}`} style={{maxWidth:580,margin:'0 auto'}}>
          <div className="gradient-border" style={{borderRadius:24}}>
            <div style={{background:W.surface,border:`1px solid transparent`,borderRadius:24,overflow:'hidden',position:'relative',zIndex:1}}>
              <div style={{height:3,background:`linear-gradient(90deg,${W.orange},${W.gold},${W.orange})`,backgroundSize:'200% auto',animation:'shimmer-line 3s linear infinite'}}/>
              <div style={{padding:m?'32px 24px':'44px 44px'}}>
                <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:6}}>
                  <span style={{fontFamily:F.serif,fontSize:m?60:76,lineHeight:1,color:W.fg,letterSpacing:-2}}>$25</span>
                  <span style={{fontFamily:F.sans,fontSize:15,color:W.muted}}>{t.pricing.once}</span>
                </div>
                <div style={{fontFamily:F.mono,fontSize:10,color:W.orange,letterSpacing:1.8,marginBottom:28}}>{t.pricing.founder}</div>
                <div style={{height:1,background:W.border,marginBottom:28}}/>
                <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:36}}>
                  {includes.map((item,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'flex-start',gap:12}}>
                      <div style={{width:20,height:20,borderRadius:6,background:W.orangeSoft,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                        {WIcon.check(10,W.orange,2.8)}
                      </div>
                      <span style={{fontFamily:F.sans,fontSize:m?14:15,color:W.fgDim,lineHeight:1.55}}>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={openCheckout} className="btn-main" style={{width:'100%',height:56,borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:16,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:10,boxShadow:`0 16px 40px ${W.orange}55,inset 0 1px 0 ${W.gold}aa`,cursor:'pointer'}}>
                  {t.pricing.cta} {WIcon.arrowR(16,'#fff',2.4)}
                </button>
                <div style={{marginTop:18,textAlign:'center',fontFamily:F.mono,fontSize:10,color:W.dim,letterSpacing:1.2,lineHeight:1.8}}>
                  {t.pricing.fine}<br/>{t.pricing.fine2}
                </div>
              </div>
            </div>
          </div>
          <div style={{marginTop:20,padding:'18px 22px',borderRadius:14,background:W.orangeSoft,border:`1px solid ${W.orange}30`,fontFamily:F.serif,fontStyle:'italic',fontSize:m?15:16.5,color:W.fg,lineHeight:1.45,textAlign:'center'}}>
            {t.pricing.quote}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────

function FAQ(){
  const m=useIsMobile();
  const{t}=useT();
  const[open,setOpen]=React.useState(null);
  const[hRef,hV]=useReveal(0);
  const items=t.faq.items;
  return(
    <section style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`}}>
      <div style={{maxWidth:MAX,margin:'0 auto',display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`}>
          <Eyebrow style={{marginBottom:16}}>{t.faq.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?38:56,lineHeight:1.05,letterSpacing:m?-1:-1.8,color:W.fg,margin:0}}>
            {t.faq.h2} <span style={{fontStyle:'italic',color:W.orange}}>{t.faq.h2i}</span>
          </h2>
          {!m&&<p style={{marginTop:20,fontFamily:F.sans,fontSize:15,lineHeight:1.7,color:W.fgDim}}>
            {t.faq.more}<br/>
            <a href="mailto:support@mindshiftlabs.lat" style={{color:W.orange,textDecoration:'none'}}>support@mindshiftlabs.lat</a>
          </p>}
        </div>
        <div style={{marginTop:m?32:0}}>
          {items.map((item,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${W.border}`}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:'100%',padding:'20px 0',display:'flex',justifyContent:'space-between',alignItems:'center',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:16}}>
                <span style={{fontFamily:F.sans,fontSize:m?14:16,fontWeight:500,color:open===i?W.fg:W.fgDim,transition:'color 0.2s'}}>{item.q}</span>
                <span style={{color:W.orange,fontSize:22,flexShrink:0,transition:'transform 0.35s cubic-bezier(.22,1,.36,1)',transform:open===i?'rotate(45deg)':'none',display:'inline-block',lineHeight:1}}>+</span>
              </button>
              <div style={{overflow:'hidden',maxHeight:open===i?500:0,transition:'max-height 0.4s cubic-bezier(.22,1,.36,1)',opacity:open===i?1:0,transitionProperty:'max-height,opacity',transitionDuration:'0.4s,0.25s'}}>
                <div style={{paddingBottom:20,fontFamily:F.sans,fontSize:14.5,lineHeight:1.72,color:W.fgDim}}>{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ───────────────────────────────────────────────────────────

function ClosingCTA(){
  const m=useIsMobile();
  const{t}=useT();
  const[ref,v]=useReveal(0);
  return(
    <section style={{position:'relative',overflow:'hidden',padding:m?'80px 20px':'140px 32px',borderTop:`1px solid ${W.border}`}}>
      <AnimatedGlow top={-200} left={'50%'} w={1400} h={800} color={W.orange} opacity={0.18} blur={24} which="a"/>
      <div ref={ref} className={`reveal-el${v?' visible':''}`} style={{position:'relative',maxWidth:820,margin:'0 auto',textAlign:'center'}}>
        <h2 style={{margin:0,fontFamily:F.serif,fontWeight:400,fontSize:m?44:88,lineHeight:1.01,letterSpacing:m?-1.2:-2.8,color:W.fg}}>
          {t.closing.h2}<span style={{fontStyle:'italic',color:W.orange}}>{t.closing.h2i}</span>
        </h2>
        <p style={{marginTop:m?20:28,fontFamily:F.sans,fontSize:m?15:18,lineHeight:1.55,color:W.fgDim,maxWidth:560,margin:`${m?20:28}px auto 0`}}>
          {t.closing.sub}
        </p>
        <div style={{marginTop:m?32:44}}>
          <button onClick={openCheckout} className="btn-main" style={{height:62,padding:'0 36px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:18,fontWeight:700,display:'inline-flex',alignItems:'center',gap:12,boxShadow:`0 24px 60px ${W.orange}66,inset 0 1px 0 ${W.gold}aa`,cursor:'pointer',width:m?'100%':'auto',justifyContent:'center'}}>
            {t.closing.cta} {WIcon.arrowR(17,'#fff',2.4)}
          </button>
        </div>
        <div style={{marginTop:24,fontFamily:F.mono,fontSize:m?10:11,color:W.muted,letterSpacing:1.4}}>
          {t.closing.note}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────

function Footer(){
  const m=useIsMobile();
  const{t,lang,setLang}=useT();
  const cols=t.footer.cols;
  const linkStyle={fontFamily:F.sans,fontSize:13,color:W.fgDim,textDecoration:'none',cursor:'pointer',transition:'color 0.15s',display:'block'};
  const brand=(
    <div>
      <div style={{display:'inline-flex',alignItems:'center',gap:10}}>
        <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3EBjo9aNlz0xa2ETMs6YgN4DukS/hf_20260528_235658_f0d787e4-21c6-4b37-9bf8-970979c13604.jpeg" alt="Mindshift Labs" style={{width:36,height:36,borderRadius:10,objectFit:'cover'}}/>
        <span style={{fontFamily:F.sans,fontSize:17,fontWeight:600,color:W.fg}}>Mindshift Labs</span>
      </div>
      <p style={{marginTop:18,fontFamily:F.sans,fontSize:13.5,lineHeight:1.65,color:W.muted,maxWidth:320}}>
        {t.footer.blurb}
      </p>
      <div style={{marginTop:20,display:'inline-flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:999,background:W.orangeSoft,border:`1px solid ${W.orange}30`}}>
        <span style={{width:6,height:6,borderRadius:6,background:W.orange,animation:'pulse-dot 2s ease-in-out infinite'}}/>
        <span style={{fontFamily:F.mono,fontSize:9,color:W.orange,letterSpacing:1.4}}>{t.footer.badge}</span>
      </div>
    </div>
  );
  const langBtn=(code,label)=>(
    <button
      key={code}
      onClick={()=>setLang(code)}
      style={{
        background:lang===code?W.orangeSoft:'transparent',
        border:`1px solid ${lang===code?`${W.orange}50`:'transparent'}`,
        borderRadius:6,padding:'3px 9px',cursor:'pointer',
        fontFamily:F.mono,fontSize:10.5,letterSpacing:1,
        color:lang===code?W.orange:W.dim,
        transition:'all 0.15s',
      }}
    >{label}</button>
  );
  return(
    <footer style={{padding:m?'52px 20px 64px':'64px 32px 80px',borderTop:`1px solid ${W.border}`,background:W.bg}}>
      <div style={{maxWidth:MAX,margin:'0 auto'}}>
        {m
          ?<>{brand}<div style={{marginTop:36,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>{cols.map(c=><div key={c.h}><Eyebrow color={W.dim}>{c.h}</Eyebrow><div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}>{c.l.map(item=><a key={item.t} href={item.href} style={linkStyle} className="link-hover">{item.t}</a>)}</div></div>)}</div></>
          :<div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40}}>{brand}{cols.map(c=><div key={c.h}><Eyebrow color={W.dim}>{c.h}</Eyebrow><div style={{marginTop:14,display:'flex',flexDirection:'column',gap:10}}>{c.l.map(item=><a key={item.t} href={item.href} style={linkStyle} className="link-hover">{item.t}</a>)}</div></div>)}</div>
        }
      </div>
      <div style={{maxWidth:MAX,margin:`${m?40:64}px auto 0`,paddingTop:24,borderTop:`1px solid ${W.border}`,display:'flex',flexDirection:m?'column':'row',gap:m?14:0,justifyContent:'space-between',alignItems:m?'flex-start':'center',fontFamily:F.mono,fontSize:10.5,color:W.dim,letterSpacing:1}}>
        <span>{t.footer.copy}</span>
        <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
          <span style={{fontFamily:F.mono,fontSize:9.5,color:W.faint,letterSpacing:1.2,marginRight:4}}>{t.footer.langLabel.toUpperCase()}</span>
          {langBtn('en','EN')}
          {langBtn('es','ES')}
          {langBtn('pt','PT')}
        </span>
      </div>
    </footer>
  );
}

// ── Playable Habit Demo ──────────────────────────────────────────────────

function HabitDemo(){
  const m=useIsMobile();
  const{t}=useT();
  const[hRef,hV]=useReveal(0);
  const[pRef,pV]=useReveal(150);
  const[done,setDone]=React.useState([false,false,false]);
  const[confetti,setConfetti]=React.useState(null);
  const doneCount=done.filter(Boolean).length;
  const allDone=doneCount===3;
  const xp=doneCount*10;
  const CONFETTI_COLORS=['#F97316','#E8B560','#5DD39E','#A992E8','#F5EFE6','#FF7A8A'];

  function toggle(i){
    setDone(d=>{
      const n=[...d];n[i]=!n[i];
      // Confetti burst the moment the third habit gets checked
      if(n.filter(Boolean).length===3&&d.filter(Boolean).length===2){
        const pieces=Array.from({length:40},(_,k)=>({
          left:Math.random()*100,
          delay:Math.random()*0.5,
          duration:2.2+Math.random()*1.2,
          color:CONFETTI_COLORS[k%CONFETTI_COLORS.length],
          size:6+Math.random()*7,
          round:Math.random()>0.5,
        }));
        setConfetti(pieces);
        setTimeout(()=>setConfetti(null),3600);
      }
      return n;
    });
  }
  function reset(){setDone([false,false,false]);}

  const BG='#160f08';
  const CARD='#1e1408';
  const BORDER='rgba(255,255,255,0.07)';
  const ringR=30,ringC=2*Math.PI*ringR;

  return(
    <section id="habit-demo" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      {confetti&&confetti.map((p,i)=>(
        <div key={i} className="confetti-piece" style={{left:`${p.left}%`,width:p.size,height:p.size*1.3,background:p.color,borderRadius:p.round?'50%':'2px',animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`}}/>
      ))}
      <AnimatedGlow top={-120} left={'15%'} w={700} h={500} color={W.green} opacity={0.05} blur={26} which="b"/>
      <div style={{maxWidth:MAX,margin:'0 auto',display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',position:'relative'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`}>
          <Eyebrow style={{marginBottom:16}}>{t.demo.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?36:54,lineHeight:1.05,letterSpacing:m?-1:-1.6,color:W.fg,margin:'0 0 16px'}}>
            {t.demo.h2} <span style={{fontStyle:'italic',color:W.green}}>{t.demo.h2i}</span>
          </h2>
          <p style={{fontFamily:F.sans,fontSize:m?14:15.5,lineHeight:1.7,color:W.fgDim,margin:'0 0 24px',maxWidth:460}}>
            {t.demo.sub}
          </p>
          {allDone&&(
            <div style={{padding:'18px 22px',borderRadius:14,background:'rgba(93,211,158,0.08)',border:'1px solid rgba(93,211,158,0.3)',animation:'reveal-up 0.5s cubic-bezier(.22,1,.36,1) both'}}>
              <div style={{fontFamily:F.serif,fontStyle:'italic',fontSize:m?16:18,color:W.green,lineHeight:1.45,marginBottom:6}}>{t.demo.dayDone}</div>
              <div style={{fontFamily:F.sans,fontSize:13,color:W.fgDim,marginBottom:16}}>{t.demo.dayDoneSub}</div>
              <button onClick={openCheckout} className="btn-main" style={{height:48,padding:'0 26px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:15,fontWeight:700,display:'inline-flex',alignItems:'center',gap:10,boxShadow:`0 12px 32px ${W.orange}50`,cursor:'pointer'}}>
                {t.demo.cta} {WIcon.arrowR(15,'#fff',2.4)}
              </button>
            </div>
          )}
        </div>
        <div ref={pRef} className={`reveal-fade${pV?' visible':''}`} style={{display:'flex',justifyContent:m?'center':'flex-end',marginTop:m?40:0}}>
          <div style={{width:m?280:300,background:BG,borderRadius:28,border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden',boxShadow:'0 40px 80px rgba(0,0,0,0.7),0 0 40px rgba(93,211,158,0.06)',padding:'20px 18px'}}>
            {/* Header: ring + stats */}
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r={ringR} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
                <circle cx="36" cy="36" r={ringR} fill="none" stroke={allDone?W.green:W.orange} strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={ringC} strokeDashoffset={ringC*(1-doneCount/3)}
                  transform="rotate(-90 36 36)" style={{transition:'stroke-dashoffset 0.5s cubic-bezier(.22,1,.36,1),stroke 0.4s'}}/>
                <text x="36" y="41" textAnchor="middle" fontFamily="Georgia,serif" fontSize="17" fill={allDone?W.green:W.fg}>{doneCount}/3</text>
              </svg>
              <div style={{flex:1}}>
                <div style={{display:'flex',gap:8}}>
                  <div style={{flex:1,background:CARD,borderRadius:10,padding:'8px 10px',border:`1px solid ${BORDER}`}}>
                    <div style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1,marginBottom:3}}>🔥 {t.demo.streakLabel}</div>
                    <div style={{fontFamily:F.serif,fontSize:20,color:W.orange,lineHeight:1}}>{allDone?'1d':'—'}</div>
                  </div>
                  <div style={{flex:1,background:CARD,borderRadius:10,padding:'8px 10px',border:`1px solid ${BORDER}`}}>
                    <div style={{fontFamily:F.mono,fontSize:6.5,color:W.muted,letterSpacing:1,marginBottom:3}}>⚡ {t.demo.xpLabel}</div>
                    <div style={{fontFamily:F.serif,fontSize:20,color:W.gold,lineHeight:1}}>+{xp}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Habits */}
            {t.demo.habits.map((h,i)=>(
              <div key={i} onClick={()=>toggle(i)} style={{
                display:'flex',alignItems:'center',gap:12,padding:'13px 14px',marginBottom:8,
                background:done[i]?'rgba(93,211,158,0.07)':'rgba(245,239,230,0.02)',
                border:`1px solid ${done[i]?'rgba(93,211,158,0.25)':BORDER}`,
                borderRadius:12,cursor:'pointer',userSelect:'none',
                transition:'all 0.2s cubic-bezier(.22,1,.36,1)',
              }}>
                <div style={{width:22,height:22,borderRadius:6,flexShrink:0,background:done[i]?W.green:'transparent',border:`1.5px solid ${done[i]?W.green:'rgba(245,239,230,0.18)'}`,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s'}}>
                  {done[i]&&<span style={{animation:'check-bounce 0.35s cubic-bezier(.22,1,.36,1) both'}}>{WIcon.check(11,'#0B0805',3)}</span>}
                </div>
                <span style={{flex:1,fontFamily:F.sans,fontSize:14,color:done[i]?'rgba(245,239,230,0.45)':W.fgDim,textDecoration:done[i]?'line-through':'none',transition:'color 0.2s'}}>
                  {h.e} {h.n}
                </span>
                <span style={{fontFamily:F.mono,fontSize:9,color:done[i]?W.gold:W.faint,transition:'color 0.2s'}}>{done[i]?'+10':''}</span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
              <span style={{fontFamily:F.sans,fontSize:11,color:W.dim}}>{allDone?'✓':t.demo.hint}</span>
              {doneCount>0&&<button onClick={reset} style={{background:'transparent',border:'none',color:W.dim,fontFamily:F.mono,fontSize:9.5,letterSpacing:0.8,cursor:'pointer',textDecoration:'underline'}}>{t.demo.reset}</button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mental OS Quiz (lead capture) ─────────────────────────────────────────

function Quiz(){
  const m=useIsMobile();
  const{t,lang}=useT();
  const Q=t.quiz;
  const[hRef,hV]=useReveal(0);
  // stage: 'intro' | 0..4 (question index) | 'gate' | 'result'
  const[stage,setStage]=React.useState('intro');
  const[answers,setAnswers]=React.useState([]);
  const[email,setEmail]=React.useState('');
  const[emailErr,setEmailErr]=React.useState(false);
  const[saving,setSaving]=React.useState(false);

  const score=answers.reduce((a,b)=>a+b,0); // 0..15
  const pct=Math.round(score/15*100);
  const profile=[...Q.profiles].reverse().find(p=>pct>=p.min)||Q.profiles[0];

  function answer(s){
    const next=[...answers,s];
    setAnswers(next);
    if(next.length>=Q.questions.length)setStage('gate');
    else setStage(next.length);
  }
  async function unlock(){
    const ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if(!ok){setEmailErr(true);return;}
    setEmailErr(false);
    setSaving(true);
    await saveQuizLead({email:email.trim().toLowerCase(),score:pct,profile:profile.name,answers,lang});
    setSaving(false);
    setStage('result');
  }
  function retake(){setAnswers([]);setEmail('');setStage('intro');}

  const card={background:W.surface,border:`1px solid ${W.borderStrong}`,borderRadius:24,padding:m?'32px 22px':'48px 52px',maxWidth:680,margin:'0 auto',position:'relative',overflow:'hidden'};

  return(
    <section id="quiz" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-150} left={'45%'} w={800} h={600} color={W.violet} opacity={0.09} blur={26} which="a"/>
      <div style={{maxWidth:MAX,margin:'0 auto',position:'relative'}}>
        <div ref={hRef} className={`reveal-el${hV?' visible':''}`} style={{textAlign:'center',marginBottom:m?32:48}}>
          <Eyebrow style={{marginBottom:14,display:'flex',justifyContent:'center'}} color={W.violet}>{Q.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?36:60,lineHeight:1.04,letterSpacing:m?-1:-1.8,color:W.fg,margin:'0 auto 14px',maxWidth:640}}>
            {Q.h2}<br/><span style={{fontStyle:'italic',color:W.violet}}>{Q.h2i}</span>
          </h2>
          <p style={{fontFamily:F.sans,fontSize:m?14:16,color:W.muted,maxWidth:520,margin:'0 auto'}}>{Q.sub}</p>
        </div>

        <div style={card}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.violet}50,transparent)`}}/>

          {stage==='intro'&&(
            <div style={{textAlign:'center',padding:m?'12px 0':'20px 0'}}>
              <div style={{fontSize:44,marginBottom:18}}>🧠</div>
              <button onClick={()=>setStage(0)} className="btn-main" style={{height:56,padding:'0 34px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.violet},#7B5FD9)`,color:'#fff',fontFamily:F.sans,fontSize:16,fontWeight:700,display:'inline-flex',alignItems:'center',gap:10,boxShadow:'0 16px 40px rgba(169,146,232,0.35)',cursor:'pointer'}}>
                {Q.start} {WIcon.arrowR(16,'#fff',2.4)}
              </button>
            </div>
          )}

          {typeof stage==='number'&&(
            <div key={stage} style={{animation:'reveal-up 0.4s cubic-bezier(.22,1,.36,1) both'}}>
              {/* Progress */}
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                <span style={{fontFamily:F.mono,fontSize:10,color:W.violet,letterSpacing:1.5}}>{Q.qLabel} {stage+1}/5</span>
                <div style={{flex:1,height:3,background:'rgba(245,239,230,0.06)',borderRadius:2}}>
                  <div style={{height:'100%',width:`${(stage)/5*100+10}%`,background:`linear-gradient(90deg,${W.violet},${W.orange})`,borderRadius:2,transition:'width 0.4s cubic-bezier(.22,1,.36,1)'}}/>
                </div>
              </div>
              <div style={{fontFamily:F.serif,fontSize:m?22:28,color:W.fg,lineHeight:1.25,marginBottom:24}}>{Q.questions[stage].q}</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {Q.questions[stage].opts.map((o,i)=>(
                  <button key={i} onClick={()=>answer(o.s)} style={{
                    textAlign:'left',padding:m?'14px 16px':'16px 20px',borderRadius:14,
                    background:W.surfaceRaised,border:`1px solid ${W.border}`,cursor:'pointer',
                    fontFamily:F.sans,fontSize:m?14:15,color:W.fgDim,lineHeight:1.4,
                    transition:'all 0.15s ease',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=W.violet;e.currentTarget.style.color=W.fg;e.currentTarget.style.background='rgba(169,146,232,0.07)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=W.border;e.currentTarget.style.color=W.fgDim;e.currentTarget.style.background=W.surfaceRaised;}}
                  >{o.t}</button>
                ))}
              </div>
            </div>
          )}

          {stage==='gate'&&(
            <div style={{textAlign:'center',animation:'reveal-up 0.4s cubic-bezier(.22,1,.36,1) both'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:W.violetSoft,border:`1px solid ${W.violet}35`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:26}}>✦</div>
              <div style={{fontFamily:F.serif,fontSize:m?24:30,color:W.fg,marginBottom:10,lineHeight:1.2}}>{Q.gateTitle}</div>
              <p style={{fontFamily:F.sans,fontSize:m?13.5:14.5,color:W.muted,lineHeight:1.6,maxWidth:440,margin:'0 auto 24px'}}>{Q.gateSub}</p>
              <div style={{display:'flex',flexDirection:m?'column':'row',gap:10,maxWidth:460,margin:'0 auto'}}>
                <input
                  type="email"
                  value={email}
                  onChange={e=>{setEmail(e.target.value);setEmailErr(false);}}
                  onKeyDown={e=>{if(e.key==='Enter')unlock();}}
                  placeholder={Q.gatePlaceholder}
                  style={{flex:1,height:52,padding:'0 18px',borderRadius:999,background:W.surfaceRaised,border:`1px solid ${emailErr?W.red:W.borderStrong}`,color:W.fg,fontFamily:F.sans,fontSize:15,outline:'none',transition:'border-color 0.2s'}}
                />
                <button onClick={unlock} disabled={saving} className="btn-main" style={{height:52,padding:'0 26px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.violet},#7B5FD9)`,color:'#fff',fontFamily:F.sans,fontSize:15,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap',opacity:saving?0.7:1}}>
                  {saving?Q.saving:Q.gateCta}
                </button>
              </div>
              {emailErr&&<div style={{marginTop:10,fontFamily:F.sans,fontSize:12.5,color:W.red}}>{Q.gateError}</div>}
              <div style={{marginTop:14,fontFamily:F.sans,fontSize:11.5,color:W.dim}}>{Q.gateNote}</div>
            </div>
          )}

          {stage==='result'&&(
            <div style={{textAlign:'center',animation:'reveal-up 0.5s cubic-bezier(.22,1,.36,1) both'}}>
              <div style={{fontFamily:F.mono,fontSize:10,color:W.muted,letterSpacing:2,marginBottom:14}}>{Q.scoreLabel}</div>
              <div style={{fontFamily:F.serif,fontSize:m?72:96,lineHeight:1,color:pct<40?W.red:pct<67?W.orange:W.green,letterSpacing:-3}}>
                {pct}<span style={{fontSize:m?26:34,color:W.muted}}>/100</span>
              </div>
              <div style={{margin:'18px auto 6px',display:'inline-flex',alignItems:'center',gap:8,padding:'7px 16px',borderRadius:999,background:W.violetSoft,border:`1px solid ${W.violet}35`}}>
                <span style={{fontFamily:F.mono,fontSize:11,color:W.violet,letterSpacing:1.6,textTransform:'uppercase'}}>{profile.name}</span>
              </div>
              <p style={{fontFamily:F.sans,fontSize:m?14:15,color:W.fgDim,lineHeight:1.7,maxWidth:500,margin:'18px auto 0'}}>{profile.desc}</p>
              <div style={{margin:'20px auto 0',maxWidth:500,padding:'14px 18px',borderRadius:12,background:'rgba(255,122,138,0.06)',border:'1px solid rgba(255,122,138,0.2)',fontFamily:F.sans,fontSize:m?13:13.5,color:W.fgDim,lineHeight:1.6,textAlign:'left'}}>
                <span style={{color:W.red}}>⚠</span> {profile.leak}
              </div>
              <div style={{fontFamily:F.serif,fontStyle:'italic',fontSize:m?16:18,color:W.fg,margin:'26px auto 18px',maxWidth:440}}>{Q.resultBridge}</div>
              <button onClick={openCheckout} className="btn-main" style={{height:56,padding:'0 32px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:16,fontWeight:700,display:'inline-flex',alignItems:'center',gap:10,boxShadow:`0 16px 40px ${W.orange}55`,cursor:'pointer'}}>
                {Q.resultCta} {WIcon.arrowR(16,'#fff',2.4)}
              </button>
              <div style={{marginTop:16}}>
                <button onClick={retake} style={{background:'transparent',border:'none',color:W.dim,fontFamily:F.mono,fontSize:10,letterSpacing:1,cursor:'pointer',textDecoration:'underline'}}>{Q.retake}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Cost-of-inaction Calculator ───────────────────────────────────────────

function CostCalculator(){
  const m=useIsMobile();
  const{t}=useT();
  const C=t.calc;
  const[ref,v]=useReveal(0);
  const[age,setAge]=React.useState(25);
  const[hours,setHours]=React.useState(3);
  const totalHours=hours*365*5;
  const days=Math.round(totalHours/24);
  const months=Math.round(days/30*10)/10;

  const sliderStyle={width:'100%',accentColor:W.orange,cursor:'pointer',height:4};
  const labelRow={display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10};

  return(
    <section id="calculator" style={{padding:m?'80px 20px':'120px 32px',borderTop:`1px solid ${W.border}`,position:'relative',overflow:'hidden'}}>
      <AnimatedGlow top={-150} left={'55%'} w={800} h={600} color={W.orange} opacity={0.09} blur={26} which="b"/>
      <div ref={ref} className={`reveal-el${v?' visible':''}`} style={{maxWidth:820,margin:'0 auto',position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:m?32:44}}>
          <Eyebrow style={{marginBottom:14,display:'flex',justifyContent:'center'}}>{C.eyebrow}</Eyebrow>
          <h2 style={{fontFamily:F.serif,fontWeight:400,fontSize:m?34:56,lineHeight:1.05,letterSpacing:m?-0.8:-1.6,color:W.fg,margin:'0 auto',maxWidth:620}}>
            {C.h2}<br/><span style={{fontStyle:'italic',color:W.orange}}>{C.h2i}</span>
          </h2>
        </div>

        <div style={{background:W.surface,border:`1px solid ${W.borderStrong}`,borderRadius:24,padding:m?'28px 22px':'40px 48px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${W.orange}50,transparent)`}}/>

          <div style={{display:m?'block':'grid',gridTemplateColumns:'1fr 1fr',gap:40,marginBottom:32}}>
            <div style={{marginBottom:m?24:0}}>
              <div style={labelRow}>
                <span style={{fontFamily:F.sans,fontSize:14,color:W.fgDim,fontWeight:500}}>{C.age}</span>
                <span style={{fontFamily:F.serif,fontSize:28,color:W.fg}}>{age}</span>
              </div>
              <input type="range" min="16" max="60" value={age} onChange={e=>setAge(Number(e.target.value))} style={sliderStyle}/>
            </div>
            <div>
              <div style={labelRow}>
                <span style={{fontFamily:F.sans,fontSize:14,color:W.fgDim,fontWeight:500}}>{C.hours}</span>
                <span style={{fontFamily:F.serif,fontSize:28,color:W.orange}}>{hours}h</span>
              </div>
              <input type="range" min="1" max="8" value={hours} onChange={e=>setHours(Number(e.target.value))} style={sliderStyle}/>
              <div style={{fontFamily:F.sans,fontSize:11.5,color:W.dim,marginTop:6}}>{C.hoursSub}</div>
            </div>
          </div>

          <div style={{textAlign:'center',padding:m?'22px 8px':'28px 20px',borderRadius:16,background:'rgba(255,122,138,0.04)',border:'1px solid rgba(255,122,138,0.15)'}}>
            <div style={{fontFamily:F.sans,fontSize:m?14:16,color:W.fgDim,lineHeight:1.7,maxWidth:560,margin:'0 auto'}}>
              {C.line1}{' '}
              <span style={{fontFamily:F.serif,fontSize:m?30:40,color:W.red,fontStyle:'italic',padding:'0 4px',lineHeight:1}}>{days.toLocaleString()}</span>{' '}
              <span style={{color:W.fg,fontWeight:600}}>{C.days}</span>{' '}
              {C.line2}{' '}
              <span style={{fontFamily:F.serif,fontSize:m?24:32,color:W.red,fontStyle:'italic',padding:'0 4px',lineHeight:1}}>{months}</span>{' '}
              <span style={{color:W.fg,fontWeight:600}}>{C.months}</span>{' '}
              {C.line3}
            </div>
          </div>

          <div style={{textAlign:'center',marginTop:26}}>
            <div style={{fontFamily:F.sans,fontSize:m?12.5:13.5,color:W.muted,marginBottom:18,maxWidth:460,margin:'0 auto 18px'}}>{C.anchor}</div>
            <button onClick={openCheckout} className="btn-main" style={{height:54,padding:'0 30px',borderRadius:999,border:0,background:`linear-gradient(95deg,${W.orange},${W.orangeDeep})`,color:'#fff',fontFamily:F.sans,fontSize:15.5,fontWeight:700,display:'inline-flex',alignItems:'center',gap:10,boxShadow:`0 16px 40px ${W.orange}50`,cursor:'pointer'}}>
              {C.cta} {WIcon.arrowR(16,'#fff',2.4)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────

function App(){
  const[showVideo,setShowVideo]=React.useState(false);

  React.useEffect(()=>{
    if(typeof Paddle!=='undefined'){Paddle.Setup({token:PADDLE_TOKEN});}
  },[]);

  return(
    <div style={{background:W.bg,color:W.fg,fontFamily:F.sans,WebkitFontSmoothing:'antialiased',MozOsxFontSmoothing:'grayscale',minHeight:'100vh'}}>
      {showVideo&&<VideoModal onClose={()=>setShowVideo(false)}/>}
      <TopNav/>
      <Hero onWatchPreview={()=>setShowVideo(true)}/>
      <SocialTicker/>
      <BentoFeatures/>
      <AppScreenshots/>
      <AppPreview/>
      <HabitDemo/>
      <VideoSection onWatchPreview={()=>setShowVideo(true)}/>
      <PDFShowcase/>
      <Quiz/>
      <HowItWorks/>
      <Testimonials/>
      <Manifesto/>
      <CostCalculator/>
      <Pricing/>
      <FAQ/>
      <ClosingCTA/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LangProvider><App/></LangProvider>);
