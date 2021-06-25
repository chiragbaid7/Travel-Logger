const { Schema, model } = require("mongoose");
const user_schema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,

    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  logs: [
    {
      title: {
        type: String,
        required: true,
      },
      image: String,
      description: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model("user", user_schema);
