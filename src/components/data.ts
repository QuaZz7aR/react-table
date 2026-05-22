import type { Worker } from "./Types";

const DATA: Worker[] = [
    {
        task: "Add a New Feature",
        status: null,
        due: new Date("2023/10/15"),
        notes: "This is a note",
    },
    {
        task: "Write Integration Tests",
        status: "On Deck",
        due: null,
        notes: "Use Jest",
    },
    {
        task: "Add Instagram Integration",
        status: null,
        due: null,
        notes: "",
    },
    {
        task: "Cleanup Database",
        status: "In Progress",
        due: new Date("2023/02/15"),
        notes: "Remove old data",
    },
    {
        task: "Refactor API Endpoints",
        status: "Deployed",
        due: null,
        notes: "",
    },
    {
        task: "Add Documentation to API",
        status: "Testing",
        due: new Date("2023/09/12"),
        notes: "Add JS Docs to all endpoints",
    },
    {
        task: "Update NPM Packages",
        status: null,
        due: null,
        notes: "Upgrade React & Chakra UI",
    },
];

export default DATA;