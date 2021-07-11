// jshint esversion: 9

if (process.platform != "win32") process.chdir("/home/zlyfer/DiscordBots/GameRoles");
const Discord = require("discord.js");
const client = new Discord.Client();

// const fs = require("fs");
const { token } = require("./token.json");
// const botPrefix = "gameroles";

client.on("ready", () => {
  console.log("Bot ready.");

  // Set bot status:
  // client.user
  //   .setUsername("GameRoles")
  //   .then((t) => {
  //     console.log(t);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  client.user.setActivity("gamers gaming games", { type: "WATCHING" }).catch((error) => {
    console.warn("Could not set presence.");
    console.warn(error);
  });

  // Set up event handlers:
  client.on("presenceUpdate", presenceUpdate);
});

function presenceUpdate(oldMember, newMember) {
  if (newMember.guild.id == "203778798406074368") {
    let activities = newMember.activities;
    activities.forEach((a) => {
      if (a.type == "PLAYING") {
        let gamename = `🎮 ${a.name.toUpperCase()}`;
        let role = newMember.guild.roles.cache.find((role) => role.name == gamename);
        if (role) {
          if (!newMember.member.roles.cache.find((r) => r.name == role.name))
            newMember.member.roles
              .add(role, "Added by GameRolesZL.")
              .then((t) => {
                console.log(`Added member ${newMember.member.displayName} to the role ${role.name}.`);
              })
              .catch((error) => {
                console.warn(error);
              });
        } else
          newMember.guild.roles
            .create({
              data: {
                name: gamename,
                color: "414cb2",
                mentionable: true,
              },
              reason: "Created by GameRolesZL.",
            })
            .then((r) => {
              console.log(`Created new role ${r.name}.`);
              newMember.member.roles
                .add(r, "Added by GameRolesZL.")
                .then((t) => {
                  console.log(`Added member ${newMember.member.displayName} to role ${r.name}.`);
                })
                .catch((error) => {
                  console.warn(error);
                });
            })
            .catch((error) => {
              console.warn(error);
            });
      }
    });
  }
}

process.on("unhandledRejection", (err) => {
  console.warn("UNHANDLED: " + err);
});

client.login(token);
