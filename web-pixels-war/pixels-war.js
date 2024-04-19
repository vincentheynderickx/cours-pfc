const PIXEL_URL = "https://pixels-war.oie-lab.net"
const MAP_ID = "0000"

document.addEventListener("DOMContentLoaded", () => {

  const PREFIX = `${PIXEL_URL}/api/v1/${MAP_ID}`

  fetch(`${PREFIX}/preinit`, {credentials: "include"})
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      fetch(`${PREFIX}/init?key=${json.key}`, {credentials: "include"})
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          const grid = document.getElementById("grid")
          for (let y = 0; y < json.ny; y++) {
            for (let x = 0; x < json.nx; x++) {
              const pixel = document.createElement("div")
              pixel.classList.add("pixel")
              pixel.style.backgroundColor = `rgb(${json.data[y][x][0]}, ${json.data[y][x][1]}, ${json.data[y][x][2]})`
              pixel.addEventListener("click", () => {
                const [r, g, b] = getPickedColorInRGB()
                fetch(`${PREFIX}/set/${json.id}/${y}/${x}/${r}/${g}/${b}`, {credentials: "include"})
                  .then((response) => response.json())
                  .then((json2) => {
                    document.getElementById("timer").innerText = json2/1000000000
                    refresh(json.id)
                  })
              })
              grid.appendChild(pixel)
            }
          }

          document.getElementById("refresh").addEventListener("click", () => {
            refresh(json.id)
          })
        })
      //TODO: pour les avancés: ça pourrait être utile de pouvoir
      // choisir la couleur à partir d'un pixel ?
    })

  function refresh(user_id) {
    fetch(`${PREFIX}/deltas?id=${user_id}`, {credentials: "include"})
      .then((response) => response.json())
      .then((json) => {
        for (let delta of json.deltas) {
          const [y, x, r, g, b] = delta
          const pixel = document.querySelector(`.pixel:nth-child(${y * json.nx + x + 1})`)
          pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        }

      })
  }

  // Petite fonction facilitatrice pour récupérer la couleur cliquée en RGB
  function getPickedColorInRGB() {
    const colorHexa = document.getElementById("colorpicker").value

    const r = parseInt(colorHexa.substring(1, 3), 16)
    const g = parseInt(colorHexa.substring(3, 5), 16)
    const b = parseInt(colorHexa.substring(5, 7), 16)

    return [r, g, b]
  }

  // dans l'autre sens, pour mettre la couleur d'un pixel dans le color picker
  // (le color picker insiste pour avoir une couleur en hexadécimal...)
  function pickColorFrom(div) {
    // plutôt que de prendre div.style.backgroundColor
    // dont on ne connait pas forcément le format
    // on utilise ceci qui retourne un 'rbg(r, g, b)'
    const bg = window.getComputedStyle(div).backgroundColor
    // on garde les 3 nombres dans un tableau de chaines
    const [r, g, b] = bg.match(/\d+/g)
    // on les convertit en hexadécimal
    const rh = parseInt(r).toString(16).padStart(2, '0')
    const gh = parseInt(g).toString(16).padStart(2, '0')
    const bh = parseInt(b).toString(16).padStart(2, '0')
    const hex = `#${rh}${gh}${bh}`
    // on met la couleur dans le color picker
    document.getElementById("colorpicker").value = hex
  }

})
