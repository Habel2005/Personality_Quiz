
export type Choice = {
  id: string;
  text: string;
  trait: string;
  icon: string;
};

export type Prompt = {
  id: number;
  question: string;
  choices: [Choice, Choice];
};

export const prompts: Prompt[] = [
  {
    id: 1,
    question: "Which sensory echo calls to you louder?",
    choices: [
      { id: '1a', text: "The sound of a falling star hitting water", trait: "celestial", icon: "Stars" },
      { id: '1b', text: "The smell of a library built in 3024", trait: "temporal", icon: "BookOpen" }
    ]
  },
  {
    id: 2,
    question: "You find a door that only opens at 4:44 AM. Where does it lead?",
    choices: [
      { id: '2a', text: "A garden where flowers bloom backwards", trait: "organic", icon: "Sprout" },
      { id: '2b', text: "A city made of frozen music", trait: "architectural", icon: "Building2" }
    ]
  },
  {
    id: 3,
    question: "Your shadow detaches and starts to dance. Do you:",
    choices: [
      { id: '3a', text: "Join it and forget your name", trait: "chaotic", icon: "PartyPopper" },
      { id: '3b', text: "Negotiate a schedule for its return", trait: "structured", icon: "Calendar" }
    ]
  },
  {
    id: 4,
    question: "A merchant offers you a jar. What's inside?",
    choices: [
      { id: '4a', text: "The silence between two lovers' heartbeats", trait: "empathetic", icon: "Heart" },
      { id: '4b', text: "The roar of a thousand dead suns", trait: "ambitious", icon: "Flame" }
    ]
  },
  {
    id: 5,
    question: "The sky turns the color of a secret. What color is it?",
    choices: [
      { id: '5a', text: "Electric violet that tastes like metal", trait: "sensory", icon: "Zap" },
      { id: '5b', text: "Deep moss green that feels like velvet", trait: "grounded", icon: "Leaf" }
    ]
  },
  {
    id: 6,
    question: "You can only keep one memory. Which is it?",
    choices: [
      { id: '6a', text: "The first time you felt 'infinite'", trait: "spiritual", icon: "Cloud" },
      { id: '6b', text: "The exact logic behind your greatest mistake", trait: "analytical", icon: "Binary" }
    ]
  },
  {
    id: 7,
    question: "A clock that ticks in colors or a mirror that reflects your potential?",
    choices: [
      { id: '7a', text: "The Chrono-Chromatic Clock", trait: "playful", icon: "Palette" },
      { id: '7b', text: "The Speculum of Futures", trait: "visionary", icon: "Compass" }
    ]
  },
  {
    id: 8,
    question: "You are reincarnated as a geometric shape. Are you:",
    choices: [
      { id: '8a', text: "A sphere with no end and no beginning", trait: "harmonious", icon: "Circle" },
      { id: '8b', text: "A fractaling triangle that cuts the air", trait: "sharp", icon: "Triangle" }
    ]
  },
  {
    id: 9,
    question: "Which silence is more profound?",
    choices: [
      { id: '9a', text: "The silence of an empty cathedral", trait: "reverent", icon: "Church" },
      { id: '9b', text: "The silence of a powered-down computer", trait: "modern", icon: "Cpu" }
    ]
  },
  {
    id: 10,
    question: "Finally, what is the weight of your soul?",
    choices: [
      { id: '10a', text: "As light as a forgotten promise", trait: "ethereal", icon: "Wind" },
      { id: '10b', text: "As heavy as the history of a mountain", trait: "enduring", icon: "Mountain" }
    ]
  }
];

export type ProfileResult = {
  title: string;
  description: string;
  archetype: string;
  traits: string[];
};

export const getProfile = (traits: string[]): ProfileResult => {
  const counts = traits.reduce((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Simple logic to determine profile based on majority or patterns
  if (counts['ethereal'] || counts['celestial'] > 1) {
    return {
      title: "The Ethereal Voyager",
      archetype: "The Dreamer",
      description: "You exist in the spaces between reality and imagination. Your choices suggest a personality that values mystery and cosmic connection over mundane stability.",
      traits: ["Intuitive", "Unbound", "Mysterious"]
    };
  }
  
  if (counts['analytical'] || counts['structured'] || counts['binary'] > 1) {
    return {
      title: "The Logic Architect",
      archetype: "The Planner",
      description: "You see the world as a complex system of gears and patterns. Even in the face of the absurd, you seek order and understanding.",
      traits: ["Calculated", "Precise", "Resilient"]
    };
  }

  if (counts['chaotic'] || counts['playful'] > 1) {
    return {
      title: "The Entropy Dancer",
      archetype: "The Maverick",
      description: "You don't just embrace change; you are the catalyst for it. Your personality is a vibrant collision of ideas and spontaneous energy.",
      traits: ["Dynamic", "Irreverent", "Free-spirited"]
    };
  }

  return {
    title: "The Cosmic Synthesist",
    archetype: "The Balanced",
    description: "You hold a rare equilibrium between the abstract and the concrete. You can walk through a dream without losing your footing in reality.",
    traits: ["Versatile", "Profound", "Steady"]
  };
};
