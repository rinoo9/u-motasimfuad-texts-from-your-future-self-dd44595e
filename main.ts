import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one funny text message from the writer's future self, sent back
// to the present self. No setup, no context — just the message as it arrives.
// The joke: the future self finally finishes the novel, and the whole book
// turns out to be an apology letter to a neglected houseplant. The twist lands
// on the plant, and the punchline is a nudge to start today.
const LINE =
  "Hey, it's you from 2046. You finally finish the novel — all 900 pages of it. It's an apology letter to your houseplant. Water it today, and maybe start chapter one.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters, not
// only whitespace. Fail loudly instead of writing an entry that cannot win.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
