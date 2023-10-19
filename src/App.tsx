import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const ideas = useQuery(api.myFunctions.listIdeas);
  const saveIdea = useMutation(api.myFunctions.saveIdea);
  const fetchIdea = useAction(api.myFunctions.fetchRandomIdea);

  const [newIdea, setNewIdea] = useState("");

  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center">
          Get Hacking with Convex
        </h1>

        <h2>So many app ideas, so little time!</h2>

        <Button
          onClick={async () => {
            await fetchIdea();
          }}
        >
          Generate a random app idea
        </Button>

        <ul className="list-disc">
          {ideas?.map(({ idea }, i) => (
            <li key={i}>{idea}</li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newIdea}
            onChange={(event) => setNewIdea(event.target.value)}
            placeholder="Add your own app idea here"
          />
          <Button
            disabled={!newIdea}
            onClick={async () => {
              await saveIdea({ idea: newIdea });
              setNewIdea("");
            }}
            className="min-w-fit"
          >
            Save idea
          </Button>
        </div>
      </main>
      <footer className="text-center text-xs mt-10">
        Built with Convex, React, Vite, and TS - Random app ideas thanks to{" "}
        <a target="_blank" href="https://appideagenerator.com/">
          appideagenerator.com
        </a>
      </footer>
    </>
  );
}

export default App;
