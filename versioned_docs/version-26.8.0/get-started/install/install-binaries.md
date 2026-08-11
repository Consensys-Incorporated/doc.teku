---
title: Install binary distribution
description: Install Teku from binary distribution.
sidebar_position: 1
---

# Install binary distribution

## Linux / Unix / macOS

### Prerequisites

- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)

:::caution

Teku requires Java 25+ to run; earlier versions are not supported.

:::

### Install from packaged binaries

Download the [Teku packaged binaries](https://github.com/ConsenSys/teku/releases).

Unpack the downloaded files and change into the `teku-<release>` directory.

Display Teku command line help to confirm installation:

```bash
./bin/teku --help
```

## macOS with Homebrew

### Prerequisites

- [Homebrew](https://brew.sh/)
- Java JDK.

:::caution

Teku requires Java 25+ to run. Earlier versions are not supported. You can install Java using `brew install temurin`. Alternatively, you can manually install the [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html).

:::

### Install (or upgrade) using Homebrew

To install Teku using Homebrew:

```bash
brew tap ConsenSys/teku
brew install ConsenSys/teku/teku
```

To upgrade Teku using Homebrew:

```bash
brew upgrade ConsenSys/teku/teku
```

To display the Teku version and confirm installation:

```bash
teku --version
```
