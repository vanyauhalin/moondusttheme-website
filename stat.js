import child from "node:child_process"
import {promisify} from "node:util"

const exec = promisify(child.exec)

/**
 * @returns {Promise<number>}
 */
export async function stars() {
  let n = 0

  let o = await json("gh repo view --json stargazerCount vanyauhalin/moondusttheme")
  n += o.stargazerCount

  return n
}

/**
 * @returns {Promise<number>}
 */
export async function installs() {
  let n = 0

  let o = await json("vsce show --json vanyauhalin.moondusttheme")
  for (let s of o.statistics) {
    if (s.statisticName === "install") {
      n += s.value
      break
    }
  }

  o = await json("ovsx get --metadata vanyauhalin.moondusttheme")
  n += o.downloadCount

  return n
}

/**
 * @param {string} cmd
 * @returns {Promise<any>}
 */
async function json(cmd) {
  let c = await command(cmd)

  if (c.stderr) {
    let m = String(c.stderr)
    throw new Error(m)
  }

  let s = String(c.stdout)
  return JSON.parse(s)
}

/**
 * @param {string} cmd
 * @returns {Promise<Awaited<ReturnType<typeof exec>>>}
 */
async function command(cmd) {
  return await exec(`command ${cmd}`)
}
