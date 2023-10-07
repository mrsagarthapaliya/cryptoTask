const app = require("./app");
const dbConnect = require("./dbConnect");

dbConnect();

const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});