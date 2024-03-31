import colors from 'tailwindcss/colors'

const generateRandomColor = () => {
  const myColors = [
    colors.red,
    colors.orange,
    colors.amber,
    colors.yellow,
    colors.lime,
    colors.green,
    colors.emerald,
    colors.teal,
    colors.cyan,
    colors.sky,
    colors.blue,
    colors.indigo,
    colors.violet,
    colors.purple,
    colors.fuchsia,
    colors.pink,
    colors.rose,
  ]
  const randomIndex = Math.floor(Math.random() * myColors.length)
  return myColors[randomIndex][200]
}

export default generateRandomColor
