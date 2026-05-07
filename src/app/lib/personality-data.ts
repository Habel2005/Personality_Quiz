
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

export const prompts: Prompt[] = [
  {
    id: 1,
    question: "Glance at your phone's email app right now. What does the notification badge say?",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '1a', text: "4,392 unread. I will get to them never.", vector: { chaos: 4, order: -3, logic: -1 }, icon: "Mail" },
      { id: '1b', text: "Zero. Inbox zero is a lifestyle.", vector: { order: 4, logic: 2, chaos: -3 }, icon: "CheckCircle" }
    ]
  },
  {
    id: 2,
    question: "You are packing for a 3-day weekend trip.",
    targetTraits: ['chaos', 'order', 'logic'],
    choices: [
      { id: '2a', text: "Spreadsheet, packing cubes, weather checked.", vector: { order: 4, logic: 2, chaos: -2 }, icon: "Briefcase" },
      { id: '2b', text: "Throwing 8 shirts into a bag 1 hour before leaving.", vector: { chaos: 4, imagination: 1, order: -3 }, icon: "Backpack" }
    ]
  },
  {
    id: 3,
    question: "You just bought an IKEA bookshelf. What happens next?",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '3a', text: "Organize all the screws into little cups first.", vector: { order: 4, logic: 2, chaos: -2 }, icon: "Wrench" },
      { id: '3b', text: "Glance at step 1, wing the rest, have 3 screws left over.", vector: { chaos: 3, imagination: 2, logic: -2 }, icon: "Hammer" }
    ]
  },
  {
    id: 4,
    question: "You are unpacking from a vacation. When does the suitcase get emptied?",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '4a', text: "Immediately. Laundry goes straight in the wash.", vector: { order: 4, logic: 1, chaos: -3 }, icon: "Shirt" },
      { id: '4b', text: "I will live out of that suitcase on the floor for 2 weeks.", vector: { chaos: 4, logic: -2, order: -2 }, icon: "Luggage" }
    ]
  },
  {
    id: 5,
    question: "A friend texts: 'We need to talk.'",
    targetTraits: ['logic', 'emotion', 'imagination'],
    choices: [
      { id: '5a', text: "Assume the absolute worst and mentally prepare for ruin.", vector: { emotion: 3, imagination: 3, logic: -3 }, icon: "MessageCircleWarning" },
      { id: '5b', text: "Reply 'About?' and go about my day.", vector: { logic: 4, order: 1, emotion: -2 }, icon: "MessageSquare" }
    ]
  },
  {
    id: 6,
    question: "The waiter gets your order slightly wrong.",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '6a', text: "Eat it anyway, do not cause a fuss.", vector: { emotion: 4, order: 1, logic: -2 }, icon: "Utensils" },
      { id: '6b', text: "Politely but firmly send it back. I pay for what I ordered.", vector: { logic: 4, order: 2, emotion: -2 }, icon: "ChefHat" }
    ]
  },
  {
    id: 7,
    question: "Holding onto an old, worn-out t-shirt.",
    targetTraits: ['emotion', 'logic'],
    choices: [
      { id: '7a', text: "It has memories! I wore it at a concert in 2018.", vector: { emotion: 4, imagination: 1, logic: -2 }, icon: "Heart" },
      { id: '7b', text: "It has holes. It goes in the trash.", vector: { logic: 4, order: 2, emotion: -3 }, icon: "Trash2" }
    ]
  },
  {
    id: 8,
    question: "Taking a shower.",
    targetTraits: ['imagination', 'logic'],
    choices: [
      { id: '8a', text: "Winning imaginary arguments that happened 4 years ago.", vector: { imagination: 4, emotion: 2, logic: -2 }, icon: "CloudRain" },
      { id: '8b', text: "Washing efficiently. In and out in 5 minutes.", vector: { logic: 3, order: 3, imagination: -3 }, icon: "Timer" }
    ]
  },
  {
    id: 9,
    question: "Listening to music.",
    targetTraits: ['imagination', 'order', 'chaos'],
    choices: [
      { id: '9a', text: "The same album on loop for 3 weeks.", vector: { order: 3, emotion: 3, chaos: -2 }, icon: "Headphones" },
      { id: '9b', text: "Aggressive shuffling across entirely unrelated genres.", vector: { chaos: 3, imagination: 2, order: -3 }, icon: "Shuffle" }
    ]
  },
  {
    id: 10,
    question: "Cooking dinner.",
    targetTraits: ['imagination', 'order'],
    choices: [
      { id: '10a', text: "Measure every ingredient to the exact gram.", vector: { order: 4, logic: 2, imagination: -2 }, icon: "Scale" },
      { id: '10b', text: "A handful of this, vibes for that. We'll see what happens.", vector: { imagination: 3, chaos: 2, order: -3 }, icon: "Flame" }
    ]
  },
  {
    id: 11,
    question: "Browser tabs.",
    targetTraits: ['chaos', 'imagination', 'order'],
    choices: [
      { id: '11a', text: "87 tabs open across 4 windows. 'I might need that.'", vector: { chaos: 3, imagination: 3, order: -3 }, icon: "Monitor" },
      { id: '11b', text: "Max 3 tabs. Everything else is bookmarked and closed.", vector: { order: 4, logic: 2, chaos: -3 }, icon: "Laptop" }
    ]
  },
  {
    id: 12,
    question: "You see someone you vaguely know at the grocery store.",
    targetTraits: ['order', 'chaos', 'emotion'],
    choices: [
      { id: '12a', text: "Look at my phone, drift to another aisle, avoid at all costs.", vector: { order: 2, logic: 1, chaos: -2 }, icon: "Smartphone" },
      { id: '12b', text: "Yell their name across the produce section.", vector: { chaos: 4, emotion: 2, order: -3 }, icon: "Megaphone" }
    ]
  },
  {
    id: 13,
    question: "Plans get cancelled at the last minute.",
    targetTraits: ['emotion', 'chaos', 'order'],
    choices: [
      { id: '13a', text: "Secretly thrilled. Time to put on sweatpants.", vector: { imagination: 2, order: 2, chaos: -2 }, icon: "Sofa" },
      { id: '13b', text: "Annoyed. Immediately text other people to find something to do.", vector: { chaos: 3, emotion: 2, order: -2 }, icon: "Users" }
    ]
  },
  {
    id: 14,
    question: "Leaving a party.",
    targetTraits: ['emotion', 'chaos'],
    choices: [
      { id: '14a', text: "The 'Irish Goodbye' – slip out silently without telling anyone.", vector: { chaos: 3, logic: 2, emotion: -2 }, icon: "DoorOpen" },
      { id: '14b', text: "The 45-minute doorway conversation saying bye to everyone.", vector: { emotion: 4, order: 2, chaos: -2 }, icon: "Clock" }
    ]
  },
  {
    id: 15,
    question: "Arriving at a house party.",
    targetTraits: ['emotion', 'logic'],
    choices: [
      { id: '15a', text: "Immediately find and greet the host's pet.", vector: { emotion: 4, imagination: 1, logic: -2 }, icon: "Cat" },
      { id: '15b', text: "Stand near the kitchen island and analyze the room.", vector: { logic: 3, order: 2, emotion: -2 }, icon: "Eye" }
    ]
  },
  {
    id: 16,
    question: "Your phone battery is at 2%.",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '16a', text: "Pure panic. Begging strangers for a charger.", vector: { order: 3, emotion: 2, chaos: -2 }, icon: "BatteryWarning" },
      { id: '16b', text: "A weird sense of freedom. Let it die.", vector: { chaos: 4, logic: 1, order: -3 }, icon: "Battery" }
    ]
  },
  {
    id: 17,
    question: "The microwave has 1 second left.",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '17a', text: "Stop it at 0:01 like a bomb defuser. No beeping allowed.", vector: { chaos: 3, imagination: 2, logic: -1 }, icon: "Zap" },
      { id: '17b', text: "Let it beep its full, loud sequence.", vector: { order: 3, logic: 2, chaos: -2 }, icon: "Bell" }
    ]
  },
  {
    id: 18,
    question: "Buying a $15 item online.",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '18a', text: "Read 50 reviews, sort by lowest, watch a YouTube review.", vector: { logic: 4, order: 3, emotion: -2 }, icon: "Search" },
      { id: '18b', text: "Add to cart because the vibes were right.", vector: { emotion: 3, chaos: 2, logic: -3 }, icon: "ShoppingCart" }
    ]
  },
  {
    id: 19,
    question: "Typing a message and you see the typing bubble appear from them.",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '19a', text: "Stop typing immediately and wait for them.", vector: { order: 3, emotion: 2, chaos: -2 }, icon: "PauseCircle" },
      { id: '19b', text: "Type faster to assert dominance.", vector: { chaos: 4, imagination: 1, order: -3 }, icon: "FastForward" }
    ]
  },
  {
    id: 20,
    question: "Eating a multi-component meal (like a burger and fries).",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '20a', text: "Save the best bite for absolutely last.", vector: { logic: 3, order: 3, chaos: -2 }, icon: "Target" },
      { id: '20b', text: "Eat the best thing first in case I get full.", vector: { emotion: 3, chaos: 2, order: -2 }, icon: "Pizza" }
    ]
  },
  {
    id: 21,
    question: "You are on an elevator and someone is running towards it.",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '21a', text: "Furiously hit the 'close door' button and look away.", vector: { logic: 3, order: 1, emotion: -3 }, icon: "MinusCircle" },
      { id: '21b', text: "Hold the door, sigh internally.", vector: { emotion: 4, order: 1, logic: -2 }, icon: "PlusCircle" }
    ]
  },
  {
    id: 22,
    question: "Setting an alarm.",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '22a', text: "7:00, 7:05, 7:12, 7:15, 7:30.", vector: { chaos: 4, emotion: 1, logic: -3 }, icon: "AlarmClock" },
      { id: '22b', text: "Exactly one alarm at 7:00 AM.", vector: { order: 4, logic: 3, chaos: -4 }, icon: "Clock10" }
    ]
  },
  {
    id: 23,
    question: "Pacing while on a phone call.",
    targetTraits: ['chaos', 'order'],
    choices: [
      { id: '23a', text: "I walk 10,000 steps around my kitchen island.", vector: { chaos: 3, imagination: 3, order: -2 }, icon: "Footprints" },
      { id: '23b', text: "I sit completely still at my desk.", vector: { order: 3, logic: 2, chaos: -3 }, icon: "Armchair" }
    ]
  },
  {
    id: 24,
    question: "Someone tells you a juicy secret.",
    targetTraits: ['order', 'chaos', 'emotion'],
    choices: [
      { id: '24a', text: "Lock it in the vault. I take secrets to the grave.", vector: { order: 4, logic: 2, chaos: -3 }, icon: "Lock" },
      { id: '24b', text: "Tell exactly one trusted person immediately.", vector: { chaos: 2, emotion: 3, order: -2 }, icon: "Unlock" }
    ]
  },
  {
    id: 25,
    question: "Creating a password.",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '25a', text: "16 characters, randomized symbols, saved in a manager.", vector: { logic: 4, order: 4, emotion: -2 }, icon: "Key" },
      { id: '25b', text: "My childhood pet's name and the year 2012.", vector: { emotion: 3, imagination: 1, logic: -3 }, icon: "Dog" }
    ]
  },
  {
    id: 26,
    question: "Watching a new TV show.",
    targetTraits: ['logic', 'emotion'],
    choices: [
      { id: '26a', text: "Look up the ending online because the suspense is killing me.", vector: { logic: 3, order: 3, emotion: -2 }, icon: "SearchX" },
      { id: '26b', text: "Ride it out, no matter how stressful.", vector: { emotion: 3, imagination: 2, logic: -2 }, icon: "Tv" }
    ]
  },
  {
    id: 27,
    question: "At the grocery store.",
    targetTraits: ['emotion', 'logic'],
    choices: [
      { id: '27a', text: "Self-checkout so I don't have to talk to anyone.", vector: { logic: 2, order: 2, emotion: -1 }, icon: "ScanLine" },
      { id: '27b', text: "Cashier, because I'm too lazy to scan my own items.", vector: { chaos: 3, emotion: 2, logic: -2 }, icon: "User" }
    ]
  },
  {
    id: 28,
    question: "Group chat decisions for dinner.",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '28a', text: "Lurk quietly until they decide, then say 'sure'.", vector: { order: 2, logic: 2, chaos: -2 }, icon: "Ghost" },
      { id: '28b', text: "Throw out a wild idea and see if it sticks.", vector: { chaos: 3, imagination: 3, order: -2 }, icon: "Sparkles" }
    ]
  },
  {
    id: 29,
    question: "Video game strategy.",
    targetTraits: ['order', 'chaos'],
    choices: [
      { id: '29a', text: "Do every single side quest before the main story.", vector: { order: 4, logic: 2, chaos: -3 }, icon: "Map" },
      { id: '29b', text: "Rush the main boss severely under-leveled.", vector: { chaos: 4, imagination: 2, logic: -2 }, icon: "Swords" }
    ]
  },
  {
    id: 30,
    question: "Movie night.",
    targetTraits: ['imagination', 'emotion'],
    choices: [
      { id: '30a', text: "Spend 45 minutes picking a new indie film, fall asleep 10 mins in.", vector: { imagination: 4, chaos: 2, logic: -2 }, icon: "Film" },
      { id: '30b', text: "Watch the exact same comfort movie for the 15th time.", vector: { emotion: 4, order: 3, imagination: -2 }, icon: "Popcorn" }
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
    name: "The Daydreamer",
    title: "Head in the Clouds",
    weights: { imagination: 12, emotion: 8 },
    description: "You live entirely in your own head. You probably have 80 browser tabs open, a graveyard of unfinished hobbies, and you romanticize the rain."
  },
  {
    name: "The Optimizer",
    title: "The Spreadsheet Tactician",
    weights: { logic: 12, order: 10 },
    description: "You don't understand why everyone else is so inefficient. You research every purchase thoroughly and inbox zero isn't a goal—it's a baseline."
  },
  {
    name: "The Agent of Chaos",
    title: "The Impulse Buyer",
    weights: { chaos: 12, imagination: 8 },
    description: "You live entirely in the moment, which means your phone is constantly at 3% battery and your life is a series of side quests you didn't plan for."
  },
  {
    name: "The Nostalgic",
    title: "The Sentimental Collector",
    weights: { emotion: 12, imagination: 6 },
    description: "You attach emotions to inanimate objects, hold onto old concert tickets, and prioritize the 'vibes' of a situation above all logic and reason."
  },
  {
    name: "The Anchor",
    title: "The Group Chat Parent",
    weights: { order: 12, logic: 6 },
    description: "You are the responsible one. You show up to the airport 3 hours early, you always have a plan, and you secretly judge people who wing it."
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

export const getNextQuestion = (
  currentVector: TraitVector,
  askedQuestionIds: number[],
  allPrompts: Prompt[]
): Prompt => {
  const availablePrompts = allPrompts.filter(p => !askedQuestionIds.includes(p.id));
  if (availablePrompts.length === 0) return allPrompts[0];

  const sortedTraits = Object.entries(currentVector).sort(([, a], [, b]) => b - a);
  const dominantTrait = sortedTraits[0][0] as keyof TraitVector;
  const secondaryTrait = sortedTraits[1][0] as keyof TraitVector;

  const targetedPrompt = availablePrompts.find(p => 
    p.targetTraits.includes(dominantTrait) || p.targetTraits.includes(secondaryTrait)
  );

  return targetedPrompt || availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
};

export const generateCommentary = (vector: TraitVector, step: number): string | null => {
  if (step === 3) {
    if (vector.chaos > vector.order) return "Lowkey unhinged behavior detected...";
    if (vector.logic > vector.emotion) return "Calculating... you're a spreadsheet in a human suit.";
    if (vector.emotion > 4) return "Oop, the feels are leaking out.";
  }
  if (step === 6) {
    if (vector.imagination > 8) return "Wait, is your brain just 40 tabs of Wikipedia?";
    if (vector.order > 6 && vector.chaos > 6) return "You are a walking contradiction.";
    if (vector.order > 8) return "Your search history must be terrifyingly organized.";
  }
  if (step === 8) {
    return "Analyzing the frequency... it's getting specific.";
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
      ? `You are a study in paradox. ${bestMatch.description} Yet, you possess an equal and opposite drive that makes you incredibly unpredictable.`
      : bestMatch.description,
    traits,
    vector: finalVector,
    confidence,
    isContradictory
  };
};
