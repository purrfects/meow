import { useEffect, useState } from "react";

import { Send } from "../wailsjs/go/main/App";
import { templates } from "./templates";

function App() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState(8000);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");

  useEffect(() => {
    if (template === "none") return;
    switch (template) {
      case "clear":
        setMessage("");
        setTemplate("none");
        break;

      case "eos-cue-fire":
        setMessage(templates["eos-cue-fire"]);
        setTemplate("none");
        break;

      case "qlab-cue-go":
        setMessage(templates["qlab-cue-go"]);
        setTemplate("none");
        break;

      default:
        break;
    }
  }, [template]);

  return (
    <main className="py-4 px-4">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">MEOW</h1>
          <p>The fastest OSC message sender</p>
        </div>
        <form className="max-w-lg space-y-2">
          <div className="flex flex-row gap-2">
            <div className="flex-col flex flex-1">
              <label htmlFor="host" className="pb-1">
                Host
              </label>
              <input
                type="text"
                id="host"
                className="bg-neutral-800 text-white"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="flex-col flex flex-1/2">
              <label htmlFor="port" className="pb-1">
                Port
              </label>
              <input
                type="text"
                id="port"
                className="bg-neutral-800 text-white"
                value={port}
                onChange={(e) => setPort(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="flex-col flex">
            <label htmlFor="message" className="pb-1">
              Message
            </label>
            <input
              type="text"
              id="message"
              className="bg-neutral-800 text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between mt-2">
            <button
              type="submit"
              onClick={() => Send(host, port, message)}
              className="py-1 px-2 bg-purple-700 text-white cursor-pointer hover:bg-purple-800 duration-150"
            >
              Send Message
            </button>
            <select
              name="templates"
              id="templates"
              className="bg-neutral-800 text-white"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="none" disabled>
                Choose a Template
              </option>
              <option value="clear">Clear</option>
              <optgroup label="Templates">
                <option value="eos-cue-fire">Eos Fire Cue</option>
                <option value="qlab-cue-go">QLab Fire Cue</option>
              </optgroup>
            </select>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
