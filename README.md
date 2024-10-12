# Nuxt App Setup Script
This script automates the process of creating a new Nuxt application with selected modules and configurations. It simplifies the initial setup by prompting the user for various options and integrating essential features right from the start.

## Features
- **Project Initialization**: Easily create a new Nuxt project with a specified name and package manager (npm, pnpm, yarn, or bun).
- **Module Selection**: Choose from a list of common modules to include in your project, such as:
  - **TailwindCSS** for styling
  - **VueUse** for Vue composition API utilities
  - **ESLint** for code linting
  - **Testing tools** for unit and integration tests
  - Other optional modules like Fonts, SEO, and animations.
- **Progress Indication**: Uses visual feedback (via ora) to show the progress of project setup and module installation.

## Usage
```bash
npx init-nuxt-app@latest
```
or, alternatively:
```bash
npm install -g init-nuxt-app
init-nuxt-app
```

_If you are using yarn and facing issues, try to run `corepack enable` before._

## Develop
1. Install Node.js
2. Install dependencies
```bash
npm install
```
3. Link the Binary
```bash
npm link
```
4. Execute the script and follow the prompts to create your Nuxt application with the desired settings.

## Installation of Modules
The script will set up the following modules based on user selection:
- [TailwindCSS](https://nuxt.com/modules/tailwindcss)
- [VueUse](https://nuxt.com/modules/vueuse)
- [ESLint](https://eslint.nuxt.com/packages/module)
- [Testing tools](https://nuxt.com/docs/getting-started/testing)
- [Fonts](https://fonts.nuxt.com/)
- [SEO](https://nuxtseo.com/)
- [Scripts](https://scripts.nuxt.com/)
- [Icons](https://nuxt.com/modules/icon)
- [Color Mode](https://color-mode.nuxtjs.org/)
- [Animation](https://auto-animate.formkit.com/#usage-vue)
- [Nuxt Content](https://content.nuxt.com/)


## Thanks
Big Thanks to [LearnVue](https://www.youtube.com/@LearnVue) (@mattmaribojoc) for giving me the idea of creating this.