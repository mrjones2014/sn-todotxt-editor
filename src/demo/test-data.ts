export interface TestData {
  title: string;
  text: string;
  meta?: any;
}

const EMPTY = {
  title: "Empty",
  text: "",
};
const SMALL = {
  title: "Small",
  text: "This is the note content for the small example",
  meta: {
    rows: 3,
  },
};

const LARGE = {
  title: "Large",
  text: "This is the note content for the large example",
  meta: {
    rows: 10,
  },
};

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
Buy birthday gift for Sarah @mall +Shopping pri:high
Clean garage @home +Chores rec:weekly
(D) Update resume @computer +Career
x 2025-03-29 2025-03-01 Get car serviced @errands +Car
(A) Plan summer vacation +Family @computer cost:1500
Read chapter 5 of design patterns book +Learning @home
(B) Backup computer files @computer +Tech rec:monthly
x 2025-03-15 Call insurance company about claim @phone +Finance ref:POL-123456
Send thank you notes +Social @home
(C) Follow up on project proposal @work +Project waiting:client
Organize digital photos @computer +Personal
(E) Research investment options +Finance @computer
x 2025-03-10 2025-02-28 Replace bathroom light bulb @home +Repairs
(A) Schedule team meeting @work +Management people:John,Lisa,Mark
Buy new running shoes @store +Health size:10
(B) Renew passport @errands +Travel expires:2025-12-31
Learn to play guitar solo +Hobby @home song:Stairway
x 2025-03-20 2025-03-01 Fix broken link on website @computer +Work url:example.com/page
(D) Review quarterly budget @work +Finance
Water plants @home +Chores rec:3days
(A) Finish project documentation @computer +Work deadline:2025-04-05
x 2025-03-22 2025-03-10 Return library books @errands +Personal
(C) Call contractor about kitchen remodel @phone +Home estimate:5000
Buy anniversary gift @mall +Personal for:wife
Research cloud storage options +Tech @computer
(B) Schedule vet appointment for dog @phone +Pets
x 2025-03-18 2025-02-15 Renew gym membership @errands +Health cost:50/month
(A) Prepare for job interview @home +Career company:TechCorp
Update social media profiles @computer +Personal
(D) Clean out refrigerator @home +Chores
x 2025-03-05 2025-02-28 Mail package to brother @errands +Family tracking:1Z999AA10123456784
(B) Setup automatic bill payments @computer +Finance accounts:power,water,internet
Buy groceries for dinner party @store +Social guests:6
(C) Organize bookshelf @home +Chores
`,
};
