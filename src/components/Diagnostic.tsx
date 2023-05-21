import {
  Diagnostic as DiagnosticForm,
  DiagnosticResponses,
} from "@kenk2/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
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
};

export default function Diagnostic(props: DiagnosticProps) {
  const { diagnostic } = props;
  const { questions, title, answers } = diagnostic.content.sections[0];
  const [activeQuestion, setActiveQuestion] = useState(0);
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
          <Stepper activeStep={activeQuestion}>
            {questions.map((question, index) => (
              <Step key={question.questionId}>
                <StepButton onClick={() => setActiveQuestion(index)} />
              </Step>
            ))}
          </Stepper>
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={percentComplete} />
            Percent Complete: {percentComplete || 0}%
          </Box>
          <Typography sx={{ margin: 1 }}>{title}</Typography>
          <Divider />
          <Box sx={{ margin: 1 }}>
            <Typography>{currentQuestion.title}</Typography>
            <FormControl>
              <RadioGroup
                value={responses[activeQuestion]}
                onChange={(evt) => {
                  setResponses({
                    ...responses,
                    [currentQuestion.questionId]: Number(evt.target.value),
                  });
                  setActiveQuestion(activeQuestion + 1);
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => setActiveQuestion(activeQuestion - 1)}
                disabled={activeQuestion === 0}
              >
                Back
              </Button>
              <Button
                onClick={() => setActiveQuestion(activeQuestion + 1)}
                disabled={
                  activeQuestion === questions.length ||
                  completedQuestions < activeQuestion
                }
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
