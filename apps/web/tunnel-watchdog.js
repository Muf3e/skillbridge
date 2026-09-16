const { spawn } = require('child_process');

function startTunnel() {
  console.log('[Tunnel Watchdog] Launching localtunnel on port 3080...');
  const child = spawn('npx', ['localtunnel', '--port', '3080', '--subdomain', 'skillbridge-agent-gateway'], {
    shell: true,
    stdio: 'inherit'
  });

  child.on('close', (code) => {
    console.log(`[Tunnel Watchdog] Tunnel exited with code ${code}. Auto-reconnecting in 3s...`);
    setTimeout(startTunnel, 3000);
  });

  child.on('error', (err) => {
    console.error('[Tunnel Watchdog] Error:', err.message);
    setTimeout(startTunnel, 3000);
  });
}

startTunnel();
