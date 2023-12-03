import * as auth from "./auth";
import * as link from "./link";

const dbSchema = {
  ...auth,
  ...link,
};

export default dbSchema;
