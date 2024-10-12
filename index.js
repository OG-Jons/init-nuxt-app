#!/usr/bin/env node

import {checkbox, input, select, Separator, confirm} from "@inquirer/prompts"
import {get_executor, create_project, tailwind, module_registry} from "./scripts.js";
import command_exists from "command-exists"
import chalk from "chalk";

let args = process.argv;

if (args.length > 2) {
    console.log(chalk.red(`Arguments aren't supported`))
    process.exit(1)
}


let package_managers = [
    {
        name: "npm",
        value: "npm",
        disabled: true,
    },
    {
        name: "pnpm",
        value: "pnpm",
        disabled: true
    },
    {
        name: "yarn",
        value: "yarn",
        disabled: true
    },
    {
        name: "bun",
        value: "bun",
        disabled: true
    },
]

const get_available_package_managers = async (pms) => {
    const promise_arr = pms.map(async (pm) => {
        await command_exists(pm.name)
            .then(() => pm.disabled = false)
            .catch(() => pm.disabled = `(${pm.name} is not available)`)
        return pm
    })
    pms = await Promise.all(promise_arr)
    pms.sort((x, y) => {
        if (typeof x.disabled === 'string' && typeof y.disabled !== 'string') {
            return 1
        }
        if (typeof x.disabled !== 'string' && typeof y.disabled === 'string') {
            return -1
        }
        return 1
    })
    return pms
}

package_managers = await get_available_package_managers(package_managers)
let project_name, pm, modules, git
try {
    project_name = await input({
        message: 'Enter your project name:',
        default: "nuxt-app"
    });

    pm = await select({
        message: 'Select a package manager',
        choices: package_managers
    });

    git = await confirm({
        message: "Do you want to use git?",
        default: false
    })

    modules = await checkbox({
        message: "Select the modules you want to add:",
        choices: [
            new Separator("────────Must Haves────────"),
            {
                name: "TailwindCSS",
                value: "tailwind",
                checked: true
            },
            {
                name: "VueUse",
                value: "vueuse",
                checked: true
            },
            {
                name: "ESLint",
                value: "eslint",
                checked: true
            },
            {
                name: "Testing",
                value: "test",
                checked: true
            },
            new Separator("──────Best Practices──────"),
            {
                name: "Fonts",
                value: "fonts"
            },
            {
                name: "SEO",
                value: "seo"
            },
            {
                name: "Scripts",
                value: "scripts"
            },
            new Separator("──────────Useful──────────"),
            {
                name: "Icons",
                value: "icons"
            },
            {
                name: "Color Mode",
                value: "color"
            },
            {
                name: "Animate",
                value: "animate"
            },
            {
                name: "Content",
                value: "content"
            }
        ]
    })
} catch (e) {
    if (e.name === "ExitPromptError") {
        console.log("Exiting... Goodbye!")
        process.exit(0)
    }
}

const exe = get_executor(pm)

await create_project(project_name, exe, pm, git)

for (let i = 0; i < modules.length; i++) {
    const mod = modules[i]
    const func = module_registry[mod]
    if (typeof func === 'function') {
        await func(exe, pm)
    } else {
        console.error("Module not found!")
    }
}


console.log(`Your project ${chalk.bold.bgCyan(project_name)} has been created successfully!`)
console.log(`Start working with it by running ${chalk.bold.cyan(`cd ./${project_name} && ${pm} run dev`)}!`)