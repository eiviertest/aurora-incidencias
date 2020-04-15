const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    nomP: {
      type: String,
      required: true
    },
    nomGp: {
      type: String,
      required: true
    },
    asunto: {
      type: String,
      required: true
    },
    asunto: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Note", NoteSchema);
