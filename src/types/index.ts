type Answer = {
  value: number;
  questionId: string;
  title?: string;
};

type Domain = {
  domain: string;
  assessment: string;
};

type Assessments = {
  [assessment: string]: string[];
};

type Question = {
  questionId: string;
  title?: string;
  domain: string;
};

type DiagnosticResponses = {
  [question: string]: number;
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

type DiagnosticMeta = {
  id: string;
  name: string;
  disorder: string;
  displayName: string;
  fullName: string;
  title: string;
  type: string;
};

export type {
  Answer,
  Domain,
  Assessments,
  Diagnostic,
  Diagnosis,
  DiagnosisScore,
  Question,
  QuestionQuery,
  DiagnosticMeta,
  DiagnosticResponses,
};
