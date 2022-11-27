const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    // default: false,
  },
  gender: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    ref: "Role",
  },
  activationLink: {
    type: String
  },
  tests: [
    {
      test_id: { type: Schema.Types.ObjectId, ref: "Test" },
      tasks: [
        {
          task_id: { type: Schema.Types.ObjectId, ref: "Task" },
          variants_id: [
            { type: Schema.Types.ObjectId, ref: "Variant", require: false },
          ],
        },
      ],
    },
  ],
});

module.exports = model("User", UserSchema);
