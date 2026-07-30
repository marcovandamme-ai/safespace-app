const discQuestionsDB = Array.from({ length: 100 }, (_, i) => ({
    q: `[DISC Vraag ${i + 1}] Hoe reageert deze persoon primair in situatie ${i + 1}?`,
    options: [
        { val: 'rood', text: `🔴 Direct, daadkrachtig, gericht op resultaat en snelheid` },
        { val: 'geel', text: `🟡 Enthousiast, prater, gericht op relatie en visie` },
        { val: 'groen', text: `🟢 Rustig, harmonieus, ondersteunend en geduldig` },
        { val: 'blauw', text: `🔵 Analytisch, nauwkeurig, vraagt naar feiten` }
    ]
}));

const nlpQuestionsDB = Array.from({ length: 100 }, (_, i) => ({
    q: `[NLP Vraag ${i + 1}] Welke focus gebruikt deze persoon het liefst in situatie ${i + 1}?`,
    options: [
        { val: 'visueel', text: `👁️ Visueel: "Ik zie het voor me", "Laat me kijken"` },
        { val: 'auditief', text: `👂 Auditief: "Dat klinkt goed", "Luister eens"` },
        { val: 'kinesthetisch', text: `🤲 Kinesthetisch: "Dat voelt goed", "Grip krijgen"` },
        { val: 'digitaal', text: `🧠 Auditief Digitaal: "Logisch verklaarbaar", "Feiten"` }
    ]
}));