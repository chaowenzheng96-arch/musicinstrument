const instruments = [
  {
    name: "Sitar",
    category: "String",
    type: "Plucked",
    region: "India",
    description: "A long-necked lute known for its bright and resonant sound.",
    history:
      "The sitar developed in the Indian subcontinent around the 16th century and became central to Hindustani classical music.",
    funFact:
      "Ravi Shankar helped introduce the sitar to global pop culture in the 1960s.",
  },
  {
    name: "Kora",
    category: "String",
    type: "Harp-Lute",
    region: "West Africa",
    description: "A 21-string instrument used by griots to accompany storytelling and songs.",
    history:
      "For centuries, kora music has been part of oral history traditions in Mali, Senegal, and The Gambia.",
    funFact:
      "The body of a traditional kora is made from a large calabash gourd cut in half.",
  },
  {
    name: "Djembe",
    category: "Percussion",
    type: "Hand Drum",
    region: "West Africa",
    description: "A goblet-shaped drum with expressive tones, from deep bass to sharp slaps.",
    history:
      "The djembe traces back to the Mali Empire and was played at ceremonies, dances, and community gatherings.",
    funFact:
      "A skilled djembe player can create three distinct core sounds with only their hands.",
  },
  {
    name: "Taiko",
    category: "Percussion",
    type: "Barrel Drum",
    region: "Japan",
    description: "Large drums played in powerful ensemble performances.",
    history:
      "Taiko drums were used in ancient Japan for rituals, military communication, and theatrical music.",
    funFact:
      "Modern kumi-daiko ensemble taiko became globally popular in the second half of the 20th century.",
  },
  {
    name: "Ney",
    category: "Wind",
    type: "End-blown Flute",
    region: "Middle East",
    description: "A reed flute with a breathy tone found in classical and spiritual music.",
    history:
      "The ney is one of the oldest continuously played instruments, appearing in ancient Persian and Egyptian traditions.",
    funFact:
      "In Sufi ceremonies, the ney is often seen as a symbol of longing and spiritual connection.",
  },
  {
    name: "Didgeridoo",
    category: "Wind",
    type: "Drone Instrument",
    region: "Australia",
    description: "A long wooden tube that produces deep, buzzing drones.",
    history:
      "Used by Aboriginal Australians for at least 1,000 years, the instrument accompanies songs and dances.",
    funFact:
      "Players often use circular breathing to maintain a continuous sound for long periods.",
  },
  {
    name: "Erhu",
    category: "String",
    type: "Bowed",
    region: "China",
    description: "A two-string bowed instrument known for its expressive, voice-like quality.",
    history:
      "The erhu has roots in instruments from Central Asia and became part of Chinese music over many centuries.",
    funFact:
      "Its bow is threaded between the two strings and is not detached during playing.",
  },
  {
    name: "Pan Flute",
    category: "Wind",
    type: "Flute",
    region: "Andes (South America)",
    description: "A set of tubes of different lengths played by blowing across the top edges.",
    history:
      "The pan flute has been used in Andean music traditions since pre-Columbian times.",
    funFact:
      "Different tube lengths let one instrument play a complete melodic scale.",
  },
];

const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const instrumentGrid = document.getElementById("instrumentGrid");
const resultCount = document.getElementById("resultCount");
const template = document.getElementById("instrumentCardTemplate");

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort();
}

function populateFilterOptions(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function renderCards(list) {
  instrumentGrid.innerHTML = "";

  if (list.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty";
    emptyState.textContent = "No instruments match this combination. Try another filter.";
    instrumentGrid.append(emptyState);
    resultCount.textContent = "0 instruments found";
    return;
  }

  list.forEach((instrument) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".card__name").textContent = instrument.name;
    card.querySelector(".card__meta").textContent = `${instrument.category} • ${instrument.type} • ${instrument.region}`;
    card.querySelector(".card__description").textContent = instrument.description;
    card.querySelector(".card__history").textContent = instrument.history;
    card.querySelector(".card__fun-fact").textContent = instrument.funFact;
    instrumentGrid.append(card);
  });

  resultCount.textContent = `${list.length} instrument${list.length > 1 ? "s" : ""} found`;
}

function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const selectedType = typeFilter.value;

  const filtered = instruments.filter((instrument) => {
    const categoryMatch = selectedCategory === "all" || instrument.category === selectedCategory;
    const typeMatch = selectedType === "all" || instrument.type === selectedType;
    return categoryMatch && typeMatch;
  });

  renderCards(filtered);
}

populateFilterOptions(categoryFilter, uniqueValues(instruments, "category"));
populateFilterOptions(typeFilter, uniqueValues(instruments, "type"));

categoryFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

applyFilters();
