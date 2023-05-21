import { Diagnostic } from "@kenk2/types";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

type IntroProps = {
  loading: boolean;
  onStart: () => void;
  diagnostic?: Diagnostic;
};
export default function Intro(props: IntroProps) {
  const { loading, onStart, diagnostic } = props;

  return (
    <Card>
      <CardContent>
        {diagnostic && !loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {diagnostic.fullName}
            </Typography>

            <Typography sx={{ margin: 2 }}>
              Assessment for {diagnostic.content.displayName}
            </Typography>

            <Typography>
              Hi there! This is a short multiple choice assessment to quickly
              assess your mental health. We hope that by answering these
              questions, we can get a better sense of your current state of
              well-being. Start the assessment by clicking the button below.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
              <Button onClick={onStart} variant="contained">
                Take The Test
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Loading Diagnostic...
            </Typography>
            <CircularProgress sx={{ margin: 1 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
