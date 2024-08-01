bot.once("ready", async () => {
  try {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = await fs.readdir(commandsPath, {
      encoding: "utf-8",
    });

    // Load command files in parallel
    await Promise.all(
      commandFiles.map(async (file) => {
        if (file.endsWith(".js")) {
          const command = require(path.join(commandsPath, file));
          bot.commands.set(command.data.name, command);
        }
      })
    );

    //Deploy global slash commands
    const commands = bot.commands.map((command) => command.data.toJSON());
    await bot.application.commands.set(commands);
    console.log("Global slash commands deployed successfully!");

    // Mention loaded and deployed commands
    const loadedCommands = bot.commands.map((command) => command.data.name);

    console.log("Loaded commands: ", loadedCommands.join(", "));
    //console.log("Deployed commands: ", commands.map((c) => c.name).join(", "));
  } catch (error) {
    console.error("Error loading or deploying global slash commands:", error);
  }
});
