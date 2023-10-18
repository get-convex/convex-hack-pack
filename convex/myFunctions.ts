import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query function:
export const listSteps = query({
  // Validators for arguments. (In this case, we have no arguments.)
  args: {},

  // Query function implementation.
  handler: async (ctx) => {
    //// Read the database as many times as you need here.
    //// See https://docs.convex.dev/database/reading-data.
    return await ctx.db.query("steps").collect();
  },
});

// You can write data to the database via a mutation function:
export const getHacking = mutation({
  // Validators for arguments.
  args: {},
  handler: async (ctx) => {
    for (const step of steps) {
      await ctx.db.insert("steps", step);
    }
  },
});

export const addStep = mutation({
  // Validators for arguments.
  args: {
    number: v.number(),
    name: v.string(),
    label: v.string(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const { number, name, label } = args;

    const id = await ctx.db.insert("steps", {
      number,
      name,
      label,
      done: false,
    });

    // Optionally, write to the server logs from within your function.
    console.log("Added new document with id:", id);

    // Optionally, return a value from your mutation.
    return id;
  },
});

// // You can fetch data from and send data to third-party APIs via an action:
// export const myAction = action({
//   // Validators for arguments.
//   args: {
//     first: v.number(),
//     second: v.string(),
//   },

//   // Action implementation.
//   handler: async (ctx, args) => {
//     //// Use the browser-like `fetch` API to send HTTP requests.
//     //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     // const response = await ctx.fetch("https://api.thirdpartyservice.com");
//     // const data = await response.json();

//     //// Query data by running Convex queries.
//     const data = await ctx.runQuery(api.myFunctions.listNumbers, {
//       count: 10,
//     });
//     console.log(data);

//     //// Write data by running Convex mutations.
//     await ctx.runMutation(api.myFunctions.addNumber, {
//       value: args.first,
//     });
//   },
// });
