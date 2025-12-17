import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleReleases = [
  {
    id: 'test-001',
    productId: 'D365-CE',
    productName: 'Dynamics 365 Customer Engagement',
    productNameShort: 'Customer Engagement',
    featureName: 'Enhanced AI-powered insights for customer service',
    investmentArea: 'Customer Service',
    businessValue: 'Improve agent productivity with AI-generated case summaries and suggested responses.',
    featureDetails: 'This feature uses advanced AI models to analyze customer interactions and provide actionable insights to service agents.',
    enabledFor: 'Users, admins',
    publicPreviewDate: new Date('2024-03-15'),
    gaDate: new Date('2024-06-01'),
    gaYearMonth: '2024-06',
    previewReleaseWave: '2024 Wave 1',
    gaReleaseWave: '2024 Wave 1',
    geographicAreas: { regions: ['North America', 'Europe'] },
  },
  {
    id: 'test-002',
    productId: 'PP-PA',
    productName: 'Power Platform Power Apps',
    productNameShort: 'Power Apps',
    featureName: 'Copilot-assisted app building',
    investmentArea: 'Development Tools',
    businessValue: 'Accelerate app development with natural language descriptions.',
    featureDetails: 'Describe your app requirements in plain language and let Copilot generate the initial app structure.',
    enabledFor: 'Makers, admins',
    earlyAccessDate: new Date('2024-02-01'),
    publicPreviewDate: new Date('2024-04-01'),
    gaDate: new Date('2024-08-15'),
    gaYearMonth: '2024-08',
    previewReleaseWave: '2024 Wave 1',
    gaReleaseWave: '2024 Wave 2',
    geographicAreas: { regions: ['Worldwide'] },
  },
  {
    id: 'test-003',
    productId: 'D365-FO',
    productName: 'Dynamics 365 Finance and Operations',
    productNameShort: 'F&O Finance',
    featureName: 'Real-time financial analytics dashboard',
    investmentArea: 'Finance',
    businessValue: 'Get instant visibility into financial performance with interactive dashboards.',
    featureDetails: 'New embedded Power BI dashboards provide real-time insights into key financial metrics.',
    enabledFor: 'Finance managers, executives',
    gaDate: new Date('2024-05-01'),
    gaYearMonth: '2024-05',
    gaReleaseWave: '2024 Wave 1',
    geographicAreas: { regions: ['North America', 'Europe', 'Asia Pacific'] },
  },
];

async function seed() {
  console.log('🌱 Seeding database...');

  for (const release of sampleReleases) {
    await prisma.releaseItem.upsert({
      where: { id: release.id },
      update: release,
      create: release,
    });
    console.log(`✅ Created/updated: ${release.featureName}`);
  }

  console.log('✅ Seeding complete!');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
