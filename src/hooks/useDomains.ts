import { Assessments, Domain } from "@kenk2/types";
import axios from "axios";
import { useQuery } from "react-query";
import startCase from "lodash/startCase";

const useDomains = () =>
  useQuery<Assessments>(["domains"], () =>
    axios.get<Domain[]>("/api/domains").then((domains) => {
      const assessments: Assessments = {};

      domains.data.forEach((domain) => {
        assessments[domain.assessment] = assessments[domain.assessment] || [];
        assessments[domain.assessment].push(startCase(domain.domain));
      });

      return assessments;
    })
  );

export default useDomains;
