/*
  Warnings:

  - You are about to drop the column `placeholder` on the `albums` table. All the data in the column will be lost.
  - Made the column `status` on table `albums` required. This step will fail if there are existing NULL values in that column.
  - Made the column `headerColor` on table `albums` required. This step will fail if there are existing NULL values in that column.

*/
DELETE FROM `albums` WHERE `status` = "Published";
UPDATE `albums` SET `status` = "Show" WHERE LOWER(`status`) = "show";
UPDATE `albums` SET `status` = "Hidden" WHERE LOWER(`status`) = "hidden";

-- AlterTable
ALTER TABLE `albums` DROP COLUMN `placeholder`,
    ADD COLUMN `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `status` ENUM('Show', 'Hidden') NOT NULL DEFAULT 'Hidden',
    MODIFY `headerColor` VARCHAR(255) NOT NULL DEFAULT '#ffffff';
