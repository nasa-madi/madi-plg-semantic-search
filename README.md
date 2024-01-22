# madi-plg-semantic-search
                    
[![NPM](https://img.shields.io/npm/l/madi-plg-semantic-search)](https://github.com/nasa-madi/madi-plg-semantic-search/blob/main/LICENSE) 

[![npm](https://img.shields.io/npm/v/madi-plg-semantic-search?label=latest)](https://www.npmjs.com/package/madi-plg-semantic-search)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nasa-madi/madi-plg-semantic-search/npm-publish.yml?branch=main)

[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/NPM/madi-plg-semantic-search)]()

<!-- [![Download Status](https://img.shields.io/npm/dm/madi-plg-semantic-search.svg)](https://www.npmjs.com/package/madi-plg-semantic-search) -->

This library is a FeathersJS middleware to allow simple Remote Procedure Calls (RPCs) to interact with [Feathers Services](https://feathersjs.com/guides/basics/services.html) and [custom methods](https://feathersjs.com/api/services.html#custom-methods). 



## Installation


### `service(options)`
__Options:__
- `disableHeader` (**optional**, default: `false`) - Set to true to prevent the `x-service-method` header from being overwritten by the middleware.  The RPC verb can still get captured and used from the Feathers hook ctx object.
- `allowedRpcVerbs` (**optional**. default: `any`) - Accepts a string or an array of strings.  Defaults to fully open, allowing any verb.  Setting to `[]` will disallow any verb. In order to use the `x-service-method` automatic call, the custom method of the service **must** be named exactly the same as the verb sent.



### Using Verbs with ID



### Extending an existing Service





## Contributing
Please see https://github.com/nasa-madi/madi-plg-semantic-search/blob/main/.github/contributing.md
 
## Credit
Inspired by work by Ben Zelinski.

