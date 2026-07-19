# Mini Pokedex

Mini Pokedex is an Angular 21 application that lets you browse Pokémons from the PokeAPI.

## What this project does

The app presents a pokemon table with:

- Colored type badges for each Pokémon
- Core stats: HP, Attack, Defense, Sp. Atk, Sp. Def, Speed, and Total
- Sortable columns for all stat values
- Client-side pagination with 10, 25, or 50 rows per page
- Debounced text search by name
- Dropdown filtering by type
- A slide-in detail panel that opens when a row is clicked, showing more information and an animated radar chart for the six base stats

The visual experience is built with Angular Material and ECharts, and the data is retrieved through a GraphQL-based service layer.

## How to set up the project

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Install dependencies

From the project root, run:

```bash
npm install
```

### Run the development server

Start the app with:

```bash
npm start
```

Then open your browser at:

```text
http://localhost:4200/
```


## Useful commands


## Project folder structure

```text
src/
├── app/
│   ├── common/
│   │   ├── constants/
│   │   ├── models/
│   │   ├── services/
│   └── pokemon/
│       ├── components/
│       │   └── pokemon-list/
│       └── services/
├── index.html
├── main.ts
└── styles.scss
```


## Error handling

The app handles 4 states when loading data:
1. Loading: showing a message indicating that the data is loading.
2. Empty: showing a message indicating that no data exists.
3. Error: a toast message with an error message that has a retry button
4. Success: the data is shown to the user

