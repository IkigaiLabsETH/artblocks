const hexToRgb = hex =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));

const colors = `#708FA3
#486F88
#29526D
#123852
#032236
#FFC0AA
#D4856A
#AA5639
#803015
#551600
#FFE9AA
#D4B96A
#AA8C39
#806415
#553F00`
  .split('\n')
  .map(hex => hexToRgb(hex));