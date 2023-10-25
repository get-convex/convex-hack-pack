import { useAction, useMutation, useQuery } from "convex/react"
import { api } from "../convex/_generated/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

function App() {
  const [newIdea, setNewIdea] = useState("")
  const [includeRandom, setIncludeRandom] = useState(true)

  const ideas = useQuery(api.myFunctions.listIdeas)
  const saveIdea = useMutation(api.myFunctions.saveIdea)
  const generateIdea = useAction(api.myFunctions.fetchRandomIdea)

  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold mt-8 text-center">
          Get hacking with Convex
        </h1>

        <h2 className="text-center">Let's brainstorm apps to build!</h2>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newIdea}
            onChange={(event) => setNewIdea(event.target.value)}
            placeholder="Type your app idea here"
          />
          <Button
            disabled={!newIdea}
            title={
              newIdea
                ? "Save your idea to the database"
                : "You must enter an idea first"
            }
            onClick={async () => {
              await saveIdea({ idea: newIdea.trim(), random: false })
              setNewIdea("")
            }}
            className="min-w-fit"
          >
            Save idea
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={async () => {
              await generateIdea()
            }}
            title="Save a randomly generated app idea to the database"
          >
            Generate a random app idea
          </Button>

          <div
            className="flex gap-2"
            title="Uh oh, this checkbox doesn't work! Until we fix it ;)"
          >
            <Checkbox
              id="show-random"
              checked={includeRandom}
              onCheckedChange={() => setIncludeRandom(!includeRandom)}
            />
            <Label htmlFor="show-random">Include random ideas</Label>
          </div>
        </div>

        <ul>
          {ideas?.map((document, i) => (
            <li key={i}>
              {document.random ? "🤖 " : "💡 "}
              {document.idea}
            </li>
          ))}
        </ul>
      </main>
      <footer className="text-center text-xs mb-5 mt-10 w-full">
        <p>
          Built with <a href="https://convex.dev">Convex</a>,{" "}
          <a href="https://www.typescriptlang.org">TypeScript</a>,{" "}
          <a href="https://react.dev">React</a>, and{" "}
          <a href="https://vitejs.dev">Vite</a>
        </p>
        <p>
          Random app ideas thanks to{" "}
          <a target="_blank" href="https://appideagenerator.com/">
            appideagenerator.com
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
