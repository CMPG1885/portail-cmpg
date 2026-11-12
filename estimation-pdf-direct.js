/* =====================================================================
   CMPG — Résumé client de l'estimation budgétaire : PDF généré directement
   (téléchargement, sans fenêtre d'impression). Même mise en page que
   estimation-pdf.js (approuvée le 12 novembre 2026).
   Dépend de selection-pdf.js et selection-pdf-direct.js (outils communs).
   ===================================================================== */
(function () {
  const argent = v => Math.round(Number(v || 0)).toLocaleString('fr-CA') + ' $';

  function construireDoc({ projet, estimation, sections, totaux, commentaire }) {
    const { logo, lbl, MAJ, C, IN, W, H, M, LARGEUR } = CMPGSelectionPDF.outils;
    // Entête commune, un peu resserrée pour retrouver la pagination de la version imprimée
    const entete = (m, t) => { const e = CMPGSelectionPDF.outils.entete(m, t); e.stack[1].margin = [0, 9, 0, 3]; return e; };
    const aujourdhui = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });
    const doc = 'Estimation budgétaire';
    const meta = [doc, `${projet.nom || ''} · ${aujourdhui}`];
    const T = totaux || {};
    const statut = estimation.statut === 'figée' ? 'Version finale' : 'Version de travail';
    const content = [];

    // ── Couverture ──
    const G = 4.6 * IN, pg = 0.6 * IN, pd = 0.75 * IN;
    const infos = [['Projet', projet.nom], ['Client', projet.client], ['Adresse', projet.adresse],
      ['Estimation', `${estimation.nom || ''} · ${statut}`], ['Type', estimation.type_projet],
      ['Chargé(e) de projet', projet.responsable], ['Date', aujourdhui]].filter(x => x[1]);
    content.push(
      { svg: logo('#FFFFFF'), width: 2.3 * IN, absolutePosition: { x: pg, y: 0.75 * IN } },
      { absolutePosition: { x: pg, y: 3.15 * IN }, width: G - pg, stack: [
        lbl(projet.numero ? 'Projet ' + projet.numero : 'Projet', { fontSize: 7.5, characterSpacing: 2.25 }),
        { text: 'Estimation\nbudgétaire', font: 'Playfair', fontSize: 30, color: '#FFFFFF', lineHeight: 1.0, margin: [0, 8, 0, 14] },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: G - pg, y2: 0, lineWidth: 0.75, lineColor: '#8A8B8A' }], margin: [0, 0, 0, 16] },
        { table: { widths: [1.6 * IN, G - pg - 1.6 * IN - 0.6 * IN], body: infos.map(([k, v]) => [
            lbl(k, { characterSpacing: 1.1, noWrap: true, margin: [0, 1.5, 0, 0] }), { text: v, font: 'RobotoLight', fontSize: 9, color: '#E6E6E6' }]) },
          layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 6 } },
      ] },
      { absolutePosition: { x: pg, y: H - 0.75 * IN - 8 }, text: MAJ('CMPG Design Construction · 450 455-6006'), fontSize: 7.5, characterSpacing: 2.25, color: C.greige },
    );
    // Sommaire : 2 colonnes remplies de haut en bas, rangées de hauteur fixe, sans montants
    const wD = W - G - 2 * pd, gap = 0.25 * IN, wCol = (wD - gap) / 2;
    const n2 = Math.ceil(sections.length / 2);
    const colSom = arr => ({ width: wCol, table: { widths: [wCol], heights: 16.5, body: arr.map(s => [{ text: MAJ(s.nom), bold: true, fontSize: 6.6, characterSpacing: 0.6, noWrap: true, margin: [0, 5, 0, 0] }]) },
      layout: { hLineWidth: i => i === 0 ? 0 : 0.75, hLineColor: () => C.charcoal, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 } });
    content.push({ absolutePosition: { x: G + pd, y: 0.75 * IN }, width: wD, stack: [
      { text: 'Sommaire', font: 'Playfair', fontSize: 30, margin: [0, 0, 0, 0.22 * IN] },
      { columns: [colSom(sections.slice(0, n2)), colSom(sections.slice(n2))], columnGap: gap },
    ] });
    content.push({ absolutePosition: { x: G + pd, y: H - 0.6 * IN - 50 }, columnGap: 0.5 * IN, columns: [[argent(T.total_ht), 'Total avant taxes'], [argent(T.ttc), 'Total taxes incluses']].map(([v, t]) => ({ width: 'auto', stack: [
      { text: v, font: 'Playfair', fontSize: 22 }, { text: MAJ(t), fontSize: 7, characterSpacing: 1.5, color: C.gris, margin: [0, 3, 0, 0] }] })) });

    // ── Détail par section (entête + titres de colonnes répétés sur chaque page) ──
    const puces = arr => (arr || []).map(t => ({ columns: [{ width: 7.5, text: '–' }, { width: '*', text: t }], columnGap: 0 }));
    const pcNom = t => ({ text: MAJ(t), font: 'RobotoMedium', fontSize: 6.4, characterSpacing: 1.05, color: C.charcoal, margin: [0, 5.25, 0, 1] });
    const contenu = s => {
      const st = s.pieces ? [...puces(s.general), ...s.pieces.flatMap(p => [pcNom(p.piece), ...puces(p.items), ...puces(p.selections)])] : puces(s.inclusions);
      if (s.commentaire) st.push(pcNom('Précisions'), ...puces(String(s.commentaire).split(/\n+/).map(x => x.trim().replace(/^[-–•]\s*/, '')).filter(Boolean)));
      return { stack: st, fontSize: 7.4, color: C.gris, lineHeight: 1.17 };
    };
    const th = (t, a) => ({ text: MAJ(t), font: 'RobotoMedium', fontSize: 6.3, characterSpacing: 1.2, color: C.greige, alignment: a || 'left' });
    const montant = (v, gras) => ({ text: v ? argent(v) : '—', alignment: 'right', noWrap: true, bold: !!gras, fontSize: 7.8 });
    const body = [
      [{ ...entete(meta, 'Détail par section'), colSpan: 5 }, '', '', '', ''],
      [th('Section'), th('Ce qui est inclus'), th('Coûts de base', 'right'), th('Choix client', 'right'), th('Total', 'right')],
      ...sections.map(s => [
        { stack: [{ text: s.nom, font: 'Playfair', fontSize: 10.5, lineHeight: 1 }, { text: s.ddn, fontSize: 6.5, characterSpacing: 0.75, color: C.greige, margin: [0, 2, 0, 0] }] },
        contenu(s), montant(s.base), montant(s.choix), { ...montant(s.total || 0, true), text: argent(s.total) },
      ]),
    ];
    content.push({ pageBreak: 'before', table: { headerRows: 2, dontBreakRows: true, widths: [2.1 * IN - 9, '*', 0.95 * IN - 9, 0.95 * IN - 9, 1 * IN - 9], body },
      layout: { hLineWidth: i => i < 2 ? 0 : 0.75, hLineColor: i => i === 2 ? C.charcoal : C.filet, vLineWidth: () => 0,
        paddingLeft: () => 4.5, paddingRight: () => 4.5, paddingTop: i => i === 0 ? 0 : i === 1 ? 4.5 : 6, paddingBottom: i => i === 0 ? 0 : i === 1 ? 4.5 : 6 } });

    // ── Récapitulatif ──
    const rangs = [['Coûts de base', T.base], ['Choix du client', T.choix], ['Sous-total des travaux', T.travaux, 'fort'],
      [`Contingence (${+(Number(T.contingence_pct || 0) * 100).toFixed(1)} %)`.replace('.', ','), T.contingence], ['Frais de gestion et d’administration', T.frais],
      ['Total avant taxes', T.total_ht, 'fort'], ['TPS (5 %)', T.tps], ['TVQ (9,975 %)', T.tvq], ['Total taxes incluses', T.ttc, 'grand']];
    content.push({ pageBreak: 'before', ...entete(meta, 'Récapitulatif') });
    content.push({ table: { widths: ['*', 'auto'], body: rangs.map(([l, v, c]) => {
        const st = c === 'grand' ? { font: 'Playfair', fontSize: 14 } : c === 'fort' ? { font: 'RobotoMedium', fontSize: 8.5 } : { fontSize: 8.5 };
        return [{ text: l, ...st }, { text: argent(v), alignment: 'right', noWrap: true, ...st }];
      }) },
      layout: { hLineWidth: i => i === 0 || i === rangs.length ? 0 : 0.75, hLineColor: i => ['fort'].includes(rangs[i - 1]?.[2]) ? C.charcoal : C.filet, vLineWidth: () => 0,
        paddingLeft: () => 4.5, paddingRight: () => 4.5, paddingTop: i => rangs[i][2] === 'grand' ? 9 : 5.25, paddingBottom: () => 5.25 },
      margin: [0, 0, LARGEUR - 5.2 * IN, 0] });
    if (commentaire) content.push({ margin: [0, 0.25 * IN, LARGEUR - 7.2 * IN, 0], stack: [
      { text: MAJ('Notes de CMPG'), font: 'RobotoMedium', fontSize: 7, characterSpacing: 1.5, color: C.gris, margin: [0, 0, 0, 4.5] },
      ...String(commentaire).split(/\n+/).filter(Boolean).map((p, i) => ({ text: p, fontSize: 8.2, lineHeight: 1.45, margin: [0, i ? 4.5 : 0, 0, 0] }))] });
    content.push({ text: 'Estimation budgétaire préparée à partir des plans et des sélections disponibles à la date du document. Les montants sont donnés à titre indicatif ; ils seront précisés par les soumissions des entrepreneurs et les quantités finales mesurées au chantier. Les choix du client approuvés sont comptés au prix du produit sélectionné ; les autres, selon la gamme retenue.',
      fontSize: 7.2, color: C.gris, lineHeight: 1.45, margin: [0, 0.2 * IN, LARGEUR - 7.2 * IN, 0] });
    content.push({ unbreakable: true, margin: [0, 0.35 * IN, 0, 0], columnGap: 0.6 * IN, columns: ['Prise de connaissance du client — signature et date', 'CMPG Design Construction'].map(t => ({ stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: (LARGEUR - 0.6 * IN) / 2, y2: 0, lineWidth: 0.75, lineColor: C.charcoal }] },
      { text: MAJ(t), fontSize: 6.8, characterSpacing: 1.1, color: C.gris, margin: [0, 4.5, 0, 0] }] })) });

    return {
      pageSize: 'LETTER', pageOrientation: 'landscape', pageMargins: M,
      info: { title: `${projet.nom || 'Projet'} — ${doc}`, author: 'CMPG Design Construction', creator: 'Portail CMPG' },
      defaultStyle: { font: 'Roboto', fontSize: 7.8, color: C.charcoal, lineHeight: 1.15, fontFeatures: ['lnum'] },
      background: p => p === 1 ? { canvas: [
        { type: 'rect', x: 0, y: 0, w: G, h: H, color: C.charcoal },
        { type: 'rect', x: G, y: 0, w: W - G, h: H, color: C.beige }] } : null,
      footer: (p, total) => p === 1 ? null : { margin: [M[0], 0.55 * IN - 22, M[2], 0], columns: [
        { text: MAJ(`CMPG Design Construction · ${doc}`), font: 'RobotoMedium', fontSize: 6.5, characterSpacing: 1.1, color: C.greige },
        { text: `${p} / ${total}`, font: 'RobotoMedium', fontSize: 6.5, characterSpacing: 1.1, color: C.greige, alignment: 'right' }] },
      content,
    };
  }

  async function telecharger(params) {
    await CMPGSelectionPDF.outils.telechargerDoc(construireDoc(params), `${params.projet.nom || 'Projet'} — Estimation budgétaire.pdf`);
  }
  // Pour les tests : le PDF en Blob
  async function blob(params) {
    const o = CMPGSelectionPDF.outils; await o.chargerScript(o.PDFMAKE); pdfMake.setFonts(o.FONTS);
    return pdfMake.createPdf(construireDoc(params)).getBlob();
  }

  window.CMPGEstimationPDF = { telecharger, blob };
})();
