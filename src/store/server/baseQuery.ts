import i18n from "@/i18n";

export const baseQuery = {
  baseUrl: "https://apis.souqpos.com/portal",
  headers: {
    lang: i18n.language,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("@token")}`,
  },
};

export const multipartHeader = {
  lang: i18n.language,
  "Content-Type": undefined,
  Authorization: `Bearer ${localStorage.getItem("@token")}`,
};

export interface IErr {
  status: number;
  data: {
    error_flag: number;
    message: {
      [key: string]: [string];
    };
    result: any;
  };
}
