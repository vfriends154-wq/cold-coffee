import connectDB from './db/index.js';

import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "1.0.0.1"]);


connectDB()


    .then(() => {

        app.on("error", (Errr) => {
            console.log(`You got an error : `, Errr)

            throw Errr;

        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Connection is successful it is running on port : ${process.env.PORT} `)
        })



    })

    .catch((errr) => {
        console.log(`MONGODB is not connected `, errr)


    })


