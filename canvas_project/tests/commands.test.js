import { expect, test } from "vitest";
import { UpdatePositionCommand } from "commands";
import { Object3D, Vector3 } from "three";

test("tests the updatePositionCommand", () => {
  const object = new Object3D();
  object.position.set(10, 10, 10);

  const command = new UpdatePositionCommand(
    object,
    new Vector3(0, 0, 0),
    object.position.clone()
  );
  command.execute();
  expect(object.position).toStrictEqual(new Vector3(0, 0, 0));
  command.undo();
  expect(object.position).toStrictEqual(new Vector3(10, 10, 10));
});
