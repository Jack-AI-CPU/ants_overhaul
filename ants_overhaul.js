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

// Give the Queen Ant the ability to dig underground like real life
elements.ant_queen = {
    color: "#3a1f04", 
    behavior: [
        "XX              | CR:ant_larva%0.5 | XX",             // 0.5% chance per tick to lay a larva
        "DL:sand,dirt,soil%15 | XX               | DL:sand,dirt,soil%15", // 15% chance to clear sand/dirt to her sides
        "XX              | DB:sand,dirt,soil%30 | XX"              // 30% chance to dig downwards into the earth
    ],
    category: "life",
    state: "solid",
    density: 700,
    reactions: {
        "sugar": { elem1: "ant_queen", elem2: "ant_larva" },
        "honey": { elem1: "ant_queen", elem2: "ant_larva" }
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
