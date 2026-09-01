// Quick test to verify Neon database connectivity
const { PrismaClient } = require('@prisma/client');

async function test() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET (hidden)' : 'NOT SET');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    console.log('Connecting to database...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('SUCCESS! Database connected:', result);
  } catch (error) {
    console.error('FAILED to connect:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// Set a 10-second timeout
setTimeout(() => {
  console.error('TIMEOUT: Connection took longer than 10 seconds');
  process.exit(1);
}, 10000);

test();
