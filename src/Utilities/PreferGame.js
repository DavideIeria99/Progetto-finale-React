export default function PreferGame(game) {
  fetch(
    `${import.meta.env.VITE_RAWG_API_URL}games/${game}?key=${
      import.meta.env.VITE_RAWG_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => {
      return r;
    });
}
