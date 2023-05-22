import {
  Diagnostic as DiagnosticForm,
  DiagnosticResponses,
} from "@kenk2/types";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

type DiagnosticProps = {
  diagnostic: DiagnosticForm;
  onSubmit: (results: DiagnosticResponses) => void;
  isLoadingResults: boolean;
};

export default function Diagnostic(props: DiagnosticProps) {
  const { diagnostic, onSubmit, isLoadingResults } = props;
  const { questions, title, answers } = diagnostic.content.sections[0];
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<DiagnosticResponses>({});

  const completedQuestions: number = useMemo(
    () => Object.keys(responses).length,
    [responses]
  );

  const percentComplete = Math.floor(
    (completedQuestions / questions.length) * 100
  );

  const currentQuestion = questions[activeQuestion];

  return (
    <Box>
      <Card>
        <CardContent>
          <Stepper
            nonLinear
            activeStep={activeQuestion}
            sx={{ marginRight: -2, marginLeft: 1 }}
          >
            {questions.map((question, index) => (
              <Step
                key={question.questionId}
                completed={
                  responses[question.questionId] !== undefined &&
                  activeQuestion !== index
                }
                disabled={completedQuestions < index}
              >
                <StepButton onClick={() => setActiveQuestion(index)} />
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setActiveQuestion(activeQuestion - 1)}
              disabled={activeQuestion === 0}
              sx={{ marginRight: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveQuestion(activeQuestion + 1)}
              sx={{ marginRight: 1 }}
              disabled={
                activeQuestion === questions.length - 1 ||
                responses[currentQuestion.questionId] === undefined
              }
            >
              Next
            </Button>
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <LinearProgress variant="determinate" value={percentComplete} />
              <Typography sx={{ marginRight: 1 }}>
                Progress: {percentComplete}%
              </Typography>
            </Box>
          </Box>
          {completedQuestions === questions.length && (
            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
              <LoadingButton
                variant="contained"
                onClick={() => onSubmit(responses)}
                loading={isLoadingResults}
              >
                View Results
              </LoadingButton>
            </Box>
          )}
          <Divider />
          <Typography sx={{ margin: 1 }}>{title}</Typography>
          <Box sx={{ margin: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {`(${activeQuestion + 1} out of ${questions.length}): ${
                currentQuestion.title
              }`}
            </Typography>
            <FormControl>
              <RadioGroup
                value={responses[currentQuestion.questionId] ?? null}
                onChange={(evt) => {
                  setResponses({
                    ...responses,
                    [currentQuestion.questionId]: Number(evt.target.value),
                  });

                  setActiveQuestion(
                    Math.min(activeQuestion + 1, questions.length - 1)
                  );
                }}
              >
                {answers.map((answer) => (
                  <FormControlLabel
                    key={answer.value}
                    value={answer.value}
                    control={<Radio />}
                    label={answer.title}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
