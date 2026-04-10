export type TraitVector = {
  chaos: number;
  logic: number;
  emotion: number;
  imagination: number;
  order: number;
};

export type Choice = {
  id: string;
  text: string;
  vector: Partial<TraitVector>;
  icon: string;
};

export type Prompt = {
  id: number;
  question: string;
  choices: [Choice, Choice];
  commentary?: string; // "Akinator" style mid-quiz comments
};

export const prompts: Prompt[] = [
  {
    id: 1,
    question: "Which sensory echo calls to you louder?",
    choices: [
      { id: '1a', text: "The sound of a falling star hitting water", vector: { imagination: 3, emotion: 1 }, icon: "Stars" },
      { id: '1b', text: "The smell of a library built in 3024", vector: { logic: 2, order: 2 }, icon: "BookOpen" }
    ]
  },
  {
    id: 2,
    question: "You find a door that only opens at 4:44 AM. Where does it lead?",
    choices: [
      { id: '2a', text: "A garden where flowers bloom backwards", vector: { imagination: 3, chaos: 1 }, icon: "Sprout" },
      { id: '2b', text: "A city made of frozen music", vector: { order: 2, logic: 2 }, icon: "Building2" }
    ],
    commentary: "Your spatial preferences are revealing..."
  },
  {
    id: 3,
    question: "Your shadow detaches and starts to dance. Do you:",
    choices: [
      { id: '3a', text: "Join it and forget your name", vector: { chaos: 3, emotion: 2 }, icon: "PartyPopper" },
      { id: '3b', text: "Negotiate a schedule for its return", vector: { order: 3, logic: 2 }, icon: "Calendar" }
    ]
  },
  {
    id: 4,
    question: "A merchant offers you a jar. What's inside?",
    choices: [
      { id: '4a', text: "The silence between two lovers' heartbeats", vector: { emotion: 3, imagination: 1 }, icon: "Heart" },
      { id: '4b', text: "The roar of a thousand dead suns", vector: { logic: 2, chaos: 2 }, icon: "Flame" }
    ],
    commentary: "I think I see where this is going."
  },
  {
    id: 5,
    question: "The sky turns the color of a secret. What color is it?",
    choices: [
      { id: '5a', text: "Electric violet that tastes like metal", vector: { chaos: 2, imagination: 2 }, icon: "Zap" },
      { id: '5b', text: "Deep moss green that feels like velvet", vector: { order: 2, emotion: 2 }, icon: "Leaf" }
    ]
  },
  {
    id: 6,
    question: "You can only keep one memory. Which is it?",
    choices: [
      { id: '6a', text: "The first time you felt 'infinite'", vector: { imagination: 3, emotion: 2 }, icon: "Cloud" },
      { id: '6b', text: "The exact logic behind your greatest mistake", vector: { logic: 3, order: 2 }, icon: "Binary" }
    ],
    commentary: "A pivotal choice. Very telling."
  },
  {
    id: 7,
    question: "A clock that ticks in colors or a mirror that reflects your potential?",
    choices: [
      { id: '7a', text: "The Chrono-Chromatic Clock", vector: { chaos: 2, imagination: 2 }, icon: "Palette" },
      { id: '7b', text: "The Speculum of Futures", vector: { logic: 2, order: 2 }, icon: "Compass" }
    ]
  },
  {
    id: 8,
    question: "You are reincarnated as a geometric shape. Are you:",
    choices: [
      { id: '8a', text: "A sphere with no end and no beginning", vector: { emotion: 2, order: 2 }, icon: "Circle" },
      { id: '8b', text: "A fractaling triangle that cuts the air", vector: { logic: 3, chaos: 1 }, icon: "Triangle" }
    ]
  },
  {
    id: 9,
    question: "Which silence is more profound?",
    choices: [
      { id: '9a', text: "The silence of an empty cathedral", vector: { emotion: 2, imagination: 2 }, icon: "Church" },
      { id: '9b', text: "The silence of a powered-down computer", vector: { logic: 3, order: 1 }, icon: "Cpu" }
    ]
  },
  {
    id: 10,
    question: "Finally, what is the weight of your soul?",
    choices: [
      { id: '10a', text: "As light as a forgotten promise", vector: { imagination: 2, chaos: 2 }, icon: "Wind" },
      { id: '10b', text: "As heavy as the history of a mountain", vector: { order: 3, logic: 1 }, icon: "Mountain" }
    ]
  }
];

export type Archetype = {
  name: string;
  title: string;
  weights: Partial<TraitVector>;
  description: string;
};

const archetypes: Archetype[] = [
  {
    name: "The Dreamer",
    title: "The Ethereal Voyager",
    weights: { imagination: 12, emotion: 8 },
    description: "You exist in the spaces between reality and imagination. Your soul resonates with the infinite possibilities of the unseen world."
  },
  {
    name: "The Architect",
    title: "The Logic Sentinel",
    weights: { logic: 12, order: 10 },
    description: "You see the world as a complex system of gears and patterns. You seek clarity, precision, and the underlying structure of all things."
  },
  {
    name: "The Maverick",
    title: "The Entropy Dancer",
    weights: { chaos: 12, imagination: 8 },
    description: "You don't just embrace change; you are the catalyst for it. Your personality is a vibrant collision of ideas and spontaneous energy."
  },
  {
    name: "The Empath",
    title: "The Heart-Link Weaver",
    weights: { emotion: 12, imagination: 6 },
    description: "Your primary lens is the emotional resonance of the world around you. You feel the unsaid and see the colors of the human spirit."
  },
  {
    name: "The Guardian",
    title: "The Steadfast Anchor",
    weights: { order: 12, logic: 6 },
    description: "You provide the stability the universe requires. You value history, consistency, and the weight of enduring truths."
  }
];

export type ProfileResult = {
  title: string;
  description: string;
  archetype: string;
  traits: string[];
  vector: TraitVector;
  confidence: number;
  isContradictory: boolean;
};

function scoreArchetype(profile: TraitVector, archetype: Archetype): number {
  let score = 0;
  for (const key in archetype.weights) {
    const k = key as keyof TraitVector;
    score += Math.min(profile[k] || 0, archetype.weights[k] || 0);
  }
  return score;
}

export const getProfile = (finalVector: TraitVector): ProfileResult => {
  let bestMatch = archetypes[0];
  let maxScore = -1;

  for (const arc of archetypes) {
    const score = scoreArchetype(finalVector, arc);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = arc;
    }
  }

  // Detect contradictions (high chaos AND high order)
  const isContradictory = finalVector.chaos > 8 && finalVector.order > 8;
  
  // Calculate confidence based on how much higher the top score is than the average
  const scores = archetypes.map(a => scoreArchetype(finalVector, a));
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const confidence = Math.min(0.99, (maxScore - avgScore) / 10 + 0.5);

  const traits = Object.entries(finalVector)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([trait]) => trait.charAt(0).toUpperCase() + trait.slice(1));

  return {
    title: bestMatch.title,
    archetype: bestMatch.name,
    description: isContradictory 
      ? `You are a study in paradox. ${bestMatch.description} Yet, you possess an equal and opposite drive that makes you difficult to pin down.`
      : bestMatch.description,
    traits,
    vector: finalVector,
    confidence,
    isContradictory
  };
};
