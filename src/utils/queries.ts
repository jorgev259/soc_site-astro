import prismaClient from './prisma-client'

export async function getRandomAlbum(): Promise<{ id: number; title: string }> {
  const res: { id: number; title: string }[] = await prismaClient.$queryRawUnsafe(`
    SELECT r1.id as id, r1.title as title
    FROM albums AS r1 JOIN (
	    SELECT (
		    RAND() * (
			    SELECT MAX(id) FROM albums
		    )
	    ) AS id
    )  AS r2
    WHERE r1.id >= r2.id
    ORDER BY r1.id ASC
    LIMIT 1;`)

  return res[0]
}
