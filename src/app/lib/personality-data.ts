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
  targetTraits: (keyof TraitVector)[];
  choices: [Choice, Choice];
};

// Expanded Pool of 30+ Questions
export const prompts: Prompt[] = [
  {
    id: 1,
    question: "Which sensory echo calls to you louder?",
    targetTraits: ['imagination', 'logic'],
    choices: [
      { id: '1a', text: "The sound of a falling star hitting water", vector: { imagination: 3, emotion: 1, logic: -1 }, icon: "Stars" },
      { id: '1b', text: "The smell of a library built in 3024", vector: { logic: 3, order: 2, imagination: -1 }, icon: "BookOpen" }
    ]
  },
  {
    id: 2,
    question: "You find a door that only opens at 4:44 AM. Where does it lead?",
    targetTraits: ['imagination', 'order'],
    choices: [
      { id: '2a', text: "A garden where flowers bloom backwards", vector: { imagination: 3, chaos: 2, order: -1 }, icon: "Sprout" },
      { id: '2b', text: "A city made of frozen music", vector: { order: 3, logic: 2, chaos: -2 }, icon: "Building2" }
    ]
  },
  {
    id: 3,
    question: "Your shadow detaches and starts to dance. Do you:",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '3a', text: "Join it and forget your name", vector: { chaos: 4, emotion: 2, order: -2 }, icon: "PartyPopper" },
      { id: '3b', text: "Negotiate a schedule for its return", vector: { order: 4, logic: 2, chaos: -2 }, icon: "Calendar" }
    ]
  },
  {
    id: 4,
    question: "A merchant offers you a jar. What's inside?",
    targetTraits: ['emotion', 'logic'],
    choices: [
      { id: '4a', text: "The silence between two lovers' heartbeats", vector: { emotion: 4, imagination: 1, logic: -2 }, icon: "Heart" },
      { id: '4b', text: "The roar of a thousand dead suns", vector: { logic: 2, chaos: 3, emotion: -1 }, icon: "Flame" }
    ]
  },
  {
    id: 5,
    question: "The sky turns the color of a secret. What color is it?",
    targetTraits: ['chaos', 'imagination'],
    choices: [
      { id: '5a', text: "Electric violet that tastes like metal", vector: { chaos: 3, imagination: 2, order: -1 }, icon: "Zap" },
      { id: '5b', text: "Deep moss green that feels like velvet", vector: { order: 2, emotion: 2, chaos: -1 }, icon: "Leaf" }
    ]
  },
  {
    id: 6,
    question: "You can only keep one memory. Which is it?",
    targetTraits: ['imagination', 'logic'],
    choices: [
      { id: '6a', text: "The first time you felt 'infinite'", vector: { imagination: 4, emotion: 2, logic: -2 }, icon: "Cloud" },
      { id: '6b', text: "The exact logic behind your greatest mistake", vector: { logic: 4, order: 2, imagination: -2 }, icon: "Binary" }
    ]
  },
  {
    id: 7,
    question: "A clock that ticks in colors or a mirror that reflects your potential?",
    targetTraits: ['imagination', 'logic'],
    choices: [
      { id: '7a', text: "The Chrono-Chromatic Clock", vector: { chaos: 2, imagination: 3, order: -1 }, icon: "Palette" },
      { id: '7b', text: "The Speculum of Futures", vector: { logic: 3, order: 2, imagination: -1 }, icon: "Compass" }
    ]
  },
  {
    id: 8,
    question: "You are reincarnated as a geometric shape. Are you:",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '8a', text: "A sphere with no end and no beginning", vector: { emotion: 2, order: 3, chaos: -1 }, icon: "Circle" },
      { id: '8b', text: "A fractaling triangle that cuts the air", vector: { logic: 3, chaos: 3, order: -2 }, icon: "Triangle" }
    ]
  },
  {
    id: 9,
    question: "Which silence is more profound?",
    targetTraits: ['emotion', 'logic'],
    choices: [
      { id: '9a', text: "The silence of an empty cathedral", vector: { emotion: 3, imagination: 2, logic: -1 }, icon: "Church" },
      { id: '9b', text: "The silence of a powered-down computer", vector: { logic: 4, order: 1, emotion: -2 }, icon: "Cpu" }
    ]
  },
  {
    id: 10,
    question: "What is the weight of your soul?",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '10a', text: "As light as a forgotten promise", vector: { imagination: 3, chaos: 2, order: -2 }, icon: "Wind" },
      { id: '10b', text: "As heavy as the history of a mountain", vector: { order: 4, logic: 1, chaos: -2 }, icon: "Mountain" }
    ]
  },
  {
    id: 11,
    question: "A machine offers to solve all your problems, but removes your ability to surprise yourself.",
    targetTraits: ['logic', 'chaos'],
    choices: [
      { id: '11a', text: "Accept the efficiency", vector: { logic: 4, order: 3, chaos: -3 }, icon: "Settings" },
      { id: '11b', text: "Keep the chaos of failure", vector: { chaos: 4, imagination: 2, logic: -2 }, icon: "Dices" }
    ]
  },
  {
    id: 12,
    question: "If you could rename the concept of 'Time', what would it be?",
    targetTraits: ['imagination', 'order'],
    choices: [
      { id: '12a', text: "A hungry ghost", vector: { imagination: 3, chaos: 2, order: -1 }, icon: "Ghost" },
      { id: '12b', text: "The master grid", vector: { order: 4, logic: 2, imagination: -2 }, icon: "Grid" }
    ]
  },
  {
    id: 13,
    question: "You are given a map of a city that doesn't exist yet.",
    targetTraits: ['imagination', 'order'],
    choices: [
      { id: '13a', text: "Start building it immediately", vector: { order: 3, logic: 2, imagination: 1 }, icon: "Hammer" },
      { id: '13b', text: "Stare at it until you see the people", vector: { imagination: 4, emotion: 2, order: -1 }, icon: "Eye" }
    ]
  },
  {
    id: 14,
    question: "A storm approaches. The wind sounds like words you almost recognize.",
    targetTraits: ['chaos', 'logic'],
    choices: [
      { id: '14a', text: "Listen for the hidden message", vector: { imagination: 3, emotion: 2, logic: -1 }, icon: "Wind" },
      { id: '14b', text: "Check the barometer readings", vector: { logic: 4, order: 2, imagination: -2 }, icon: "Thermometer" }
    ]
  },
  {
    id: 15,
    question: "A path of light across a dark lake. Do you walk it?",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '15a', text: "Yes, without looking back", vector: { chaos: 3, imagination: 2, logic: -2 }, icon: "Footprints" },
      { id: '15b', text: "Only if I can measure the depth first", vector: { logic: 3, order: 3, chaos: -2 }, icon: "Ruler" }
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

// Logic for dynamic selection
export const getNextQuestion = (
  currentVector: TraitVector,
  askedQuestionIds: number[],
  allPrompts: Prompt[]
): Prompt => {
  const availablePrompts = allPrompts.filter(p => !askedQuestionIds.includes(p.id));
  
  if (availablePrompts.length === 0) return allPrompts[0];

  // Strategy: Find the traits that are currently closest or most contested
  const sortedTraits = Object.entries(currentVector)
    .sort(([, a], [, b]) => b - a);
  
  const dominantTrait = sortedTraits[0][0] as keyof TraitVector;
  const secondaryTrait = sortedTraits[1][0] as keyof TraitVector;

  // Find a prompt that mentions at least one of these to refine the result
  const targetedPrompt = availablePrompts.find(p => 
    p.targetTraits.includes(dominantTrait) || p.targetTraits.includes(secondaryTrait)
  );

  return targetedPrompt || availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
};

// Dynamic Mind-Reading Commentary
export const generateCommentary = (vector: TraitVector, step: number): string | null => {
  if (step === 3) {
    if (vector.chaos > vector.order) return "I'm sensing a strong aversion to structure...";
    if (vector.logic > vector.emotion) return "Very calculated. Let's dig deeper.";
    if (vector.imagination > 4) return "Your thoughts are wandering far from shore.";
  }
  if (step === 6) {
    if (vector.imagination > 8) return "Your mind wanders beautifully.";
    if (vector.order > 6 && vector.chaos > 6) return "You are surprisingly contradictory.";
    if (vector.logic > 8) return "The precision of your choices is... unsettling.";
  }
  if (step === 8) {
    return "I think I know what you are...";
  }
  return null;
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

  const isContradictory = finalVector.chaos > 8 && finalVector.order > 8;
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
