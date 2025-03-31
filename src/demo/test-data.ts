export interface TestData {
  title: string;
  text: string;
  meta?: any;
}

export const TEST_DATA: TestData = {
  title: "TODO.txt Editor",
  text: `
(A) Call Mom @phone +Family
(B) Schedule dentist appointment @phone +Health due:2025-04-15
x 2025-03-25 Submit tax returns @computer +Finance
x 2025-03-30 2025-03-15 Fix leaky faucet @home +Repairs
Buy milk and eggs @store +Shopping
(C) Prepare presentation for meeting @work +Project due:2025-04-10
Research new programming language +Learning @computer
x 2025-03-28 Pay electricity bill @finance due:2025-03-25
(A) 2025-03-20 Write blog post about productivity @computer +Writing
`,
};
