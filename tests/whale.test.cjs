const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'sunken.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const section = (start, end) => script.slice(script.indexOf(start), script.indexOf(end));
const terrain = vm.runInNewContext(section('const PI=', '/* ================= LUTs') + '\n;({H,rng,xc,clamp,TAU})');

// Run the game's terrain and whale code without starting its canvas/audio loop.
function game(seed = 1337) {
  const context = vm.createContext({
    ...terrain,
    Math: Object.create(Math),
    P: { x: 0, y: -6, z: 5, yaw: 0 },
    S: { mode: 'play' }, SCH: [], T: 100, ride: null,
    obsNear: () => [], poseWhale: () => {}, whaleEat: () => {},
    setTimeout: () => {}, whaleCall: () => {}, splash: () => {},
    breachSeen: 0, toast: null,
  });
  vm.runInContext([
    section('const whale=', '/* ================= AUDIO'),
    section('function startBreach()', 'function rideStep('),
    section('function updateWhale(', 'function poseWhale('),
  ].join('\n'), context);
  const api = vm.runInContext('({whale,respawnWhale,updateWhale,startBreach,H,rng})', context);
  context.Math.random = api.rng(seed);
  Object.assign(api.whale, { active: true, called: true, lastBr: 100 });
  return { ...api, context };
}

function step(g, dt) {
  g.context.T += dt;
  g.updateWhale(dt);
  assert.ok(Number.isFinite(g.whale.y));
}

test('cruising, hunting and riding stay submerged over shallow seabeds', () => {
  for (const seabed of [-100, -30, -18, -10, -2, 2, 26]) {
    for (const mode of ['cruise', 'hunt', 'ride']) {
      for (const dt of [1 / 120, 1 / 30, 0.25]) {
        const g = game();
        g.context.H = () => seabed;
        g.context.P.z = g.whale.z;
        Object.assign(g.whale, { y: -12, phase: 0, age: 0 });
        if (mode === 'ride') g.context.ride = {};
        if (mode === 'hunt') {
          g.context.SCH.push({ cx: 100, cy: -4, cz: 200, n: 20, alive: 20 });
          g.whale.tgt = 0;
          g.whale.tgtT = g.context.T;
        }
        for (let t = 0; t < 30; t += dt) {
          step(g, dt);
          assert.ok(g.whale.y <= -9, `${mode}, seabed=${seabed}, dt=${dt}: y=${g.whale.y}`);
          assert.equal(g.whale.hy, g.whale.y, 'head position follows the corrected depth');
        }
      }
    }
  }
});

test('seabed clearance still lifts a whale in deep water', () => {
  const g = game();
  g.context.H = () => -40;
  g.context.S.mode = 'title';
  g.whale.y = -50;
  for (let i = 0; i < 1800; i++) step(g, 1 / 60);
  assert.ok(g.whale.y > -33 && g.whale.y <= -9);
});

test('spawns have water above and seabed clearance below at different player depths', () => {
  const g = game();
  let spawned = 0;
  for (const player of [{ x: 0, y: -6, z: 5 }, { x: -42, y: 2, z: 62 }, { x: 0, y: -100, z: 480 }]) {
    Object.assign(g.context.P, player);
    for (let i = 0; i < 500; i++) {
      g.respawnWhale();
      if (!g.whale.active) continue;
      spawned++;
      assert.ok(g.whale.y <= -9);
      assert.ok(g.whale.y >= g.H(g.whale.x, g.whale.z) + 8);
    }
  }
  assert.ok(spawned > 1000, `only ${spawned} successful spawns`);
});

test('an unsuccessful spawn leaves no active whale at the rejected position', () => {
  const g = game();
  g.context.H = () => 2;
  g.whale.age = 20;
  g.respawnWhale();
  assert.equal(g.whale.active, false);
  assert.equal(g.whale.age, 0);
  assert.equal(g.whale.tgt, -1);
});

test('breaches rise above water and recover even if the seabed becomes shallow', () => {
  for (const shallowLanding of [false, true]) {
    const g = game();
    g.context.H = () => -60;
    g.whale.y = -14;
    g.startBreach();
    let apex = -Infinity;
    let surfaced = false;
    for (let i = 0; i < 1800; i++) {
      step(g, 1 / 60);
      apex = Math.max(apex, g.whale.y);
      if (g.whale.y > 0) surfaced = true;
      if (shallowLanding && surfaced) g.context.H = () => 2;
      if (!g.whale.br) break;
    }
    assert.ok(apex > 0, 'the deliberate breach still clears the surface');
    assert.equal(g.whale.br, 0, 'the breach finishes');
    step(g, 1 / 60);
    assert.ok(g.whale.y <= -9, 'normal swimming resumes underwater');
  }
});

test('the complete game script parses', () => {
  new vm.Script(script);
});
