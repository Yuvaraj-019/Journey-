export const site = {
  name: "NORTHLINE",
  tagline: "the field journal. evolved.",
  description:
    "A personal expedition log — journeys walked, places pinned, and the method of going far without getting loud about it.",
  stats: [
    { value: "14", suffix: "+", label: "Years in the field" },
    { value: "31", suffix: "", label: "Countries walked" },
    { value: "47", suffix: "k", label: "Kilometres logged" },
    { value: "11", suffix: "", label: "Ranges returned to" },
  ],
  promise: [
    { value: "100%", label: "Walked, not compiled" },
    { value: "0", label: "Drones over dens" },
    { value: "5/5", label: "Companions who still go" },
  ],
  bases: [
    { city: "Leadville", place: "Field desk · Colorado" },
    { city: "Chamonix", place: "Seasonal · Alps" },
    { city: "Leh", place: "Seasonal · Himalaya" },
  ],
};

export const packingKits: Record<string, { item: string; note: string }[]> = {
  mountain: [
    { item: "Shell that still sheds", note: "Not the one you mean to reproof." },
    { item: "Paper map + GPS", note: "Batteries are a rumour in cold." },
    { item: "Repair kit", note: "Needle, cord, a patch, honesty." },
    { item: "Headlamp with spare", note: "Alpine starts are not optional." },
    { item: "Extra food for a wait", note: "Weather is a partner." },
    { item: "Blister kit", note: "Used the first hour, not the fifth." },
  ],
  water: [
    { item: "Tide table, printed", note: "Phones go swimming." },
    { item: "Dry bags you test", note: "Close them at home once." },
    { item: "VHF or PLB", note: "Coast is not a pool." },
    { item: "Spare paddle / leash", note: "One is a hope." },
    { item: "Warm layer in a dry bag", note: "Hypothermia is a logistics fail." },
    { item: "Shore option marked", note: "Every crossing has a sit-out." },
  ],
  desert: [
    { item: "Water with margin", note: "The itinerary is liquid." },
    { item: "Sun architecture", note: "Hat, sleeves, a way to make shade." },
    { item: "Paper navigation", note: "Dunes eat satellites for lunch." },
    { item: "Filter + backup", note: "Wells change their minds." },
    { item: "Night layer", note: "Deserts remember they are cold." },
    { item: "Local contact", note: "Someone who knows the last well." },
  ],
  wild: [
    { item: "Local crew arranged", note: "Not a surprise at the trailhead." },
    { item: "Foot care for wet", note: "Jungle days start as blisters." },
    { item: "Redundant nav", note: "Canopy and whiteout both hide the sky." },
    { item: "Med kit for remote", note: "Evac is a story. Avoid starring." },
    { item: "Quiet camp plan", note: "No music, no drones, small fire." },
    { item: "Permit copies", note: "Paper still wins arguments." },
  ],
};
