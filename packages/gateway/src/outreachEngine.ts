import fs from "fs";
import path from "path";

interface PartnerContact {
  id: string;
  developer: string;
  project: string;
  domain: string;
  status: string;
  email: string;
  pitch: string;
}

export class OutreachEngine {
  private queuePath = path.join(__dirname, "../../../pipeline/outreach/campaign_batch_1.json");
  private templatePath = path.join(__dirname, "../../../pipeline/outreach/creator_invitation_template.md");

  public runBatch(): { processed: number; logs: string[] } {
    const rawData = fs.readFileSync(this.queuePath, "utf8");
    const partners: PartnerContact[] = JSON.parse(rawData);
    const template = fs.readFileSync(this.templatePath, "utf8");

    const logs: string[] = [];

    for (const partner of partners) {
      if (partner.status === "QUEUED") {
        const personalizedBody = template
          .replace("{{developer_name}}", partner.developer)
          .replace("{{tool_or_repo}}", partner.project)
          .replace("{{core_value}}", partner.pitch);

        // Record simulated dispatch (ready to pipe into SendGrid/Resend API)
        partner.status = "INVITED";
        logs.push(`[Outreach Dispatch] Sent invitation to ${partner.developer} (${partner.email}) for ${partner.project}`);
      }
    }

    fs.writeFileSync(this.queuePath, JSON.stringify(partners, null, 2), "utf8");
    return { processed: logs.length, logs };
  }
}

if (require.main === module) {
  const engine = new OutreachEngine();
  const res = engine.runBatch();
  console.log(`Dispatched ${res.processed} partnership invitations:`);
  res.logs.forEach(l => console.log(l));
}
