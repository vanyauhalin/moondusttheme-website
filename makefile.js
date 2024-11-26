import process from "node:process"
import sade from "sade"
import * as grammar from "./moondusttheme/grammar.js"
import * as example from "./example.js"

/**
 * @returns {void}
 */
function main() {
  sade("makefile.js")
    .command("pull")
    .action(pull)
    .parse(process.argv)
}

/**
 * @returns {Promise<void>}
 */
async function pull() {
  await grammar.pull([])
  await example.pull()
}

main()
