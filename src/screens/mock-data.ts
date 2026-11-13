/** Made up songs and tags for the mock screens. */

export type MockTag = { name: string; color: string; value?: string; suggested?: boolean };

export const TAGS = {
  focus: { name: "Focus", color: "#40c8e0" },
  roadTrip: { name: "Road Trip", color: "#f6c177" },
  sunday: { name: "Sunday Morning", color: "#c4a7e7" },
  gym: { name: "Gym", color: "#ff6467" },
  chill: { name: "Chill", color: "#30d158" },
  rainy: { name: "Rainy Day", color: "#0a84ff" },
  energy: { name: "Energy", color: "#ff9f0a", value: "8" },
  mood: { name: "Mood", color: "#bf5af2", value: "Happy" },
  lofi: { name: "Lo-fi", color: "#66d9a8", suggested: true },
  latenight: { name: "Late Night", color: "#6cc4ff", suggested: true },
  indie: { name: "Indie", color: "#ff8fab", suggested: true },
} satisfies Record<string, MockTag>;

export type MockSong = {
  title: string;
  artist: string;
  art: [string, string];
  tags: MockTag[];
};

export const SONGS: MockSong[] = [
  { title: "Paper Satellites", artist: "The Low Tides", art: ["#fa233b", "#6466b8"], tags: [TAGS.roadTrip, TAGS.energy] },
  { title: "Glass Harbor", artist: "Mira Vale", art: ["#40c8e0", "#101a2f"], tags: [TAGS.focus, TAGS.rainy] },
  { title: "Slow Bloom", artist: "Juniper & Co", art: ["#c4a7e7", "#f6c177"], tags: [TAGS.sunday, TAGS.chill] },
  { title: "Static Hearts", artist: "Neon Parade", art: ["#ff6467", "#1d1426"], tags: [TAGS.gym] },
  { title: "Northbound", artist: "Atlas Room", art: ["#30d158", "#222326"], tags: [TAGS.roadTrip] },
  { title: "Velvet Hours", artist: "Lena Park", art: ["#bf5af2", "#0a84ff"], tags: [TAGS.chill, TAGS.mood] },
  { title: "Ember Lane", artist: "Fox & Fable", art: ["#ff9f0a", "#fa233b"], tags: [TAGS.focus] },
];
