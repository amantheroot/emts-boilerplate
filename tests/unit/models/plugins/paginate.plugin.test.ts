import { Document, Model, model, Schema, SchemaTypes } from "mongoose";
import setupTestDB from "@@/tests/utils/setupTestDB";
import paginate from "@/models/plugins/paginate.plugin";
import { PaginateResult } from "@/interfaces/plugins/paginateResult.interface";

interface TestModel extends Model<Document> {
  paginate: (filter: Object, options: Object) => PaginateResult;
}

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

projectSchema.plugin(paginate);
const Project = model("Project", projectSchema) as TestModel;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  project: {
    type: SchemaTypes.ObjectId,
    ref: "Project",
    required: true,
  },
});

taskSchema.plugin(paginate);
const Task = model("Task", taskSchema) as TestModel;

setupTestDB();

describe("paginate plugin", () => {
  describe("populate option", () => {
    test("should populate the specified data fields", async () => {
      const project = await Project.create({ name: "Project One" });
      const task = await Task.create({ name: "Task One", project: project._id });

      const taskPages = await Task.paginate({ _id: task._id }, { populate: "project" });

      expect(taskPages.results[0].project).toHaveProperty("_id", project._id);
    });

    test("should populate nested fields", async () => {
      const project = await Project.create({ name: "Project One" });
      const task = await Task.create({ name: "Task One", project: project._id });

      const projectPages = await Project.paginate({ _id: project._id }, { populate: "tasks.project" });
      const { tasks } = projectPages.results[0];

      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toHaveProperty("_id", task._id);
      expect(tasks[0].project).toHaveProperty("_id", project._id);
    });
  });
});
