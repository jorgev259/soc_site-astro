-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_id_fkey`;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
