import { Button } from "@/components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const checkboxClass = "flex items-center gap-2";

function App() {
  const steps = useQuery(api.myFunctions.listSteps);
  const getHacking = useMutation(api.myFunctions.getHacking);

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Get Hacking with Convex
      </h1>
      {steps && steps.length === 0 ? (
        <>
          <p>Ready to start building rapid prototypes with Convex?</p>
          <p>
            <Button
              onClick={() => {
                getHacking();
              }}
            >
              Let's go!
            </Button>
          </p>
        </>
      ) : (
        <>
          {steps?.map(({ name, label, done }) => (
            <div className={checkboxClass}>
              <Checkbox id={name} checked={done} />
              <label htmlFor={name}>{label}</label>
            </div>
          ))}
          {/* <div className={checkboxClass}>
            <Checkbox id="dashboard" />
            <label htmlFor="dashboard">
              Visit{" "}
              <a
                className="font-medium text-primary underline underline-offset-4"
                target="_blank"
                href="https://dashboard.convex.dev/"
              >
                dashboard.convex.dev
              </a>{" "}
              to view & edit your data
            </label>
          </div>
          <div className={checkboxClass}>
            <Checkbox id="backend" />
            <label htmlFor="backend">
              Edit{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                convex/myFunctions.ts
              </code>{" "}
              to change your backend
            </label>
          </div>

          <div className={checkboxClass}>
            <Checkbox id="frontend" />
            <label htmlFor="frontend">
              Edit{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                src/App.tsx
              </code>{" "}
              to change your frontend
            </label>
          </div>
          <div className={checkboxClass}>
            <Checkbox id="docs" />
            <label htmlFor="docs">
              Check out the{" "}
              <a
                className="font-medium text-primary underline underline-offset-4"
                target="_blank"
                href="https://docs.convex.dev/home"
              >
                Convex docs
              </a>{" "}
              to learn more
            </label>
          </div> */}
        </>
      )}
    </main>
  );
}

export default App;
