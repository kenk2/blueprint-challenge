import axios from "axios";
import { useMutation } from "react-query";
import { Answer } from "@kenk2/types";

const useAnswers = () =>
  useMutation((answers: Answer[]) =>
    axios.post<string[]>("/api/assess", {
      answers,
    })
  );

export default useAnswers;
