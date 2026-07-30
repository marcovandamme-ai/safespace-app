const deliverablesData = [
    {
        id: "del-1",
        titel: "Q3 Klantcontact Kwaliteitsanalyse",
        format: "PowerPoint",
        frequentie: "Maandelijks",
        stakeholderId: "stk-1",
        preCheckDatum: "2026-08-05",
        deadline: "2026-08-12",
        status: "In behandeling"
    },
    {
        id: "del-2",
        titel: "FCR Wekelijkse Rapportage",
        format: "Excel / Dashboard",
        frequentie: "Wekelijks",
        stakeholderId: "stk-2",
        preCheckDatum: "2026-08-02",
        deadline: "2026-08-07",
        status: "Afgerond"
    }
];

function getDeliverables() {
    return deliverablesData;
}

function addDeliverable(deliverable) {
    deliverable.id = 'del-' + Date.now();
    deliverablesData.push(deliverable);
}