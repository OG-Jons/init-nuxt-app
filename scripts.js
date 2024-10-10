import {exec} from "child_process"
import ora from "ora";
import {promisify} from 'util';
import chalk from "chalk";
import fs from "fs"

export const get_executor = (pm) => {
    switch (pm) {
        case "npm":
            return "npx"
        case "pnpm":
            return "pnpm dlx"
        case "yarn":
            return "yarn dlx"
        case "bun":
            return "bun x"
    }
}

const execPromise = promisify(exec);

export const create_project = async (name, exe, pm, git) => {
    const spinner = ora({
        text: "Setting up project...",
        color: "yellow",
    }).start()
    try {
        // Execute the command and wait for it to finish
        await execPromise(`${exe} nuxi@latest init ${name} --packageManager ${pm} --gitInit ${git}`);
        spinner.succeed(chalk.green("Project created 🏗️"));
        // Change directory after the command finishes
        process.chdir(`./${name}`);
    } catch (error) {
        // Catch any errors and fail the spinner
        spinner.fail(chalk.red(error.stderr));
        process.exit(1)  // Rethrow the error if you need further handling
    }
}

const setupModule = async (exe, moduleName, successMessage) => {
    const spinner = ora({
        text: `Setting up Nuxt ${moduleName}...`,
        color: "cyan",
    }).start();

    try {
        await execPromise(`${exe} nuxi@latest module add ${moduleName}`);
        spinner.succeed(chalk.green(successMessage));
    } catch (error) {
        spinner.fail(chalk.red(error.stderr || error.message));
        throw error;
    }
};

export const tailwind = (exe) => setupModule(exe, 'tailwindcss', "Tailwind added ✏️")
export const eslint = (exe) => setupModule(exe, 'eslint', "ESLint added ⚙️")
export const fonts = (exe) => setupModule(exe, 'fonts', "Fonts added 📚");
export const seo = (exe) => setupModule(exe, 'seo', "SEO added 📈");
export const scripts = (exe) => setupModule(exe, 'scripts', "Scripts added 📜");
export const icons = (exe) => setupModule(exe, 'icon', "Icons added 🖼️");
export const color = (exe) => setupModule(exe, 'color-mode', "Color Mode added 🎨");
export const content = (exe) => setupModule(exe, 'content', "Content added 📄");

export const vueuse = async (_, pm) => {
    const spinner = ora({
        text: "Installing @vueuse/nuxt...",
        color: "cyan",
    }).start();

    try {
        // Install the packages
        await execPromise(`${pm} install @vueuse/nuxt @vueuse/core`);

        // Load the existing nuxtConfig
        const nuxtConfigPath = './nuxt.config.ts'; // Adjust path if needed
        const nuxtConfig = fs.readFileSync(nuxtConfigPath, 'utf-8');

        // Check if '@vueuse/nuxt' is already in the modules array
        if (!nuxtConfig.includes('@vueuse/nuxt')) {
            // Append the module to the nuxtConfig
            const updatedConfig = nuxtConfig.replace(
                /modules:\s*\[/,
                `modules: [\n    '@vueuse/nuxt',`
            );

            // Write the updated config back to the file
            fs.writeFileSync(nuxtConfigPath, updatedConfig);
            spinner.succeed(chalk.green("VueUse added 🧰"));
        } else {
            spinner.info(chalk.yellow("@vueuse/nuxt is already included in nuxt.config.ts"));
        }
    } catch (error) {
        spinner.fail(chalk.red(error.stderr));
        throw error;
    }
}

export const test = async (_, pm) => {
    const spinner = ora({
        text: "Installing testing dependencies...",
        color: "cyan",
    }).start();

    try {
        // Install the required packages
        await execPromise(`${pm} install ${pm === "yarn" || pm === "bun" ? '--dev' : '--save-dev'} @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core`);

        // Load the existing nuxtConfig
        const nuxtConfigPath = './nuxt.config.ts'; // Adjust path if needed
        const nuxtConfig = fs.readFileSync(nuxtConfigPath, 'utf-8');

        // Check if '@nuxt/test-utils/module' is already in the modules array
        if (!nuxtConfig.includes('@nuxt/test-utils/module')) {
            // Append the module to the nuxtConfig
            const updatedConfig = nuxtConfig.replace(
                /modules:\s*\[/,
                `modules: [\n    '@nuxt/test-utils/module',`
            );

            // Write the updated config back to the file
            fs.writeFileSync(nuxtConfigPath, updatedConfig);
            spinner.succeed(chalk.green("Test-Utils added 🧪"));
        } else {
            spinner.info(chalk.yellow("@nuxt/test-utils/module is already included in nuxt.config.ts"));
        }

        // Create or update vitest.config.ts
        const vitestConfigPath = './vitest.config.ts'; // Adjust path if needed
        const vitestConfigContent = `import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
});\n`;

        // Write the Vitest config file if it doesn't exist
        if (!fs.existsSync(vitestConfigPath)) {
            fs.writeFileSync(vitestConfigPath, vitestConfigContent);
            spinner.succeed(chalk.green("Created vitest.config.ts"));
        } else {
            spinner.info(chalk.yellow("vitest.config.ts already exists. Please update it manually if needed."));
        }

        // Reminder to specify "type": "module" in package.json
        const packageJsonPath = './package.json'; // Adjust path if needed
        const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
        if (!packageJson.includes('"type": "module"')) {
            spinner.info(chalk.yellow('Remember to add "type": "module" to your package.json'));
        }
    } catch (error) {
        spinner.fail(chalk.red(error.stderr || error.message));
        throw error;
    }
}

export const animate = async (_, pm) => {
    const spinner = ora({
        text: "Installing @formkit/auto-animate...",
        color: "cyan",
    }).start();

    try {
        // Install the packages
        await execPromise(`${pm} install @formkit/auto-animate`);

        // Load the existing nuxtConfig
        const nuxtConfigPath = './nuxt.config.ts'; // Adjust path if needed
        const nuxtConfig = fs.readFileSync(nuxtConfigPath, 'utf-8');

        // Check if '@formkit/auto-animate/nuxt' is already in the modules array
        if (!nuxtConfig.includes('@formkit/auto-animate/nuxt')) {
            // Append the module to the nuxtConfig
            const updatedConfig = nuxtConfig.replace(
                /modules:\s*\[/,
                `modules: [\n    '@formkit/auto-animate/nuxt',`
            );

            // Write the updated config back to the file
            fs.writeFileSync(nuxtConfigPath, updatedConfig);
            spinner.succeed(chalk.green("Animation added 🎞️"));
        } else {
            spinner.info(chalk.yellow("@formkit/auto-animate is already included in nuxt.config.ts"));
        }
    } catch (error) {
        spinner.fail(chalk.red(error.stderr));
        throw error;
    }
}


export const module_registry = {
    tailwind: tailwind,
    vueuse: vueuse,
    eslint: eslint,
    test: test,
    fonts: fonts,
    seo: seo,
    scripts: scripts,
    icons: icons,
    color: color,
    animate: animate,
    content: content,
}
