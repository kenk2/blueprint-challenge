type Answer = {
  value: number;
  questionId: string;
};

type Domain = {
  questionId: string;
  domain: string;
};

type Question = {
  questionId: string;
  title?: string;
  domain: string;
};

type QuestionQuery = {
  score: number;
  assessment: string;
} & Question;

type Diagnosis = {
  domain: string;
  score: number;
  assessment: string;
};

type DiagnosisScore = {
  [questionId: string]: {
    domain: string;
    score: number;
    assessment: string;
  };
};

type Diagnostic = {
  id: string;
  name: string;
  disorder: string;
  content: {
    sections: {
      type: string;
      title: string;
      answers: Answer[];
      questions: Question[];
    }[];
    displayName: string;
  };
  fullName: string;
};

export type {
  Answer,
  Domain,
  Diagnostic,
  Diagnosis,
  DiagnosisScore,
  Question,
  QuestionQuery,
};
