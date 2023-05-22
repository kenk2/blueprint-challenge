import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Assessments } from "@kenk2/types";

type ResultProps = {
  open: boolean;
  onClose: () => void;
  results?: string[];
  domains: Assessments;
};

export default function Result(props: ResultProps) {
  const { open, onClose, results, domains } = props;

  let diagnoses: string[] = [];

  results?.forEach((result) => {
    diagnoses = [...diagnoses, ...domains[result]];
  });

  return (
    <Modal open={open} onClose={onClose} sx={{ margin: "0 auto" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "24px auto",
          maxWidth: "600px",
        }}
      >
        <CardHeader
          subheader="Assessment Results"
          action={
            <Button variant="contained" onClick={onClose}>
              Take Test Again!
            </Button>
          }
        />
        <CardContent>
          {results?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Congratulations, you are in picture perfect health!
              </Typography>
              <EmojiEmotionsIcon sx={{ marginTop: 2, transform: "scale(2)" }} />
            </Box>
          ) : (
            <Box>
              <Typography>
                Based on your results, you may be at an elevated risk for the
                following:
              </Typography>
              <List>
                {diagnoses?.map((diagnosis) => (
                  <ListItem key={diagnosis}>
                    <SentimentVeryDissatisfiedIcon
                      sx={{ color: "blue", marginRight: 1 }}
                    />
                    {diagnosis}
                  </ListItem>
                ))}
              </List>
              <Typography>
                We recommend you visit a mental health professional as soon as
                possible.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
