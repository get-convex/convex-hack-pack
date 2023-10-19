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

    Install NVM (Node Version Manager) with the command:

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    ```

    Then, in a new terminal window, use NVM to install the latest version of Node.js & npm with the command:

    ```
    nvm install node
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

- Run the following command, then follow the prompts to configure a new project in your Convex account and start the development server for the demo site:

  ```
  npm run dev
  ```

- You should see the demo app automatically open in your web browser (if not, navigate to [localhost:5173](http://localhost:5173))
- In the demo app, type in a new app idea and click "Save", and click the "Generate a random app idea" button, and you should see the ideas appear!

## Exercises

### Exercise 1: Update your data

- In the browser, navigate to the `convex-hack-pack` project in your [Convex dashboard](https://dashboard.convex.dev) (if it didn't open automatically) - you'll be taken to the 'Data' tab where you should see the `ideas` table and any documents inside it
- Edit data:
  - Double-click in the 'idea' field of any document and edit the text
  - Back in your demo app, you'll see the text has automatically updated!
- Add new data:
  - In the dashboard `ideas` table, click the "Add documents" button on the top right
  - In the document editor that opens, type a new app idea to fill out the `idea` property (e.g. `"A brainstorming app for developers"` - in quotes, because it's a string value)
  - Click "Save" to save the new document
  - In both the dashboard and the demo app, you should now see your new idea!

### Exercise 2: Update your backend

The "Include random ideas" checkbox in the demo app doesn't work! Let's fix that.

- Update your `listIdeas` function:

  - In your code editor, open `convex/myFunctions.ts`
  - In the `listIdeas` query function, add an additional argument named `includeRandom` to the `args` object, whose value is a boolean (`v.boolean()`). The `args` object should now look like this:

    ```js
    args: {
        includeRandom: v.boolean()
    },
    ```

  - In the `handler` function, add an `if` conditional based on the value of `args.includeRandom`: if true, return the same query results as before, but if false, return results filtered by the value of the `random` field, like so:

    ```js
    handler: async (ctx, args) => {
      if (args.includeRandom) {
        return await ctx.db.query("ideas").collect(); // Returns all documents in the 'ideas' table
      } else {
        return await ctx.db
         .query("ideas")
         .filter((q) => q.neq(q.field("random"), true)) // Only returns documents whose 'random' field is not equal to `true`
         .collect();
      }
    },
    ```

  - Save the `myFunctions.ts` file, and in the terminal where you have `npm run dev` running, you should see a log line that says "Convex functions ready!" (this means your new function code has been successfully deployed)

- Test out your updated function
  - Go to your [Convex dashboard](https://dashboard.convex.dev), navigate to the "Functions" tab (`</>`) and open `myFunctions:listIdeas`. You should now see the new version of your code there!
  - Click the "Run function" button to try out your new function in the dashboard
  - In the "Arguments" panel, edit the value of `includeRandom` and verify that you see the correct results in the "Query outcome" panel!

### Exercise 3: Update your frontend

Oh no, we broke the frontend! Now that we changed the `listIdeas` function, when visiting [localhost:5173](http://localhost:5173) you'll see a whole lot of nothing. Let's fix it and get our ideas back!

- In your code editor, open `src/App.tsx`
- In the `App` function, find the line near the top where `ideas` is defined using the `useQuery()` hook to call the `api.myFunctions.listIdeas` query function
- The `useQuery` hook can take an optional second argument, an `args` object that matches the `args` validator of the given query function. Update the call to `useQuery()` to pass `{ includeRandom }` as the second argument, like so:
  ```js
  const ideas = useQuery(api.myFunctions.listIdeas, { includeRandom });
  ```
- Now, not only are the ideas displaying properly, but when you (un)check the "Include random ideas" checkbox you should see the results update accordingly!

---

# What is Convex?

![Diagram of how a Convex backend fits in to your fullstack app](https://docs.convex.dev/assets/images/TutorialFigure0-47bd164e06a7396ba005666938c5005b.png)

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
