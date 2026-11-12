/* =====================================================================
   CMPG — Sélection des finis et produits : PDF généré directement
   (téléchargement, sans fenêtre d'impression). Vrai texte, liens
   cliquables, polices Roboto / Playfair intégrées.
   Dépend de selection-pdf.js (CMPGSelection.preparer et le logo)
   et de pdfmake (chargé à la demande).
   ===================================================================== */
(function () {
  const PDFMAKE = 'https://cdn.jsdelivr.net/npm/pdfmake@0.3.12/build/pdfmake.min.js';
  const FONT = f => 'https://cdn.jsdelivr.net/npm/@fontsource/' + f;
  const FONTS = {
    RobotoLight: { normal: FONT('roboto@5.1.0/files/roboto-latin-300-normal.woff') },
    Roboto: { normal: FONT('roboto@5.1.0/files/roboto-latin-400-normal.woff'), bold: FONT('roboto@5.1.0/files/roboto-latin-700-normal.woff') },
    RobotoMedium: { normal: FONT('roboto@5.1.0/files/roboto-latin-500-normal.woff') },
    Playfair: { normal: FONT('playfair-display@5.1.0/files/playfair-display-latin-400-normal.woff') },
    Fleche: { normal: FONT('noto-sans-symbols@5.3.0/files/noto-sans-symbols-symbols-400-normal.woff') },   // seulement pour « → »
  };
  // Couleurs de la charte (mêmes valeurs que selection-pdf.js)
  const C = { charcoal: '#3A3B3A', greige: '#ACA298', gris: '#6F6863', beige: '#F1EEE8', filet: '#EEEDEE', brun: '#523525', vert: '#4B6B55' };
  const STATUT = { 'approuvé': ['Approuvé', C.vert], 'en_attente': ['En attente', C.greige], 'à_revoir': ['À revoir', C.brun] };
  const IN = 72;                       // 1 po = 72 pt
  const W = 11 * IN, H = 8.5 * IN;     // lettre paysage
  const M = [0.5 * IN, 0.42 * IN, 0.5 * IN, 0.55 * IN];
  const LARGEUR = W - M[0] - M[2];

  const argent = v => Number(v || 0).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' });
  const dateCourte = d => d ? new Date(d).toLocaleDateString('fr-CA') : '';
  const MAJ = s => String(s || '').toLocaleUpperCase('fr-CA');

  function chargerScript(src) {
    return new Promise((ok, ko) => {
      if (window.pdfMake) return ok();
      const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => ko(new Error('pdfmake introuvable'));
      document.head.appendChild(s);
    });
  }

  // Logo : le SVG d'Illustrator utilise une classe CSS → couleur mise directement sur les tracés.
  function logo(couleur) {
    return CMPGSelection.LOGO_SVG
      .replace(/<style[\s\S]*?<\/style>/, '')
      .replace(/class="st0"/g, `fill="${couleur}"`);
  }
  const RATIO_LOGO = 292.32 / 127.03;

  // Photos → JPEG carré recadré (équivalent de object-fit: cover), 240 px.
  async function photoCarree(url) {
    try {
      const r = await fetch(url, { mode: 'cors' }); if (!r.ok) return null;
      const bmp = await createImageBitmap(await r.blob());
      const t = 240, c = document.createElement('canvas'); c.width = c.height = t;
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, t, t);
      g.beginPath(); g.roundRect(0, 0, t, t, 24); g.clip();   // coins arrondis (fond blanc)
      const s = Math.max(t / bmp.width, t / bmp.height);
      g.drawImage(bmp, (t - bmp.width * s) / 2, (t - bmp.height * s) / 2, bmp.width * s, bmp.height * s);
      return c.toDataURL('image/jpeg', 0.85);
    } catch (e) { return null; }
  }
  async function chargerPhotos(lignes) {
    const urls = [...new Set(lignes.map(l => l.photo).filter(Boolean))];
    const res = {};
    for (let i = 0; i < urls.length; i += 6) {   // 6 à la fois
      await Promise.all(urls.slice(i, i + 6).map(async u => { res[u] = await photoCarree(u); }));
    }
    return res;
  }

  // ── Petits blocs réutilisables ──
  const lbl = (t, o = {}) => ({ text: MAJ(t), font: 'RobotoMedium', fontSize: 7, characterSpacing: 1.5, color: C.greige, ...o });
  const PH = 0.62 * IN;
  function vignette(l, photos) {
    const src = l.photo && photos[l.photo];
    return src ? { image: src, width: PH, height: PH }
      : { canvas: [{ type: 'rect', x: 0, y: 0, w: PH, h: PH, r: 4.5, color: C.beige, lineColor: C.filet, lineWidth: 0.75 }], width: PH };
  }
  function produit(l, photos) {
    const txt = [{ text: l.nom, font: 'RobotoMedium', fontSize: 8.4 }];
    const fab = [l.fab, l.mod].filter(Boolean).join(' · ');
    if (fab) txt.push({ text: fab, fontSize: 7, color: C.gris, margin: [0, 1, 0, 0] });
    l.finis.forEach(x => txt.push({ text: x, fontSize: 7, color: C.brun, margin: [0, 2, 0, 0] }));
    return { columns: [{ width: PH, stack: [vignette(l, photos)] }, { width: '*', stack: txt, margin: [0, 0, 0, 0] }], columnGap: 7.5, verticalAlignment: 'middle' };
  }
  function produitAvecCentrage(l, photos) {
    // pdfmake n'aligne pas verticalement une colonne par rapport à l'autre : on centre le texte à côté de la vignette.
    const lignesTexte = 1 + ([l.fab, l.mod].some(Boolean) ? 1 : 0) + l.finis.length + Math.floor(String(l.nom).length / 42);
    const hauteur = lignesTexte * 10;
    const p = produit(l, photos);
    p.columns[1].margin = [0, Math.max(0, (PH - hauteur) / 2), 0, 0];
    return p;
  }
  // Roboto (sous-ensemble latin) n'a ni « → » ni « ✓ » : flèche en Noto Sans Symbols, coche dessinée.
  const coche = (couleur, y = 3.6) => ({ width: 8, canvas: [{ type: 'polyline', points: [{ x: 0.5, y }, { x: 2.3, y: y + 1.8 }, { x: 5.5, y: y - 2 }], lineWidth: 0.7, lineColor: couleur }] });
  // « 126 pi² → 144,9 pi² avec perte » → 3 lignes : quantité nette, → quantité commandée, « avec perte » en gris.
  function quantite(t) {
    const [a, b] = String(t || '').split(' → ');
    if (b === undefined) return { text: a };
    const q = b.replace(/ avec perte$/, '').replace(/(\d) /g, '$1\u00A0');
    return { stack: [{ text: a.replace(/(\d) /g, '$1\u00A0') }, { text: [{ text: '→ ', font: 'Fleche', color: C.gris }, q] }, { text: 'avec perte', fontSize: 7, color: C.gris }] };
  }
  const ref = l => ({ stack: [
    { text: [{ text: l.ref, font: 'Playfair', fontSize: 10.5 }, l.lettre ? { text: '  OPT. ' + l.lettre, fontSize: 6.5, characterSpacing: 0.75, color: C.greige } : ''] },
    { text: l.pieces || '', fontSize: 7, color: C.gris, margin: [0, 2, 0, 0] }] });
  function statut(l, avecPre) {
    const [lab, col] = STATUT[l.statut] || [l.statut, C.greige];
    const s = [{ columns: [{ width: 7, canvas: [{ type: 'ellipse', x: 2.25, y: 4.1, r1: 2.25, r2: 2.25, color: col }] }, { width: 'auto', text: lab, fontSize: 7 }], columnGap: 1 }];
    if (l.date && l.statut === 'approuvé') s.push({ text: 'le ' + dateCourte(l.date), fontSize: 7, color: C.gris, margin: [7, 2, 0, 0] });
    if (avecPre && l.pre) s.push({ columns: [coche(C.greige, 3.4), { width: 'auto', text: 'PRÉ-APPROUVÉ CMPG', fontSize: 6, color: C.greige, characterSpacing: 0.15, noWrap: true }], columnGap: 0, margin: [0, 2, 0, 0] });
    return { stack: s };
  }

  function entete(meta, titre, resume) {
    const lw = 0.36 * IN * RATIO_LOGO;
    return {
      stack: [
        { columns: [
          { width: lw, svg: logo(C.charcoal), fit: [lw, 0.36 * IN] },
          { width: '*', stack: meta.map(t => ({ text: MAJ(t), alignment: 'right', fontSize: 7, characterSpacing: 1.5, color: C.gris, lineHeight: 1.45 })) },
        ] },
        { columns: [
          { width: 0.75, canvas: [{ type: 'line', x1: 0.375, y1: 2, x2: 0.375, y2: 31, lineWidth: 0.75, lineColor: C.charcoal }] },
          { width: '*', text: titre, font: 'Playfair', fontSize: 26, margin: [10.5, 0, 0, 0] },
          ...(resume || []).map(r => ({ width: 'auto', margin: [21, 4, 0, 0], stack: [
            { text: r[0], font: 'Playfair', fontSize: 15, alignment: 'right' },
            { text: MAJ(r[1]), fontSize: 6.5, characterSpacing: 1.35, color: C.gris, alignment: 'right' }] })),
        ], margin: [0, 16, 0, 10] },
      ],
    };
  }

  function construireDoc({ mode, projet, postes }, photos) {
    const { cats, historique } = CMPGSelection.preparer(postes, mode);
    const client = mode === 'client';
    const doc = client ? 'Sélection client' : 'Document de chantier';
    const nomProjet = projet.nom || '', numero = projet.numero || '';
    const aujourdhui = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
    const tous = cats.flatMap(c => c.sc.flatMap(s => s.lignes));
    const totalG = tous.reduce((t, x) => t + (x.total || 0), 0);
    const nbApp = tous.filter(x => x.statut === 'approuvé').length;
    const meta = [doc, `${nomProjet} · ${aujourdhui}`];
    const content = [];

    // ── Couverture ──
    const G = 4.6 * IN, pg = 0.6 * IN, pd = 0.75 * IN;
    const lwC = 2.3 * IN;
    const infos = [['Projet', nomProjet], ['Client', projet.client], ['Adresse', projet.adresse], ['Chargé(e) de projet', projet.responsable], ['Date', aujourdhui]].filter(x => x[1]);
    content.push(
      { svg: logo('#FFFFFF'), width: lwC, absolutePosition: { x: pg, y: 0.75 * IN } },
      { absolutePosition: { x: pg, y: 3.3 * IN }, width: G - pg, stack: [
        lbl(numero ? 'Projet ' + numero : 'Projet', { fontSize: 7.5, characterSpacing: 2.25 }),
        { text: client ? 'Sélection des finis\net produits' : 'Document de\nchantier', font: 'Playfair', fontSize: 30, color: '#FFFFFF', lineHeight: 1.0, margin: [0, 8, 0, 14] },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: G - pg, y2: 0, lineWidth: 0.75, lineColor: '#8A8B8A' }], margin: [0, 0, 0, 16] },
        { table: { widths: [1.15 * IN, G - pg - 1.15 * IN - 0.6 * IN], body: infos.map(([k, v]) => [
            lbl(k, { characterSpacing: 1.1, margin: [0, 1, 0, 0] }), { text: v, font: 'RobotoLight', fontSize: 9, color: '#FFFFFF' }]) },
          layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 5.25 } },
      ] },
      { absolutePosition: { x: pg, y: H - 0.75 * IN - 8 }, text: MAJ('CMPG Design Construction · 450 455-6006'), fontSize: 7.5, characterSpacing: 2.25, color: C.greige },
    );
    const wD = W - G - 2 * pd;
    const som = cats.map(c => [c.nom, `${c.nb} élément${c.nb > 1 ? 's' : ''}`, client ? argent(c.total) : `${c.approuves} à commander`]);
    if (client) som.push(['Récapitulatif et approbation', '', '']);
    content.push({ absolutePosition: { x: G + pd, y: 0.9 * IN }, width: wD, stack: [
      { text: 'Sommaire', font: 'Playfair', fontSize: 30, margin: [0, 0, 0, 0.3 * IN] },
      { table: { widths: ['*', 'auto'], body: som.map(([n, e, m]) => [
          { text: [{ text: MAJ(n), bold: true, fontSize: 9.5, characterSpacing: 1.5 }, e ? { text: '   ' + e, font: 'RobotoLight', fontSize: 8.5, characterSpacing: 0.4, color: C.gris } : ''] },
          { text: m, fontSize: 9, characterSpacing: 0.4, alignment: 'right' }]) },
        layout: { hLineWidth: i => i === 0 ? 0 : 0.75, hLineColor: () => C.charcoal, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 9, paddingBottom: () => 9 } },
    ] });
    const kpis = client ? [[String(tous.length), 'Éléments'], [`${nbApp}/${tous.length}`, 'Approuvés'], [argent(totalG), 'Estimation avant taxes']]
      : [[String(tous.length), 'Éléments approuvés à commander']];
    content.push({ absolutePosition: { x: G + pd, y: H - 0.9 * IN - 38 }, columnGap: 0.5 * IN, columns: kpis.map(([v, t]) => ({ width: 'auto', stack: [
      { text: v, font: 'Playfair', fontSize: 22 }, { text: MAJ(t), fontSize: 7, characterSpacing: 1.5, color: C.gris, margin: [0, 3, 0, 0] }] })) });

    // ── Une section par catégorie ──
    const cols = client
      ? [['Réf. · Pièce(s)', 0.95 * IN], ['Produit', '*'], ['Couleur · Dimensions', 1.05 * IN], ['Quantité', 1.05 * IN], ['Prix unit.', 0.85 * IN, 'right'], ['Total', 0.8 * IN, 'right'], ['Statut', 1.05 * IN], ['Lien', 0.75 * IN]]
      : [['Réf. · Pièce(s)', 0.95 * IN], ['Produit', 2.15 * IN], ['Code', 0.8 * IN], ['Couleur · Dimensions', 0.95 * IN], ['Quantité à commander', 1 * IN], ['Statut', 0.95 * IN], ['Suivi', 0.85 * IN], ['Notes chantier', '*']];
    const n = cols.length;
    const th = cols.map(([t, , a]) => ({ text: MAJ(t), font: 'RobotoMedium', fontSize: 6.3, characterSpacing: 1.2, color: C.greige, alignment: a || 'left' }));
    const vm = o => ({ verticalAlignment: 'middle', ...o });
    const chk = t => ({ columns: [{ width: 9, canvas: [{ type: 'rect', x: 0, y: 1, w: 6.75, h: 6.75, r: 1.5, lineWidth: 0.75, lineColor: C.charcoal }] }, { width: 'auto', text: t, fontSize: 7.6 }] });

    cats.forEach(c => {
      const res = client ? [[String(c.nb), 'Éléments'], [String(c.nb - c.approuves), 'En attente'], [argent(c.total), 'Estimation avant taxes']]
        : [[String(c.nb), 'Approuvés à commander']];
      const body = [[{ ...entete(meta, c.nom, res), colSpan: n }, ...Array(n - 1).fill('')], th];
      const sc = [];        // index des lignes de sous-catégorie
      c.sc.forEach(s => {
        if (s.nom) { sc.push(body.length); body.push([{ text: MAJ(s.nom), bold: true, fontSize: 6.8, characterSpacing: 1.65, color: C.brun, colSpan: n, margin: [0, 5, 0, 0] }, ...Array(n - 1).fill('')]); }
        s.lignes.forEach(l => {
          const coul = { stack: [{ text: l.coul || '' }, ...(l.dim ? [{ text: l.dim, fontSize: 7, color: C.gris, margin: [0, 2, 0, 0] }] : [])] };
          body.push(client ? [
            vm(ref(l)), vm(produitAvecCentrage(l, photos)), vm(coul), vm(quantite(l.qte)),
            vm({ text: l.pu != null ? argent(l.pu) + (l.unite ? ' / ' + l.unite : '') : '—', alignment: 'right', noWrap: true }),
            vm({ text: l.total != null ? argent(l.total) : '—', alignment: 'right', bold: true, noWrap: true }),
            vm(statut(l, true)),
            vm(l.lien ? { text: 'Voir le produit', link: l.lien, fontSize: 7, color: C.brun, decoration: 'underline', decorationColor: C.brun } : { text: '' }),
          ] : [
            vm(ref(l)), vm(produitAvecCentrage(l, photos)), vm({ text: l.sku || '' }), vm(coul), vm(quantite(l.qte)), vm(statut(l, false)),
            vm({ stack: [chk('Commandé'), { ...chk('Reçu'), margin: [0, 4, 0, 0] }] }), { text: '' },
          ]);
        });
      });
      content.push({
        pageBreak: 'before',
        table: { headerRows: 2, dontBreakRows: true, widths: cols.map(x => x[1] === '*' ? '*' : x[1] - 9), body },   // pdfmake : largeur sans le padding (2 × 4,5 pt)
        layout: {
          hLineWidth: i => (i === 0 || i === 1) ? 0 : i === 2 ? 0.75 : sc.includes(i - 1) ? 0 : 0.75,
          hLineColor: i => i === 2 ? C.charcoal : C.filet,
          vLineWidth: () => 0,
          paddingLeft: (i, node) => 4.5, paddingRight: () => 4.5,
          paddingTop: i => i === 0 ? 0 : i === 1 ? 4.5 : sc.includes(i) ? 4 : 5.25,
          paddingBottom: i => i === 0 ? 0 : i === 1 ? 4.5 : sc.includes(i) ? 3 : 5.25,
        },
      });
    });

    // ── Récapitulatif (client) ──
    if (client) {
      const rec = [[...['Catégorie', 'Éléments', 'Approuvés'].map(t => th[0].text ? { ...th[0], text: MAJ(t) } : t), { ...th[0], text: MAJ('Estimation avant taxes'), alignment: 'right', noWrap: true }]];
      cats.forEach(c => rec.push([vm({ text: c.nom, font: 'Playfair', fontSize: 10.5 }), vm({ text: String(c.nb) }), vm({ text: `${c.approuves} / ${c.nb}` }), vm({ text: argent(c.total), alignment: 'right' })]));
      rec.push([vm({ text: 'Total', font: 'Playfair', fontSize: 10.5 }), '', '', vm({ text: argent(totalG), font: 'Playfair', fontSize: 13, alignment: 'right' })]);
      const L = rec.length;
      content.push({ pageBreak: 'before', ...entete(meta, 'Récapitulatif') });
      content.push({ table: { headerRows: 1, widths: [2.2 * IN, 0.7 * IN, 0.8 * IN, '*'], body: rec }, width: 5.4 * IN, fontSize: 7.6,
        layout: { hLineWidth: i => i === 0 ? 0 : (i === 1 || i === L) ? 0.75 : 0.75, hLineColor: i => (i === 1 || i === L) ? C.charcoal : C.filet, vLineWidth: () => 0,
          paddingLeft: () => 4.5, paddingRight: () => 4.5, paddingTop: () => 5.25, paddingBottom: () => 5.25 }, margin: [0, 0, W - M[0] - M[2] - 5.4 * IN, 0] });
      if (historique.length) {
        content.push({ text: 'Options non retenues', font: 'Playfair', fontSize: 15, margin: [0, 0.3 * IN, 0, 10] });
        content.push({ table: { headerRows: 1, dontBreakRows: true, widths: [1.4 * IN, 0.6 * IN, '*', 2 * IN], body: [
          ['Catégorie', 'Réf.', 'Produit', 'Remplacé par'].map(t => ({ ...th[0], text: MAJ(t) })),
          ...historique.map(h => [vm({ text: h.cat }), vm({ text: h.ref, font: 'Playfair', fontSize: 10.5 }), vm(produitAvecCentrage(h, photos)), vm({ text: h.remplacePar || '—' })])] },
          layout: { hLineWidth: i => i === 0 ? 0 : 0.75, hLineColor: i => i === 1 ? C.charcoal : C.filet, vLineWidth: () => 0, paddingLeft: () => 4.5, paddingRight: () => 4.5, paddingTop: () => 5.25, paddingBottom: () => 5.25 },
          margin: [0, 0, LARGEUR - 7 * IN, 0] });
      }
      content.push({ text: 'Les montants sont des estimations avant taxes, basées sur les prix des fournisseurs à la date du document. Ils peuvent varier selon les disponibilités et les quantités finales mesurées au chantier.',
        fontSize: 7.2, color: C.gris, lineHeight: 1.45, margin: [0, 0.18 * IN, LARGEUR - 7 * IN, 0] });
      content.push({ unbreakable: true, margin: [0, 0.35 * IN, 0, 0], columnGap: 0.6 * IN, columns: ['Approbation du client — signature et date', 'CMPG Design Construction'].map(t => ({ stack: [
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: (LARGEUR - 0.6 * IN) / 2, y2: 0, lineWidth: 0.75, lineColor: C.charcoal }] },
        { text: MAJ(t), fontSize: 6.8, characterSpacing: 1.1, color: C.gris, margin: [0, 4.5, 0, 0] }] })) });
    }

    return {
      pageSize: 'LETTER', pageOrientation: 'landscape', pageMargins: M,
      info: { title: `${nomProjet} — ${doc}`, author: 'CMPG Design Construction', creator: 'Portail CMPG' },
      defaultStyle: { font: 'Roboto', fontSize: 7.6, color: C.charcoal, lineHeight: 1.15, fontFeatures: ['lnum'] },
      background: p => p === 1 ? { canvas: [
        { type: 'rect', x: 0, y: 0, w: G, h: H, color: C.charcoal },
        { type: 'rect', x: G, y: 0, w: W - G, h: H, color: C.beige }] } : null,
      footer: (p, total) => p === 1 ? null : { margin: [M[0], 0.55 * IN - 22, M[2], 0], columns: [
        { text: MAJ(`CMPG Design Construction · ${doc}`), font: 'RobotoMedium', fontSize: 6.5, characterSpacing: 1.1, color: C.greige },
        { text: `${p} / ${total}`, font: 'RobotoMedium', fontSize: 6.5, characterSpacing: 1.1, color: C.greige, alignment: 'right' }] },
      content,
    };
  }

  // Télécharge le PDF. Retourne { vide } comme CMPGSelection.imprimer.
  async function telecharger(params) {
    const { cats, historique } = CMPGSelection.preparer(params.postes, params.mode);
    if (!cats.length && !historique.length) return { vide: true };
    await chargerScript(PDFMAKE);
    const photos = await chargerPhotos([...cats.flatMap(c => c.sc.flatMap(s => s.lignes)), ...historique]);
    const dd = construireDoc(params, photos);
    pdfMake.setFonts(FONTS);
    const nom = `${params.projet.nom || 'Projet'} — ${params.mode === 'client' ? 'Sélection client' : 'Document de chantier'}.pdf`.replace(/[\\/:*?"<>|]/g, '-');
    const bl = await pdfMake.createPdf(dd).getBlob();
    const url = URL.createObjectURL(bl), a = document.createElement('a');
    a.href = url; a.download = nom; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return { vide: false };
  }

    // Pour les tests : le PDF en Blob sans téléchargement
  async function blob(params) {
    await chargerScript(PDFMAKE);
    const { cats, historique } = CMPGSelection.preparer(params.postes, params.mode);
    const photos = await chargerPhotos([...cats.flatMap(c => c.sc.flatMap(s => s.lignes)), ...historique]);
    pdfMake.setFonts(FONTS);
    return pdfMake.createPdf(construireDoc(params, photos)).getBlob();
  }

  window.CMPGSelectionPDF = { telecharger, blob };
})();
