// Advanced Real-Life Ants Mod

// 1. ANTS LARVA (Immobile, needs workers to bring food)
elements.ant_larva = {
    color: "#f0eedb",
    behavior: behaviors.POWDER, // Drops like sand, can't move on its own
    category: "life",
    state: "solid",
    density: 500,
    reactions: {
        // If a worker brings honey/sugar here, the larva eats and hatches into a worker
        "sugar": { elem1: "ant", elem2: null },
        "honey": { elem1: "ant", elem2: null }
    }
};

// 2. QUEEN ANT (Stays deep underground, eats and lays larvae)
elements.ant_queen = {
    color: "#3a1f04", // Huge, dark brown queen
    behavior: [
        "XX|CR:ant_larva%1|XX",  // 1% chance to naturally produce a larva if space permits
        "M2|XX|M2",              // Moves very slowly (M2) to simulate her heavy weight
        "XX|M1|XX"
    ],
    category: "life",
    state: "solid",
    density: 700,
    reactions: {
        // When fed, her egg-laying speed dramatically spikes
        "sugar": { elem1: "ant_queen", elem2: "ant_larva" },
        "honey": { elem1: "ant_queen", elem2: "ant_larva" },
        // The queen stays safe; if a predator touches her, she gets hurt
        "spider": { elem1: "meat", elem2: "spider" },
        "frog": { elem1: null, elem2: "frog" }
    }
};

// 3. SOLDIER ANT (Aggressive, patrols, protects the nest)
elements.ant_soldier = {
    color: "#5c330a", // Larger head, reddish-brown color
    behavior: behaviors.CRAWLER, // Moves quickly along walls and surfaces
    category: "life",
    state: "solid",
    density: 610,
    reactions: {
        // Soldiers actively attack colony enemies
        "termite": { elem1: "ant_soldier", elem2: "meat" },
        "spider": { elem1: "ant_soldier", elem2: "meat" },
        "worm": { elem1: "ant_soldier", elem2: "meat" },
        // Soldiers will sacrifice themselves against acid or hazards
        "acid": { elem1: "dirty_water", elem2: null }
    }
};

// 4. OVERWRITE BASE ANT (Turns normal ants into true "Forager Workers")
elements.ant.reactions = {
    ...elements.ant.reactions,
    // Workers don't just eat sugar anymore; they "carry" it by pushing it around
    "sugar": { elem1: "ant", elem2: "sugar" }, 
    "honey": { elem1: "ant", elem2: "honey" },
    // If a worker runs into a termite, it alerts the colony or dies
    "termite": { elem1: "meat", elem2: "termite" }
};
