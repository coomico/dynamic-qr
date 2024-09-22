# Dynamic QR Code
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dynamic QR Code is an app that generate a QR Code which the target _(the url contained in it)_ can be changed at will without generating new code.

## Features

### Core features
- [x] Link collection (add, edit, delete, get)
- [x] Create QR
- [x] Require password for private link
- [x] User authentication
- [x] Refresh access to account
- [x] Input data validation
- [ ] Email verification

### Side features
- [x] Click/views counter
- [x] Dark mode
- [ ] Forgot password

## Dependencies
This app requires some packages as its dependencies.

On the backend side.
| Depedencies | Utility |
| ------ | ------ |
| Express | Web FW |
| Mongoose | MongoDB OM |
| jsonwebtoken | as it should be |
| Bcrypt | Pass hashing |
| Ajv | Data validator |
| Vue | SSR page |

On the other side (frontend).
| Depedencies | Utility |
| ------ | ------ |
| Vue | SPA |
| Axios | HTTP Client |
| Pinia | State manager |
| Zod | Input validator |
| Tailwind | Bootstrap replacement |
| shadcn | Component lib |

## Setup the Env
There are several environment that is needed by the App. U can check it in `docker-compose.yaml` file.

## Installation
This repo provides docker files for easy deployment. I assume you already have it installed on your machine.
1. Clone this repository.
    ```bash
    git clone https://github.com/coomico/dynamic-qr.git
    ```
2. Enter the directory.
    ```bash
    cd dynamic-qr
    ```
3. Compose up!
    ```bash
    docker compose up -d
    ```

## License
[MIT](https://opensource.org/licenses/MIT)