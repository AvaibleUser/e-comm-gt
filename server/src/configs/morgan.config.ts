import morgan from "morgan";

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

morgan.token("body", ({ body }: any) =>
  body?.name ? JSON.stringify(body) : " "
);

export const morganConfig = () => morgan(morganFormat);
