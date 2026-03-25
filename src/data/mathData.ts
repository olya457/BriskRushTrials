export type MathQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type MathLevel = {
  level: number;
  title: string;
  intro?: string;
  questions: MathQuestion[];
};

export const mathData: MathLevel[] = [
  {
    level: 6,
    title: 'Level 6',
    intro: 'Think fast and stay accurate.',
    questions: [
      {
        id: 'math-6-1',
        question: '(48 ÷ 4)² − 10 = ?',
        options: ['A. 134', 'B. 144', 'C. 134', 'D. 124'],
        correctIndex: 2,
      },
      {
        id: 'math-6-2',
        question: '(3³ × 4²) ÷ 6 = ?',
        options: ['A. 72', 'B. 64', 'C. 96', 'D. 48'],
        correctIndex: 0,
      },
      {
        id: 'math-6-3',
        question: '15% of 320 + 20 = ?',
        options: ['A. 68', 'B. 64', 'C. 70', 'D. 60'],
        correctIndex: 0,
      },
      {
        id: 'math-6-4',
        question: '(100 − 64) × (5 + 3) = ?',
        options: ['A. 288', 'B. 256', 'C. 300', 'D. 320'],
        correctIndex: 0,
      },
      {
        id: 'math-6-5',
        question: '√(196 + 144) = ?',
        options: ['A. 16', 'B. 18', 'C. 20', 'D. 18'],
        correctIndex: 3,
      },
      {
        id: 'math-6-6',
        question: '(9 × 8) + (7 × 6) = ?',
        options: ['A. 114', 'B. 108', 'C. 120', 'D. 112'],
        correctIndex: 0,
      },
      {
        id: 'math-6-7',
        question: '(2⁶ ÷ 4) + 5 = ?',
        options: ['A. 21', 'B. 19', 'C. 20', 'D. 22'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 7,
    title: 'Level 7',
    intro: 'Think fast and stay accurate.',
    questions: [
      {
        id: 'math-7-1',
        question: '(12 × 12 × 2) − (10 × 10) = ?',
        options: ['A. 188', 'B. 188', 'C. 200', 'D. 176'],
        correctIndex: 1,
      },
      {
        id: 'math-7-2',
        question: '(7³ − 5³) ÷ 2 = ?',
        options: ['A. 109', 'B. 108', 'C. 109', 'D. 109'],
        correctIndex: 3,
      },
      {
        id: 'math-7-3',
        question: '25% of (400 − 80) = ?',
        options: ['A. 80', 'B. 70', 'C. 90', 'D. 100'],
        correctIndex: 0,
      },
      {
        id: 'math-7-4',
        question: '(6² + 8²) = ?',
        options: ['A. 100', 'B. 96', 'C. 104', 'D. 92'],
        correctIndex: 0,
      },
      {
        id: 'math-7-5',
        question: '(50 × 3) + (25 × 4) = ?',
        options: ['A. 250', 'B. 200', 'C. 300', 'D. 275'],
        correctIndex: 0,
      },
      {
        id: 'math-7-6',
        question: '√(225 × 4) = ?',
        options: ['A. 30', 'B. 25', 'C. 35', 'D. 20'],
        correctIndex: 0,
      },
      {
        id: 'math-7-7',
        question: '(1000 ÷ 5) − (12 × 10) = ?',
        options: ['A. 80', 'B. 100', 'C. 60', 'D. 120'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 8,
    title: 'Level 8',
    intro: 'Think fast and stay accurate.',
    questions: [
      {
        id: 'math-8-1',
        question: '(2⁴ × 3³) = ?',
        options: ['A. 432', 'B. 216', 'C. 324', 'D. 384'],
        correctIndex: 0,
      },
      {
        id: 'math-8-2',
        question: '(81 ÷ 3)² = ?',
        options: ['A. 729', 'B. 656', 'C. 625', 'D. 700'],
        correctIndex: 0,
      },
      {
        id: 'math-8-3',
        question: '(45 × 2) + (60 ÷ 3) = ?',
        options: ['A. 110', 'B. 100', 'C. 120', 'D. 115'],
        correctIndex: 0,
      },
      {
        id: 'math-8-4',
        question: '(9² × 5) − 100 = ?',
        options: ['A. 305', 'B. 305', 'C. 300', 'D. 310'],
        correctIndex: 1,
      },
      {
        id: 'math-8-5',
        question: '(144 + 256) ÷ 4 = ?',
        options: ['A. 100', 'B. 90', 'C. 110', 'D. 80'],
        correctIndex: 0,
      },
      {
        id: 'math-8-6',
        question: '(7 × 7 × 7) − 200 = ?',
        options: ['A. 143', 'B. 143', 'C. 150', 'D. 130'],
        correctIndex: 1,
      },
      {
        id: 'math-8-7',
        question: '30% of 600 − 50 = ?',
        options: ['A. 130', 'B. 150', 'C. 120', 'D. 140'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 9,
    title: 'Level 9',
    intro: 'Think fast and stay accurate.',
    questions: [
      {
        id: 'math-9-1',
        question: '(3⁴ + 4⁴) = ?',
        options: ['A. 337', 'B. 320', 'C. 340', 'D. 300'],
        correctIndex: 0,
      },
      {
        id: 'math-9-2',
        question: '(256 ÷ 2⁴) = ?',
        options: ['A. 16', 'B. 32', 'C. 8', 'D. 24'],
        correctIndex: 0,
      },
      {
        id: 'math-9-3',
        question: '(5³ + 6³) = ?',
        options: ['A. 341', 'B. 330', 'C. 350', 'D. 360'],
        correctIndex: 0,
      },
      {
        id: 'math-9-4',
        question: '(12 × 8 × 5) ÷ 4 = ?',
        options: ['A. 120', 'B. 100', 'C. 140', 'D. 160'],
        correctIndex: 0,
      },
      {
        id: 'math-9-5',
        question: '√(400 + 225) = ?',
        options: ['A. 25', 'B. 26', 'C. 25', 'D. 25'],
        correctIndex: 3,
      },
      {
        id: 'math-9-6',
        question: '(90 ÷ 3) × (4 + 6) = ?',
        options: ['A. 300', 'B. 280', 'C. 320', 'D. 290'],
        correctIndex: 0,
      },
      {
        id: 'math-9-7',
        question: '(11³ − 1000) = ?',
        options: ['A. 331', 'B. 300', 'C. 350', 'D. 320'],
        correctIndex: 0,
      },
    ],
  },
  {
    level: 10,
    title: 'Level 10',
    intro: 'Think fast and stay accurate.',
    questions: [
      {
        id: 'math-10-1',
        question: '(2⁵ × 3⁴) = ?',
        options: ['A. 2592', 'B. 2400', 'C. 2304', 'D. 2700'],
        correctIndex: 0,
      },
      {
        id: 'math-10-2',
        question: '(1000 − 729) = ?',
        options: ['A. 271', 'B. 260', 'C. 280', 'D. 250'],
        correctIndex: 0,
      },
      {
        id: 'math-10-3',
        question: '(8³ + 9³) = ?',
        options: ['A. 1241', 'B. 1200', 'C. 1300', 'D. 1100'],
        correctIndex: 0,
      },
      {
        id: 'math-10-4',
        question: '(15² × 2) − 100 = ?',
        options: ['A. 350', 'B. 350', 'C. 300', 'D. 400'],
        correctIndex: 1,
      },
      {
        id: 'math-10-5',
        question: '(360 ÷ 6) × (7 + 3) = ?',
        options: ['A. 600', 'B. 500', 'C. 650', 'D. 550'],
        correctIndex: 0,
      },
      {
        id: 'math-10-6',
        question: '(144 × 5) − (12 × 20) = ?',
        options: ['A. 480', 'B. 500', 'C. 450', 'D. 520'],
        correctIndex: 0,
      },
      {
        id: 'math-10-7',
        question: '(13² + 14²) = ?',
        options: ['A. 365', 'B. 360', 'C. 370', 'D. 350'],
        correctIndex: 0,
      },
    ],
  },
];