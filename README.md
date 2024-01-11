[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11451467)

# Meeting App

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Getting started

- Install dependencies

```sh
  npm install
```

### Start development server:

- with Node.js:

  ```sh
  npm start
  ```

- with nodemon:

  ```sh
  npm run dev
  ```

- with Docker:

  ```sh
  docker-compose up --build
  ```

### Run tests:

> **Note:**
>
> Before running the commands below, be aware that app and mongo container should be active
>
> To activate them:
>
> - Enter in your terminal:
>   docker-compose up
> - Or if you need to rebuild your image, enter in your terminal :
>   docker-compose up --build

```sh
docker-compose run api npm run test
```

or passing a env variable with the MONGODB_CONNECTION_STRING

```sh
docker-compose run -e MONGODB_CONNECTION_STRING=mongodb://mongodb/meeting-test api npm run test
```

### PlantUML

> **Note:**
>
> - There is a **class.puml** example file located in the **_architecture_** folder.

To start working **_\*.puml_** files:

- You can continue by editing the **class.puml** file
- Add additional **_\*.puml_** files on that folder too.

If you what to visualize a preview of the **class.puml** file or another **_\*.puml_** file on the project, please select the file and on your keyboard press the following keys:

- _MacOS_: **Option + D**

- _Linux/Windows_: **Alt + D**
  The above commands will automatically open your a window and will show you live any updates that you make on the file.

---

_Now that we are ready, let's have some coding fun!_

---

## MIT License

Copyright (c) 2022 Coyotiv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
