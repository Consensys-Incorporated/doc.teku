---
description: Learn about the proto-danksharding upgrade and its implications for node operators.
sidebar_position: 4
---

# Proto-danksharding

Proto-danksharding, specified by [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), is part of
the next Ethereum upgrade, the Dencun upgrade.

Proto-danksharding introduces a new "blob-carrying" transaction type, which allows data to be posted
to Ethereum Mainnet more cheaply than currently possible, thus improving scalability while
preserving decentralization.

## What are blobs?

Blobs are "sidecars" of data that ride alongside blocks, and are primarily used by the sequencers of
Ethereum Layer 2 rollups to contain batched transactions executed on those rollups.

Blobs are made up of 4096 32-byte field elements.
Blobs are designed to remain available for exactly 4096 epochs, or roughly 18 days.
After a blob expires, a majority of consensus layer clients can no longer retrieve the specific
data within the blob, but evidence of the blob's prior existence remains on the network.

The blobs' fee market structure is designed to target an average of three blobs attached to each
beacon block, with a maximum of six blobs.
Each blob holds 128 KB of temporary data.
This means that proto-danksharding might increase the data associated with a block by 384 KB on
average (128 KB per blob times three blobs) with a maximum of 768 KB (six blobs per block).

## What changes in consensus layer clients?

With proto-danksharding, consensus layer clients will:

- Use more network bandwidth in the peer-to-peer layer to receive and distribute the blobs.

- Require roughly 48 GiB more storage space for blobs, with a maximum of 96 GiB.
  This estimate comes from the following calculation:

  - 3 blobs per block x 128 KB each = 384 KB per block
  - 32 blocks per epoch x 4096 epochs for blob expiry = 131,072 blocks with blobs
  - 384KB x 131,072 blocks = 48 GiB increase in storage

See this article,
[Ethereum Evolved: Dencun Upgrade Part 5, EIP-4844](https://consensys.io/blog/ethereum-evolved-dencun-upgrade-part-5-eip-4844),
for more information about Dencun and proto-danksharding.
