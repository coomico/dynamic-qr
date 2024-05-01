# Dynamic QR Code
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dynamic QR Code is an app that generate a QR Code which the target _(the url contained in it)_ can be changed at will without generating new code.

## Dependencies
This app requires some packages as its dependencies.
| Depedencies | Side |
| ------ | ------ |
| Express | [Backend][Express] |
| Mongoose | [Backend][Mongoose] |
| Vue | [Frontend][Vue] |
| Axios | [Frontend][Axios] |
| Tailwindcss | [Frontend][Tailwindcss] |

## Installation and Build the Frontend
Because backend will serve static files, we need to build the frontend and copy it to the backend's folder.
1. Clone this repository.
    ```bash
    git clone https://github.com/coomico/dynamic-qr.git
    ```
2. Enter the web directory.
    ```bash
    cd web
    ```
3. Install packages manager for frontend side.
    ```bash
    npm install 
    ```
4. Build the frontend and copy it (all contents of 'dist' folder) to the /api/views.
    ```bash
    npm run build
    cd dist
    cp -r . ../../api/views
    ```
5. Move to backend side and install the packages manager.
    ```bash
    cd ../../api
    npm install 
    ```

## Setup the Env
There are several environtment that is needed by the App.
```env
DOMAIN=your.domain.con
BASE_URL=localhost
BASE_PORT=3000
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_pass
```

## Running the App
Run the following simple command.
```bash
npm start
```

## License
[MIT](https://opensource.org/licenses/MIT)

   [Express]: <https://github.com/expressjs/expressjs.com>
   [Mongoose]: <https://github.com/Automattic/mongoose>
   [Vue]: <https://github.com/vuejs/core>
   [Axios]: <https://github.com/axios/axios>
   [Tailwindcss]: <https://github.com/tailwindlabs/tailwindcss>