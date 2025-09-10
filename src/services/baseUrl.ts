export type BaseUrlProdType = "local" | "live";

const getBaseUrl = (env: BaseUrlProdType = "live"): string =>
  env === "live"
    ? "https://emerging-leader-cf6fe3b22724.herokuapp.com/api/v1"
    : "http://localhost:8080/api/v1";

export default getBaseUrl;
