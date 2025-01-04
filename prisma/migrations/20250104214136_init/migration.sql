/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    DROP COLUMN `userId`;
