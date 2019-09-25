export const state = {
    scene: "menu",
    deck: null,
    era: 0,
    choice: 0,
    card: null,
    scores: {
        bonheur: 10,
        environnement: 100
    },
    shouldShowIndicateurBonheur: false,
    shouldShowIndicateurEnvironnement: false,
    passives: []
};
window.state = state;