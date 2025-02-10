UPDATE `users` SET `image`=CONCAT(`username`,"_",`imgId`,".png");

-- AlterTable
ALTER TABLE `users` DROP COLUMN `imgId`,
    DROP COLUMN `placeholder`;
