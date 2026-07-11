---
title: Build from source
description: Build Teku from source.
sidebar_position: 2
---

# Build from source

If you want to use the latest development version of Teku or a specific commit, build from source.
Otherwise, use the [binary] or [Docker image] for more stable versions.

## Prerequisites

- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)

  :::caution

  Teku requires Java 25+; earlier versions are not supported.

  :::

- [Git](https://git-scm.com/downloads) or [GitHub Desktop](https://desktop.github.com/)
- [Gradle build tool](https://gradle.org/)

## Installation on Linux / Unix / macOS

### Clone the Teku repository

Clone the `Consensys/teku` repository:

```bash
git clone https://github.com/Consensys/teku.git
```

### Build Teku

After cloning, go to the `teku` directory.

Build Teku with the Gradle wrapper `gradlew`, as follows:

```bash
./gradlew distTar installDist
```

:::note

The command produces an expanded distribution, ready to run in `build/install/teku`, and a `.tar` distribution in `build/distribution`.

:::

Go to the `teku` directory:

```bash
cd build/install/teku
```

Display the Teku help to confirm installation:

```bash
bin/teku --help
```

:::tip

To view the list of available Gradle tasks, run `./gradlew tasks`

:::

Continue with [Starting Teku](../start-teku.md).

<!-- links -->

[binary]: install-binaries.md
[Docker image]: run-docker-image.md
