import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function escapeSql(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'number') return String(val);
  if (val instanceof Date) {
    return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
  }
  const str = String(val)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  return `'${str}'`;
}

function generateInsert(table: string, columns: string[], rows: any[]): string {
  if (!rows || rows.length === 0) return '';
  const colList = columns.map((c) => `\`${c}\``).join(', ');
  const valuesList = rows
    .map((row) => {
      const vals = columns.map((c) => escapeSql(row[c]));
      return `(${vals.join(', ')})`;
    })
    .join(',\n');
  return `INSERT INTO \`${table}\` (${colList}) VALUES\n${valuesList};\n\n`;
}

export async function exportDatabaseSql(): Promise<string> {
  const [
    adminUsers,
    blogCategories,
    blogPosts,
    caseStudies,
    pageSeos,
    faqItems,
    pageFaqs,
    teamMembers,
    jobListings,
    mediaFiles,
  ] = await Promise.all([
    prisma.adminUser.findMany(),
    prisma.blogCategory.findMany(),
    prisma.blogPost.findMany(),
    prisma.caseStudy.findMany(),
    prisma.pageSeo.findMany(),
    prisma.faqItem.findMany(),
    prisma.pageFaq.findMany(),
    prisma.teamMember.findMany(),
    prisma.jobListing.findMany(),
    prisma.mediaFile.findMany(),
  ]);

  let sql = `-- Amplipath MySQL Database Export for cPanel phpMyAdmin
-- Generated on: ${new Date().toISOString()}
-- Target Database: MySQL 5.7+ / 8.0+ / MariaDB 10.3+

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Table structure for \`AdminUser\`
CREATE TABLE IF NOT EXISTS \`AdminUser\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`email\` varchar(191) NOT NULL,
  \`passwordHash\` varchar(191) NOT NULL,
  \`name\` varchar(191) NOT NULL,
  \`role\` varchar(191) NOT NULL DEFAULT 'editor',
  \`avatar\` text,
  \`status\` varchar(191) NOT NULL DEFAULT 'active',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`AdminUser_email_key\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`BlogCategory\`
CREATE TABLE IF NOT EXISTS \`BlogCategory\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) NOT NULL,
  \`slug\` varchar(191) NOT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`BlogCategory_slug_key\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`BlogPost\`
CREATE TABLE IF NOT EXISTS \`BlogPost\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`title\` varchar(191) NOT NULL,
  \`slug\` varchar(191) NOT NULL,
  \`excerpt\` text,
  \`contentHtml\` longtext NOT NULL,
  \`featuredImage\` varchar(191) DEFAULT NULL,
  \`imageAlt\` varchar(191) DEFAULT NULL,
  \`authorName\` varchar(191) NOT NULL DEFAULT 'Amplipath Team',
  \`status\` varchar(191) NOT NULL DEFAULT 'draft',
  \`scheduledAt\` datetime(3) DEFAULT NULL,
  \`publishedAt\` datetime(3) DEFAULT NULL,
  \`isFeatured\` tinyint(1) NOT NULL DEFAULT '0',
  \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`deletedAt\` datetime(3) DEFAULT NULL,
  \`categoryId\` int DEFAULT NULL,
  \`tags\` text,
  \`relatedPostIds\` text,
  \`seoTitle\` varchar(191) DEFAULT NULL,
  \`metaDescription\` text,
  \`canonicalUrl\` varchar(191) DEFAULT NULL,
  \`ogTitle\` varchar(191) DEFAULT NULL,
  \`ogDescription\` text,
  \`ogImage\` varchar(191) DEFAULT NULL,
  \`noIndex\` tinyint(1) NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`BlogPost_slug_key\` (\`slug\`),
  KEY \`BlogPost_categoryId_fkey\` (\`categoryId\`),
  CONSTRAINT \`BlogPost_categoryId_fkey\` FOREIGN KEY (\`categoryId\`) REFERENCES \`BlogCategory\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`CaseStudy\`
CREATE TABLE IF NOT EXISTS \`CaseStudy\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) NOT NULL,
  \`slug\` varchar(191) NOT NULL,
  \`industry\` varchar(191) DEFAULT NULL,
  \`headline\` varchar(191) DEFAULT NULL,
  \`metric\` varchar(191) DEFAULT NULL,
  \`metricLabel\` varchar(191) DEFAULT NULL,
  \`summary\` text,
  \`image\` varchar(191) DEFAULT NULL,
  \`clientWebsite\` varchar(191) DEFAULT NULL,
  \`appStoreUrl\` varchar(191) DEFAULT NULL,
  \`playStoreUrl\` varchar(191) DEFAULT NULL,
  \`overview\` longtext,
  \`solution\` longtext,
  \`results\` longtext,
  \`services\` text,
  \`deliverables\` text,
  \`screenshots\` text,
  \`keyStats\` text,
  \`status\` varchar(191) NOT NULL DEFAULT 'published',
  \`isFeatured\` tinyint(1) NOT NULL DEFAULT '0',
  \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`deletedAt\` datetime(3) DEFAULT NULL,
  \`seoTitle\` varchar(191) DEFAULT NULL,
  \`metaDescription\` text,
  \`canonicalUrl\` varchar(191) DEFAULT NULL,
  \`noIndex\` tinyint(1) NOT NULL DEFAULT '0',
  \`ogTitle\` varchar(191) DEFAULT NULL,
  \`ogDescription\` text,
  \`ogImage\` varchar(191) DEFAULT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`CaseStudy_slug_key\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`PageSeo\`
CREATE TABLE IF NOT EXISTS \`PageSeo\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`pagePath\` varchar(191) NOT NULL,
  \`pageName\` varchar(191) NOT NULL,
  \`pageType\` varchar(191) NOT NULL,
  \`seoTitle\` varchar(191) DEFAULT NULL,
  \`metaDescription\` text,
  \`canonicalUrl\` varchar(191) DEFAULT NULL,
  \`ogTitle\` varchar(191) DEFAULT NULL,
  \`ogDescription\` text,
  \`ogImage\` varchar(191) DEFAULT NULL,
  \`noIndex\` tinyint(1) NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`PageSeo_pagePath_key\` (\`pagePath\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`FaqItem\`
CREATE TABLE IF NOT EXISTS \`FaqItem\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`question\` varchar(191) NOT NULL,
  \`answer\` text NOT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`deletedAt\` datetime(3) DEFAULT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`PageFaq\`
CREATE TABLE IF NOT EXISTS \`PageFaq\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`pagePath\` varchar(191) NOT NULL,
  \`faqId\` int NOT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`PageFaq_pagePath_faqId_key\` (\`pagePath\`,\`faqId\`),
  KEY \`PageFaq_faqId_fkey\` (\`faqId\`),
  CONSTRAINT \`PageFaq_faqId_fkey\` FOREIGN KEY (\`faqId\`) REFERENCES \`FaqItem\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`TeamMember\`
CREATE TABLE IF NOT EXISTS \`TeamMember\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(191) NOT NULL,
  \`role\` varchar(191) NOT NULL,
  \`bio\` text,
  \`image\` varchar(191) DEFAULT NULL,
  \`linkedinUrl\` varchar(191) DEFAULT NULL,
  \`portfolioUrl\` varchar(191) DEFAULT NULL,
  \`sortOrder\` int NOT NULL DEFAULT '0',
  \`isActive\` tinyint(1) NOT NULL DEFAULT '1',
  \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`deletedAt\` datetime(3) DEFAULT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`JobListing\`
CREATE TABLE IF NOT EXISTS \`JobListing\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`title\` varchar(191) NOT NULL,
  \`slug\` varchar(191) NOT NULL,
  \`category\` varchar(191) NOT NULL,
  \`location\` varchar(191) NOT NULL DEFAULT 'Remote',
  \`type\` varchar(191) NOT NULL DEFAULT 'Full-time',
  \`overview\` text,
  \`descriptionHtml\` longtext NOT NULL,
  \`requirementsHtml\` longtext,
  \`benefitsHtml\` longtext,
  \`status\` varchar(191) NOT NULL DEFAULT 'active',
  \`isDeleted\` tinyint(1) NOT NULL DEFAULT '0',
  \`deletedAt\` datetime(3) DEFAULT NULL,
  \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` datetime(3) NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`JobListing_slug_key\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table structure for \`MediaFile\`
CREATE TABLE IF NOT EXISTS \`MediaFile\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`filename\` varchar(191) NOT NULL,
  \`originalName\` varchar(191) NOT NULL,
  \`mimeType\` varchar(191) NOT NULL,
  \`sizeBytes\` int NOT NULL,
  \`url\` varchar(191) NOT NULL,
  \`altText\` varchar(191) DEFAULT NULL,
  \`uploadedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`MediaFile_filename_key\` (\`filename\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

\n`;

  // Data Inserts
  if (adminUsers.length) {
    sql += generateInsert('AdminUser', ['id', 'email', 'passwordHash', 'name', 'role', 'avatar', 'status', 'createdAt', 'updatedAt'], adminUsers);
  }
  if (blogCategories.length) {
    sql += generateInsert('BlogCategory', ['id', 'name', 'slug', 'createdAt'], blogCategories);
  }
  if (blogPosts.length) {
    sql += generateInsert('BlogPost', ['id', 'title', 'slug', 'excerpt', 'contentHtml', 'featuredImage', 'imageAlt', 'authorName', 'status', 'scheduledAt', 'publishedAt', 'isFeatured', 'isDeleted', 'deletedAt', 'categoryId', 'tags', 'relatedPostIds', 'seoTitle', 'metaDescription', 'canonicalUrl', 'ogTitle', 'ogDescription', 'ogImage', 'noIndex', 'createdAt', 'updatedAt'], blogPosts);
  }
  if (caseStudies.length) {
    sql += generateInsert('CaseStudy', ['id', 'name', 'slug', 'industry', 'headline', 'metric', 'metricLabel', 'summary', 'image', 'clientWebsite', 'appStoreUrl', 'playStoreUrl', 'overview', 'solution', 'results', 'services', 'deliverables', 'screenshots', 'keyStats', 'status', 'isFeatured', 'isDeleted', 'deletedAt', 'seoTitle', 'metaDescription', 'canonicalUrl', 'noIndex', 'ogTitle', 'ogDescription', 'ogImage', 'sortOrder', 'createdAt', 'updatedAt'], caseStudies);
  }
  if (pageSeos.length) {
    sql += generateInsert('PageSeo', ['id', 'pagePath', 'pageName', 'pageType', 'seoTitle', 'metaDescription', 'canonicalUrl', 'ogTitle', 'ogDescription', 'ogImage', 'noIndex', 'createdAt', 'updatedAt'], pageSeos);
  }
  if (faqItems.length) {
    sql += generateInsert('FaqItem', ['id', 'question', 'answer', 'sortOrder', 'isDeleted', 'deletedAt', 'createdAt', 'updatedAt'], faqItems);
  }
  if (pageFaqs.length) {
    sql += generateInsert('PageFaq', ['id', 'pagePath', 'faqId', 'sortOrder', 'createdAt'], pageFaqs);
  }
  if (teamMembers.length) {
    sql += generateInsert('TeamMember', ['id', 'name', 'role', 'bio', 'image', 'linkedinUrl', 'portfolioUrl', 'sortOrder', 'isActive', 'isDeleted', 'deletedAt', 'createdAt', 'updatedAt'], teamMembers);
  }
  if (jobListings.length) {
    sql += generateInsert('JobListing', ['id', 'title', 'slug', 'category', 'location', 'type', 'overview', 'descriptionHtml', 'requirementsHtml', 'benefitsHtml', 'status', 'isDeleted', 'deletedAt', 'createdAt', 'updatedAt'], jobListings);
  }
  if (mediaFiles.length) {
    sql += generateInsert('MediaFile', ['id', 'filename', 'originalName', 'mimeType', 'sizeBytes', 'url', 'altText', 'uploadedAt'], mediaFiles);
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n-- Export completed successfully.\n`;
  return sql;
}

async function run() {
  const sql = await exportDatabaseSql();
  const outPath = path.join(process.cwd(), 'amplipath_production.sql');
  fs.writeFileSync(outPath, sql, 'utf8');
  console.log(`✅ Production SQL dump generated at: ${outPath} (${(sql.length / 1024).toFixed(1)} KB)`);
  await prisma.$disconnect();
}

if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
