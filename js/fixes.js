// Финальные правки: корректные ссылки изображений для #passport + страховка веб-игры.
(function(){
  'use strict';

  const PASSPORT_PHOTOS = {
    'Северо-Восток': {
      passport: {
        src: 'https://commons.wikimedia.org/wiki/Special:FilePath/New%20York%20Sky-Line%20%281922%29.png?width=1400',
        alt: 'Нью-Йорк, линия горизонта, 1922 год',
        note: 'NEW YORK SKYLINE · 1922'
      },
      gallery: [
        { caption: 'Нью-Йорк и городская модерность', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/New%20York%20Sky-Line%20%281922%29.png?width=1400', alt: 'Нью-Йорк, 1922' },
        { caption: 'Порт и ворота иммиграционной Америки', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/S.S%20Leviathan%2C%20New%20York.jpg?width=1400', alt: 'Пароход Leviathan в Нью-Йорке' },
        { caption: 'Библиотеки, университеты, издательская среда', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Main%20Reading%20Room%20of%20the%20New%20York%20City%20Public%20Library%20on%205th%20Avenue%20ca%2C%201910-1920.jpg?width=1400', alt: 'Читальный зал Нью-Йоркской публичной библиотеки' }
      ]
    },
    'Средний Запад': {
      passport: {
        src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Christmas%20dinner%20in%20home%20of%20Earl%20Pauley%2C%20near%20Smithland%2C%20Iowa%2C%208b30046.jpg?width=1400',
        alt: 'Семья в Айове, 1930-е годы',
        note: 'IOWA FAMILY LIFE · 1930s'
      },
      gallery: [
        { caption: 'Фермерская Америка и домашний уклад', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Christmas%20dinner%20in%20home%20of%20Earl%20Pauley%2C%20near%20Smithland%2C%20Iowa%2C%208b30046.jpg?width=1400', alt: 'Дом в Айове, 1930-е' },
        { caption: 'Индустриальный Детройт', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hudson%20Motor%20Car%20Company%2C%20Detroit%2C%20Mich.jpg?width=1400', alt: 'Автозавод Hudson, Детройт' },
        { caption: 'Эпоха Великой депрессии', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lange-MigrantMother02.jpg?width=1400', alt: 'Фотография Migrant Mother' }
      ]
    },
    'Юг': {
      passport: {
        src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charley%20Patton%20%281929%20photo%20portrait%29.jpg?width=1400',
        alt: 'Чарли Паттон, 1929 год',
        note: 'BLUES SOUTH · 1929'
      },
      gallery: [
        { caption: 'Блюз и афроамериканская музыкальная культура', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Charley%20Patton%20%281929%20photo%20portrait%29.jpg?width=1400', alt: 'Чарли Паттон' },
        { caption: 'Историческая память и старые усадьбы', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mepkin%20Plantation%20House.jpg?width=1400', alt: 'Старая южная усадьба' },
        { caption: 'Борьба за гражданские права', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Civil%20Rights%20March%20on%20Washington%2C%20D.C.%20%28Dr.%20Martin%20Luther%20King%2C%20Jr.%20and%20Mathew%20Ahmann%20in%20a%20crowd.%29%20-%20NARA%20-%20542015%20-%20Restoration.jpg?width=1400', alt: 'Марш за гражданские права' }
      ]
    },
    'Запад': {
      passport: {
        src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hollywoodland%20Sign%201920s.jpg?width=1400',
        alt: 'Знак Hollywoodland, 1920-е годы',
        note: 'HOLLYWOODLAND · 1920s'
      },
      gallery: [
        { caption: 'Голливуд и экранный образ Америки', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hollywoodland%20Sign%201920s.jpg?width=1400', alt: 'Знак Hollywoodland' },
        { caption: 'Калифорния Великой депрессии', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lange-MigrantMother02.jpg?width=1400', alt: 'Калифорния, эпоха Великой депрессии' },
        { caption: 'Дорога, мотели и культура движения', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Del%27s%20Restaurant%20%28NBY%20436846%29.jpg?width=1400', alt: 'Американский roadside restaurant' }
      ]
    }
  };

  function currentPassportRegion(){
    const title = document.getElementById('passTitle');
    const region = title ? title.textContent.trim() : '';
    if (PASSPORT_PHOTOS[region]) return region;
    const field = document.getElementById('pfRegion');
    const fieldText = field ? field.textContent.trim().toLowerCase() : '';
    return Object.keys(PASSPORT_PHOTOS).find(name => name.toLowerCase() === fieldText) || 'Северо-Восток';
  }

  function makeImage(src, alt){
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    return img;
  }

  function applyPassportPhotos(){
    const pack = PASSPORT_PHOTOS[currentPassportRegion()];
    if (!pack) return;
    const photoBox = document.getElementById('passportPhoto');
    if (photoBox && pack.passport) {
      photoBox.className = 'passport-photo-frame real-historical-photo vertical-region-photo source-passport-photo';
      photoBox.innerHTML = '';
      const img = makeImage(pack.passport.src, pack.passport.alt);
      img.loading = 'eager';
      img.style.objectFit = 'contain';
      photoBox.appendChild(img);
      const note = document.createElement('div');
      note.className = 'passport-photo-note';
      note.textContent = pack.passport.note || '';
      photoBox.appendChild(note);
    }
    const gallery = document.getElementById('photos');
    if (gallery && Array.isArray(pack.gallery)) {
      gallery.innerHTML = '';
      pack.gallery.forEach(item => {
        const card = document.createElement('div');
        card.className = 'photo real-historical-photo source-gallery-photo';
        card.appendChild(makeImage(item.src, item.alt || item.caption));
        const caption = document.createElement('span');
        caption.textContent = item.caption || '';
        card.appendChild(caption);
        gallery.appendChild(card);
      });
    }
  }

  function hookPassportRender(){
    if (typeof renderPassport === 'function' && !renderPassport.__sourcePhotoHooked) {
      const previous = renderPassport;
      const next = function(){
        const value = previous.apply(this, arguments);
        applyPassportPhotos();
        return value;
      };
      next.__sourcePhotoHooked = true;
      renderPassport = next;
    }
    const title = document.getElementById('passTitle');
    if (title && typeof MutationObserver !== 'undefined') {
      new MutationObserver(applyPassportPhotos).observe(title, { childList: true, characterData: true, subtree: true });
    }
    applyPassportPhotos();
    setTimeout(applyPassportPhotos, 80);
    setTimeout(applyPassportPhotos, 300);
  }

  const FALLBACK_PROFILES = [
    { id: 'city', name: 'Северо-Восток', route: 'Нью-Йорк, Бостон, издательства, модернизм', tags: ['мегаполис', 'иммиграция', 'модернизм'], stats: { fame: 8, money: 4, craft: 7, integrity: 7, network: 8, risk: 2, trauma: 1, audience: 6 } },
    { id: 'midwest', name: 'Средний Запад', route: 'фермы, Чикаго, Детройт, трудовая этика', tags: ['труд', 'фермерская Америка', 'индустрия'], stats: { fame: 5, money: 5, craft: 8, integrity: 8, network: 4, risk: 2, trauma: 1, audience: 5 } },
    { id: 'south', name: 'Юг', route: 'память, расовая история, блюз, религия', tags: ['память', 'расовая история', 'блюз'], stats: { fame: 4, money: 3, craft: 8, integrity: 9, network: 3, risk: 5, trauma: 3, audience: 4 } },
    { id: 'west', name: 'Запад', route: 'Калифорния, Голливуд, дорога, контркультура', tags: ['дорога', 'Голливуд', 'контркультура'], stats: { fame: 5, money: 4, craft: 6, integrity: 7, network: 5, risk: 3, trauma: 1, audience: 7 } }
  ];

  const FALLBACK_EPISODES = [
    {
      year: '1910', title: 'Редакция большого города',
      scene: 'Вы приехали в Нью-Йорк и приносите рассказ в журнальную редакцию. Редактор просит убрать бедность, труд и речь иммигрантов, чтобы текст стал легче для массового читателя.',
      fact: 'В начале XX века рынок журналов быстро рос, а автор всё сильнее зависел от редактора, рекламы и вкуса широкой аудитории.',
      choices: [
        { text: 'Оставить социальную правду города.', verdict: 'Честный дебют', result: 'Текст становится сложнее для продажи, но получает живой конфликт и реальную городскую среду.', effects: { craft: 5, integrity: 5, risk: 2, audience: 2 }, tags: ['городской реализм'] },
        { text: 'Сделать лёгкую историю о витринах, театрах и успехе.', verdict: 'Удобный компромисс', result: 'Публикация становится вероятнее, но город превращается в открытку, а не в опыт века.', effects: { fame: 4, money: 4, integrity: -2, craft: -1 }, tags: ['журнальный рынок'] },
        { text: 'Отказаться от публикации и начать большой роман.', verdict: 'Медленный старт', result: 'Вы сохраняете авторскую свободу, но теряете раннюю аудиторию и деньги.', effects: { craft: 4, integrity: 3, money: -2, fame: -1 }, tags: ['большая форма'] }
      ]
    },
    {
      year: '1929', title: 'Крах мечты',
      scene: 'Фондовый рынок падает, привычные истории об успехе перестают работать. Нужно решить, как писать о стране, где богатство оказалось ненадёжным.',
      fact: 'Великая депрессия изменила американскую литературу: усилились социальная проза, документальность и критика мифа о лёгком успехе.',
      choices: [
        { text: 'Писать о семье, потерявшей дом и работу.', verdict: 'Социальная глубина', result: 'История связывает личную драму с экономической системой и звучит убедительно.', effects: { craft: 5, integrity: 5, trauma: 2, audience: 3 }, tags: ['Великая депрессия'] },
        { text: 'Оставить только ностальгию по роскоши 1920-х.', verdict: 'Красивый, но узкий взгляд', result: 'Стиль сохраняет блеск, но теряет масштаб исторической катастрофы.', effects: { fame: 2, craft: 1, integrity: -3 }, tags: ['ностальгия'] },
        { text: 'Сделать репортажную хронику дороги и безработицы.', verdict: 'Документальная энергия', result: 'Текст получает нерв эпохи и показывает Америку через движение, голод и поиск труда.', effects: { craft: 4, integrity: 4, risk: 2 }, tags: ['дорога', 'документальность'] }
      ]
    },
    {
      year: '1963', title: 'Марш и голос',
      scene: 'Страна спорит о гражданских правах. Вы видите, как публичная речь, церковь, музыка и журналистика становятся частью борьбы за достоинство.',
      fact: 'Движение за гражданские права стало одним из центральных политических и культурных процессов США середины XX века.',
      choices: [
        { text: 'Дать тексту несколько голосов: активистов, семей, журналистов, прохожих.', verdict: 'Многоголосая Америка', result: 'Такой выбор показывает не лозунг, а сложную ткань общества.', effects: { craft: 6, integrity: 5, audience: 4 }, tags: ['гражданские права', 'многоголосие'] },
        { text: 'Свести конфликт к безопасной морализаторской сцене.', verdict: 'Сглаженная версия', result: 'Текст не раздражает рынок, но теряет историческую точность.', effects: { money: 2, risk: -2, integrity: -4 }, tags: ['сглаживание'] },
        { text: 'Написать резкий памфлет без художественной формы.', verdict: 'Энергия без сложности', result: 'Позиция ясна, но литература превращается в прямой плакат.', effects: { risk: 4, integrity: 2, craft: -2 }, tags: ['памфлет'] }
      ]
    }
  ];

  function localProfiles(){
    try { if (typeof profiles !== 'undefined' && Array.isArray(profiles) && profiles.length) return profiles; } catch (e) {}
    return FALLBACK_PROFILES;
  }

  function localEpisodes(){
    try { if (typeof episodes !== 'undefined' && Array.isArray(episodes) && episodes.length) return episodes; } catch (e) {}
    return FALLBACK_EPISODES;
  }

  function renderProfileCards(){
    const box = document.getElementById('profiles');
    if (!box) return;
    const items = localProfiles();
    if (box.children.length < items.length) {
      box.innerHTML = items.map(p => '<button class="profile" data-id="' + p.id + '"><div class="avatar"></div><strong>' + p.name + '</strong><span>' + p.route + '</span><p>Культурный код: ' + p.tags.join(', ') + '</p></button>').join('');
    }
    box.querySelectorAll('.profile').forEach(card => {
      card.onclick = function(){ startWriterGame(card.getAttribute('data-id')); };
    });
  }

  const statLabels = { fame: 'известность', money: 'деньги', craft: 'мастерство', integrity: 'честность', network: 'связи', risk: 'риск', trauma: 'травма', audience: 'аудитория' };
  const statOrder = ['fame', 'money', 'craft', 'integrity', 'network', 'risk', 'trauma', 'audience'];
  let fallbackState = null;
  const clamp = value => Math.max(0, Math.min(100, Number(value) || 0));
  const byId = id => document.getElementById(id);

  function startWriterGame(id){
    try {
      if (typeof start === 'function') {
        start(id);
        setTimeout(ensureGameVisible, 0);
        return;
      }
    } catch (e) {}
    const profile = localProfiles().find(x => x.id === id) || localProfiles()[0];
    fallbackState = { profile, stats: Object.assign({}, profile.stats), step: 0, badges: profile.tags.slice(), log: [] };
    const startBlock = byId('writerStart');
    const gameBlock = byId('writerGame');
    const ending = byId('writerEnding');
    if (startBlock) startBlock.style.display = 'none';
    if (ending) ending.style.display = 'none';
    if (gameBlock) gameBlock.style.display = 'grid';
    if (byId('pname')) byId('pname').textContent = profile.name;
    if (byId('proute')) byId('proute').textContent = profile.route;
    renderFallbackStep();
  }

  function renderStats(){
    if (!fallbackState || !byId('stats')) return;
    byId('stats').innerHTML = statOrder.map(k => '<div class="stat"><span>' + statLabels[k] + '</span><div class="bar"><i style="width:' + clamp(fallbackState.stats[k]) + '%"></i></div><b>' + clamp(fallbackState.stats[k]) + '</b></div>').join('');
    if (byId('badges')) byId('badges').innerHTML = Array.from(new Set(fallbackState.badges)).slice(-28).map(x => '<span class="badge">' + x + '</span>').join('');
  }

  function renderFallbackStep(){
    const eps = localEpisodes();
    if (!fallbackState) return;
    if (fallbackState.step >= eps.length) return finishFallback();
    const episode = eps[fallbackState.step];
    renderStats();
    if (byId('stepLabel')) byId('stepLabel').textContent = (fallbackState.step + 1) + ' / ' + eps.length;
    if (byId('yearLabel')) byId('yearLabel').textContent = episode.year;
    if (byId('prog')) byId('prog').style.width = (fallbackState.step / eps.length * 100) + '%';
    if (byId('year')) byId('year').textContent = episode.year;
    if (byId('title')) byId('title').textContent = episode.title;
    if (byId('scene')) byId('scene').textContent = episode.scene;
    if (byId('fact')) byId('fact').innerHTML = '<b>Историческая опора:</b> ' + episode.fact;
    if (byId('result')) byId('result').style.display = 'none';
    if (byId('choices')) {
      byId('choices').innerHTML = episode.choices.map((choice, index) => '<button class="choice" data-i="' + index + '"><b>' + choice.text + '</b><small>выбор ' + (index + 1) + '</small></button>').join('');
      byId('choices').querySelectorAll('.choice').forEach(btn => {
        btn.onclick = function(){ chooseFallback(Number(btn.getAttribute('data-i'))); };
      });
    }
    renderLog();
  }

  function chooseFallback(index){
    const episode = localEpisodes()[fallbackState.step];
    const choice = episode.choices[index];
    Object.entries(choice.effects || {}).forEach(([key, value]) => {
      fallbackState.stats[key] = clamp((fallbackState.stats[key] || 0) + value);
    });
    (choice.tags || []).forEach(tag => fallbackState.badges.push(tag));
    fallbackState.log.push({ year: episode.year, title: episode.title, choice: choice.text, verdict: choice.verdict, result: choice.result });
    if (byId('choices')) byId('choices').querySelectorAll('.choice').forEach(btn => { btn.disabled = true; });
    if (byId('result')) byId('result').style.display = 'block';
    if (byId('verdict')) byId('verdict').textContent = choice.verdict;
    if (byId('resText')) byId('resText').textContent = choice.result;
    if (byId('delta')) {
      byId('delta').innerHTML = Object.entries(choice.effects || {}).map(([key, value]) => '<span class="' + (value >= 0 ? 'plus' : 'minus') + '">' + statLabels[key] + ' ' + (value > 0 ? '+' : '') + value + '</span>').join('') + (choice.tags || []).map(tag => '<span class="plus">статус: ' + tag + '</span>').join('');
    }
    if (byId('writerNext')) byId('writerNext').onclick = function(){ fallbackState.step += 1; renderFallbackStep(); };
    renderStats();
    renderLog();
  }

  function renderLog(){
    const log = byId('log');
    if (!log || !fallbackState) return;
    if (!fallbackState.log.length) {
      log.innerHTML = '<div class="entry"><b>Архив пуст</b><p>Сделайте первый выбор.</p></div>';
      return;
    }
    log.innerHTML = fallbackState.log.slice().reverse().map(item => '<div class="entry"><b>' + item.year + ' · ' + item.title + '</b><p><b>' + item.verdict + '</b></p><p>' + item.choice + '</p></div>').join('');
  }

  function finishFallback(){
    const gameBlock = byId('writerGame');
    const ending = byId('writerEnding');
    if (gameBlock) gameBlock.style.display = 'none';
    if (!ending) return;
    ending.style.display = 'block';
    const stats = fallbackState.stats;
    const best = statOrder.slice().sort((a,b) => clamp(stats[b]) - clamp(stats[a])).slice(0,3).map(k => statLabels[k]).join(', ');
    ending.innerHTML = '<div class="eyebrow">итог истории</div><h2>Автор сложной Америки</h2><p>Ваши решения собрали литературную биографию: в ней есть рынок, риск, личная честность, историческая память и борьба за голос.</p><div class="endbox"><h3>Сильные стороны</h3><p>' + best + '.</p></div><button class="reset" type="button" id="fallbackRestart">пройти заново</button>';
    const restart = byId('fallbackRestart');
    if (restart) restart.onclick = function(){
      const startBlock = byId('writerStart');
      if (startBlock) startBlock.style.display = 'block';
      ending.style.display = 'none';
      renderProfileCards();
    };
  }

  function ensureGameVisible(){
    const startBlock = byId('writerStart');
    const gameBlock = byId('writerGame');
    if (startBlock && !gameBlock?.style.display) startBlock.style.display = 'block';
    renderProfileCards();
    const reset = byId('reset');
    if (reset && !reset.__safeReset) {
      reset.__safeReset = true;
      reset.addEventListener('click', function(){
        if (!fallbackState) return;
        startWriterGame(fallbackState.profile.id);
      });
    }
  }

  function boot(){
    hookPassportRender();
    ensureGameVisible();
    setTimeout(ensureGameVisible, 100);
    setTimeout(ensureGameVisible, 500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
