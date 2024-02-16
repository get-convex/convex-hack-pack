# Convex Hack Pack

Hello, hackers! Welcome to [Convex](https://convex.dev), a full-featured backend
platform you can use to rapidly prototype any hackathon app you can think of!

## So you want to build an app, ASAP

If you're building an app for a hackathon, there's no time to waste! Convex is
the perfect partner for hackers on a deadline because:

- you get a cloud-hosted database & serverless backend for free
- your frontend clients get automatic, realtime data updates
- you can flexibly change your database schema as your product evolves
- you get file storage, text- and vector-based search, cron jobs, and lots more
  out of the box

Whatever your idea is, Convex can help you make it happen!

## What is this hack pack?

This repository is your starting point for getting hacking with Convex. It
includes:

- A simple Convex demo app to demonstrate the basics
- Hands-on exercises to get you started (below)
- Lots of further reading links & resources to keep you going (below)

## Before you begin

- Sign up for a free Convex account at [convex.dev](https://convex.dev)
- [highly recommended] Sign up for a [Github](https://github.com) account if you
  don't have one already
- Get your development environment set up:
  - Make sure you have [git](https://github.com/git-guides/install-git)
    installed, or install it if needed
  - Install/update [Node.js](https://nodejs.org/en/download) (which includes
    [npm](https://www.npmjs.com/)) to the latest LTS version
- [optional] Read up on the technologies we'll be using:
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) and
    [TypeScript](https://www.typescriptlang.org/) programming languages
  - [React](https://react.dev/) JS/TS frontend framework
  - [Vite](https://vitejs.dev/) JS/TS build & development tool
  - and of course, [Convex](https://docs.convex.dev)!

## Install the hack pack

- Download a local copy of this repository from Github using `git`:

  ```
  git clone https://github.com/get-convex/convex-hack-pack.git
  ```

  (Note: if you prefer, you can also clone the repo with the
  [Github CLI](https://cli.github.com/) or
  [download a ZIP file](https://github.com/get-convex/convex-hack-pack/archive/refs/heads/main.zip)
  of the contents)

- Install the project dependencies:

  ```
  cd convex-hack-pack
  npm install
  ```

- Run the following command, then follow the prompts to configure a new project
  in your Convex account and start the development server for the demo site:

  ```
  npm run dev
  ```

- You should see the demo app automatically open in your web browser (if not,
  navigate to [localhost:5173](http://localhost:5173))
- In the demo app, type in a new app idea and click "Save", and/or click the
  "Generate a random app idea" button, and you should see the ideas appear!

You may have noticed that "Include random ideas" checkbox in the demo app
doesn't work! Don't worry, we're going to fix it. But before we do, let's take a
closer look at our data in the Convex dashboard.

---

# Exercises

## Exercise 1: Update your data

- In the browser, navigate to the `convex-hack-pack` project in your
  [Convex dashboard](https://dashboard.convex.dev) (if it didn't open
  automatically) - you'll be taken to the 'Data' tab where you should see the
  `ideas` table and any documents inside it
- Edit data:
  - Double-click in the 'idea' field of any document and edit the text
  - Back in your demo app, you'll see the text has automatically updated!
- Add new data:
  - In the dashboard `ideas` table, click the "Add documents" button on the top
    right
  - In the document editor that opens, type a new app idea to fill out the
    `idea` property (e.g. `"A brainstorming app for developers"` - in quotes,
    because it's a string value)
  - Click "Save" to save the new document
  - In both the dashboard and the demo app, you should now see your new idea!

But we're not done yet - that "Include random ideas" checkbox in our app still
doesn't work! Let's fix that.

## Exercise 2: Update your backend

- Update your `listIdeas` function:

  - In your code editor, open `convex/myFunctions.ts`
  - In the `listIdeas` query function, add an additional argument named
    `includeRandom` to the `args` object, whose value is a boolean
    (`v.boolean()`). The `args` object should now look like this:

    ```js
    args: {
        includeRandom: v.boolean()
    },
    ```

  - In the `handler` function, add an `if` conditional based on the value of
    `args.includeRandom`: if true, return the same query results as before, but
    if false, filter the data to only return documents where the `random` field
    is _not_ equal to `true`, like so:

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

  - Save the `myFunctions.ts` file, and in the terminal where you have
    `npm run dev` running, you should see a log line that says "Convex functions
    ready!" (this means your new function code has been successfully deployed)

- Test out your updated function
  - Go to your [Convex dashboard](https://dashboard.convex.dev), navigate to the
    "Functions" tab (`</>`) and open `myFunctions:listIdeas`. You should now see
    the new version of your code there!
  - Click the "Run function" button to try out your new function in the
    dashboard
  - In the "Arguments" panel, edit the value of `includeRandom` and verify that
    you see the correct results in the "Query outcome" panel!

Great, we've confirmed in the Convex dashboard that our backend change was
successful!

But now when visiting [localhost:5173](http://localhost:5173) you'll see a whole
lot of nothing. That's because our backend function change broke the frontend
code that invokes that function! Let's fix it and get our ideas back.

## Exercise 3: Update your frontend

- In your code editor, open `src/App.tsx`
- In the `App` function, find the line near the top where `ideas` is defined
  using the `useQuery()` hook to call the `api.myFunctions.listIdeas` query
  function
- The `useQuery` hook can take an optional second argument, an `args` object
  that matches the `args` validator of the given query function. Update the call
  to `useQuery()` to pass `{ includeRandom }` as the second argument, like so:
  ```js
  const ideas = useQuery(api.myFunctions.listIdeas, { includeRandom });
  ```
- Now, not only are the ideas displaying properly, but when you (un)check the
  "Include random ideas" checkbox you should see the results update accordingly!

## Bonus: Challenge Exercises

If you've got extra time, try your hand at implementing some new features for
the app!

### Challenge 1: Delete idea button

Currently, there is no way for a user to delete an idea from the page. Your
challenge is to add a button that fixes that!

Hints:

- In `convex/myFunctions.ts` you'll need to create a new mutation function
  `deleteIdea`, which
  [deletes a document](https://docs.convex.dev/database/writing-data#deleting-documents)
  from the `ideas` table using its
  [Convex document ID](https://docs.convex.dev/database/document-ids)
- In `src/App.tsx`, you'll need the `useMutation` hook to invoke your new
  `deleteIdea` function as needed from the frontend
- In `src/App.tsx`, you can add a new button using the `Button` component (see
  the "Generate a random app idea" button for an example)

### Challenge 2: Prevent duplicates

At the moment, the app doesn't prevent you from adding the same idea twice (try
it!), so we might save duplicate ideas to the database. Your challenge is to fix
that by making sure that we check for duplicates before saving a new idea!

Hints:

- In `convex/myFunctions.ts`, you can modify the `saveIdea` function to check
  for duplicates by performing a
  [filtered query](https://docs.convex.dev/database/reading-data#equality-conditions)
  before inserting the new document. If the query finds any documents whose
  `idea` field exactly matches the new idea, do not insert the new document
- To let users know what's happening, you probably want to treat the
  did-not-save-duplicate case as an
  [application error](https://docs.convex.dev/functions/error-handling/application-errors)
  and handle it in the frontend accordingly

### Challenge 3: Pagination

As the list of ideas grows, the page will get very long! Improve performance by
paginating the list of ideas to show only 20 ideas at a time, and let users page
through the rest of the results.

Hints:

- In `convex/myFunctions.ts`, you can change the `listIdeas` query function to a
  [paginated query](https://docs.convex.dev/database/pagination) function by
  accepting a `paginationOpts` argument
- In `src/App.tsx` you'll also need to update the frontend code to use the
  [`usePaginatedQuery` hook](https://docs.convex.dev/database/pagination#paginating-within-react-components)
  instead of the `useQuery` hook when invoking the `listIdeas` function
- Don't forget to add some buttons or another way for users to access the
  next/previous page(s)!

---

# Next steps

Now that you've grokked the basics, you're ready to get building!

## Create a new app from a starter template

You can quickly spin up a new Convex app with the command:

```
npm create convex@latest
```

This will install the
[`create-convex`](https://www.npmjs.com/package/create-convex) bootstrapper
tool, which will then ask you a series of questions to configure your starter
code. Walk through the prompts and the instructions that follow.

## Explore the Convex platform and everything it can do

Convex offers lots of functionality, so you can pick and choose the parts of the
platform you need to build the app of your dreams!

Here are some resources to help get you building:

- For a more in-depth structured intro to Convex, take the
  [guided tour](https://docs.convex.dev/get-started)
- The [Convex docs](https://docs.convex.dev/home) are a comprehensive reference
  of platform features and how to use them
- [Stack](https://stack.convex.dev/) is Convex's developer learning portal, with
  tons of articles & videos on best practices and how-tos
- You can ask questions, get help, and share your Convex projects in the
  community [Discord](https://www.convex.dev/community)
- [Convex Search](https://search.convex.dev/) lets you search across all of the
  above to find the info you need!
- The [template gallery](https://www.convex.dev/templates) has tons of sample
  apps for different tech stacks and use cases

And in case you want to jump right in to implementing common app features, here
are some resouces on how to:

- Model [relationships](https://docs.convex.dev/database/document-ids) between
  documents
- [Authenticate & manage users](https://docs.convex.dev/auth)
- [Paginate](https://docs.convex.dev/database/pagination) query results
- Retrieve documents with [text](https://docs.convex.dev/text-search) or
  [vector](https://docs.convex.dev/vector-search) search
- [Schedule](https://docs.convex.dev/scheduling) function runs
- [Store and manage files](https://docs.convex.dev/file-storage)
- Build [AI apps](https://stack.convex.dev/tag/AI)

---

# What is Convex?

![Diagram of how a Convex backend fits in to your fullstack app](https://docs.convex.dev/assets/images/TutorialFigure0-47bd164e06a7396ba005666938c5005b.png)

[Convex](https://convex.dev) is a hosted backend platform with a built-in
database that lets you write your
[database schema](https://docs.convex.dev/database/schemas) and
[server functions](https://docs.convex.dev/functions) in
[TypeScript](https://docs.convex.dev/typescript). Server-side database
[queries](https://docs.convex.dev/functions/query-functions) automatically
[cache](https://docs.convex.dev/functions/query-functions#caching--reactivity)
and [subscribe](https://docs.convex.dev/client/react#reactivity) to data,
powering a
[realtime `useQuery` hook](https://docs.convex.dev/client/react#fetching-data)
in our [React client](https://docs.convex.dev/client/react). There are also
[Python](https://docs.convex.dev/client/python),
[Rust](https://docs.convex.dev/client/rust),
[ReactNative](https://docs.convex.dev/client/react-native), and
[Node](https://docs.convex.dev/client/javascript) clients, as well as a
straightforward
[HTTP API](https://github.com/get-convex/convex-js/blob/main/src/browser/http_client.ts#L40).

The database supports
[NoSQL-style documents](https://docs.convex.dev/database/document-storage) with
[relationships](https://docs.convex.dev/database/document-ids),
[custom indexes](https://docs.convex.dev/database/indexes/) (including on fields
in nested objects) and [vector search](https://docs.convex.dev/vector-search).

The [`query`](https://docs.convex.dev/functions/query-functions) and
[`mutation`](https://docs.convex.dev/functions/mutation-functions) server
functions have transactional, low latency access to the database and leverage
our [`v8` runtime](https://docs.convex.dev/functions/runtimes) with
[determinism guardrails](https://docs.convex.dev/functions/runtimes#using-randomness-and-time-in-queries-and-mutations)
to provide the strongest ACID guarantees on the market: immediate consistency,
serializable isolation, and automatic conflict resolution via
[optimistic multi-version concurrency control](https://docs.convex.dev/database/advanced/occ)
(OCC / MVCC).

The [`action` server functions](https://docs.convex.dev/functions/actions) have
access to external APIs and enable other side-effects and non-determinism in
either our [optimized `v8` runtime](https://docs.convex.dev/functions/runtimes)
or a more
[flexible `node` runtime](https://docs.convex.dev/functions/runtimes#nodejs-runtime).

Functions can run in the background via
[scheduling](https://docs.convex.dev/scheduling/scheduled-functions) and
[cron jobs](https://docs.convex.dev/scheduling/cron-jobs).

Development is cloud-first, with
[hot reloads for server function](https://docs.convex.dev/cli#run-the-convex-dev-server)
editing via the [CLI](https://docs.convex.dev/cli). There is a
[dashbord UI](https://docs.convex.dev/dashboard) to
[browse and edit data](https://docs.convex.dev/dashboard/deployments/data),
[edit environment variables](https://docs.convex.dev/production/environment-variables),
[view logs](https://docs.convex.dev/dashboard/deployments/logs),
[run server functions](https://docs.convex.dev/dashboard/deployments/functions),
and more.

There are built-in features for
[reactive pagination](https://docs.convex.dev/database/pagination),
[file storage](https://docs.convex.dev/file-storage),
[reactive search](https://docs.convex.dev/text-search),
[https endpoints](https://docs.convex.dev/functions/http-actions) (for
webhooks),
[streaming import/export](https://docs.convex.dev/database/import-export/), and
[runtime data validation](https://docs.convex.dev/database/schemas#validators)
for [function arguments](https://docs.convex.dev/functions/args-validation) and
[database data](https://docs.convex.dev/database/schemas#schema-validation).

Everything scales automatically, and it’s
[free to start](https://www.convex.dev/plans).
