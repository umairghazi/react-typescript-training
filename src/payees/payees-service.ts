import { Payee } from "./Payee";
import { Address } from "../common-types";
import axios, { AxiosError } from "axios";

export type SortOrder = "asc" | "desc";

export interface PayeeSortCriteria {
  field: keyof Payee;
  order: SortOrder;
}

type PayeeValue = string | number | boolean | Address;

export type PayeeCriteria = Partial<Payee> & { [index: string]: PayeeValue };

interface QueryConfig {
  query: PayeeCriteria;
  sort: PayeeSortCriteria[];
}

const baseUrl = `http://localhost:8000/payees`;

const handleError = (error: any) => {
  console.error(`payee-service, something went wrong: `, error);
  return Promise.reject({ message: `service error` });
};

const responseHandler = (
  response: Response
): Promise<Payee | Payee[] | null> => {
  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    return Promise.resolve(null);
  } else {
    return Promise.reject({ message: `data access error` });
  }
};

const axiosErrorHandler = (error: AxiosError) => {
  if (error.response && error.response.status === 404) {
    return Promise.resolve(null);
  } else {
    console.error(`Axios error response: ${error}`);
    return Promise.reject({ message: `Data access error` });
  }
};

const axiosService = {
  getPayees: (config?: QueryConfig): Promise<Payee[] | null> => {
    return axios
      .get(baseUrl)
      .then(response => response.data)
      .catch(axiosErrorHandler);
  },

  getPayeeById: (id: string): Promise<Payee | null> => {
    return axios
      .get(`${baseUrl}/${id}`)
      .then(response => response.data)
      .catch(axiosErrorHandler);
  }
};

const fetchService = {
  getPayees: (config?: QueryConfig): Promise<Payee[] | null> => {
    const responsePromise = fetch(baseUrl);
    const dataPromise = responsePromise.then(responseHandler);
    const handledErrorPromise = dataPromise.catch(handleError);
    return handledErrorPromise as Promise<Payee[] | null>;
  },

  getPayeeById: (id: string): Promise<Payee | null> => {
    return fetch(`${baseUrl}/${id}`)
      .then(responseHandler)
      .catch(handleError) as Promise<Payee | null>;
  }
};

export { axiosService, fetchService };
