export type LogicQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type LogicLevel = {
  level: number;
  title: string;
  intro?: string;
  questions: LogicQuestion[];
};

export const logicData: LogicLevel[] = [
  {
    level: 1,
    title: 'Level 1',
    intro: 'Test your reasoning.',
    questions: [
      {
        id: 'logic-1-1',
        question: 'All A are B. Some B are C. What is true?',
        options: [
          'A. All A are C',
          'B. Some A may be C',
          'C. No A are C',
          'D. All C are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-1-2',
        question: 'If 2 > 1 and 3 > 2, then:',
        options: [
          'A. 1 > 3',
          'B. 3 > 1',
          'C. 2 = 3',
          'D. 1 = 2',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-1-3',
        question: 'All cats are animals. No animal is a plant.',
        options: [
          'A. Cats are plants',
          'B. Cats are not plants',
          'C. Some plants are cats',
          'D. All plants are animals',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-1-4',
        question: 'If X = Y and Y = Z, then:',
        options: [
          'A. X ≠ Z',
          'B. X > Z',
          'C. X = Z',
          'D. Z > X',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-1-5',
        question: 'Which one is different?',
        options: [
          'A. Cat',
          'B. Dog',
          'C. Wolf',
          'D. Stone',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 2,
    title: 'Level 2',
    questions: [
      {
        id: 'logic-2-1',
        question: 'If all A are B, and all B are C:',
        options: [
          'A. All A are C',
          'B. Some A are C',
          'C. No A are C',
          'D. C are A',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-2-2',
        question: '3 people: A: “I am lying” B: “A is telling the truth” C: “B is lying”',
        options: [
          'A. Only A',
          'B. Only B',
          'C. Only C',
          'D. None',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-2-3',
        question: 'What comes next: 2, 4, 8, 16, ?',
        options: [
          'A. 20',
          'B. 24',
          'C. 32',
          'D. 30',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-2-4',
        question: 'If it rains → the road is wet. The road is not wet →',
        options: [
          'A. It is raining',
          'B. It is not raining',
          'C. The sun is shining',
          'D. It is night',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-2-5',
        question: 'Which one is different?',
        options: [
          'A. Triangle',
          'B. Square',
          'C. Circle',
          'D. Red',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 3,
    title: 'Level 3',
    questions: [
      {
        id: 'logic-3-1',
        question: 'All programmers are people. Some people are artists.',
        options: [
          'A. All programmers are artists',
          'B. Some programmers may be artists',
          'C. No programmer is an artist',
          'D. All artists are programmers',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-3-2',
        question: 'If X > Y and Y > Z →',
        options: [
          'A. Z > X',
          'B. X > Z',
          'C. X = Z',
          'D. Z = Y',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-3-3',
        question: 'Which one is different?',
        options: [
          'A. Airplane',
          'B. Car',
          'C. Train',
          'D. Tree',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-3-4',
        question: 'If all red objects are warm, and this object is not warm:',
        options: [
          'A. It is red',
          'B. It is not red',
          'C. It is hot',
          'D. Unknown',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-3-5',
        question: '5 people in a row. Anna is before Bohdan. Bohdan is before Sasha. Who is last?',
        options: [
          'A. Anna',
          'B. Bohdan',
          'C. Sasha',
          'D. Unknown',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 4,
    title: 'Level 4',
    questions: [
      {
        id: 'logic-4-1',
        question: 'All A are B. Some B are not C.',
        options: [
          'A. All A are C',
          'B. Some A may not be C',
          'C. No A are C',
          'D. All C are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-4-2',
        question: 'If X = 2Y and Y = 3Z → X = ?',
        options: [
          'A. 5Z',
          'B. 6Z',
          'C. 3Z',
          'D. 2Z',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-4-3',
        question: 'Which one is different?',
        options: [
          'A. Water',
          'B. Ice',
          'C. Steam',
          'D. Stone',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-4-4',
        question: 'If it is true that all A are B, but this object is not B:',
        options: [
          'A. It is A',
          'B. It is not A',
          'C. It is C',
          'D. Unknown',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-4-5',
        question: 'Who is telling the truth? A: “B is lying” B: “A is lying”',
        options: [
          'A. Both',
          'B. None',
          'C. One of them',
          'D. Impossible',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 5,
    title: 'Level 5',
    questions: [
      {
        id: 'logic-5-1',
        question: 'All X are Y. No Y are Z.',
        options: [
          'A. Some X are Z',
          'B. No X are Z',
          'C. All Z are X',
          'D. Some Z are Y',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-5-2',
        question: 'If (A → B) and (B → C), but not C →',
        options: [
          'A. A is true',
          'B. A is false',
          'C. B is true',
          'D. Unknown',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-5-3',
        question: 'Which one is different?',
        options: [
          'A. Second',
          'B. Minute',
          'C. Hour',
          'D. Kilometer',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-5-4',
        question: 'If all even numbers are divisible by 2, and a number is not divisible by 2 →',
        options: [
          'A. It is even',
          'B. It is odd',
          'C. It is zero',
          'D. It is greater than 10',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-5-5',
        question: '4 people: A is faster than B. B is faster than C. C is faster than D. Who is the slowest?',
        options: [
          'A. A',
          'B. B',
          'C. C',
          'D. D',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 6,
    title: 'Level 6',
    questions: [
      {
        id: 'logic-6-1',
        question: 'All A are B. Some B are C. No C are D. What must be true?',
        options: [
          'A. Some A are D',
          'B. No A are D',
          'C. All A are C',
          'D. Some D are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-6-2',
        question: 'If X > Y, Y = Z, and Z ≥ W →',
        options: [
          'A. X > W',
          'B. X = W',
          'C. X < W',
          'D. Cannot be determined',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-6-3',
        question: 'Which one is different?',
        options: [
          'A. Oxygen',
          'B. Hydrogen',
          'C. Carbon',
          'D. Stone',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-6-4',
        question: 'If (A → B) and (¬B), then:',
        options: [
          'A. A is true',
          'B. A is false',
          'C. B is true',
          'D. Cannot be determined',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-6-5',
        question: '5 people: A is taller than B, B taller than C, D taller than E, E taller than A. Who is the shortest?',
        options: [
          'A. A',
          'B. B',
          'C. D',
          'D. C',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 7,
    title: 'Level 7',
    questions: [
      {
        id: 'logic-7-1',
        question: 'No A are B. Some B are C.',
        options: [
          'A. Some A are C',
          'B. No A are B',
          'C. All A are C',
          'D. All C are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-7-2',
        question: 'If 3X = 2Y and Y = 4 → X = ?',
        options: [
          'A. 6',
          'B. 8/3',
          'C. 12',
          'D. 3',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-7-3',
        question: 'Which one is different?',
        options: [
          'A. Blue',
          'B. Red',
          'C. Yellow',
          'D. Triangle',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-7-4',
        question: 'If (A → B) and (B → C), and A is true →',
        options: [
          'A. C is true',
          'B. C is false',
          'C. B is false',
          'D. Cannot be determined',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-7-5',
        question: 'A: “B is lying” B: “C is lying” C: “A and B are lying”',
        options: [
          'A. Only A',
          'B. Only B',
          'C. Only C',
          'D. None are telling the truth',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 8,
    title: 'Level 8',
    questions: [
      {
        id: 'logic-8-1',
        question: 'All A are B. No B are C. Some C are D.',
        options: [
          'A. Some A are D',
          'B. No A are C',
          'C. All A are D',
          'D. All D are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-8-2',
        question: 'If X² = 16 → X = ?',
        options: [
          'A. 4',
          'B. -4',
          'C. 4 or -4',
          'D. 8',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-8-3',
        question: 'Which one is different?',
        options: [
          'A. Milk',
          'B. Cheese',
          'C. Yogurt',
          'D. Bread',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-8-4',
        question: 'If NOT (A → B), then:',
        options: [
          'A. A and B are true',
          'B. A is true and B is false',
          'C. A is false',
          'D. B is true',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-8-5',
        question: '4 people: A is faster than B. B is faster than C. D is faster than A. Who is second fastest?',
        options: [
          'A. A',
          'B. B',
          'C. C',
          'D. D',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 9,
    title: 'Level 9',
    questions: [
      {
        id: 'logic-9-1',
        question: 'Some A are B. Some B are C.',
        options: [
          'A. All A are C',
          'B. Some A may be C',
          'C. No A are C',
          'D. No definite relation between A and C',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-9-2',
        question: 'If (X + Y = 10) and (X = 3), then Y = ?',
        options: [
          'A. 13',
          'B. 7',
          'C. 5',
          'D. 3',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-9-3',
        question: 'Which one is different?',
        options: [
          'A. Planet',
          'B. Star',
          'C. Galaxy',
          'D. Rock',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-9-4',
        question: 'If (A → B), (C → D), A is true, but D is false →',
        options: [
          'A. B is false',
          'B. C is false',
          'C. A is false',
          'D. D is true',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-9-5',
        question: '6 people in a row: A before B, B before C, D before E, E before F, C before D. Who is first?',
        options: [
          'A. A',
          'B. D',
          'C. B',
          'D. C',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 10,
    title: 'Level 10',
    questions: [
      {
        id: 'logic-10-1',
        question: 'No A are B. All B are C.',
        options: [
          'A. Some A are C',
          'B. No A are B',
          'C. All A are C',
          'D. All C are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-10-2',
        question: 'If 2X + 3 = 11 → X = ?',
        options: [
          'A. 4',
          'B. 5',
          'C. 3',
          'D. 2',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-10-3',
        question: 'Which one is different?',
        options: [
          'A. Degree',
          'B. Meter',
          'C. Second',
          'D. Liter',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-10-4',
        question: 'If (A ↔ B) and A is true →',
        options: [
          'A. B is true',
          'B. B is false',
          'C. A is false',
          'D. Cannot be determined',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-10-5',
        question: 'A: “I am lying” B: “A is telling the truth”',
        options: [
          'A. A is correct',
          'B. B is correct',
          'C. Both are lying',
          'D. Both are telling the truth',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 11,
    title: 'Level 11',
    questions: [
      {
        id: 'logic-11-1',
        question: 'All A are B. Some B are C. No C are D. Some D are E. What must be true?',
        options: [
          'A. Some A are E',
          'B. No A are D',
          'C. All E are A',
          'D. Some C are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-11-2',
        question: 'If (A → B), (B → C), and ¬C →',
        options: [
          'A. A is true',
          'B. A is false',
          'C. B is true',
          'D. Cannot be determined',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-11-3',
        question: 'Which one is different?',
        options: [
          'A. Square',
          'B. Triangle',
          'C. Circle',
          'D. Line segment',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-11-4',
        question: 'If X + Y = 10 and X − Y = 2 → X = ?',
        options: [
          'A. 6',
          'B. 5',
          'C. 4',
          'D. 8',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-11-5',
        question: 'A, B, C, D sit in a row. A is not next to B. C is between A and D. Who is at the edge?',
        options: [
          'A. C',
          'B. B',
          'C. A',
          'D. D',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 12,
    title: 'Level 12',
    questions: [
      {
        id: 'logic-12-1',
        question: 'No A are B. Some B are C. All C are D. What must be true?',
        options: [
          'A. Some A are D',
          'B. No A are B',
          'C. All A are D',
          'D. Some D are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-12-2',
        question: 'If (A ↔ B) and (B → C), and A is true →',
        options: [
          'A. C is true',
          'B. C is false',
          'C. B is false',
          'D. Cannot be determined',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-12-3',
        question: 'Which one is different?',
        options: [
          'A. Mercury',
          'B. Venus',
          'C. Mars',
          'D. Moon',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-12-4',
        question: 'If 2X + 3Y = 12 and X = 3 → Y = ?',
        options: [
          'A. 1',
          'B. 2',
          'C. 3',
          'D. 4',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-12-5',
        question: '4 people: A is taller than B. C is taller than D. B is taller than D. Who is tallest?',
        options: [
          'A. A',
          'B. B',
          'C. C',
          'D. Cannot be determined',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 13,
    title: 'Level 13',
    questions: [
      {
        id: 'logic-13-1',
        question: 'All A are B. Some B are not C. All C are D. What follows?',
        options: [
          'A. Some A are not C',
          'B. No A are C',
          'C. Some A may not be C',
          'D. All A are D',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-13-2',
        question: 'If (A → B), (C → D), and ¬D →',
        options: [
          'A. A is false',
          'B. C is false',
          'C. B is false',
          'D. A is true',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-13-3',
        question: 'Which one is different?',
        options: [
          'A. Book',
          'B. Newspaper',
          'C. Magazine',
          'D. Television',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-13-4',
        question: 'If X² − 9 = 0 → X = ?',
        options: [
          'A. 3',
          'B. -3',
          'C. 3 or -3',
          'D. 9',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-13-5',
        question: '5 people in line: A before B, B before C, C before D, D before E. Who is in the middle?',
        options: [
          'A. B',
          'B. C',
          'C. D',
          'D. A',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 14,
    title: 'Level 14',
    questions: [
      {
        id: 'logic-14-1',
        question: 'Some A are B. No B are C. Some C are D. What must be true?',
        options: [
          'A. Some A are D',
          'B. No A are C',
          'C. Some A are not C',
          'D. No definite relation between A and C',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-14-2',
        question: 'If (A → B) and (¬A → C), and B is false →',
        options: [
          'A. A is false',
          'B. A is true',
          'C. C is true',
          'D. Cannot be determined',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-14-3',
        question: 'Which one is different?',
        options: [
          'A. Gold',
          'B. Silver',
          'C. Iron',
          'D. Glass',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-14-4',
        question: 'If 3X − 2 = 10 → X = ?',
        options: [
          'A. 2',
          'B. 3',
          'C. 4',
          'D. 5',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-14-5',
        question: 'A, B, C, D sit around a table: A is not next to B, B is next to C, C is not next to D. Who is opposite A?',
        options: [
          'A. B',
          'B. C',
          'C. D',
          'D. Cannot be determined',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 15,
    title: 'Level 15',
    questions: [
      {
        id: 'logic-15-1',
        question: 'All A are B. No B are C. Some C are D. All D are E. What must be true?',
        options: [
          'A. Some A are E',
          'B. No A are C',
          'C. Some A are D',
          'D. All E are A',
        ],
        correctIndex: 1,
      },
      {
        id: 'logic-15-2',
        question: 'If (A ↔ B), (B ↔ C), and A is false →',
        options: [
          'A. B is true',
          'B. C is true',
          'C. B and C are false',
          'D. Cannot be determined',
        ],
        correctIndex: 2,
      },
      {
        id: 'logic-15-3',
        question: 'Which one is different?',
        options: [
          'A. Heart',
          'B. Brain',
          'C. Lung',
          'D. Engine',
        ],
        correctIndex: 3,
      },
      {
        id: 'logic-15-4',
        question: 'If X + Y = 12 and XY = 35 → X and Y are:',
        options: [
          'A. 5 and 7',
          'B. 6 and 6',
          'C. 4 and 8',
          'D. 3 and 9',
        ],
        correctIndex: 0,
      },
      {
        id: 'logic-15-5',
        question: '5 people: A is faster than B, C is faster than A, D is slower than B, E is faster than C. Who is the fastest?',
        options: [
          'A. A',
          'B. C',
          'C. E',
          'D. B',
        ],
        correctIndex: 2,
      },
    ],
  },
];