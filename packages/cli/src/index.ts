import { runIdeSetup } from './setup';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';

  switch (command) {
    case 'setup':
    case 'init':
      await runIdeSetup();
      break;

    case 'help':
    case '--help':
    case '-h':
      console.log('SkillBridge CLI - The Sovereign AI Agent Skill Gateway\n\nCommands:\n  setup    Auto-configure Claude Desktop, Cursor, and Windsurf\n  skills   List active sovereign skills\n  status   Check gateway status');
      break;

    case 'skills':
      try {
        const gatewayUrl = process.env.SKILLBRIDGE_GATEWAY_URL || 'https://skillbridge-gateway.vercel.app';
        console.log('Fetching active skills from ' + gatewayUrl + '...');
        const res = await fetch(gatewayUrl + '/api/v1/skills');
        const data = await res.json() as any;
        console.log('\nActive Sovereign Skills (' + (data.skills ? data.skills.length : 0) + '):\n');
        (data.skills || []).forEach((s: any, idx: number) => {
          const cat = s.category || (s.capabilities && s.capabilities[0]) || 'general';
          const price = s.pricing?.costPerRunUsd ?? s.pricing?.pricePerCall ?? 0.20;
          console.log('  ' + (idx + 1) + '. [' + cat.toUpperCase() + '] ' + s.name + ' ($' + price.toFixed(2) + '/run)');
          console.log('     ID: ' + s.id + ' | ' + s.description);
        });
      } catch (err: any) {
        console.error('Failed to fetch skills:', err.message);
      }
      break;

    case 'status':
      try {
        const gatewayUrl = process.env.SKILLBRIDGE_GATEWAY_URL || 'https://skillbridge-gateway.vercel.app';
        const res = await fetch(gatewayUrl + '/health');
        const health = await res.json();
        console.log('SkillBridge Gateway Status:', JSON.stringify(health, null, 2));
      } catch (err: any) {
        console.error('Gateway unreachable:', err.message);
      }
      break;

    default:
      console.log('Unknown command: ' + command + '. Running setup by default...');
      await runIdeSetup();
      break;
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});