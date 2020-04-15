const mongoose = require("mongoose");

//const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

const MONGODB_URI = 'mongodb+srv://aurora:mongodb@cluster0-8stan.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
