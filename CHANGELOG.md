# Changelog for Draco Moderation Bot
 
The following is a list of changes made to the Draco Moderation Bot.

## UNRELEASED

### Fixed
* Sails.js does not like referencing other configs in another config; temporarily set origins to example.com.

### Changed
* update.sh now stashes, then pulls, finally npm installs.

## 0.7.0-alpha.2 - 2020-07-10

### Added
* Migrated some more commands from 0.6.1.
* Archive command: This command clones the channel used in and then strips away all permissions in the original channel.

### Fixed
* Bot was not utilizing guild-based prefixes in 0.7.0-alpha.1. This was fixed.

### Changed
* The prune command in 0.7.0 adds filtering functionality and (theoretically) the ability to delete messages older than 14 days, compared to 0.6.1 prune.

### Removed
* 0.6.1 nuke command in favor of 0.7.0 archive command.
 
## 0.7.0-alpha.1 - 2010-07-10

### Added
* Changelog
* Help command which dynamically takes data from other command files to generate a help embed.

### Changed
* [BREAKING] Drago now uses the Sails.js framework with Discord.js plugged in. This allows for future development of web interfaces. All development from 0.6 and earlier is NOT compatible with 0.7.
* Several of the commands from 0.6.x have been migrated to 0.7 (api/helpers/commands) with changes.
    - Currently, commands do NOT support sub-folders nor aliases. Plans are to support this in the future.
    - Currently, command parameters must be separated with a " | " or a double-space. A single space will not work. It is unknown if this will be fixed; single space separation causes problems for multiple string inputs.
    - util/execProcess.js is available for commands that execute things in terminal / command prompt.
    - Credits command has its own credits configurable object at the top to easily modify it without modifying the embed code.
* Data is now stored via sails.models (api/models) and the waterline ORM. Each model represents a database table. Each model can also use its own database engine.
* exec command is now execute command because exec is a reserved sails.js function.
* eval command is now evaluate command because eval is a reserved Node.js function.
* Default configuration is located in config/custom.js. Actual config values should be set in config/local.js. Do NOT commit local.js!
* Code is being formatted with Prettier, and more care is being made to add comments and documentation.
* Changelog command now utilizes this changelog file.

## 0.6.1 - 2020-07-04

### Added
* [WIP] Suggest, where you can make a bot suggestion.
* [WIP] Setup command to set up the bot and create the mute role.

### Changed
* The changelog command may now be used by everyone.
* You can now ban members that are not in the guild.