import { Model, model, Schema, SchemaTypes, Types } from "mongoose";
import setupTestDB from "@@/tests/utils/setupTestDB";
import paginate from "@/models/plugins/paginate.plugin";
import { PaginateResult } from "@/interfaces/plugins/paginateResult.interface";
import { Document } from "@/interfaces/extensions/document.interface";

interface TaskDoc extends Document {
  name: string;
  project: Types.ObjectId | ProjectDoc;
}

interface ProjectDoc extends Document {
  name: string;
  tasks: TaskDoc[];
}

interface TaskModel extends Model<TaskDoc> {
  paginate: (filter: Record<string, unknown>, options: Record<string, string>) => PaginateResult<TaskDoc>;
}

interface ProjectModel extends Model<ProjectDoc> {
  paginate: (filter: Record<string, unknown>, options: Record<string, string>) => PaginateResult<ProjectDoc>;
}

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

projectSchema.plugin(paginate);
const Project = model("Project", projectSchema) as ProjectModel;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    project: {
      type: SchemaTypes.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.plugin(paginate);
const Task = model("Task", taskSchema) as TaskModel;

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
