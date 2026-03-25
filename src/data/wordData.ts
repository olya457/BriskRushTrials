export type WordQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type WordLevel = {
  level: number;
  title: string;
  intro?: string;
  questions: WordQuestion[];
};

export const wordData: WordLevel[] = [
  {
    level: 6,
    title: 'Level 6',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-6-1',
        question: 'Knife : Cut = Pen : ?',
        options: ['A. Write', 'B. Draw', 'C. Ink', 'D. Paper'],
        correctIndex: 0,
      },
      {
        id: 'word-6-2',
        question: 'Find the antonym of “Transparent”',
        options: ['A. Clear', 'B. Visible', 'C. Opaque', 'D. Bright'],
        correctIndex: 2,
      },
      {
        id: 'word-6-3',
        question: 'Which word is different?',
        options: ['A. Piano', 'B. Guitar', 'C. Violin', 'D. Canvas'],
        correctIndex: 3,
      },
      {
        id: 'word-6-4',
        question: 'Eye : See = Ear : ?',
        options: ['A. Hear', 'B. Listen', 'C. Sound', 'D. Voice'],
        correctIndex: 0,
      },
      {
        id: 'word-6-5',
        question: 'Find synonym of “Rapid”',
        options: ['A. Slow', 'B. Fast', 'C. Weak', 'D. Short'],
        correctIndex: 1,
      },
      {
        id: 'word-6-6',
        question: 'Which word is different?',
        options: ['A. Oxygen', 'B. Hydrogen', 'C. Nitrogen', 'D. Water'],
        correctIndex: 3,
      },
      {
        id: 'word-6-7',
        question: 'Author : Book = Director : ?',
        options: ['A. Film', 'B. Actor', 'C. Script', 'D. Scene'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 7,
    title: 'Level 7',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-7-1',
        question: 'Find synonym of “Fragile”',
        options: ['A. Strong', 'B. Weak', 'C. Delicate', 'D. Heavy'],
        correctIndex: 2,
      },
      {
        id: 'word-7-2',
        question: 'Which word is different?',
        options: ['A. Rectangle', 'B. Triangle', 'C. Circle', 'D. Distance'],
        correctIndex: 3,
      },
      {
        id: 'word-7-3',
        question: 'Cold : Freeze = Heat : ?',
        options: ['A. Burn', 'B. Melt', 'C. Fire', 'D. Warm'],
        correctIndex: 0,
      },
      {
        id: 'word-7-4',
        question: 'Find antonym of “Expand”',
        options: ['A. Increase', 'B. Grow', 'C. Shrink', 'D. Extend'],
        correctIndex: 2,
      },
      {
        id: 'word-7-5',
        question: 'Page : Book = Pixel : ?',
        options: ['A. Screen', 'B. Image', 'C. Color', 'D. Code'],
        correctIndex: 0,
      },
      {
        id: 'word-7-6',
        question: 'Which word is different?',
        options: ['A. Eagle', 'B. Sparrow', 'C. Shark', 'D. Falcon'],
        correctIndex: 2,
      },
      {
        id: 'word-7-7',
        question: 'Logic : Think = Heart : ?',
        options: ['A. Feel', 'B. Pump', 'C. Blood', 'D. Beat'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 8,
    title: 'Level 8',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-8-1',
        question: 'Find synonym of “Accurate”',
        options: ['A. Exact', 'B. Fast', 'C. Weak', 'D. Big'],
        correctIndex: 0,
      },
      {
        id: 'word-8-2',
        question: 'Which word is different?',
        options: ['A. Java', 'B. Python', 'C. HTML', 'D. Carrot'],
        correctIndex: 3,
      },
      {
        id: 'word-8-3',
        question: 'Seed : Grow = Idea : ?',
        options: ['A. Create', 'B. Develop', 'C. Think', 'D. Start'],
        correctIndex: 1,
      },
      {
        id: 'word-8-4',
        question: 'Find antonym of “Visible”',
        options: ['A. Clear', 'B. Hidden', 'C. Bright', 'D. Sharp'],
        correctIndex: 1,
      },
      {
        id: 'word-8-5',
        question: 'Finger : Hand = Toe : ?',
        options: ['A. Leg', 'B. Foot', 'C. Knee', 'D. Arm'],
        correctIndex: 1,
      },
      {
        id: 'word-8-6',
        question: 'Which word is different?',
        options: ['A. Gold', 'B. Silver', 'C. Bronze', 'D. Plastic'],
        correctIndex: 3,
      },
      {
        id: 'word-8-7',
        question: 'Map : Navigate = Recipe : ?',
        options: ['A. Eat', 'B. Cook', 'C. Taste', 'D. Mix'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 9,
    title: 'Level 9',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-9-1',
        question: 'Find synonym of “Obvious”',
        options: ['A. Clear', 'B. Hidden', 'C. Rare', 'D. Dark'],
        correctIndex: 0,
      },
      {
        id: 'word-9-2',
        question: 'Which word is different?',
        options: ['A. Oxygen', 'B. Carbon', 'C. Helium', 'D. Rock'],
        correctIndex: 3,
      },
      {
        id: 'word-9-3',
        question: 'Teacher : Teach = Coach : ?',
        options: ['A. Train', 'B. Run', 'C. Learn', 'D. Help'],
        correctIndex: 0,
      },
      {
        id: 'word-9-4',
        question: 'Find antonym of “Permanent”',
        options: ['A. Long', 'B. Temporary', 'C. Stable', 'D. Fixed'],
        correctIndex: 1,
      },
      {
        id: 'word-9-5',
        question: 'Wheel : Car = Wing : ?',
        options: ['A. Bird', 'B. Airplane', 'C. Fly', 'D. Sky'],
        correctIndex: 1,
      },
      {
        id: 'word-9-6',
        question: 'Which word is different?',
        options: ['A. Running', 'B. Jumping', 'C. Swimming', 'D. Chair'],
        correctIndex: 3,
      },
      {
        id: 'word-9-7',
        question: 'Data : Information = Letters : ?',
        options: ['A. Words', 'B. Text', 'C. Book', 'D. Sentence'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 10,
    title: 'Level 10',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-10-1',
        question: 'Find synonym of “Complex”',
        options: ['A. Simple', 'B. Complicated', 'C. Easy', 'D. Clear'],
        correctIndex: 1,
      },
      {
        id: 'word-10-2',
        question: 'Which word is different?',
        options: ['A. Sun', 'B. Moon', 'C. Star', 'D. Ocean'],
        correctIndex: 3,
      },
      {
        id: 'word-10-3',
        question: 'Lock : Key = Problem : ?',
        options: ['A. Answer', 'B. Question', 'C. Think', 'D. Solve'],
        correctIndex: 0,
      },
      {
        id: 'word-10-4',
        question: 'Find antonym of “Accept”',
        options: ['A. Take', 'B. Allow', 'C. Reject', 'D. Agree'],
        correctIndex: 2,
      },
      {
        id: 'word-10-5',
        question: 'Heart : Blood = Brain : ?',
        options: ['A. Think', 'B. Signal', 'C. Mind', 'D. Memory'],
        correctIndex: 1,
      },
      {
        id: 'word-10-6',
        question: 'Which word is different?',
        options: ['A. Laptop', 'B. Tablet', 'C. Smartphone', 'D. Notebook'],
        correctIndex: 3,
      },
      {
        id: 'word-10-7',
        question: 'Engine : Car = Processor : ?',
        options: ['A. Computer', 'B. Screen', 'C. Code', 'D. Data'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 11,
    title: 'Level 11',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-11-1',
        question: 'Find synonym of “Ambiguous”',
        options: ['A. Clear', 'B. Uncertain', 'C. Simple', 'D. Exact'],
        correctIndex: 1,
      },
      {
        id: 'word-11-2',
        question: 'Which word is different?',
        options: ['A. Oxygen', 'B. Nitrogen', 'C. Helium', 'D. Steel'],
        correctIndex: 3,
      },
      {
        id: 'word-11-3',
        question: 'Sculptor : Statue = Programmer : ?',
        options: ['A. Code', 'B. Software', 'C. Computer', 'D. Keyboard'],
        correctIndex: 1,
      },
      {
        id: 'word-11-4',
        question: 'Find antonym of “Scarce”',
        options: ['A. Rare', 'B. Limited', 'C. Abundant', 'D. Small'],
        correctIndex: 2,
      },
      {
        id: 'word-11-5',
        question: 'Which word is different?',
        options: ['A. Running', 'B. Thinking', 'C. Jumping', 'D. Idea'],
        correctIndex: 3,
      },
      {
        id: 'word-11-6',
        question: 'Clock : Time = Thermometer : ?',
        options: ['A. Heat', 'B. Temperature', 'C. Weather', 'D. Degree'],
        correctIndex: 1,
      },
      {
        id: 'word-11-7',
        question: 'Find synonym of “Resilient”',
        options: ['A. Weak', 'B. Flexible', 'C. Tough', 'D. Soft'],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 12,
    title: 'Level 12',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-12-1',
        question: 'Find antonym of “Transparent”',
        options: ['A. Clear', 'B. Opaque', 'C. Visible', 'D. Light'],
        correctIndex: 1,
      },
      {
        id: 'word-12-2',
        question: 'Which word is different?',
        options: ['A. Novel', 'B. Poem', 'C. Essay', 'D. Pencil'],
        correctIndex: 3,
      },
      {
        id: 'word-12-3',
        question: 'Chef : Kitchen = Pilot : ?',
        options: ['A. Sky', 'B. Plane', 'C. Travel', 'D. Flight'],
        correctIndex: 1,
      },
      {
        id: 'word-12-4',
        question: 'Find synonym of “Precise”',
        options: ['A. Accurate', 'B. Rough', 'C. Loose', 'D. Wide'],
        correctIndex: 0,
      },
      {
        id: 'word-12-5',
        question: 'Which word is different?',
        options: ['A. Circle', 'B. Sphere', 'C. Cube', 'D. Distance'],
        correctIndex: 3,
      },
      {
        id: 'word-12-6',
        question: 'Seed : Plant = Knowledge : ?',
        options: ['A. Learn', 'B. Grow', 'C. Think', 'D. Study'],
        correctIndex: 1,
      },
      {
        id: 'word-12-7',
        question: 'Find antonym of “Increase”',
        options: ['A. Rise', 'B. Expand', 'C. Decrease', 'D. Extend'],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 13,
    title: 'Level 13',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-13-1',
        question: 'Find synonym of “Subtle”',
        options: ['A. Obvious', 'B. Delicate', 'C. Loud', 'D. Bright'],
        correctIndex: 1,
      },
      {
        id: 'word-13-2',
        question: 'Which word is different?',
        options: ['A. Copper', 'B. Iron', 'C. Gold', 'D. Plastic'],
        correctIndex: 3,
      },
      {
        id: 'word-13-3',
        question: 'Writer : Story = Architect : ?',
        options: ['A. Design', 'B. Building', 'C. Plan', 'D. Draw'],
        correctIndex: 1,
      },
      {
        id: 'word-13-4',
        question: 'Find antonym of “Flexible”',
        options: ['A. Soft', 'B. Adaptable', 'C. Rigid', 'D. Loose'],
        correctIndex: 2,
      },
      {
        id: 'word-13-5',
        question: 'Which word is different?',
        options: ['A. Hearing', 'B. Sight', 'C. Touch', 'D. Thought'],
        correctIndex: 3,
      },
      {
        id: 'word-13-6',
        question: 'Map : Direction = Dictionary : ?',
        options: ['A. Language', 'B. Words', 'C. Meaning', 'D. Letters'],
        correctIndex: 2,
      },
      {
        id: 'word-13-7',
        question: 'Find synonym of “Evident”',
        options: ['A. Hidden', 'B. Clear', 'C. Rare', 'D. Dark'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 14,
    title: 'Level 14',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-14-1',
        question: 'Find antonym of “Expand”',
        options: ['A. Grow', 'B. Stretch', 'C. Shrink', 'D. Extend'],
        correctIndex: 2,
      },
      {
        id: 'word-14-2',
        question: 'Which word is different?',
        options: ['A. Mercury', 'B. Venus', 'C. Earth', 'D. Galaxy'],
        correctIndex: 3,
      },
      {
        id: 'word-14-3',
        question: 'Painter : Canvas = Writer : ?',
        options: ['A. Book', 'B. Paper', 'C. Ink', 'D. Text'],
        correctIndex: 1,
      },
      {
        id: 'word-14-4',
        question: 'Find synonym of “Rapid”',
        options: ['A. Slow', 'B. Quick', 'C. Weak', 'D. Heavy'],
        correctIndex: 1,
      },
      {
        id: 'word-14-5',
        question: 'Which word is different?',
        options: ['A. Keyboard', 'B. Mouse', 'C. Monitor', 'D. Cable'],
        correctIndex: 3,
      },
      {
        id: 'word-14-6',
        question: 'Fuel : Energy = Food : ?',
        options: ['A. Taste', 'B. Nutrition', 'C. Cooking', 'D. Eating'],
        correctIndex: 1,
      },
      {
        id: 'word-14-7',
        question: 'Find antonym of “Accept”',
        options: ['A. Agree', 'B. Allow', 'C. Reject', 'D. Take'],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 15,
    title: 'Level 15',
    intro: 'Connect ideas and meaning.',
    questions: [
      {
        id: 'word-15-1',
        question: 'Find synonym of “Complex”',
        options: ['A. Simple', 'B. Complicated', 'C. Easy', 'D. Clear'],
        correctIndex: 1,
      },
      {
        id: 'word-15-2',
        question: 'Which word is different?',
        options: ['A. Atom', 'B. Molecule', 'C. Cell', 'D. Stone'],
        correctIndex: 3,
      },
      {
        id: 'word-15-3',
        question: 'Heart : Circulation = Brain : ?',
        options: ['A. Memory', 'B. Control', 'C. Thought', 'D. Signal'],
        correctIndex: 1,
      },
      {
        id: 'word-15-4',
        question: 'Find antonym of “Visible”',
        options: ['A. Clear', 'B. Bright', 'C. Hidden', 'D. Sharp'],
        correctIndex: 2,
      },
      {
        id: 'word-15-5',
        question: 'Which word is different?',
        options: ['A. Running', 'B. Swimming', 'C. Flying', 'D. Chair'],
        correctIndex: 3,
      },
      {
        id: 'word-15-6',
        question: 'Tool : Work = Language : ?',
        options: ['A. Speak', 'B. Communicate', 'C. Word', 'D. Talk'],
        correctIndex: 1,
      },
      {
        id: 'word-15-7',
        question: 'Find synonym of “Essential”',
        options: ['A. Optional', 'B. Necessary', 'C. Minor', 'D. Weak'],
        correctIndex: 1,
      },
    ],
  },
];