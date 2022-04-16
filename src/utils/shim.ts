import atob from 'atob';

// Shims for atob being undefined in node.js prior version 14
if (!globalThis.atob) globalThis.atob = atob;
