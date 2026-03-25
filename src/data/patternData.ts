export type PatternQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type PatternLevel = {
  level: number;
  title: string;
  intro?: string;
  questions: PatternQuestion[];
};

export const patternData: PatternLevel[] = [
  {
    level: 1,
    title: 'Level 1',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-1-1',
        question: '2, 4, 6, 8, ?',
        options: ['A. 9', 'B. 10', 'C. 12', 'D. 11'],
        correctIndex: 1,
      },
      {
        id: 'pattern-1-2',
        question: '▲ ● ▲ ● ▲ ?',
        options: ['A. ▲', 'B. ●', 'C. ■', 'D. ◆'],
        correctIndex: 1,
      },
      {
        id: 'pattern-1-3',
        question: '1, 3, 5, 7, ?',
        options: ['A. 8', 'B. 9', 'C. 10', 'D. 11'],
        correctIndex: 1,
      },
      {
        id: 'pattern-1-4',
        question: 'A, B, C, D, ?',
        options: ['A. E', 'B. F', 'C. G', 'D. H'],
        correctIndex: 0,
      },
      {
        id: 'pattern-1-5',
        question: '⬛ ⬛ ⬜ ⬛',
        options: ['A. 1', 'B. 2', 'C. 3', 'D. 4'],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 2,
    title: 'Level 2',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-2-1',
        question: '3, 6, 12, 24, ?',
        options: ['A. 36', 'B. 48', 'C. 60', 'D. 30'],
        correctIndex: 1,
      },
      {
        id: 'pattern-2-2',
        question: '● ● ▲ ▲ ● ● ▲ ▲ ?',
        options: ['A. ●', 'B. ▲', 'C. ● ●', 'D. ● ●'],
        correctIndex: 3,
      },
      {
        id: 'pattern-2-3',
        question: '5, 10, 15, 20, ?',
        options: ['A. 30', 'B. 25', 'C. 35', 'D. 40'],
        correctIndex: 1,
      },
      {
        id: 'pattern-2-4',
        question: 'Z, Y, X, W, ?',
        options: ['A. V', 'B. U', 'C. T', 'D. S'],
        correctIndex: 0,
      },
      {
        id: 'pattern-2-5',
        question: '⬜ ⬛ ⬜ ⬛ ⬜ ?',
        options: ['A. ⬜', 'B. ⬛', 'C. ■', 'D. ◆'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 3,
    title: 'Level 3',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-3-1',
        question: '2, 6, 7, 21, 22, ?',
        options: ['A. 44', 'B. 66', 'C. 23', 'D. 42'],
        correctIndex: 1,
      },
      {
        id: 'pattern-3-2',
        question: 'A, C, F, J, ?',
        options: ['A. M', 'B. N', 'C. O', 'D. P'],
        correctIndex: 2,
      },
      {
        id: 'pattern-3-3',
        question: '1, 4, 9, 16, ?',
        options: ['A. 20', 'B. 25', 'C. 30', 'D. 36'],
        correctIndex: 1,
      },
      {
        id: 'pattern-3-4',
        question: '▲ ▲ ● ▲ ▲ ● ?',
        options: ['A. ▲', 'B. ●', 'C. ▲ ▲', 'D. ▲ ▲ ●'],
        correctIndex: 3,
      },
      {
        id: 'pattern-3-5',
        question: '2, 3, 5, 8, 12, ?',
        options: ['A. 16', 'B. 17', 'C. 18', 'D. 19'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 4,
    title: 'Level 4',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-4-1',
        question: '10, 7, 9, 6, 8, ?',
        options: ['A. 7', 'B. 5', 'C. 6', 'D. 4'],
        correctIndex: 1,
      },
      {
        id: 'pattern-4-2',
        question: 'A, D, B, E, C, ?',
        options: ['A. F', 'B. G', 'C. H', 'D. D'],
        correctIndex: 0,
      },
      {
        id: 'pattern-4-3',
        question: '1, 2, 6, 24, ?',
        options: ['A. 60', 'B. 120', 'C. 48', 'D. 72'],
        correctIndex: 1,
      },
      {
        id: 'pattern-4-4',
        question: '⬛ ⬜ ⬜ ⬛ ⬜ ⬜ ?',
        options: ['A. ⬛', 'B. ⬜', 'C. ■', 'D. ◆'],
        correctIndex: 0,
      },
      {
        id: 'pattern-4-5',
        question: '3, 9, 27, 81, ?',
        options: ['A. 162', 'B. 243', 'C. 108', 'D. 300'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 5,
    title: 'Level 5',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-5-1',
        question: '2, 5, 4, 7, 6, 9, ?',
        options: ['A. 8', 'B. 10', 'C. 11', 'D. 12'],
        correctIndex: 0,
      },
      {
        id: 'pattern-5-2',
        question: 'A, B, D, G, K, ?',
        options: ['A. O', 'B. P', 'C. Q', 'D. R'],
        correctIndex: 2,
      },
      {
        id: 'pattern-5-3',
        question: '1, 1, 2, 3, 5, 8, ?',
        options: ['A. 11', 'B. 13', 'C. 12', 'D. 14'],
        correctIndex: 1,
      },
      {
        id: 'pattern-5-4',
        question: '⬜ ▲ ⬜ ▲ ▲ ⬜ ▲ ▲ ▲ ?',
        options: ['A. ⬜', 'B. ▲', 'C. ⬜ ▲', 'D. ⬜ ▲ ▲ ▲ ▲'],
        correctIndex: 3,
      },
      {
        id: 'pattern-5-5',
        question: '4, 6, 9, 13, 18, ?',
        options: ['A. 22', 'B. 23', 'C. 24', 'D. 24'],
        correctIndex: 3,
      },
    ],
  },
  {
    level: 6,
    title: 'Level 6',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-6-1',
        question: '2, 4, 3, 6, 5, 10, ?',
        options: ['A. 7', 'B. 12', 'C. 9', 'D. 7'],
        correctIndex: 3,
      },
      {
        id: 'pattern-6-2',
        question: 'A, B, D, E, G, H, ?',
        options: ['A. I', 'B. J', 'C. K', 'D. J'],
        correctIndex: 3,
      },
      {
        id: 'pattern-6-3',
        question: '1, 2, 4, 7, 11, ?',
        options: ['A. 15', 'B. 16', 'C. 17', 'D. 18'],
        correctIndex: 1,
      },
      {
        id: 'pattern-6-4',
        question: '▲ ● ● ▲ ● ● ▲ ?',
        options: ['A. ●', 'B. ▲', 'C. ● ●', 'D. ● ●'],
        correctIndex: 3,
      },
      {
        id: 'pattern-6-5',
        question: '3, 9, 8, 24, 23, ?',
        options: ['A. 69', 'B. 46', 'C. 72', 'D. 50'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 7,
    title: 'Level 7',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-7-1',
        question: '5, 7, 6, 8, 7, 9, ?',
        options: ['A. 10', 'B. 8', 'C. 8', 'D. 11'],
        correctIndex: 2,
      },
      {
        id: 'pattern-7-2',
        question: 'Z, X, U, Q, ?',
        options: ['A. L', 'B. M', 'C. N', 'D. L'],
        correctIndex: 3,
      },
      {
        id: 'pattern-7-3',
        question: '2, 3, 6, 7, 14, 15, ?',
        options: ['A. 30', 'B. 28', 'C. 16', 'D. 30'],
        correctIndex: 3,
      },
      {
        id: 'pattern-7-4',
        question: '⬜ ▲ ▲ ⬜ ▲ ▲ ▲ ⬜ ▲ ▲ ▲ ▲ ?',
        options: ['A. ⬜', 'B. ▲', 'C. ⬜ ▲', 'D. ⬜'],
        correctIndex: 3,
      },
      {
        id: 'pattern-7-5',
        question: '1, 3, 2, 6, 3, 9, ?',
        options: ['A. 12', 'B. 4', 'C. 6', 'D. 5'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 8,
    title: 'Level 8',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-8-1',
        question: '4, 6, 12, 14, 28, ?',
        options: ['A. 30', 'B. 32', 'C. 30', 'D. 56'],
        correctIndex: 2,
      },
      {
        id: 'pattern-8-2',
        question: 'A, E, B, F, C, G, ?',
        options: ['A. H', 'B. D', 'C. I', 'D. E'],
        correctIndex: 1,
      },
      {
        id: 'pattern-8-3',
        question: '1, 1, 2, 6, 24, ?',
        options: ['A. 48', 'B. 120', 'C. 60', 'D. 720'],
        correctIndex: 1,
      },
      {
        id: 'pattern-8-4',
        question: '⬛ ⬜ ⬛ ⬛ ⬜ ⬛ ⬛ ⬜ ?',
        options: ['A. ⬛', 'B. ⬜', 'C. ⬛ ⬛', 'D. ⬛'],
        correctIndex: 3,
      },
      {
        id: 'pattern-8-5',
        question: '2, 5, 10, 17, 26, ?',
        options: ['A. 35', 'B. 36', 'C. 37', 'D. 38'],
        correctIndex: 2,
      },
    ],
  },
  {
    level: 9,
    title: 'Level 9',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-9-1',
        question: '3, 6, 5, 10, 9, 18, ?',
        options: ['A. 16', 'B. 17', 'C. 17', 'D. 20'],
        correctIndex: 2,
      },
      {
        id: 'pattern-9-2',
        question: 'A, C, B, D, C, E, ?',
        options: ['A. D', 'B. F', 'C. G', 'D. E'],
        correctIndex: 0,
      },
      {
        id: 'pattern-9-3',
        question: '2, 4, 12, 48, ?',
        options: ['A. 96', 'B. 144', 'C. 240', 'D. 240'],
        correctIndex: 3,
      },
      {
        id: 'pattern-9-4',
        question: '▲ ⬜ ▲ ▲ ⬜ ▲ ▲ ▲ ⬜ ?',
        options: ['A. ▲', 'B. ⬜', 'C. ▲ ▲', 'D. ▲ ▲ ▲ ▲'],
        correctIndex: 3,
      },
      {
        id: 'pattern-9-5',
        question: '1, 4, 3, 8, 5, 12, ?',
        options: ['A. 6', 'B. 7', 'C. 8', 'D. 9'],
        correctIndex: 1,
      },
    ],
  },
  {
    level: 10,
    title: 'Level 10',
    intro: 'Find the hidden pattern.',
    questions: [
      {
        id: 'pattern-10-1',
        question: '2, 3, 5, 9, 17, ?',
        options: ['A. 33', 'B. 34', 'C. 32', 'D. 31'],
        correctIndex: 0,
      },
      {
        id: 'pattern-10-2',
        question: 'A, D, H, M, ?',
        options: ['A. Q', 'B. R', 'C. S', 'D. S'],
        correctIndex: 3,
      },
      {
        id: 'pattern-10-3',
        question: '1, 3, 9, 27, 81, ?',
        options: ['A. 162', 'B. 243', 'C. 324', 'D. 100'],
        correctIndex: 1,
      },
      {
        id: 'pattern-10-4',
        question: '⬜ ▲ ⬜ ▲ ▲ ⬜ ▲ ▲ ▲ ⬜ ▲ ▲ ▲ ▲ ?',
        options: ['A. ▲', 'B. ⬜', 'C. ▲ ▲ ▲ ▲ ▲', 'D. ⬜'],
        correctIndex: 3,
      },
      {
        id: 'pattern-10-5',
        question: '5, 10, 20, 25, 50, ?',
        options: ['A. 55', 'B. 75', 'C. 60', 'D. 55'],
        correctIndex: 3,
      },
    ],
  },
];