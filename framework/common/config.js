const path = require("path")
const fs = require("fs")
const prettier = require("prettier")
const merge = require("deepmerge")

const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"]

function withFrameworkConfig(defaultConfig = {}){
  let framework = defaultConfig?.framework?.name;
  const fallbackFramework = "shopify"

  if(!framework){
    throw new Error("The api framework is missing in your config. Please provide a valid framework.")
  }

  if(!ALLOWED_FW.includes(framework)){
    throw new Error(`
      The framework you provided is not allowed. 
      Please provide one of the following frameworks: (${ALLOWED_FW.join(", ")}).
    `)
  }

  if(framework === "shopify_local"){
    framework = fallbackFramework
  }

  const frameworkNextConfig = require(path.join("../", framework, "next.config"))

  const config = merge(defaultConfig, frameworkNextConfig)

  const tspath = path.join(process.cwd(), "tsconfig.json")
  const tsConfig = require(tspath)

  tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`]
  tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`]

  fs.writeFileSync(
    tspath,
    prettier.format(JSON.stringify(tsConfig), { parser:"json" })
  )
  return config
}

module.exports = { withFrameworkConfig }