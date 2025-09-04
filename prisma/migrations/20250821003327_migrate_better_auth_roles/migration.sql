-- DropForeignKey
ALTER TABLE `User_Role` DROP FOREIGN KEY `User_Role_ibfk_1`;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `impersonatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `banExpires` DATETIME(3) NULL,
    ADD COLUMN `banReason` VARCHAR(191) NULL,
    ADD COLUMN `banned` BOOLEAN NULL,
    ADD COLUMN `role` ENUM('user', 'donator', 'admin', 'mod') NOT NULL DEFAULT 'user';
