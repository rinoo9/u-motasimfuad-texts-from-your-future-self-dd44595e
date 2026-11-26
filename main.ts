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
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_PATH = "/output/entry.txt";

// Check a candidate line against the gate. Throws with a precise message so
// a bad line is caught here, never silently written to the entry file.
function validateLine(line: string): void {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

// Write a validated line to the entry file, creating the output directory
// first. The written bytes are exactly the line passed in — no trimming,
// no trailing newline added.
function writeEntry(line: string): void {
  validateLine(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
}

// Count the words in a candidate line. Words are maximal runs of
// non-whitespace characters; the count is only ever used for the log line
// below, never to change what gets written to the entry file.
function wordCount(line: string): number {
  const words = line.trim().split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

// One-line human-readable summary of the entry: characters and words.
// Pure function, no I/O, so the entry file stays byte-identical.
function entrySummary(line: string): string {
  return `${line.length} chars, ${wordCount(line)} words`;
}

function main(): void {
  console.error(`entry: ${entrySummary(LINE)}`);
  writeEntry(LINE);
}

main();
