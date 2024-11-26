/**
 * @import {Element, ElementContent, Root} from "hast"
 * @import {ShikiTransformer} from "shiki"
 */

import {transformerRenderWhitespace} from "@shikijs/transformers"
import {createHighlighter} from "shiki"
import * as grammar from "./moondusttheme/grammar.js"
import * as theme from "./moondusttheme/main.js"
import * as syntax from "./moondusttheme/syntax.js"
import * as vendor from "./moondusttheme/vendor.js"

/**
 * @typedef {Object} Example
 * @property {ExampleConfig} config
 * @property {string} html
 */

/**
 * @returns {Promise<void>}
 */
export async function pull() {
  /** @type {Promise<void>[]} */
  let a = []

  for (let c of Object.values(configs())) {
    let e = pullExample(c)
    a.push(e)
  }

  await Promise.all(a)
}

/**
 * @returns {Promise<Example[]>}
 */
export async function list() {
  let ga = await grammar.list()
  let th = theme.light()
  let ht = await createHighlighter({
    langs: ga,
    themes: [structuredClone(th)],
  })
  let st = syntax.theme(th)

  /** @type {Promise<Example>[]} */
  let a = []

  for (let c of Object.values(configs())) {
    let p = readExample(ht, c, {
      lang: grammar.scope(c.id),
      theme: th.name,
      transformers: [
        transformerRenderWhitespace({classSpace: "ws", classTab: "wt"}),
        transformer(st),
      ],
    })
    a.push(p)
  }

  return await Promise.all(a)
}

/**
 * @typedef {Object} ExampleConfig
 * @property {string} id
 * @property {string} name
 * @property {ExampleConfigAuthor} author
 * @property {ExampleConfigSource} source
 */

/**
 * @typedef {Object} ExampleConfigAuthor
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {Object} ExampleConfigSource
 * @property {string} name
 * @property {string} file
 */

/**
 * @returns {ExampleConfig[]}
 */
function configs() {
  return [
    {
      id: "css",
      name: "CSS",
      author: {
        name: "Julia Miocene",
        url: "https://github.com/Miocene/",
      },
      source: {
        name: "Portraits Pure CSS Animation",
        file: "https://github.com/Miocene/animations/blob/d83b89b38a0f286b374344e210ecd2a61fe6a671/2023_05_portraits/style.css/",
      },
    },
    {
      id: "dockerfile",
      name: "Dockerfile",
      author: {
        name: "NGINX",
        url: "https://github.com/nginxinc/",
      },
      source: {
        name: "NGINX Alpine Dockerfile",
        file: "https://github.com/nginxinc/docker-nginx/blob/1.25.4/stable/alpine/Dockerfile/",
      },
    },
    {
      id: "fish",
      name: "fish",
      author: {
        name: "Jorge Bucaran",
        url: "https://github.com/jorgebucaran/",
      },
      source: {
        name: "A plugin manager for Fish",
        file: "https://github.com/jorgebucaran/fisher/blob/4.4.4/functions/fisher.fish/",
      },
    },
    {
      id: "go",
      name: "Go",
      author: {
        name: "Alec Thomas",
        url: "https://github.com/alecthomas/",
      },
      source: {
        name: "Kong",
        file: "https://github.com/alecthomas/kong/blob/v0.9.0/kong.go/",
      },
    },
    {
      id: "go.mod",
      name: "Go Module",
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/",
      },
      source: {
        name: "Invoice",
        file: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.mod/",
      },
    },
    {
      id: "go.sum",
      name: "Go Sum",
      author: {
        name: "Maas Lalani",
        url: "https://github.com/maaslalani/",
      },
      source: {
        name: "Invoice",
        file: "https://github.com/maaslalani/invoice/blob/v0.1.0/go.sum/",
      },
    },
    {
      id: "html",
      name: "HTML",
      author: {
        name: "Vadim Makeev",
        url: "https://github.com/pepelsbey/",
      },
      source: {
        name: "Two Columns Article",
        file: "https://github.com/pepelsbey/pepelsbey.dev/blob/6f3c41050ea299da49b3358e2c87108fd0404a52/src/articles/two-columns/demos/flexbox.html/",
      },
    },
    {
      id: "ini",
      name: "INI",
      author: {
        name: "Nushell",
        url: "https://github.com/nushell/",
      },
      source: {
        name: "Nushell",
        file: "https://github.com/nushell/nushell/blob/0.91.0/tests/fixtures/formats/sample.ini/",
      },
    },
    {
      id: "js",
      name: "JavaScript",
      author: {
        name: "Luke Edwards",
        url: "https://github.com/lukeed/",
      },
      source: {
        name: "uvu",
        file: "https://github.com/lukeed/uvu/blob/v0.5.6/src/assert.js/",
      },
    },
    {
      id: "json",
      name: "JSON",
      author: {
        name: "typicode",
        url: "https://github.com/typicode/",
      },
      source: {
        name: "JSON Server",
        file: "https://github.com/typicode/json-server/blob/v0.17.4/package.json/",
      },
    },
    {
      id: "jsonc",
      name: "JSON with Comments",
      author: {
        name: "typicode",
        url: "https://github.com/typicode/",
      },
      source: {
        name: "JSON Server",
        file: "https://github.com/typicode/json-server/blob/v0.17.4/package.json/",
      },
    },
    {
      id: "jsonl",
      name: "JSON Lines",
      author: {
        name: "typicode",
        url: "https://github.com/typicode/",
      },
      source: {
        name: "JSON Server",
        file: "https://github.com/typicode/json-server/blob/v0.17.4/package.json/",
      },
    },
    {
      id: "jsx",
      name: "JSX",
      author: {
        name: "Semantic",
        url: "https://github.com/Semantic-Org/",
      },
      source: {
        name: "Semantic UI React",
        file: "https://github.com/Semantic-Org/Semantic-UI-React/blob/v2.1.5/docs/src/components/ComponentDoc/ComponentDoc.js/",
      },
    },
    {
      id: "makefile",
      name: "Makefile",
      author: {
        name: "Meta",
        url: "https://github.com/facebook/",
      },
      source: {
        name: "zstd",
        file: "https://github.com/facebook/zstd/blob/zstd-0.4.2/Makefile/",
      },
    },
    {
      id: "rb",
      name: "Ruby",
      author: {
        name: "Ruby",
        url: "https://github.com/ruby/",
      },
      source: {
        name: "OpenURI",
        file: "https://github.com/ruby/open-uri/blob/v0.4.1/lib/open-uri.rb/",
      },
    },
    {
      id: "rs",
      name: "Rust",
      author: {
        name: "Rust",
        url: "https://github.com/rust-lang/"
      },
      source: {
        name: "Cargo",
        file: "https://github.com/rust-lang/cargo/blob/0.79.0/src/bin/cargo/main.rs/"
      },
    },
    {
      id: "sh",
      name: "Shell Script",
      author: {
        name: "LLVM",
        url: "https://github.com/llvm/",
      },
      source: {
        name: "BOLT",
        file: "https://github.com/llvm/llvm-project/blob/llvmorg-18.1.5/bolt/utils/bughunter.sh/",
      },
    },
    {
      id: "sql",
      name: "SQL",
      author: {
        name: "launchbadge",
        url: "https://github.com/launchbadge/",
      },
      source: {
        name: "SQLx",
        file: "https://github.com/launchbadge/sqlx/blob/v0.7.4/tests/sqlite/setup.sql/",
      },
    },
    {
      id: "swift",
      name: "Swift",
      author: {
        name: "Alin Panaitiu",
        url: "https://github.com/alin23/",
      },
      source: {
        name: "Lunar",
        file: "https://github.com/alin23/Lunar/blob/v6.7.13/Lunar/Controllers/ControlChoiceViewController.swift/",
      },
    },
    {
      id: "toml",
      name: "TOML",
      author: {
        name: "jdx",
        url: "https://github.com/jdx/",
      },
      source: {
        name: "mise",
        file: "https://github.com/jdx/mise/blob/main/Cargo.toml/",
      },
    },
    {
      id: "ts",
      name: "TypeScript",
      author: {
        name: "Vitest",
        url: "https://github.com/vitest-dev/",
      },
      source: {
        name: "Vitest",
        file: "https://github.com/vitest-dev/vitest/blob/v1.4.0/packages/vitest/src/typecheck/collect.ts/",
      },
    },
    {
      id: "tsx",
      name: "TSX",
      author: {
        name: "The Washington Post",
        url: "https://github.com/washingtonpost/",
      },
      source: {
        name: "WPDS's UI Kit",
        file: "https://github.com/washingtonpost/wpds-ui-kit/blob/v1.23.1/ui/popover/src/play.stories.tsx/",
      },
    },
    {
      id: "yaml",
      name: "YAML",
      author: {
        name: "Google",
        url: "https://github.com/google/",
      },
      source: {
        name: "Brotli",
        file: "https://github.com/google/brotli/blob/v1.1.0/.github/workflows/release.yaml/",
      },
    },
  ]
}

/**
 * @param {ExampleConfig} c
 * @returns {Promise<void>}
 */
async function pullExample(c) {
  let r = await vendor.fetch(c.source.file)
  let e = await r.text()
  await vendor.write(c.source.file, e)
}

/**
 * @param {Awaited<ReturnType<typeof createHighlighter>>} h
 * @param {ExampleConfig} c
 * @param {any} p
 * @returns {Promise<Example>}
 */
async function readExample(h, c, p) {
  let s = await vendor.read(c.source.file)
  let t = h.codeToHtml(s, p)
  return {config: c, html: t}
}

/**
 * @param {syntax.SyntaxTheme} st
 * @returns {ShikiTransformer}
 */
function transformer(st) {
  return {root}

  /**
   * @param {Root} r
   * @returns {Root}
   */
  function root(r) {
    // <></>
    let e = r.children[0]
    if (e.type === "element") {
      r.children = pre(e).children
    }
    return r
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function pre(e) {
    // <pre></pre>
    let c = e.children[0]
    if (c.type === "element") {
      e.children[0] = code(c)
    }
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function code(e) {
    // <code></code>
    /** @type {ElementContent[]} */
    let a = []
    for (let ec of e.children) {
      if (ec.type === "element") {
        let e = line(ec)
        a.push(...e.children)
        continue
      }
      a.push(ec)
    }
    e.children = a
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function line(e) {
    // <span class="line"></span>
    if ("class" in e.properties && e.properties.class === "line") {
      /** @type {ElementContent[]} */
      let a = []
      for (let ec of e.children) {
        if (ec.type === "element") {
          let e = color(ec)
          a.push(e)
          continue
        }
        a.push(ec)
      }
      e.children = a
    }
    return e
  }

  /**
   * @param {Element} e
   * @returns {Element}
   */
  function color(e) {
    // <span style="color:#"></span>
    if ("style" in e.properties) {
      let s = String(e.properties.style)
      delete e.properties.style
      e.properties.class = cls(s)
    }
    return e
  }

  /**
   * @param {string} s
   * @returns {string}
   */
  function cls(s) {
    s = s.replace("color:", "")
    switch (s) {
    case st.comment[0]:
      return "c0"
    case st.plain[0]:
      return "p0"
    case st.plain[1]:
      return "p1"
    case st.string[0]:
      return "s0"
    case st.string[1]:
      return "s1"
    default:
      throw new Error(`Unknown color: ${s}`)
    }
  }
}
