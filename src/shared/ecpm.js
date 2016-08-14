import R from 'ramda'

const ecpm_10 = (level) => ( 0.01885225 * level ) - 0.01001625
const ecpm_20 = (level) => ( 0.01783805 * ( level - 10 ) ) + 0.17850625
const ecpm_30 = (level) => ( 0.01784981 * ( level - 20 ) ) + 0.35688675
const ecpm_40 = (level) => ( 0.00891892 * ( level - 30 ) ) + 0.53538485

const calc_ecpm = (level) => {
  if (level > 30) {
    return Math.pow(ecpm_40(level), 0.5)
  } else if (level > 20) {
    return Math.pow(ecpm_30(level), 0.5)
  } else if (level > 10) {
    return Math.pow(ecpm_20(level), 0.5)
  } else {
    return Math.pow(ecpm_10(level), 0.5)
  }
}

const ecpm =
  R.map(x=>({
    level: x/2,
    ecpm: calc_ecpm(x/2)
  }), R.range(2, 81))

const findPokemonLV = (value) =>
  R.pipe(
    R.filter(
      x => Math.abs(x.ecpm-value) < 0.001,
    ),
    R.head(),
    R.prop('level')
  )(ecpm)

export default {
  ecpm: ecpm,
  findPokemonLV: findPokemonLV
}
