import { Diagnostic } from "@kenk2/types";
import axios from "axios";
import { useQuery } from "react-query";

const useQuestions = () =>
  useQuery(["questions"], () => axios.get<Diagnostic>("/api/questions"));

export default useQuestions;
