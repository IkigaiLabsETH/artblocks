function random_hash() {
    let chars = "0123456789abcdef";
    let result = '0x';
    for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
tokenData = {
  "hash": random_hash()
}
function setup(){
  W = window.innerWidth;
  H = window.innerHeight;
  DIM = min(W, H);
  M = DIM / 1000; // 1000 is the base dimension, adjust this for how you want things to compute. Everything will scale accordingly
  CH = DIM*0.5
  createCanvas(DIM, DIM);
  noiseSeed(S[0]);
}
function draw(){
  translate(CH,CH);
  scale(M);
}
function windowResized() {
  dim = min(window.innerWidth, window.innerHeight);
  resizeCanvas(dim, dim);
  M = dim / 1000;
}
// Piter's PRNG //
// call R() to get a random value between 0-1
S = Uint32Array.from([0, 1, s = t = 2, 3].map(i => parseInt(tokenData.hash.substr(8 * i + 2, 8), 16))),
R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = s = S[0], t ^= t << 11, S[0] ^= t ^ t >>> 8 ^ s >>> 19, S[0] / 2 ** 32),
'ty @piterpasma'
// end Piter's PRNG //
// random functions to use for gen //
rb = (a, b) => a + (b - a) * R(); // random between (float)
ri = (a, b) => floor(rb(a, b + 1)); // random integer
rc = a => a[floor(rb(0, .99 * a.length))]; // random choice