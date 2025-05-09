# Movie and series browser

## Description

The app is running the [OMDb API](http://www.omdbapi.com/). It is possible to save selected titles to your favorites within the app, and also to rate titles, whether you added them to favorites or not.
Both favorites and rated titles are saved in a database, so that when you return to the application, the favorites list and your ratings are still preserved. In order to do that you need to log in. User authentication is handled through [Clerk](https://clerk.com/).

State is managed by the amazing [Jotai](https://jotai.org/) library.
The UI library of my choice was [Semantic UI](https://react.semantic-ui.com/).

## Update history

~~2022 update: The app was initially written in ReactJS, but I have since migrated it to typescript.~~
<br>
**2024 update**: yet another migration out of boredom... The app is now built in Next.js, database and user authentication have been added on top of other improvements. Replaced axios with fetch to benefit from Next.js's caching. The UI has not changed or improved much, because I was not **THAT** bored...

## Demo

The app is live on Vercel. For the full experience sign in by creating your own user, or try it out with the test user, credentials below.

[Vercel](https://react-movie-browser-seven.vercel.app/)

- Username: **test**
- Password: **test**

## Technologies:

    Next.js 14
    Clerk
    Supabase
    Prisma
    Typescript
    Jotai
    Lodash
    Semantic UI
    SCSS + include media mixin
