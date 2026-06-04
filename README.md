# Genrenator SDK

Generate randomly invented music genres and short genre stories from a WordPress REST endpoint

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Genrenator API

Genrenator is a small public API hosted at [binaryjazz.us](https://binaryjazz.us/) that produces randomly assembled music genre names and short "genre stories" — short descriptive blurbs built from word lists. It is exposed as a WordPress REST API under the `genrenator/v1` namespace.

What you get from the API:

- A single random genre name, e.g. via `GET /genrenator/v1/genre`
- Multiple random genre names by passing a count, e.g. `GET /genrenator/v1/genre/{count}`
- A single random genre story via `GET /genrenator/v1/story`
- Multiple random genre stories via `GET /genrenator/v1/story/{count}`
- A usage counter via `GET /genrenator/v1/count`

Operational notes: all routes are plain HTTP GETs, no authentication is required, and CORS is disabled — browser clients calling the API directly may need a server-side proxy.

## Try it

**TypeScript**
```bash
npm install genrenator
```

**Python**
```bash
pip install genrenator-sdk
```

**PHP**
```bash
composer require voxgig/genrenator-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/genrenator-sdk/go
```

**Ruby**
```bash
gem install genrenator-sdk
```

**Lua**
```bash
luarocks install genrenator-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GenrenatorSDK } from 'genrenator'

const client = new GenrenatorSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o genrenator-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "genrenator": {
      "command": "/abs/path/to/genrenator-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Genre** | A randomly generated music genre name, returned as a string. Fetch one with `GET /genrenator/v1/genre`, or N at once with `GET /genrenator/v1/genre/{count}`. | `/genre/{count}` |
| **Story** | A short randomly generated "genre story" — a descriptive blurb in the style of a music write-up. Fetch one with `GET /genrenator/v1/story`, or N at once with `GET /genrenator/v1/story/{count}`. | `/story/{count}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from genrenator_sdk import GenrenatorSDK

client = GenrenatorSDK({})


# Load a specific genre
genre, err = client.Genre(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'genrenator_sdk.php';

$client = new GenrenatorSDK([]);


// Load a specific genre
[$genre, $err] = $client->Genre(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/genrenator-sdk/go"

client := sdk.NewGenrenatorSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Genrenator_sdk"

client = GenrenatorSDK.new({})


# Load a specific genre
genre, err = client.Genre(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("genrenator_sdk")

local client = sdk.new({})


-- Load a specific genre
local genre, err = client:Genre(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GenrenatorSDK.test()
const result = await client.Genre().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GenrenatorSDK.test(None, None)
result, err = client.Genre(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GenrenatorSDK::test(null, null);
[$result, $err] = $client->Genre(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Genre(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GenrenatorSDK.test(nil, nil)
result, err = client.Genre(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Genre(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Genrenator API

- Upstream: [https://binaryjazz.us/genrenator-api/](https://binaryjazz.us/genrenator-api/)
- API docs: [https://binaryjazz.us/wp-json/genrenator/v1](https://binaryjazz.us/wp-json/genrenator/v1)

---

Generated from the Genrenator API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
