/**
 * @import {EleventyTemplate} from "./eleventy.config.js"
 * @import {Example} from "./example.js"
 */

/**
 * @returns {EleventyTemplate[]}
 */
export function list() {
  return [
    {
      path: "index.11ty.js",
      async render(c) {
        return page({
          url: c.page.url,
          title: "Moondust Theme",
          description: "Handcrafted theme for those who have not found syntax highlighting useful for themself",
          generator: c.eleventy.generator,
          css: c.css,
          js: c.js,
        }, [
          header(),
          home({
            examples: c.examples,
          }),
          footer({
            stars: c.stars,
            installs: c.installs,
          }),
        ])
      },
    },
    {
      path: "404.11ty.js",
      async render(c) {
        return page({
          url: c.page.url,
          title: "404 / Moondust Theme",
          description: "",
          generator: c.eleventy.generator,
          css: c.css,
          js: c.js,
        }, [
          header(),
          html`<h1 class="four">404</h1><editor-container></editor-container>`,
          footer({
            stars: c.stars,
            installs: c.installs,
          }),
        ])
      },
    },
  ]
}

/**
 * @typedef {Object} PageProperties
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {string} generator
 * @property {string} css
 * @property {string} js
 */

/**
 * @param {PageProperties} p
 * @param {string[]} c
 * @returns {string}
 */
function page(p, c) {
  return html`<html lang="en" data-theme-variant="Your Side of the Moon">
    <head>
      <meta charset="utf-8">
      <title>${p.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="view-transition" content="same-origin">
      <meta name="description" content="${p.description}">
      <meta name="generator" content="${p.generator}">
      <meta name="theme-color" content="#24292D">
      <meta property="og:type" content="website">
      <meta property="og:title" content="${p.title}">
      <meta property="og:description" content="${p.description}">
      <meta property="og:url" content="https://moodustthe.me/">
      <link rel="icon" href="/favicon.ico" sizes="any">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml">
      <link rel="apple-touch-icon" href="/favicon.png">
      <link rel="canonical" href="https://moodustthe.me${p.url}">
      <link rel="me" href="https://vanyauhalin.me/">
      <link rel="preload" href="/Questrial-Regular.woff2" crossorigin="" as="font" type="font/woff2">
      <style>${p.css}</style>
      <script defer type="module">${p.js}</script>
    </head>
    <body class="body">
      ${c.join("")}
    </body>
  </html>`
}

/**
 * @returns {string}
 */
function header() {
  return html`<header class="header">
    <div class="header__leading">
      <a href="/">Moondust</a>
    </div>
    <div class="header__middle">
      <p>Handcrafted theme for those who have not found syntax highlighting useful for themself.</p>
    </div>
    <div class="header__trailing">
      <p><a href="https://github.com/vanyauhalin/moondusttheme/">GitHub</a></p>
    </div>
  </header>`
}

/**
 * @typedef {Object} FooterProperties
 * @property {number} stars
 * @property {number} installs
 */

/**
 * @param {FooterProperties} p
 * @returns {string}
 */
function footer(p) {
  return html`<footer class="footer">
    <div class="footer__leading">
      <a href="/">Moondust</a>
    </div>
    <div class="footer__middle">
      <p>${p.stars} stars</p>
      <p>${p.installs} installs</p>
    </div>
    <div class="footer__trailing">
      <p><a href="https://github.com/vanyauhalin/moondusttheme/">Give a star</a>, <a href="https://github.com/vanyauhalin/moondusttheme/issues/new/">leave a comment</a></p>
      <p>Copyright © 2024 <a href="https://vanyauhalin.me/">Ivan Uhalin</a></p>
    </div>
  </footer>`
}

/**
 * @typedef {Object} HomeProperties
 * @property {Example[]} examples
 */

/**
 * @param {HomeProperties} p
 * @returns {string}
 */
function home(p) {
  return html`<div class="home">
    <div class="home__editor">
      <editor-container>
        <div class="editor">
          <div class="editor__sidebar">
            <div class="editor__container">
              <div class="editor__section">
                <h3>Syntaxes</h3>
                <div class="editor__options">
                  ${p.examples.map((e) => html`<button id="${e.config.id}" type="button" name="syntax" value="${e.config.id}" ${e.config.id === "js" ? "aria-selected=\"true\"" : ""}>${e.config.name}</button>`).join("")}
                </div>
              </div>
              <div class="editor__section">
                <h3>Variants</h3>
                <div class="editor__options">
                  <button type="button" name="variant" value="Near Side of the Moon">Near Side of the Moon</button>
                  <button type="button" name="variant" value="Far Side of the Moon">Far Side of the Moon</button>
                </div>
              </div>
            </div>
            <div class="editor__credentials">
              <h3 class="sr-only">Credentials</h3>
              <p>Source code of ${p.examples.map((e) => html`<a href="${e.config.source.file}" aria-labelledby="${e.config.id}" ${e.config.id !== "js" ? "hidden" : ""}>${e.config.source.name}</a>`).join("")}</p>
              <p>by ${p.examples.map((e) => html`<a href="${e.config.author.url}" aria-labelledby="${e.config.id}" ${e.config.id !== "js" ? "hidden" : ""}>${e.config.author.name}</a>`).join("")}
              </p>
            </div>
          </div>
          <div class="editor__body">
            ${p.examples.map((e) => html`<pre class="sh" aria-labelledby="${e.config.id}" ${e.config.id !== "js" ? "hidden" : ""}>${e.html}</pre>`).join("")}
          </div>
        </div>
      </editor-container>
    </div>
    <div class="home__article">
      <div class="home__distribution">
        <a href="https://marketplace.visualstudio.com/items?itemName=vanyauhalin.moondusttheme">VSCode Marketplace</a><a href="https://open-vsx.org/extension/vanyauhalin/moondusttheme/">Open VSX Registry</a><a href="https://github.com/vanyauhalin/moondusttheme/releases/">GitHub Releases</a>
      </div>
      <div class="home__content">
        <p>Early on in my programming journey, syntax highlighting aided my understanding the coding. However, as I gained more experience, I found myself relying less on it. Eventually, I realized that the abundance of colors was very straining on my eyes and made it difficult to focus and concentrate.</p>
        <p>Moondust is crafted to reduce eye strain, allowing to focus on code. It challenges the conventional approach of highlighting keywords and typical structures. Instead of drawing excessive attention to them, this theme brings business logic to the forefront.</p>
        <p>For a more in-depth discussion on the issues associated with the conventional approach to syntax highlighting, recommend reading the articles <a href="https://www.linusakesson.net/programming/syntaxhighlighting/">A case against syntax highlighting</a> and <a href="https://buttondown.email/hillelwayne/archive/syntax-highlighting-is-a-waste-of-an-information/">Syntax highlighting is a waste of an information channel</a>.</p>
        <p>Moondust is tailored for each syntax individually. At present, it supports ${p.examples.map((e, i) => i !== p.examples.length - 1 ? html`<a href="#${e.config.id}">${e.config.name}</a>, ` : html`and <a href="#${e.config.id}">${e.config.name}</a>.`).join("")}</p>
        <p>In the <a href="https://github.com/primer/github-vscode-theme/discussions/341/">initial phase</a>, Moondust was primarily a modification of the <a href="https://github.com/primer/github-vscode-theme/">GitHub Theme</a>. I owe a great deal of gratitude to the Primer team for their work.</p>
        <p>A special shout-out goes to the entire community that focuses on creating minimalistic, two-color, monochrome themes, particularly <a href="https://github.com/anotherglitchinthematrix/monochrome/">Monochrome</a>. It was a delight for me to delve into your work, and it is heartening to realize that our aesthetic preferences align closely.</p>
      </div>
    </div>
  </div>`
}

/**
 * @param {TemplateStringsArray} t
 * @param {unknown[]} a
 * @returns {string}
 */
function html(t, ...a) {
  return h(t, ...a)
}

/**
 * @param {TemplateStringsArray} t
 * @param {unknown[]} a
 * @returns {string}
 */
function h(t, ...a) {
  let s = ""

  for (let i = 0; i < t.length; i += 1) {
    s += t[i]

    let v = a[i]
    if (v === undefined) {
      continue
    }

    s += String(v)
  }

  return s
}
