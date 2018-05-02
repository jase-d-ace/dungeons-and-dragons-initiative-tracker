# Dungeons and Dragons Initiative Tracker

This project takes advantage of `socket.io` to allow a Dungeon Master
and their group of players to move through a battle by tracking,
sorting, and notifying players as their turn in the initiative order
comes up.

## Technologies Used
* Node.js (Express MVC framework)
* Socket.io (Real-Time user-user connection)
* React (Quick and responsive front-end)
* Webpack 3 (Build Tool/Javascript Compiler)

## Currently Available Features

* Players can log in as their own characters
* A DM can log in and have admin-level control over the flow of battle
* Player character data has been preloaded
* Players can submit their initiatives to the DM
* The DM can add and remove monsters from the battle
* Players can only pass their turn if it is currently their turn

## Installation Instructions

1. `git clone` this repository using either HTTPS or SSH
2. cd `dungeons-and-dragons-initiative-tracker`
3. `npm install`
4. `npm run build-dev` and `npm run dev` in two separate but concurrent terminal windows
5. navigate to `localhost:3000` in your browser


# Important Note
This app is currently only meant to be used for my own dnd group, which means all of the player data has been hardcoded and there currently is no way to have separate sessions running at once. This app is meant for use by me and my friends and does not support public use. Feel free to browse the code, though.