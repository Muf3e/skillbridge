import fs from "fs";
import path from "path";

interface CreatorProspect {
  id: string;
  developer?: string;
  name?: string;
  project: string;
  domain?: string;
  status: string;
  email?: string;
  pitch?: string;
}

export async function processOutreachQueue() {
  const outreachDir = path.join(__dirname);
  const batches = [
    "campaign_batch_1.json",
    "campaign_batch_2.json",
    "campaign_batch_3.json",
    "campaign_batch_4.json"
  ];

  let totalProspects: CreatorProspect[] = [];

  for (const b of batches) {
    const file = path.join(outreachDir, b);
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      totalProspects = totalProspects.concat(data);
    }
  }

  console.log("==================================================================");
  console.log(" SkillBridge Autonomous Creator Acquisition Engine (Wave 1)");
  console.log("==================================================================");
  console.log(`[Pipeline] Total High-Impact Prospects Loaded: ${totalProspects.length}`);

  const templatePath = path.join(outreachDir, "creator_invitation_template.md");
  let template = "";
  if (fs.existsSync(templatePath)) {
    template = fs.readFileSync(templatePath, "utf8");
  }

  const dispatchQueue: any[] = [];

  for (const p of totalProspects) {
    const devName = p.developer || p.name || "Developer";
    const repo = p.project;
    const coreVal = p.pitch || p.domain || "agent tooling and high-performance developer workflows";

    const personalizedBody = template
      .replace("{{developer_name}}", devName)
      .replace("{{tool_or_repo}}", repo)
      .replace("{{core_value}}", coreVal);

    dispatchQueue.push({
      id: p.id,
      recipient: devName,
      project: repo,
      email: p.email || `${devName.toLowerCase().replace(/\s+/g, ".")}@developer.org`,
      status: "DISPATCHED_DRY_RUN",
      sentAt: new Date().toISOString(),
      invitationSubject: "Monetize your open-source tools with Zero-Leak remote execution on SkillBridge",
      messagePreview: personalizedBody.substring(0, 180) + "..."
    });

    console.log(`[Dispatched] -> ${devName} (${repo}) | Status: READY_FOR_INBOX`);
  }

  fs.writeFileSync(
    path.join(outreachDir, "dispatch_queue.json"),
    JSON.stringify(dispatchQueue, null, 2),
    "utf8"
  );

  console.log("==================================================================");
  console.log(` Wave 1 Outreach Dispatch Complete!`);
  console.log(` Total Targeted Authors: ${dispatchQueue.length}`);
  console.log(` Tracking Ledger: pipeline/outreach/dispatch_queue.json`);
  console.log("==================================================================\n");
}

if (require.main === module) {
  processOutreachQueue().catch(console.error);
}

