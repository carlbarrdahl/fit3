# fit3

Fit3 is a mobile fitness application that uses pose estimation technology from your smartphone camera to track exercise repetitions. The app offers daily crossfit-inspired workouts and allows users to create groups and challenge friends, as well as compete against other groups. Fit3 also features a leaderboard and achievement system to track progress and offers skill level assessments to help users improve their fitness performance. With its advanced technology and engaging features, Fit3 is a great option for anyone looking to add more fun and motivation to their fitness routine.

- fit3 is a fitness mobile game that uses pose estimation from your camera to count repetitions
- create groups and challenge your friends
- compete with your friends against other groups
- crossfit-inspired workouts of the day
- a leaderboard and achievements
- assessments of skill level
- proof of workout (lz compression)

### User flow

1. Start app
2. Tap workout of the day
3. Prepare and press Start to begin
4. Do the activities until timer runs out
   - Each activity has code to detect a successful rep.
5. Submit the results and proof of workout (recorded pose data over time)

### Leaderboard

- Global
  - Longest streak
- Group
  - Max reps

### Social & Gaming

- Group Challenges
  - Create a group and invite your friends for accountability and pushing your squad
- Experience points
  - Each activity rep is counted
- Achievements
  - "100 push_ups"
- Items
  - Consumables
    - RestDay protects your streak and lets you rest a day
  - Equipable

### Activity Marketplace

- Crowdsource activity detection scripts

### Activities

- Push-up
- Airsquat
- Shoulder taps / Plank
- Burpee
- Mountain climbers
- Sit-up
- Lunges
- Jumping jacks
- Jumping lunges
- Jumping squats
- Box jumps or step-ups
- Lateral hop over an object
- Russian twist

---

# Turborepo starter

This is an official pnpm starter turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
