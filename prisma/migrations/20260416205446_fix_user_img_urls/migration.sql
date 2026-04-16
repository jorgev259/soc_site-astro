UPDATE
  users
SET
  image = REPLACE(image, 'prod/img', 'img')
WHERE
  image LIKE '%prod/img%';