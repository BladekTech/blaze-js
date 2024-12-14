# blaze-js

The JavaScript client library for [Blaze](https://github.com/BladekTech/blaze).

See [blaze-js on npm](https://npmjs.com/package/@bladektech/blaze-js)

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install, use your favorite package manager:

`npm install @bladektech/blaze-js`

Additionally, you will need the Blaze server. You can download the latest release from the [releases page](https://github.com/BladekTech/blaze/releases/latest)

## Usage

Using blaze-js is simple. It supports both the `Promise API` and `async-await`

> Please note that `\n` *cannot* be used in the key or value for the moment

```ts
import { Client } from "blaze-js"

/* 
*  create a client
*  you should replace localhost with your host
*  and 7854 with your port (7854 is the default)
*  you could also:
*  import { Client, DEFAULT_PORT } from 'blaze-js'
*  and use the DEFAULT_PORT variable to remove magic
*/
const client = new Client("localhost", 7854)

// you *can* ping the server
// it will print "Pong!" if it works
client.ping()

// next let's set a key:value pair
// keep in mind that keys must be unique
client.set("unique-key", "this is a token :D")

// later, we can retrieve our value using async-await
const value = await client.get("unique-key")
// or, without async-await
client.get("unique-key").then((value) => /* do something here */)

// we can also check if a key exists using
const exists = await client.exists("key that doesn't exist") // false

// finally, we can delete or clear

// delete just deletes one key:value pair
client.delete("unique-key")

// clear deletes all key:value pairs
client.clear()

```

## Contributing

Blaze is not currently accepting contributions.

## License

[MIT](https://github.com/BladekTech/blaze-js/blob/main/LICENSE)
