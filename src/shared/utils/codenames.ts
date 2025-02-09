
const adjectives = [
    "Shadow", "Fierce", "Mighty", "Stealthy", "Cunning", "Silent", "Iron", "Blazing", "Thunder", "Phantom"
  ];
  
  const names = [
    "Kraken", "Nightingale", "Phantom", "Tiger", "Viper", "Falcon", "Wraith", "Cyclone", "Raven", "Wolf"
  ];
  
  
  export function generateUniqueCodename(): string {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    return `${adj} ${name}`;
  }
  