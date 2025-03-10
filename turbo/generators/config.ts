import type { PlopTypes } from "@turbo/gen";
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("generate-package", {
    description: "Generate package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "what is the name of the pakcage?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{name}}/eslint.config.js",
        templateFile: "templates/eslint.config.js.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/index.ts",
        template: "export * from './src';",
      },
      {
        type: "add",
        path: "packages/{{name}}/src/index.ts",
        template: "export const name = '{{name}}';",
      },
    ],
  });
}
