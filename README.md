# Retranslate - Client App

<p align="center"><img src="docs/logo.svg" width="80"/></p>

<h1 align="center">Retranslate</h1>

<p align="center">Retranslate text with [Google Translation](https://cloud.google.com/translate) and [Amazon translate](Amazon Translate).</p>

<p align="center">
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/a568b3692dcc72af17d4abfed1b2c81d47f05dcaaefb021c9f9d3d6a856d3e6e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d696e666f726d6174696f6e616c3f7374796c653d666c6174"><img src="https://camo.githubusercontent.com/a568b3692dcc72af17d4abfed1b2c81d47f05dcaaefb021c9f9d3d6a856d3e6e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d696e666f726d6174696f6e616c3f7374796c653d666c6174" alt="License-MIT" data-canonical-src="https://img.shields.io/badge/License-MIT-informational?style=flat" style="max-width:100%;"></a>
</p>

<br>

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Development](#development)
- [License](#license)

## Features

- Translate text with Google Translation API and Amazon Translate API.
- Retranslate translated text.

## Usage

<p align="center"><img src="docs/logo.svg"/></p>

<img src="docs/logo.svg"/>

Select source language and enter text, then text is translated.

## Development

### Tech stacks

- Node.js
- TypeScript, Bash
- gRPC
- React, Next.js

### Setup

#### Requirements

- macOS 10.15.5
- [Node.js](https://nodejs.org/en/) v14.15.3, npm 6.14.9
- [Yarn](https://yarnpkg.com/) v1.22.10

#### Install npm modules

```sh
$ yarn install
```

### npm commands

| Command    | details                          |
| ---------- | -------------------------------- |
| dev        | Run on local in development mode |
| build      | Build app for production         |
| start      | Run production server            |
| type-check | Check type                       |
| format     | Format code                      |
| lint       | Lint code                        |
| test       | Run lint, type check and tests   |
| test-snap  | Update snapshot in jest          |

### Structure

- Application is constructed with Next.js.
- Call gRPC API through envoy.

#### Design

![Design](docs/design.jpg?raw=true)

#### Sources

```sh
.
|-- .env.local          <-- Environment variables on local
|-- .next               <-- Next.js build assets
|-- LICENSE
|-- README.md
|-- README.next.md          <-- Next.js readme
|-- api                     <-- API classes
|   `-- translator.ts
|
|-- components              <-- React components
|   |-- github-corner.tsx   <-- GitHub corner icon
|   |-- lang-select.tsx     <-- Language select
|   |-- service-image.tsx   <-- Translation service image
|   `-- text-box.tsx        <-- Text box
|
|-- grpc                    <-- Auto generated gRPC classes
|-- next-env.d.ts           <-- Ensuring Next.js types for TypeScript
|-- pages           <-- Next.js pages
|   |-- _app.tsx
|   `-- index.tsx   <-- Home page
|
|-- public
|   |-- favicon.png
|   |-- logo-aws.png        <-- Amazon logo
|   `-- logo-google.png     <-- Google logo
|
|-- scripts
|   `-- protos      <-- Script to generate gRPC classes with .proto
|
`-- test        <-- jest tests files
```

## Get in touch

- [Dev.to](https://dev.to/takakd)
- [Twitter](https://twitter.com/takakdkd)

## Contributing

Issues and reviews are welcome. Don't hesitate to create issues and PR.

## License

- Copyright 2020 © takakd.
