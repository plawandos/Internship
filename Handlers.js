//Database Handler queries example

async function editCreatorInfo(creatorId, updates, newTags) {
  const db = await openDb();
  try {
    await db.run("BEGIN TRANSACTION");

    if (Object.keys(updates).length > 0) {
      const updateFields = Object.entries(updates).map(
        ([key, _]) => `${key} = ?`
      );
      const values = [...Object.values(updates), creatorId];
      await db.run(
        `UPDATE creator SET ${updateFields.join(", ")} WHERE creatorId = ?`,
        values
      );
    }

    if (newTags.length > 0) {
      const tagsStr = newTags.join(",");
      await db.run(
        `
        INSERT INTO tags (creatorId, tags) VALUES (?, ?)
        ON CONFLICT(creatorId) DO UPDATE SET tags = ?
      `,
        [creatorId, tagsStr, tagsStr]
      );
    }

    await db.run("COMMIT");
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("Error editing creator info:", error);
  } finally {
    await db.close();
  }
}
