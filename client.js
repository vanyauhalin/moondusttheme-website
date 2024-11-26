/**
 * @param {Window} w
 * @returns {void}
 */
function define(w) {
  if (w.customElements.get(EditorContainer.tagName)) {
    return
  }

  // @ts-ignore
  w.EditorContainer = EditorContainer
  w.customElements.define(EditorContainer.tagName, EditorContainer)
}

class EditorContainer extends HTMLElement {
  /**
   * @returns {"editor-container"}
   */
  static get tagName() {
    return "editor-container"
  }

  /**
   * @returns {NodeListOf<HTMLElement>}
   */
  get #targetElements() {
    return this.querySelectorAll("[aria-labelledby]")
  }

  /**
   * @returns {NodeListOf<HTMLButtonElement>}
   */
  get #syntaxElements() {
    return this.querySelectorAll("button[name=syntax]")
  }

  /**
   * @returns {NodeListOf<HTMLButtonElement>}
   */
  get #variantElements() {
    return this.querySelectorAll("button[name=variant]")
  }

  #defaultSyntax = "js"

  #defaultVariant = "Your Side of the Moon"

  #tv = new ThemeVariant()

  /**
   * @returns {void}
   */
  connectedCallback() {
    this.#setup()
    this.#listen()
  }

  /**
   * @returns {void}
   */
  disconnectedCallback() {
    this.#delisten()
  }

  /**
   * @returns {void}
   */
  #setup() {
    this.#toggleSyntax()
    this.#toggleVariant()
  }

  /**
   * @returns {void}
   */
  #listen() {
    addEventListener("popstate", this)
    this.addEventListener("click", this)
  }

  /**
   * @returns {void}
   */
  #delisten() {
    removeEventListener("popstate", this)
    this.removeEventListener("click", this)
  }

  /**
   * @param {Event} e
   * @returns {void}
   */
  handleEvent(e) {
    if (isPopStateEvent(e)) {
      e.preventDefault()
      this.#toggleSyntax()
      return
    }

    if (isClickEvent(e) && isSyntaxElement(e.target)) {
      if (location.hash === `#${e.target.value}`) {
        location.hash = ""
      } else {
        location.hash = e.target.value
      }
      this.#toggleSyntax()
      return
    }

    if (isClickEvent(e) && isVariantElement(e.target)) {
      if (e.target.getAttribute("aria-selected") === "true") {
        this.#tv.value = ""
      } else {
        this.#tv.value = e.target.value
      }
      this.#toggleVariant()
      return
    }
  }

  /**
   * @returns {void}
   */
  #toggleSyntax() {
    let id = this.#defaultSyntax

    if (location.hash) {
      id = location.hash.slice(1)
    }

    for (let te of this.#targetElements) {
      if (te.getAttribute("aria-labelledby") !== id) {
        te.hidden = true
      } else {
        te.hidden = false
      }

      let tp = te.parentElement

      if (tp) {
        tp.scrollTop = 0
      }

      if (!te.hidden && location.hash) {
        scrollTo({top: te.offsetTop - 28 * 2})
      }
    }

    for (let se of this.#syntaxElements) {
      if (se.value !== id) {
        se.removeAttribute("aria-selected")
      } else {
        se.setAttribute("aria-selected", "true")
      }
    }
  }

  /**
   * @returns {void}
   */
  #toggleVariant() {
    let v = this.#defaultVariant

    if (this.#tv.value) {
      v = this.#tv.value
    }

    for (let ve of this.#variantElements) {
      if (ve.value !== v) {
        ve.removeAttribute("aria-selected")
      } else {
        ve.setAttribute("aria-selected", "true")
      }
    }

    document.documentElement.dataset.themeVariant = v
  }
}

class ThemeVariant {
  /**
   * @returns {"theme-variant"}
   */
  static get #key() {
    return "theme-variant"
  }

  /**
   * @returns {string}
   */
  get value() {
    let t = localStorage.getItem(ThemeVariant.#key)
    if (!t) {
      return ""
    }
    return t
  }

  /**
   * @param {string} v
   */
  set value(v) {
    if (!v) {
      localStorage.removeItem(ThemeVariant.#key)
      return
    }
    localStorage.setItem(ThemeVariant.#key, v)
  }
}

/**
 * @param {unknown} e
 * @returns {e is HTMLButtonElement}
 */
function isSyntaxElement(e) {
  return e instanceof HTMLButtonElement && e.name === "syntax"
}

/**
 * @param {unknown} e
 * @returns {e is HTMLButtonElement}
 */
function isVariantElement(e) {
  return e instanceof HTMLButtonElement && e.name === "variant"
}

/**
 * @param {unknown} e
 * @returns {e is KeyboardEvent}
 */
function isClickEvent(e) {
  return e instanceof Event && e.type === "click"
}

/**
 * @param {unknown} e
 * @returns {e is PopStateEvent}
 */
function isPopStateEvent(e) {
  return e instanceof Event && e.type === "popstate"
}

define(window)
