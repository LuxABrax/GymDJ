# Gym DJ - music player

### Made with [Svelte JS](https://svelte.dev)

[YouTube Video Showcase](https://www.youtube.com/watch?v=P9SlEUXn-pU)

## About

This project was made while I was working for a gym in my hometown in may 2021. When I started working there they had old playlist which was less than an hour long and the worker there had to restart it every time it finished.<br/>

A lot of people have been complaining because the songs were always repeating and they were old songs mostly metal and hip-hop. <br/>
So I created this app with more than 100 songs and queue, playlist and
history functionality. <br/>

Most of the people going to the gym loved it and said that their workouts were better and some also requested to add their best songs.

## Features

- Play song, change volume, forward and rewind with seek functionality
- When song finishes it's added to **history** with the time passed since song was finished
- **Search** for song by title or artist in library
- **Favorite** songs
- Add song or playlist to **queue**
- Change songs **position** or **remove** it from queue
- Add history to queue
- Create **playlist** from queue

![Music Player Screenshot](https://github.com/LuxABrax/GymDJ/blob/main/gym-dj/public/gymdj.jpg?raw=true)

## Scripts

Install the dependencies...

```bash
cd gym-dj
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).
