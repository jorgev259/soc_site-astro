SELECT `categoryName`, COUNT(*) as "count"
FROM `Album_Category`, `albums`
WHERE  `Album_Category`.`albumId` = `albums`.`id`
AND `albums`.`status` = "show"
GROUP BY `categoryName`;