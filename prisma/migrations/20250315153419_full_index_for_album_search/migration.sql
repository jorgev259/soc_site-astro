-- CreateIndex
CREATE FULLTEXT INDEX `albums_title_subTitle_idx` ON `albums`(`title`, `subTitle`);
