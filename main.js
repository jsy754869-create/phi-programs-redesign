(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const NS = 'http://www.w3.org/2000/svg';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navH = () => 84;

  /* ------------------------------------------------------------
     DATA — 기존 phi.design/programs 원고 그대로
     ------------------------------------------------------------ */
  const COURSES = [
    ['Iterative Problem Solving', '파고드는 문제 해결', 'iterative-problem-solving', '처음 발견한 문제의 해결책은 사용자의 문제를 해소하지 못할 때가 많다. 이 수업에서는 표면적인 현상 너머의 근본 원인을 집요하게 파고들어, 해결책을 만들어 검증할 때마다 문제를 더 깊이 다시 정의한다. 문제의 해상도를 높여가며 가치 있는 문제에 도달하고, 그것을 디자인으로 해결하는 법을 체화하게 된다.'],
    ['Beautiful Interface', '아름다운 인터페이스 디자인', 'beautiful-interface', '완성도 120%의 인터페이스란 어떤 것일까? 이 수업에서는 다양한 인터페이스 요소들을 끝까지 파고들었을 때 어떤 결과물을 만들어낼 수 있는지 실험해본다. 집착적으로 높은 완성도를 추구하는 경험을 해본 후, 일상에서도 높은 기준으로 아름다움을 인지하게 된다.'],
    ['Visual Translation', '시각적 번역', 'visual-translation', '언어와 생각은 어떻게 시각적 형태가 될 수 있을까? 이 수업에서는 텍스트에 담긴 의미와 감정, 맥락을 읽고, 이를 자신만의 시각언어로 해석하고 재구성하는 과정을 훈련한다. 다양한 매체와 상황을 오가며 의미와 조형 사이의 연결을 탐색하고, 기획을 설득력 있고 고유한 시각적 결과로 발전시키는 역량을 기른다.'],
    ['Interviewing as Exploration', '탐험으로서의 인터뷰', 'interviewing-as-exploration', '답은 타인의 세계 안에 있다. 이 수업에서는 질문의 각을 날카롭게 다듬고, 상대의 말과 침묵 속에서 단서를 발견하며, 대화의 결을 따라 그 세계 깊숙이 들어가는 연습을 반복한다. 낯선 문제 앞에서도 대화로 핵심 단서를 찾아 들어가는 감각, 그리고 그 과정에서 말의 아름다움을 알아보는 안목을 훈련한다.'],
    ['Art of Reading', '읽기의 기술', 'art-of-reading', '우리는 정말 읽고 있을까? 보는 것과 읽는 것은 다르고, 우리는 자주 오독한다. 넘겨짚고, 보고 싶은 것만 보고, 아는 분야 안에서만 읽는다. 이 수업에서는 내가 무엇을 읽었는가가 아니라 그가 무엇을 썼는가를 묻는다.'],
    ['Engaging with AI', '생산적 마찰이 있는 AI', 'engaging-with-ai', 'AI를 쓸수록 탐구는 넓어지지만, 마찰 없이 얻은 것은 좀처럼 내 것이 되지 않는다. 이 수업에서는 AI와, 그리고 사람들과 마찰 있게 탐구하기를 반복한다. 학습자는 결과물만 만들지 않고, AI와 맞붙은 시간을 자신의 학습 경험으로 펼쳐낸다.'],
    ['Aesthetic Literacy', '이미지 제텔카스텐', 'aesthetic-literacy', '모아둔 레퍼런스는 저절로 사고의 도구가 되지 않는다. 제텔카스텐 메모법으로 끌리는 이미지를 포착하며 나의 취향을 언어화하고, 그것을 패턴으로 엮는 구조를 훈련한다. 수업이 끝난 뒤에도 계속 자라는 나만의 미적 언어 체계를 구축한다.'],
    ['Typography as Foundation', '기본기로서의 타이포그래피', 'typography-as-foundation', '많은 디자이너들이 디자인의 기본으로 타이포그래피를 손꼽는 이유는 무얼까. 이 수업에서는 스타일을 만드는 조형 원리를 그래픽의 1차 언어인 글자를 가지고 학습한다. 흑과 백을 구사하여 공간을 창출하는 원리와 감각을 익히고, 보이지 않던 것을 보는 눈을 기른다.'],
    ['Self Introduction', '자기소개', 'self-introduction', '우리가 만든 결과물은 물론, 행동, 생각, 발언... 무엇이든 자기소개의 재료가 될 수 있다. 이 수업에서는 익숙한 방식이 금지된 조건 속에서 매주 다른 제약으로 자기소개에 접근한다. 주어진 자기소개 방식 중 하나를 채택하는 것이 아닌, 스스로를 가장 잘 설명할 수 있는 자기소개 방식을 설계한다.'],
    ['What If', '만약에 ~라면?', 'what-if', '창의성은 훈련 가능한 역량일까? 가장 처음 떠올린 해결책이 너무나도 자명해 보여서 다른 해결책은 절대 없을 것 같은 느낌이 들 때, 어떻게 접근해볼 수 있을까. 이 수업에서는 동일한 문제를 다양한 분야의 전문가들이 어떻게 풀어나가는지를 비교 분석하면서 그들의 전문성을 추출하고, 내 작업에 이식해보는 방법을 배운다.'],
    ['Peer Coaching', '상호 코칭', 'peer-coaching', '누군가 고민을 털어놓으면 우리는 충고하고, 평가하고, 대신 풀어주려 한다. 하지만 그 문제를 가장 잘 아는 사람은 언제나 문제의 당사자이다. 이 수업에서는 동료의 말 너머까지 듣고, 결정적인 것을 묻고, 스스로 전략을 세우도록 안내하는 대화를 반복하여 훈련한다.'],
    ['Readable Writing', '읽음직한 글쓰기', 'readable-writing', '읽기 쉽고 읽고 싶은, 즉 읽음직한 글을 쓰는 일은 중요하다. 이 수업에서는 내 글을 읽을 독자가 누구인지 설정하고, 그 독자에게 유용하고 흥미로운 메시지를 설계하고, 그 메시지가 잘 전달되도록 표현하는 훈련을 한다.'],
  ];

  const DEVICES = [
    ['라이브데모', "전문가가 학습자의 과제를 실시간으로 푸는 과정을 시연합니다. 푸는 과정에서 '나라면?'이라는 문두를 활용하여 학습자와 전문가의 차이가 나는 지점을 직접적으로 드러냅니다."],
    ['피어크리틱', '모든 코스에는 관찰 가능한 평가 기준, 즉 루브릭이 있습니다. 전문가는 매주 Learning Design팀과 학습자의 결과물을 리뷰하고, 루브릭 기반으로 주로 하는 실수 패턴을 정의합니다. 학습자는 매 세션 이 패턴을 기준으로 구체적인 피드백을 주고받습니다.'],
    ['셀프피드백', 'Phi에는 별도의 평가 시스템이 없습니다. 하지만, 학습자 역시 전문가와 동일한 기준으로 자신의 작업을 판단할 수 있도록, 모든 코스에는 정교하게 설계된 루브릭이 있습니다. 시작 전과 진행 중 매주, 학습 목표를 어느 정도 달성했고 그 이유가 무엇인지 루브릭 기반으로 작성합니다. 코스가 끝난 뒤에는 시작 전과 후의 자신을 현재의 언어로 다시 평가합니다.'],
    ['워크숍', '정해진 코스 외에도, 학기 중 학습자의 이해도를 높이는 워크숍이 열립니다. 주제는 다양하고, 매 기수 학습자들의 상태를 반영합니다. 예를 들어 Phi의 세션은 시연 위주라 능동적 관찰이 중요한데, 전문가의 암묵지를 분석하고 분해하는 법은 코스 밖 워크숍에서 따로 배웁니다.'],
    ['공유회', '가장 잘 배우는 방법은 남에게 가르쳐보는 것입니다. 워크숍은 매회 정해진 인원만 들을 수 있습니다. 서로 다른 주제의 워크숍을 들은 동기들은 자연스럽게 배운 것을 나눕니다. 설명하는 사람은 자신이 이해하지 못한 부분을 발견하고, 듣는 사람은 놓친 주제를 얻으면서 자발적인 공유회가 일상적으로 일어납니다.'],
    ['저널링', '매주 혹은 매일 배운 점이나 느낀 점 등을 4F(Fact/Feeling/Finding/Future Item)양식으로 회고합니다. 스스로 수업을 정리해보기도 하고, 동기의 저널링을 보면서 깨달음이나 동기를 얻기도 합니다. 쌓인 저널링은 학기별로 Phi만의 회고 방식을 담은 러닝 리포트로 정리해 드립니다.'],
  ];

  const PROGRAM = [
    { name: 'Course', glyph: 'course', desc: "코스는 '과목'에 해당하는 개념입니다. Phi의 코스는 일관된 시수가 아니라, 학습 목표에 따라 각기 다른 시수와 기간으로 구성됩니다.",
      subs: [
        ['Fundamental', '4개월, 매주', '4개월 동안 매주 이어지며, 한 분야의 핵심 원리를 전문가와 함께 오래 다지는 수업입니다. 사고방식 위주의 기본기를 학습할 때는 지식을 습득하는 것은 물론, 다양한 맥락에서의 적용이 필요하기 때문에 긴 호흡으로 진행합니다.'],
        ['Domain', '1-2개월 단위', '1-2개월 단위로 구성되며, 기본기를 단기간에 습득할 수 있는 단위로 쪼개어서 경험하는 수업입니다. 여러 주제를 들어보면서 나에게 더 맞는 주제가 있다면 이후에 심화하여 학습할 수 있습니다.'],
        ['Ritual', '월 1회, 6시간', '한 달에 한 번, 하루 여섯 시간을 통째로 쓰는 수업입니다. 학습 목표에 따라 단기간에 집중적인 학습이 필요한 코스가 있고, 간격을 두고(spaced repetition) 다른 일과를 수행하면서 배우면 효과적인 코스가 있습니다. Ritual은 후자의 수업으로, 반복적인 훈련과 습관화가 필요한 종류의 내용을 배웁니다.'],
      ] },
    { name: 'Study', glyph: 'study', desc: '전문가 없이 학습자끼리 학습하는 수업입니다. 궁극적으로 학습자들은 스스로 배울 수 있는 상태가 되어야 합니다. Phi에서는 전문가의 전문성은 물론 학습자의 자율적 학습도 배워야 할 대상으로 여기며, 이를 위해 Learning Design팀이 각종 지원을 제공합니다.' },
    { name: 'Workshop', glyph: 'workshop', desc: '학기 중 코스 외 시간에 학습 능력 증진을 위해 제공되는 워크숍입니다.' },
    { name: 'Event', glyph: 'event', desc: 'OT나 클로징 파티 등 코스를 시작하거나 끝맺음할 때, 혹은 특별한 이벤트가 있을 때 열리는 행사입니다.' },
  ];

  const PERIODS = [
    { id: 'p1', name: '1학기', kind: 'semester', start: '2027-02-15', end: '2027-06-18', date: '2027년 2월 15일 – 6월 18일',
      desc: 'Warm-up Week(2/15–2/26)를 시작으로 개강. 매주 월-금 수업이 진행되며, 오전/오후 각 세션으로 나뉘어 전문가 수업이 이어집니다.' },
    { id: 'p2', name: '방학 + 캠프', kind: 'break', start: '2027-07-01', end: '2027-08-31', date: '2027년 7월 – 8월',
      desc: '4개월의 루틴에서 벗어나 휴식과 함께 복수의 워크숍 프로그램이 진행됩니다. 각 학습자의 성취와 보완이 필요한 부분을 바탕으로 구성됩니다.',
      list: [
        ['실전 캠프 with Toss', '토스 디자인 헤드들과 함께', '토스 디자인 헤드들과 함께 토스의 실제 과제들을 Phi의 방식으로 풀어보고 결과물을 토스 디자인 헤드들과 공유합니다. Phi에서 1학기 동안 배운 것들이 실제로 어떻게 각자의 성장에 기폭제가 되었는지 선명하게 확인할 수 있는 시간입니다.'],
        ['디지털 타이포그래피 워크숍', '한국타이포그라피학회와 함께', '한국타이포그라피학회의 실무 디렉터들과 함께하는 워크숍. 웹, 앱, 다양한 디바이스 환경에서 타이포그래피가 가져야 할 심미, 언어화, 구조를 탐구합니다.'],
        ['Skills Boost', '도구 탐구 워크숍', '1학기 동안 각 학습자의 필요를 반영해 구성되는 도구 탐구 워크숍. 학습자 개인의 성장 곡선에 맞춰 운영됩니다.'],
      ],
      foot: '캠프는 별도 비용 없이 희망자 모두 참석할 수 있습니다.' },
    { id: 'p3', name: '2학기', kind: 'semester', start: '2027-09-01', end: '2027-12-24', date: '2027년 9월 1일 – 12월 24일',
      desc: '1학기에서 쌓은 역량을 심화하고 통합하는 시간. 전문가 라인업이 일부 교체되며, 학습자가 자신만의 방향을 구체화합니다.' },
    { id: 'p4', name: '수료 & 졸업', kind: 'end', start: '2028-01-01', end: '2028-02-29', date: '2028년 1월 – 2월',
      desc: '수료(전 과정 이수) 후 졸업 프로젝트를 완성합니다. 졸업 프로젝트는 외부에 실제 발표 또는 출시되어야 합니다.',
      list: [
        ['수료', null, '2027년 2월부터 12월까지 예정된 모든 수업을 이수한 상태.'],
        ['졸업', null, '수료 조건 달성 후, 2028년 1–2월에 본인의 목표에 따른 프로젝트를 완성합니다. 해당 프로젝트는 외부에 실제로 발표 또는 출시되어야 합니다.'],
      ] },
  ];

  /* ------------------------------------------------------------
     SVG helpers — 작도선 / 작도 도형
     ------------------------------------------------------------ */
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const PHI = 0.618;

  function drawConstruct(svg) {
    const host = svg.parentElement;
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = '';
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.42;
    el('line', { x1: cx, y1: 0, x2: cx, y2: h }, svg);
    el('line', { x1: 0, y1: cy, x2: w, y2: cy }, svg);
    el('line', { x1: 0, y1: 0, x2: w, y2: h }, svg);
    el('line', { x1: w, y1: 0, x2: 0, y2: h }, svg);
    el('circle', { cx, cy, r }, svg);
    el('circle', { cx, cy, r: r * PHI }, svg);
    for (const t of [1 - PHI, PHI]) {
      el('line', { x1: w * t, y1: 0, x2: w * t, y2: h, class: 'dash' }, svg);
      el('line', { x1: 0, y1: h * t, x2: w, y2: h * t, class: 'dash' }, svg);
    }
    el('rect', { x: cx - r, y: cy - r, width: r * 2, height: r * 2, class: 'dash' }, svg);
  }

  const GLYPHS = {
    active(s) { el('circle', { cx: 60, cy: 60, r: 44 }, s); el('line', { x1: 16, y1: 60, x2: 104, y2: 60, class: 'g-guide' }, s); el('line', { x1: 60, y1: 16, x2: 60, y2: 104, class: 'g-guide' }, s); el('line', { x1: 60, y1: 60, x2: 96, y2: 30 }, s); el('path', { d: 'M84 28 L96 30 L94 42' }, s); el('circle', { cx: 60, cy: 60, r: 2.5, class: 'g-dot' }, s); },
    unknown(s) { el('circle', { cx: 60, cy: 60, r: 44 }, s); el('circle', { cx: 60, cy: 60, r: 27, class: 'g-guide' }, s); el('line', { x1: 16, y1: 60, x2: 104, y2: 60, class: 'g-guide' }, s); el('circle', { cx: 78, cy: 44, r: 3, class: 'g-dot' }, s); el('circle', { cx: 78, cy: 44, r: 10 }, s); },
    unpack(s) { el('rect', { x: 16, y: 16, width: 88, height: 88 }, s); el('rect', { x: 16, y: 16, width: 54.4, height: 54.4, class: 'g-guide' }, s); el('rect', { x: 70.4, y: 16, width: 33.6, height: 33.6 }, s); el('rect', { x: 70.4, y: 49.6, width: 20.8, height: 20.8, class: 'g-guide' }, s); el('line', { x1: 16, y1: 104, x2: 104, y2: 16, class: 'g-guide' }, s); },
    sensor(s) { el('rect', { x: 10, y: 26, width: 100, height: 61.8 }, s); el('line', { x1: 71.8, y1: 26, x2: 71.8, y2: 87.8, class: 'g-guide' }, s); el('path', { d: 'M71.8 87.8 A61.8 61.8 0 0 1 10 26' }, s); el('path', { d: 'M71.8 26 A38.2 38.2 0 0 1 110 64.2' }, s); el('circle', { cx: 71.8, cy: 26, r: 2.5, class: 'g-dot' }, s); },
    share(s) { el('circle', { cx: 44, cy: 60, r: 30 }, s); el('circle', { cx: 76, cy: 60, r: 30 }, s); el('line', { x1: 8, y1: 60, x2: 112, y2: 60, class: 'g-guide' }, s); el('line', { x1: 60, y1: 22, x2: 60, y2: 98, class: 'g-guide' }, s); },
    course(s) { el('rect', { x: 14, y: 14, width: 92, height: 92 }, s); el('line', { x1: 14, y1: 50, x2: 106, y2: 50 }, s); el('line', { x1: 45, y1: 50, x2: 45, y2: 106, class: 'g-guide' }, s); el('line', { x1: 76, y1: 50, x2: 76, y2: 106, class: 'g-guide' }, s); el('circle', { cx: 60, cy: 32, r: 2.5, class: 'g-dot' }, s); },
    study(s) { el('circle', { cx: 42, cy: 60, r: 26 }, s); el('circle', { cx: 78, cy: 60, r: 26 }, s); el('circle', { cx: 60, cy: 60, r: 46, class: 'g-guide' }, s); },
    workshop(s) { el('circle', { cx: 60, cy: 60, r: 46, class: 'g-guide' }, s); el('path', { d: 'M60 14 L99.8 83 L20.2 83 Z' }, s); el('line', { x1: 60, y1: 14, x2: 60, y2: 83, class: 'g-guide' }, s); },
    event(s) { el('circle', { cx: 60, cy: 60, r: 46 }, s); el('circle', { cx: 60, cy: 60, r: 28.4, class: 'g-guide' }, s); el('circle', { cx: 60, cy: 60, r: 3, class: 'g-dot' }, s); el('line', { x1: 60, y1: 6, x2: 60, y2: 32, class: 'g-guide' }, s); el('line', { x1: 60, y1: 88, x2: 60, y2: 114, class: 'g-guide' }, s); },
  };
  $$('[data-glyph]').forEach(s => GLYPHS[s.dataset.glyph]?.(s));

  /* ------------------------------------------------------------
     RENDER
     ------------------------------------------------------------ */
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  /* 수업 유형 + 연결 역량 (v1.4) — 원본에 데이터가 없어 수업 설명을 근거로 매핑한 가안 (D-017, Phi 확인 필요) */
  const COMP = { aesthetic: ['심미안', 'c-aesthetic.jpg'], articulation: ['언어화', 'c-articulation.jpg'], structure: ['구조화', 'c-structure.jpg'], problem: ['문제 정의', 'c-problem.jpg'], reframing: ['관점 전환', 'c-reframing.jpg'] };
  const TYPES = { Fundamental: '4개월, 매주', Domain: '1-2개월 단위', Ritual: '월 1회, 6시간' };
  const META = {
    'iterative-problem-solving': ['Fundamental', ['problem', 'structure']],
    'beautiful-interface': ['Domain', ['aesthetic']],
    'visual-translation': ['Domain', ['aesthetic', 'reframing']],
    'interviewing-as-exploration': ['Domain', ['problem', 'articulation']],
    'art-of-reading': ['Ritual', ['articulation', 'reframing']],
    'engaging-with-ai': ['Domain', ['structure', 'reframing']],
    'aesthetic-literacy': ['Ritual', ['aesthetic', 'articulation']],
    'typography-as-foundation': ['Domain', ['aesthetic', 'structure']],
    'self-introduction': ['Domain', ['articulation', 'reframing']],
    'what-if': ['Fundamental', ['reframing', 'problem']],
    'peer-coaching': ['Ritual', ['problem', 'articulation']],
    'readable-writing': ['Ritual', ['articulation', 'structure']],
  };
  const chips = (slug, withImg) => {
    const [t, cs] = META[slug];
    return `<span class="chip chip--type">${t}<small>${TYPES[t]}</small></span>` +
      cs.map(c => `<span class="chip chip--comp">${withImg ? `<img src="assets/img/${COMP[c][1]}" alt="">` : ''}${COMP[c][0]}</span>`).join('');
  };
  /* 주요 수업 (v1.3): 목차가 곧 전시 — T—BI Showcase 18 원리
     · 12개 목차는 한 화면에 모두 보이고(전체/위치), 기준선을 지나는 하나만 크게 전시(인상)
     · 스크롤이 기준선을 움직이고, 행에 올리면 즉시 그 수업으로 전환
     · 이미지 배정은 시각적 다양성 기준 (수업 내용과 의미 연결 없음, D-016) */
  const ART = ['whole-over-parts.jpg', 'sfumato.jpg', 'feynman-diagram.jpg', 'peer-best-reference.jpg', 'expert-thinking-demo.jpg', 'observe-decision-process.jpg', 'baptism-of-christ.jpg', 'adaptive-tracks.jpg', 'le-corbusier-2.jpg', 'apprenticeship-education.jpg', 'peer-review.jpg', 'protege-effect.jpg'];
  const pad2 = n => String(n).padStart(2, '0');
  const list = $('#courseList');
  list.innerHTML = COURSES.map(([en, ko, slug], i) => `
    <li class="gi" data-i="${i}" data-slug="${slug}">
      <button class="gi__btn" type="button" aria-haspopup="dialog"><span class="gi__en">${en}</span><span class="gi__ko">${ko}</span><span class="gi__no">${pad2(i + 1)}</span></button>
    </li>`).join('');
  const gallery = $('#gallery'), stage = $('.gallery__stage'), artBox = $('.gallery__art'), imgsBox = $('.gallery__imgs'), guide = $('.gallery__guide');
  imgsBox.innerHTML = ART.map((f, i) => `<img src="assets/gallery/${f}" alt="" decoding="async" data-i="${i}">`).join('');
  const imgs = $$('img', imgsBox), rows = $$('.gi', list);
  const L = { tags: $('.gallery__tags'), no: $('.gallery__no'), en: $('.gallery__en'), ko: $('.gallery__ko'), expert: $('.gallery__expert'), after: $('.gallery__after'), label: $('.gallery__label') };
  const modal = $('#courseModal');
  let PROFILES = {}, gActive = -1, scrollActive = 0;

  // 전시물 실제 윤곽(이미지 여백 제외, 파일에서 측정한 비율) — 윤곽 기준으로 크기를 맞추고 작도선을 붙인다
  const BOX = [[0.185,0.114,0.820,0.900], [0.173,0.155,0.827,0.849], [0.156,0.199,0.843,0.785], [0.152,0.110,0.850,0.891], [0.144,0.179,0.860,0.820], [0.117,0.113,0.880,0.888], [0.145,0.123,0.857,0.874], [0.145,0.128,0.856,0.892], [0.239,0.092,0.756,0.915], [0.116,0.118,0.889,0.894], [0.129,0.150,0.872,0.848], [0.115,0.161,0.886,0.841]];
  const fit = i => {
    const img = imgs[i]; if (!img.naturalWidth) return null;
    const W = artBox.clientWidth, H = artBox.clientHeight, nw = img.naturalWidth, nh = img.naturalHeight;
    const [x0, y0, x1, y1] = BOX[i], ow = (x1 - x0) * nw, oh = (y1 - y0) * nh;
    const k = Math.min(W * 0.9 / ow, H * 0.86 / oh);
    const ox = (W - ow * k) / 2, oy = (H - oh * k) / 2;
    Object.assign(img.style, { width: `${nw * k}px`, height: `${nh * k}px`, left: `${ox - x0 * nw * k}px`, top: `${oy - y0 * nh * k}px` });
    return [ox, oy, ox + ow * k, oy + oh * k];
  };
  const placeLines = i => {
    const r = fit(i); if (!r) return;
    artBox.style.setProperty('--gx1', `${r[0]}px`); artBox.style.setProperty('--gx2', `${r[2]}px`);
    artBox.style.setProperty('--gy1', `${r[1]}px`); artBox.style.setProperty('--gy2', `${r[3]}px`);
  };
  const placeGuide = () => {
    const row = rows[gActive]; if (!row) return;
    guide.style.transform = `translateY(${row.offsetTop + list.offsetTop + row.offsetHeight}px)`;
    guide.style.width = `${artBox.offsetLeft + artBox.offsetWidth + 24}px`;
    guide.style.setProperty('--split', `${list.offsetLeft + list.offsetWidth}px`);
  };
  imgs.forEach((im, i) => im.complete ? fit(i) : im.addEventListener('load', () => fit(i), { once: true }));
  const setCourse = i => {
    if (i === gActive) return;
    gActive = i;
    rows.forEach((r, k) => r.classList.toggle('is-on', k === i));
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    placeGuide();
    if (imgs[i].complete) placeLines(i); else imgs[i].addEventListener('load', () => gActive === i && placeLines(i), { once: true });
    const [en, ko, slug] = COURSES[i], p = PROFILES[slug] || {};
    L.label.classList.remove('is-in'); void L.label.offsetWidth;
    L.no.textContent = `No. ${pad2(i + 1)}`; L.en.textContent = en; L.ko.textContent = ko; L.tags.innerHTML = chips(slug, false);
    L.expert.textContent = p.expert || ''; L.after.textContent = (p.after && p.after[0]) || '';
    L.label.classList.add('is-in');
  };
  fetch('data/course-profiles.json').then(r => r.json()).then(d => { PROFILES = d; const k = gActive; gActive = -1; setCourse(Math.max(k, 0)); });
  setCourse(0);
  addEventListener('resize', () => { imgs.forEach((_, i) => fit(i)); placeLines(gActive); placeGuide(); });

  // hover/focus: 목록의 활성 표시만 옮긴다. 전시물·라벨은 클릭(이동)했을 때만 바뀐다
  const setHover = i => { list.classList.toggle('is-hovering', i >= 0); rows.forEach((r, k) => r.classList.toggle('is-hover', k === i)); };
  rows.forEach((r, i) => {
    r.addEventListener('mouseenter', () => setHover(i));
    r.addEventListener('focusin', () => setHover(i));
    r.addEventListener('focusout', () => setHover(-1));
  });
  list.addEventListener('mouseleave', () => setHover(-1));
  const openCourse = slug => {
    const i = COURSES.findIndex(x => x[2] === slug), c = COURSES[i], p = PROFILES[slug]; if (!c || !p) return;
    $('.cm__no', modal).textContent = `No. ${pad2(i + 1)}`;
    $('.cm__en', modal).textContent = c[0];
    $('.cm__ko', modal).textContent = c[1];
    const [t, cs] = META[slug];
    $('.cm__type', modal).innerHTML = `<b>${t}</b><span>${TYPES[t]}</span>`;
    $('.cm__comps', modal).innerHTML = cs.map(k => `<li><img src="assets/img/${COMP[k][1]}" alt="">${COMP[k][0]}</li>`).join('');
    $('.cm__expert', modal).textContent = p.expert;
    $('.cm__bio', modal).textContent = p.bio;
    $('.cm__lead', modal).textContent = p.overview[0] || '';
    const rest = p.overview.slice(1);
    $('.cm__more', modal).hidden = !rest.length;
    $('.cm__more-body', modal).innerHTML = rest.map(t => `<p>${t}</p>`).join('');
    $('.cm__more', modal).open = false;
    $('.cm__goals', modal).innerHTML = p.after.map((a, k) => `<li><span class="cm__n">${pad2(k + 1)}</span><div><p class="cm__a">${a}</p><p class="cm__b"><span>수업 전</span>${p.before[k] || ''}</p></div></li>`).join('');
    modal.showModal(); modal.scrollTop = 0;
  };
  // 목록 클릭 = 그 수업 자리로 이동 (hover에서 이미 전환되므로). 모달은 벽 라벨의 버튼으로만 연다
  const stepPx = () => innerHeight * 0.72;
  const goCourse = i => {
    if (!gallery.classList.contains('is-scroll')) { setCourse(i); return; }
    const top = gallery.getBoundingClientRect().top + scrollY + i * stepPx();
    jumpUntil = performance.now() + 1200;
    scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  list.addEventListener('click', e => { const li = e.target.closest('.gi'); if (li) goCourse(+li.dataset.i); });
  $('.gallery__more').addEventListener('click', () => openCourse(COURSES[gActive][2]));
  // 스크롤 멈춤 지점: 수업마다 하나 (proximity snap)
  gallery.insertAdjacentHTML('afterbegin', COURSES.map((_, i) => `<span class="gallery__snap" style="top:calc(${i} * 72vh)" aria-hidden="true"></span>`).join(''));
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.cm__close')) modal.close(); });

  $('#devices').innerHTML = DEVICES.map(([n, d], i) => `
    <div class="device">
      <button class="device__btn" aria-expanded="false" aria-controls="dev-${i}">
        <span class="device__name">${n}</span>
        <span class="device__panel" id="dev-${i}"><span class="device__inner"><span class="device__text">${d}</span></span></span>
        <span class="device__icon" aria-hidden="true"></span>
      </button>
    </div>`).join('');

  const grid = $('#programGrid');
  PROGRAM.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'pg';
    li.innerHTML = `<div class="pg__content">
      <svg class="pg__glyph" viewBox="0 0 120 120" aria-hidden="true"></svg>
      <h4 class="pg__name">${p.name}</h4>
      <p class="item-desc">${p.desc}</p>
      ${p.subs ? `<div class="pg__subs">${p.subs.map(([n, t], j) => `<button class="pg__sub" aria-expanded="false" aria-controls="sub-${j}"><b>${n}</b><span>${t}</span></button>`).join('')}</div>` : ''}
    </div>
    ${p.subs ? p.subs.map(([n, , d], j) => `<div class="pg__pop" id="sub-${j}" role="dialog" aria-label="${n}"><strong>${n}</strong>${d}</div>`).join('') : ''}`;
    GLYPHS[p.glyph](li.querySelector('.pg__glyph'));
    grid.appendChild(li);
  });

  $('#periods').innerHTML = PERIODS.map(p => `
    <li class="period" id="${p.id}">
      <h3 class="period__name">${p.name}</h3>
      <p class="period__date">${p.date}</p>
      <p class="item-desc">${p.desc}</p>
      ${p.list ? `<ul class="period__list">${p.list.map(([n, s, d]) => `<li><b>${n}</b>${s ? `<small>${s}</small>` : ''}<p>${d}</p></li>`).join('')}</ul>` : ''}
      ${p.foot ? `<p class="period__foot">${p.foot}</p>` : ''}
    </li>`).join('');

  /* timeline (T1): 날짜를 비율로 */
  const T0 = new Date('2027-02-01'), T1 = new Date('2028-03-01');
  const pct = d => ((new Date(d) - T0) / (T1 - T0)) * 100;
  const axis = $('#timelineAxis');
  for (let m = 0; m <= 12; m++) {
    const d = new Date(2027, 1 + m, 1);
    const t = document.createElement('span');
    t.className = 'timeline__tick' + (d.getMonth() === 0 || m === 0 ? ' is-year' : '');
    t.style.left = pct(d) + '%';
    t.textContent = d.getMonth() === 0 || m === 0 ? `${d.getFullYear()}.${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    axis.appendChild(t);
  }
  const bars = $('#timelineBars');
  PERIODS.forEach(p => {
    const b = document.createElement('button');
    b.className = 'tbar'; b.dataset.kind = p.kind; b.dataset.target = p.id;
    b.style.left = pct(p.start) + '%';
    b.style.width = `calc(${pct(p.end) - pct(p.start)}% - 4px)`;
    b.textContent = p.name;
    b.setAttribute('aria-label', `${p.name}, ${p.date}`);
    bars.appendChild(b);
  });
  const setActive = id => {
    $$('.tbar').forEach(b => b.classList.toggle('is-dim', !!id && b.dataset.target !== id));
    $$('.period').forEach(p => { p.classList.toggle('is-active', p.id === id); p.classList.toggle('is-dim', !!id && p.id !== id); });
  };
  $$('.tbar').forEach(b => {
    b.addEventListener('mouseenter', () => setActive(b.dataset.target));
    b.addEventListener('focus', () => setActive(b.dataset.target));
    b.addEventListener('mouseleave', () => setActive(null));
    b.addEventListener('blur', () => setActive(null));
    b.addEventListener('click', () => $('#' + b.dataset.target).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }));
  });
  $$('.period').forEach(p => {
    p.addEventListener('mouseenter', () => setActive(p.id));
    p.addEventListener('mouseleave', () => setActive(null));
  });

  /* weekly (T2): 개요 → 세부 */
  const SESS = { '월-am': 1, '화-am': 2, '화-pm': 3, '수-am': 4, '수-pm': 5, '목-am': 6, '목-pm': 7, '금-am': 8 };
  const days = ['월', '화', '수', '목', '금'];
  const cell = (d, slot, time) => { const n = SESS[`${d}-${slot}`]; return `<div class="wk__cell${n ? ' is-on' : ''}">${n ? `세션 ${n}<small>${time}</small>` : ''}</div>`; };
  $('#weeklyGrid').innerHTML = `<div class="wk" role="table" aria-label="주간 시간표">
    <div></div>${days.map(d => `<div class="wk__head">${d}</div>`).join('')}
    <div class="wk__time">10:00</div>${days.map(d => cell(d, 'am', '10:00 – 13:00')).join('')}
    <div></div><div class="wk__lunch">점심시간</div>
    <div class="wk__time">15:00</div>${days.map(d => cell(d, 'pm', '15:00 – 18:00')).join('')}
  </div>`;
  const wkBtn = $('#weeklyToggle');
  wkBtn.addEventListener('click', () => {
    const open = wkBtn.getAttribute('aria-expanded') === 'true';
    wkBtn.setAttribute('aria-expanded', String(!open));
    wkBtn.textContent = open ? '시간표 보기' : '시간표 접기';
    $('#weeklyGrid').hidden = open;
  });

  /* ------------------------------------------------------------
     작도선 그리기 + 리사이즈 대응
     ------------------------------------------------------------ */
  const constructs = $$('.construct');
  const ro = new ResizeObserver(entries => entries.forEach(e => { const s = e.target.querySelector(':scope > .construct'); if (s) drawConstruct(s); }));
  constructs.forEach(s => ro.observe(s.parentElement));

  /* hero 좌표 인터랙션 */
  const art = $('[data-coord]');
  if (art) {
    const x = $('.crosshair__x', art), y = $('.crosshair__y', art), lab = $('.crosshair__label', art);
    art.addEventListener('pointermove', e => {
      const r = art.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      x.style.transform = `translateY(${py}px)`;
      y.style.transform = `translateX(${px}px)`;
      lab.textContent = `${Math.round(px)}, ${Math.round(py)}`;
      const lx = px + 10 + lab.offsetWidth > r.width ? px - lab.offsetWidth - 10 : px + 10;
      const ly = py + 10 + lab.offsetHeight > r.height ? py - lab.offsetHeight - 10 : py + 10;
      lab.style.transform = `translate(${lx}px, ${ly}px)`;
    });
  }

  /* ------------------------------------------------------------
     핵심 수업 장치 — 클릭 토글 + 스크롤 도달 시 한 번 자동 펼침
     ------------------------------------------------------------ */
  const devices = $$('.device');
  const setDevice = (d, open) => { d.classList.toggle('is-open', open); $('.device__btn', d).setAttribute('aria-expanded', String(open)); };
  devices.forEach(d => $('.device__btn', d).addEventListener('click', () => { d.dataset.auto = '1'; setDevice(d, !d.classList.contains('is-open')); }));

  /* 프로그램 구조 — Course 하위 개념 팝오버 */
  const closePops = except => {
    $$('.pg__pop').forEach(p => { if (p !== except) p.classList.remove('is-open'); });
    $$('.pg__sub').forEach(b => { if (!except || b.getAttribute('aria-controls') !== except.id) b.setAttribute('aria-expanded', 'false'); });
  };
  $$('.pg__sub').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const pop = document.getElementById(b.getAttribute('aria-controls'));
    const open = !pop.classList.contains('is-open');
    closePops(open ? pop : null);
    pop.classList.toggle('is-open', open);
    b.setAttribute('aria-expanded', String(open));
    if (open) { const r = b.getBoundingClientRect(), pr = b.closest('.pg').getBoundingClientRect(); pop.style.top = (r.bottom - pr.top) + 'px'; }
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.pg__pop')) closePops(null); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePops(null); });

  /* ------------------------------------------------------------
     로컬 내비게이션 — 현재 위치 + 이동
     ------------------------------------------------------------ */
  const topbar = $('.topbar');
  const navLinks = $$('[data-nav]');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  let jumpUntil = 0;
  const pidx = $('.pageindex'), pill = $('.pageindex__pill'), curEl = $('.pageindex__current'), idxEl = $('.pageindex__idx');
  const setOpen = open => { pidx.classList.toggle('is-open', open); pill.setAttribute('aria-expanded', String(open)); };
  pill.addEventListener('click', e => { e.stopPropagation(); setOpen(!pidx.classList.contains('is-open')); });
  document.addEventListener('click', e => { if (!e.target.closest('.pageindex')) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  let lastActive = -2, writeToken = 0;
  // 글자를 왼쪽부터 지우고, 새 글자를 왼쪽부터 한 자씩 다시 쓴다 (Shopify Editions 원리)
  const writeLabel = text => {
    const token = ++writeToken;
    const old = [...curEl.querySelectorAll('.ch')];
    const STEP = 22;
    old.forEach((c, i) => setTimeout(() => c.classList.add('is-out'), i * 12));
    setTimeout(() => {
      if (token !== writeToken) return;
      curEl.innerHTML = [...text].map(ch => `<span class="ch is-out">${ch === ' ' ? ' ' : ch}</span>`).join('');
      curEl.setAttribute('aria-label', text);
      [...curEl.children].forEach((c, i) => setTimeout(() => c.classList.remove('is-out'), i * STEP));
    }, old.length ? old.length * 12 + 120 : 0);
  };
  navLinks.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    setOpen(false);
    jumpUntil = performance.now() + 1200;
    $(a.getAttribute('href')).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
  }));

  /* ------------------------------------------------------------
     스크롤 루프
     ------------------------------------------------------------ */
  const program = $('#program');
  const pgContents = $$('.pg__content');
  const scrubMQ = matchMedia('(min-width: 1201px) and (prefers-reduced-motion: no-preference)');
  const applyScrubMode = () => {
    program.classList.toggle('is-scrub', scrubMQ.matches);
    if (!scrubMQ.matches) pgContents.forEach(c => { c.style.opacity = ''; c.style.transform = ''; });
  };
  scrubMQ.addEventListener?.('change', applyScrubMode);
  applyScrubMode();
  const applyGalleryMode = () => gallery.classList.toggle('is-scroll', scrubMQ.matches);
  scrubMQ.addEventListener?.('change', applyGalleryMode);
  applyGalleryMode();

  let lastY = scrollY, ticking = false;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const easeOut2 = t => 1 - (1 - t) * (1 - t);   // power2.out

  function frame() {
    ticking = false;
    const vh = innerHeight, y = scrollY, nh = navH();
    if (Math.abs(y - lastY) > vh * 0.6) jumpUntil = Math.max(jumpUntil, performance.now() + 250);
    lastY = y;

    // progress + active section
    const max = document.documentElement.scrollHeight - vh;
    let active = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top <= nh + vh * 0.35) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === active));
    if (active !== lastActive) {
      const a = navLinks[Math.max(active, 0)];
      writeLabel(a.lastChild.textContent);
    }
    lastActive = active;

    // GNB 색 반전: 어두운 전시실(주요 수업)이 GNB 아래에 있을 때
    { const g = gallery.getBoundingClientRect(); topbar.classList.toggle('is-dark', g.top < 42 && g.bottom > 42); }

    // 주요 수업 갤러리: 스티키 구간 진행도 → 기준선을 지나는 수업
    if (gallery.classList.contains('is-scroll')) {
      const r = gallery.getBoundingClientRect();
      scrollActive = clamp(Math.round(-r.top / (vh * 0.72)), 0, COURSES.length - 1);
      setCourse(scrollActive);
    }

    // devices auto-open (Anduril): 항목 윗변이 화면 위에서 48% 안쪽에 들어오면 한 번
    if (performance.now() > jumpUntil) {
      devices.forEach(d => {
        if (d.dataset.auto) return;
        const r = d.getBoundingClientRect();
        if (r.top < vh * 0.48 && r.bottom > vh * 0.2) { d.dataset.auto = '1'; setDevice(d, true); }
      });
    }

    // program scrub (Vectr): 4등분 + 30% 겹침, 마지막 15%는 완성 상태 유지
    if (program.classList.contains('is-scrub')) {
      const r = program.getBoundingClientRect();
      const span = program.offsetHeight - (vh - nh);
      const u = clamp((nh - r.top) / span, 0, 1) / 0.85;
      const n = pgContents.length, h = 1 / n, f = h * 0.3;
      pgContents.forEach((c, i) => {
        const s = i * h - (i > 0 ? f : 0), e = s + h + f;
        const t = easeOut2(clamp((u - s) / (e - s), 0, 1));
        c.style.opacity = t.toFixed(3);
        c.style.transform = `translateY(${((1 - t) * 80).toFixed(1)}px)`;
      });
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();
})();
