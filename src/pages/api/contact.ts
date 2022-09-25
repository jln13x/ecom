import { contactSchema } from "@/features/contact";
import { NextApiHandler } from "next";
import { MailService } from "@sendgrid/mail";
import { env } from "@/env/server.mjs";
import DOMPurify from "isomorphic-dompurify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const schemaResult = contactSchema.safeParse(req.body);

  if (!schemaResult.success) {
    return res.status(400).json({
      error: "Invalid request body",
    });
  }

  const { data } = schemaResult;

  const { EMAIL_FROM, EMAIL_TO, SENDGRID_API_KEY, EMAIL_TEMPLATE_ID } = env;

  const mailService = new MailService();
  mailService.setApiKey(SENDGRID_API_KEY);

  await mailService.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    templateId: EMAIL_TEMPLATE_ID,
    dynamicTemplateData: {
      email: DOMPurify.sanitize(data.email, {
        ALLOWED_ATTR: [],
        ALLOWED_TAGS: [],
        ALLOW_ARIA_ATTR: false,
      }),
      message: DOMPurify.sanitize(data.message, {
        ALLOWED_ATTR: [],
        ALLOWED_TAGS: [],
        ALLOW_ARIA_ATTR: false,
      }),
    },
  });

  return res.json({ success: true });
};

export default handler;
