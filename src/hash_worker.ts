import { AsyncSha256 } from "./sha-256.js";

// In this file, you can define the worker script that will compute the
// hash digest for a given file. Of course, it is up to you what kind
// of messages should the worker receive/send.

const hasher = new AsyncSha256();
hasher.async_digest(
  "Some data (represented as string)",
  (hash) => console.log(hash),
  (remaining) => console.log(remaining),
);

onmessage = (e) => {
    const file = e.data as File;
    const reader = new FileReader();

    let shaHash: string;
    let remainingNum: number;
    let total: number;

    reader.onload = () => {
        const fileData = reader.result as string;

        // At this point, we know how much data we have.
        total = fileData.length;

        postMessage({
            type: "start",
            size: fileData.length,
        })

        const hasher = new AsyncSha256();
        hasher.async_digest(
            fileData,
            (hash) => {
                // We are done.
                shaHash = hash;
                remainingNum = 0;
                postMessage({
                    hash : shaHash,
                    total : total,
                    type : "done"
                })
            },
            (remaining) => {
                // Update progress.
                remainingNum = remaining;
                postMessage({
                    type: "progress",
                    remaining : remainingNum
                })
            },
        );
    };
    reader.readAsText(file);


}
