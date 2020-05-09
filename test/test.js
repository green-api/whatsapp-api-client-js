import greenApi from '../src/index.js'
import dotenv from "dotenv";

(async () => {
    try {
        dotenv.config()
        let sdk = await greenApi({
            idInstance: process.env.ID_INSTANCE,
            apiTokenInstance: process.env.API_TOKEN_INSTANCE
        })
        let t1 = await sdk.group.createGroup('myGroup', '', [79167266138])
        let t3 = "";
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
  


