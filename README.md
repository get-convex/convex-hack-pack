# Convex Hack Pack

Hello, hackers!
Welcome to Convex, a full-featured backend platform you can use to
rapidly prototype any hackathon app you can think of!

This repository is your starting point for getting hacking with Convex. It includes:

- A simple demo Convex app to help you learn the basics
- Companion exercises for the intro workshop
- A comprehensive list of further reading links & resources (below)

## Before you begin

- Sign up for a free Convex account at [convex.dev](https://convex.dev)
- [highly recommended] Sign up for a [Github](https://github.com) account if you don't have one already
- Get your development environment set up:
  - Make sure you have [git](https://github.com/git-guides/install-git) installed, or install it if needed
  - Use [NVM](https://github.com/nvm-sh/nvm#about) to install [Node.js](https://nodejs.dev/en/) & [npm](https://www.npmjs.com/), if you don't have them already
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    ```
- [optional] Read up on the technologies we'll be using:
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) and [TypeScript](https://www.typescriptlang.org/) programming languages
  - [React](https://react.dev/) JS/TS frontend framework
  - [Vite](https://vitejs.dev/) JS/TS build & development tool
  - and of course, [Convex](https://docs.convex.dev)!

## Install the hack pack

- Download a local copy of this repository from Github using `git`:

  ```
  git clone https://github.com/vakila/convex-hack-pack.git
  ```

  (Note: if you prefer, you can also clone the repo with the [Github CLI](https://cli.github.com/) or [download a ZIP file](https://github.com/vakila/convex-hack-pack/archive/refs/heads/main.zip) of the contents)

- Install the project dependencies:

  ```
  cd convex-hack-pack
  npm install
  ```

- Start the development server to run the demo app:
  ```
  npm run dev
  ```

##

# What is Convex?

[Convex](https://convex.dev) is a hosted backend platform with a
built-in database that lets you write your
[database schema](https://docs.convex.dev/database/schemas) and
[server functions](https://docs.convex.dev/functions) in
[TypeScript](https://docs.convex.dev/typescript). Server-side database
[queries](https://docs.convex.dev/functions/query-functions) automatically
[cache](https://docs.convex.dev/functions/query-functions#caching--reactivity) and
[subscribe](https://docs.convex.dev/client/react#reactivity) to data, powering a
[realtime `useQuery` hook](https://docs.convex.dev/client/react#fetching-data) in our
[React client](https://docs.convex.dev/client/react). There are also
[Python](https://docs.convex.dev/client/python),
[Rust](https://docs.convex.dev/client/rust),
[ReactNative](https://docs.convex.dev/client/react-native), and
[Node](https://docs.convex.dev/client/javascript) clients, as well as a straightforward
[HTTP API](https://github.com/get-convex/convex-js/blob/main/src/browser/http_client.ts#L40).

The database supports
[NoSQL-style documents](https://docs.convex.dev/database/document-storage) with
[relationships](https://docs.convex.dev/database/document-ids),
[custom indexes](https://docs.convex.dev/database/indexes/)
(including on fields in nested objects) and
[vector search](https://docs.convex.dev/vector-search).

The
[`query`](https://docs.convex.dev/functions/query-functions) and
[`mutation`](https://docs.convex.dev/functions/mutation-functions) server functions have transactional,
low latency access to the database and leverage our
[`v8` runtime](https://docs.convex.dev/functions/runtimes) with
[determinism guardrails](https://docs.convex.dev/functions/runtimes#using-randomness-and-time-in-queries-and-mutations)
to provide the strongest ACID guarantees on the market:
immediate consistency,
serializable isolation, and
automatic conflict resolution via
[optimistic multi-version concurrency control](https://docs.convex.dev/database/advanced/occ) (OCC / MVCC).

The [`action` server functions](https://docs.convex.dev/functions/actions) have
access to external APIs and enable other side-effects and non-determinism in
either our
[optimized `v8` runtime](https://docs.convex.dev/functions/runtimes) or a more
[flexible `node` runtime](https://docs.convex.dev/functions/runtimes#nodejs-runtime).

Functions can run in the background via
[scheduling](https://docs.convex.dev/scheduling/scheduled-functions) and
[cron jobs](https://docs.convex.dev/scheduling/cron-jobs).

Development is cloud-first, with
[hot reloads for server function](https://docs.convex.dev/cli#run-the-convex-dev-server) editing via the
[CLI](https://docs.convex.dev/cli). There is a
[dashbord UI](https://docs.convex.dev/dashboard) to
[browse and edit data](https://docs.convex.dev/dashboard/deployments/data),
[edit environment variables](https://docs.convex.dev/production/environment-variables),
[view logs](https://docs.convex.dev/dashboard/deployments/logs),
[run server functions](https://docs.convex.dev/dashboard/deployments/functions), and more.

There are built-in features for
[reactive pagination](https://docs.convex.dev/database/pagination),
[file storage](https://docs.convex.dev/file-storage),
[reactive search](https://docs.convex.dev/text-search),
[https endpoints](https://docs.convex.dev/functions/http-actions) (for webhooks),
[streaming import/export](https://docs.convex.dev/database/import-export/), and
[runtime data validation](https://docs.convex.dev/database/schemas#validators) for
[function arguments](https://docs.convex.dev/functions/args-validation) and
[database data](https://docs.convex.dev/database/schemas#schema-validation).

Everything scales automatically, and it’s [free to start](https://www.convex.dev/plans).
