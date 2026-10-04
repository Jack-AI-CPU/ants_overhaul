// Advanced Real-Life Ants Mod (Fixed Behaviors)

// 1. ANTS LARVA (Immobile, needs workers to bring food)
elements.ant_larva = {
    color: "#f0eedb",
    behavior: behaviors.POWDER, // Drops like sand, can't move on its own
    category: "life",
    state: "solid",
    density: 500,
    reactions: {
        "sugar": { elem1: "ant", elem2: null },
        "honey": { elem1: "ant", elem2: null }
    }
};

// 2. QUEEN ANT (Digs downward, lays larvae)
elements.ant_queen = {
    color: "#3a1f04",
    behavior: [
        "XX|CR:ant_larva%0.5|XX",
        "DL:sand,dirt,soil%15|XX|DL:sand,dirt,soil%15",
        "XX|DB:sand,dirt,soil%30|XX"
    ],
    category: "life",
    state: "solid",
    density: 700,
    reactions: {
        "sugar": { elem1: "ant_queen", elem2: "ant_larva" },
        "honey": { elem1: "ant_queen", elem2: "ant_larva" },
        "spider": { elem1: "meat", elem2: "spider" },
        "frog": { elem1: null, elem2: "frog" }
    }
};

// 3. SOLDIER ANT (Fast wall-crawler, aggressive defender)
elements.ant_soldier = {
    color: "#5c330a",
    behavior: behaviors.CRAWLER, // Standard working crawler physics preset
    category: "life",
    state: "solid",
    density: 610,
    reactions: {
        "termite": { elem1: "ant_soldier", elem2: "meat" },
        "spider": { elem1: "ant_soldier", elem2: "meat" },
        "worm": { elem1: "ant_soldier", elem2: "meat" },
        "acid": { elem1: "dirty_water", elem2: null }
    }
};

// 4. OVERWRITE BASE ANT (Turns normal ants into true Foragers)
elements.ant.reactions = {
    ...elements.ant.reactions,
    "sugar": { elem1: "ant", elem2: "sugar" }, 
    "honey": { elem1: "ant", elem2: "honey" },
    "termite": { elem1: "meat", elem2: "termite" }
};
