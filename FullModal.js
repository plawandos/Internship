// a snippet preview of modal used by the application
const {
  editCreatorInfo,
  getCreatorInfo,
  updateUploadChannel,
} = require("../database/handlers");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  handleModalSubmission: async (modalInteraction, client) => {
    try {
      const instanceId = modalInteraction.customId.split(":")[0];
      const profileInstance = client.profileInstances.get(instanceId);

      if (
        !profileInstance ||
        modalInteraction.user.id !== profileInstance.interaction.user.id
      )
        return;
      if (!modalInteraction.isModalSubmit()) return;

      const action = modalInteraction.customId.split(":")[1];
      let updatedInfo;
      let creatorTags = profileInstance.creatorTags;
      const interaction = profileInstance.interaction;

      if (action === "editDescriptionModal") {
        try {
          let newDescription =
            modalInteraction.fields.getTextInputValue("newDescription");

          newDescription = newDescription
            .replace(/\n/g, " ")
            .replace(/\s+/g, " ")
            .trim();

          if (newDescription.length > 200) {
            await modalInteraction.reply({
              content: "Description must be less than 200 characters.",
              ephemeral: true,
            });
            return;
          }

          await editCreatorInfo(
            modalInteraction.user.id,
            {
              creatorDescription: newDescription,
            },
            []
          );

          updatedInfo = await getCreatorInfo(modalInteraction.user.id);
        } catch (error) {
          await modalInteraction.reply({
            content: "An error occurred while updating the description.",
            ephemeral: true,
          });
          return;
        }
      } else if (action === "changeUploadChannelModal") {
        try {
          const newChannelId =
            modalInteraction.fields.getTextInputValue("newChannelId");

          if (!newChannelId.match(/^\d+$/)) {
            await modalInteraction.reply({
              content: "Please enter a valid channel ID.",
              ephemeral: true,
            });
            return;
          }

          await updateUploadChannel(modalInteraction.user.id, newChannelId);
          updatedInfo = await getCreatorInfo(modalInteraction.user.id);
        } catch (error) {
          await modalInteraction.reply({
            content: "An error occurred while updating the upload channel.",
            ephemeral: true,
          });
          return;
        }
      }

      await modalInteraction.deferUpdate();
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(
              `${interaction.user.globalName}'s Profile${
                updatedInfo.details.verified === "y"
                  ? " <:verified:1268253444985323700>"
                  : ""
              }`
            )
            .addFields(
              {
                name: "Name",
                value:
                  "`" + updatedInfo.details.creatorName + "`" ||
                  "**`Not set`**",
                inline: true,
              },
              {
                name: "Description",
                value:
                  "`" + updatedInfo.details.creatorDescription + "`" ||
                  "**`No description`**",
                inline: false,
              },
              {
                name: "Tags",
                value:
                  updatedInfo.tags.length > 0
                    ? updatedInfo.tags.map((tag) => `**\`${tag}\`**`).join(", ")
                    : "`Not set`",
                inline: false,
              },
              {
                name: "Upload Channel",
                value:
                  updatedInfo.details.uploadChannel === "Not set"
                    ? "`Not set`"
                    : "<#" + updatedInfo.details.uploadChannel + ">",
                inline: true,
              },
              {
                name: "General Information",
                value:
                  "`Creators can set an Announcement Channel in our database. Meme X manages followers and listings; Discord handles publishing. To upload content, go to your selected channel, post a video, then right-click and select 'Publish!'`",
                inline: false,
              }
            )
            .setThumbnail(
              interaction.user.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .setFooter({ text: "Last updated" })
            .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`${instanceId}:editDescription`)
              .setLabel("Description")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("<:edit:1268253465176707154>"),
            new ButtonBuilder()
              .setCustomId(`${instanceId}:changeUploadChannel`)
              .setLabel("Channel")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("<:edit:1268253465176707154>"),
            new ButtonBuilder()
              .setCustomId(`${instanceId}:syncName`)
              .setLabel("Sync")
              .setStyle(ButtonStyle.Success)
          ),
          new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(`${instanceId}:editTags`)
              .setPlaceholder("Select tags")
              .addOptions([
                { label: "Gaming", value: "Gaming" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "Music", value: "Music" },
                { label: "Science & Tech", value: "Science & Tech" },
                { label: "Education", value: "Education" },
              ])
              .setMinValues(0)
              .setMaxValues(2)
          ),
        ],
      });
    } catch (error) {
      try {
        await modalInteraction.reply({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        });
      } catch (replyError) {
        return;
      }
    }
  },
};
