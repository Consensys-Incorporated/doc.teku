---
title: Configure logging
description: Configure Teku's log level settings and log formatting.
sidebar_position: 2
---

# Configure logging

Teku uses Log4J2 for logging, and provides multiple methods to configure logging behavior:

- [Basic](#basic-log-level-settings) - changes the log level.
- [Destination logging](#configure-log-destination) - configures the destination for log output.
- [Custom logging](#advanced-custom-logging) - custom logging to configure the output and format of the logs.

The default log directory is OS dependent:

- macOS: `~/Library/teku/logs`
- Unix/Linux: `$XDG_DATA_HOME/teku/logs` if `$XDG_DATA_HOME` is set; otherwise `~/.local/share/teku/logs`

The default Docker image location is `/root/.local/share/teku/logs`.

## Basic log level settings

Use the [`--logging`](../../reference/cli/index.md#logging) command line option to specify logging verbosity.
The [`--logging`](../../reference/cli/index.md#logging) option changes the volume of events displayed in the log.
Valid log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`. The default level is `INFO`.

By default most logging output is sent to the log file, and limited content shown on the console.

:::tip

Use the [`log_level`](https://consensys.github.io/teku/#tag/Teku/operation/putLogLevel) API method to change the log level while Teku is running.

:::

Additional logging options include:

- [`--log-color-enabled`](../../reference/cli/index.md#log-color-enabled) displays status and event log messages in different colors on the console
- [`--log-include-events-enabled`](../../reference/cli/index.md#log-include-events-enabled) logs frequent update events. For example, every slot event with validators and attestations.
- [`--log-include-validator-duties-enabled`](../../reference/cli/index.md#log-include-validator-duties-enabled) logs details of validator event duties.

## Configure log destination

Use the [`--log-destination`](../../reference/cli/index.md#log-destination) command line option to specify where to output log information.
Valid options are `BOTH`, `CONSOLE`, `DEFAULT_BOTH`, `FILE`. Defaults to `DEFAULT_BOTH`.

When using `BOTH` or `DEFAULT_BOTH`, system updates such as blockchain events are displayed on the console, and errors and other information are logged to a file.
Specify the log file with the [`--log-file`](../../reference/cli/index.md#log-file) command-line option.

Use `DEFAULT_BOTH` when using a [custom Log4J2 configuration file](#advanced-custom-logging). Any other option applies the custom logging changes on top of its default settings.

:::note

For production systems we recommend using the `CONSOLE` or `FILE` options to ensure all log information is available in one place.

:::

## Advanced custom logging

You can provide your own logging configuration using the standard Log4J2 configuration mechanisms.

```xml title="debug.xml"
<?xml version="1.0" encoding="UTF-8"?>
<Configuration level="INFO">
  <Properties>
    <Property name="root.log.level">INFO</Property>
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSSZZZ} | %t | %-5level | %c{1} | %msg %throwable%n" />
    </Console>
  </Appenders>
  <Loggers>
    <Root level="${sys:root.log.level}">
      <AppenderRef ref="Console" />
    </Root>
  </Loggers>
</Configuration>
```

To use your custom configuration, set the environment variable `LOG4J_CONFIGURATION_FILE` to the location of your configuration file, and ensure
[`--log-destination`](../../reference/cli/index.md#log-destination) is not set to `DEFAULT_BOTH`.

If you have more specific requirements, you can create your own [log4j2 configuration](https://logging.apache.org/log4j/2.x/manual/configuration.html).

For Bash-based executions, you can set the variable for only the scope of the program execution by setting it before starting Teku.

```bash title="Example"
LOG4J_CONFIGURATION_FILE=./debug.xml teku [OPTIONS]
```
