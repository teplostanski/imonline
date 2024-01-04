oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nch
$ nch COMMAND
running command...
$ nch (--version)
nch/0.0.0 linux-x64 node-v20.8.1
$ nch --help [COMMAND]
USAGE
  $ nch COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nch hello PERSON`](#nch-hello-person)
* [`nch hello world`](#nch-hello-world)
* [`nch help [COMMAND]`](#nch-help-command)
* [`nch plugins`](#nch-plugins)
* [`nch plugins add PLUGIN`](#nch-plugins-add-plugin)
* [`nch plugins:inspect PLUGIN...`](#nch-pluginsinspect-plugin)
* [`nch plugins install PLUGIN`](#nch-plugins-install-plugin)
* [`nch plugins link PATH`](#nch-plugins-link-path)
* [`nch plugins remove [PLUGIN]`](#nch-plugins-remove-plugin)
* [`nch plugins reset`](#nch-plugins-reset)
* [`nch plugins uninstall [PLUGIN]`](#nch-plugins-uninstall-plugin)
* [`nch plugins unlink [PLUGIN]`](#nch-plugins-unlink-plugin)
* [`nch plugins update`](#nch-plugins-update)

## `nch hello PERSON`

Say hello

```
USAGE
  $ nch hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/teplostanski/nch/blob/v0.0.0/src/commands/hello/index.ts)_

## `nch hello world`

Say hello world

```
USAGE
  $ nch hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ nch hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/teplostanski/nch/blob/v0.0.0/src/commands/hello/world.ts)_

## `nch help [COMMAND]`

Display help for nch.

```
USAGE
  $ nch help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nch.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.20/src/commands/help.ts)_

## `nch plugins`

List installed plugins.

```
USAGE
  $ nch plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ nch plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/index.ts)_

## `nch plugins add PLUGIN`

Installs a plugin into nch.

```
USAGE
  $ nch plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into nch.

  Uses bundled npm executable to install plugins into /home/user/.local/share/nch

  Installation of a user-installed plugin will override a core plugin.

  Use the NCH_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the NCH_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ nch plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ nch plugins add myplugin

  Install a plugin from a github url.

    $ nch plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ nch plugins add someuser/someplugin
```

## `nch plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ nch plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ nch plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/inspect.ts)_

## `nch plugins install PLUGIN`

Installs a plugin into nch.

```
USAGE
  $ nch plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into nch.

  Uses bundled npm executable to install plugins into /home/user/.local/share/nch

  Installation of a user-installed plugin will override a core plugin.

  Use the NCH_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the NCH_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ nch plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ nch plugins install myplugin

  Install a plugin from a github url.

    $ nch plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ nch plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/install.ts)_

## `nch plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ nch plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ nch plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/link.ts)_

## `nch plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nch plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nch plugins unlink
  $ nch plugins remove

EXAMPLES
  $ nch plugins remove myplugin
```

## `nch plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ nch plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/reset.ts)_

## `nch plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nch plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nch plugins unlink
  $ nch plugins remove

EXAMPLES
  $ nch plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/uninstall.ts)_

## `nch plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nch plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nch plugins unlink
  $ nch plugins remove

EXAMPLES
  $ nch plugins unlink myplugin
```

## `nch plugins update`

Update installed plugins.

```
USAGE
  $ nch plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.0.7/src/commands/plugins/update.ts)_
<!-- commandsstop -->
