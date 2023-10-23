
async function getEmailTemplate() {
  const response = await fetch("http://localhost:3000/email_template.html");
  const emailTemplate = await response.text();

  return emailTemplate
    .replace("{{username}}", "John Doe")
    // .replace("{{link}}", "https://example.com/verify?token=xyz");
}

export default getEmailTemplate;
