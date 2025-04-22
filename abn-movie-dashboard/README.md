# abn-movie-dashboard

Techstack:
Vue3, typescript, vitest, vite, tailwind, primevue

Build based on the latest LTS version of node.

# how to run
1. `npm install`
2. `npm run dev` 

If you get errors make sure you have the latest LTS node version:
1. `nvm install --lts` 
2. `nvm use --lts` 

# how to test
`npm run test` 

## Tools & Stack
I used tools that were mentioned during the intake, such as PrimeVue for UI components and Vitest for testing. This allowed me to stay aligned with the preferred stack and keep dependencies consistent.

## Simplicity First
The structure of the project is intentionally kept straightforward to keep focus on functionality and maintainability. While I could have abstracted more, I opted for a clear and readable setup due to time constraints and to make it easier for others to navigate the codebase.

## Typing & Maintainability
All type definitions are grouped under a types/ folder. While multiple types in one file can work in small apps, separating them provides better clarity and reusability — especially as the project grows.

## Store & Logic Separation
To improve testability, I extracted genre-sorting logic into a separate utility function instead of embedding it directly in the Pinia store. This avoids mocking the entire store and makes it easier to write isolated unit tests.

## Styling Decisions
For most of the styling I used TailwindCSS, which worked well for consistency and responsiveness. In the detail page, I experimented with SCSS to showcase flexibility, though I kept it minimal. With more time, I would have used more SCSS features (e.g., &, mixins) and adopted a more standardized naming convention such as BEM (__, --).

## UX decisions
I added a scroll to top button for better navigation. I also removed certain hover interactions when hitting a breakpoint so mobile users can read summary previews.