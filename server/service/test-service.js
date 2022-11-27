const testModel = require("../models/testModel");

class TestService {
  add = async (name, description) => {
    try {
      if (!name) {
        throw {
          status: "INVALID_DATA",
        };
      }

      const test = new testModel({
        name,
        description,
      });

      await test.save();

      return test;
    } catch (e) {
      return [];
    }
  };

  change = async (id, name, description, tasks_id) => {
    try {
      const candidate = await testModel.findOne({ _id: id });

      if (!candidate) {
        throw {
          status: "INVALID_DATA",
          messages: [{ description: errorsMSG.NOT_Z }],
        };
      }

      await candidate.updateOne({ name, description, tasks_id });

      return candidate;
    } catch (e) {
      return [];
    }
  };

  delete = async (id) => {
    try {
      const candidate = await testModel.findOne({ _id: id });

      if (!candidate) {
        throw {
          status: "INVALID_DATA",
          messages: [{ description: errorsMSG.NOT_Z }],
        };
      }

      await candidate.deleteOne({ _id: id });

      return candidate;
    } catch (e) {
      return [];
    }
  };
}

module.exports = new TestService();
