import { createTask } from "../services/task.service";

test("task without title should fail", async () => {
  await expect(createTask({}, "123")).rejects.toThrow("Title required");
});
