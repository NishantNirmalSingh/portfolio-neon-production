const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
async function main() {
  try {
    const leads = await prisma.lead.findMany();
    console.log("Success, found rows:", leads.length);
  } catch(e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
