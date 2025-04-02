import { addDays, format, subDays } from "date-fns";

export interface TestData {
  title: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

const DATE_FMT = "yyyy-MM-dd";

export const genTestData = (): TestData => {
  const now = new Date();
  const fmt = (date: Date) => format(date, DATE_FMT);

  // Calculate some useful dates
  const today = fmt(now);
  const tomorrow = fmt(addDays(now, 1));
  const inThreeDays = fmt(addDays(now, 3));
  const inSevenDays = fmt(addDays(now, 7));
  const yesterday = fmt(subDays(now, 1));
  const twoDaysAgo = fmt(subDays(now, 2));
  const fiveDaysAgo = fmt(subDays(now, 5));

  return {
    title: "TODO.txt Editor",
    text: `
(A) Call Mom @phone +Family
(B) Schedule dentist appointment @phone +Health due:2025-04-15
x 2025-03-25 Submit tax returns @computer +Finance
x 2025-03-30 2025-03-15 Fix leaky faucet @home +Repairs
Buy milk and eggs @store +Shopping
(C) Prepare presentation for meeting @work +Project due:2025-04-10

(A) Finish quarterly report @work +Project due:${today}
Review team member performance @work +Management due:${today}

(B) Send birthday card to Dad @personal +Family due:${tomorrow}
(C) Update website content @computer +Website due:${inThreeDays}
(A) Prepare for client meeting @work +Client due:${inSevenDays}

(A) Submit expense reports @finance +Work due:${yesterday}
(B) Return library books @errands +Personal due:${twoDaysAgo}
(C) Call insurance company about claim @phone +Finance due:${fiveDaysAgo}

Research new programming language +Learning @computer
x 2025-03-28 Pay electricity bill @finance due:2025-03-25
(A) 2025-03-20 Write blog post about productivity @computer +Writing
`,
  };
};
