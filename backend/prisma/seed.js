import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const movieTitles = [
        "Inception", "Pulp Fiction", "The Matrix", "The Godfather", "Fight Club",
        "The Dark Knight", "Forrest Gump", "Interstellar", "Parasite", "Whiplash"
    ];

    for (const title of movieTitles) {
        const movie = await prisma.movie.create({
            data: {
                title,
                reviews: {
                    create: [
                        {
                            text: `Amazing review about ${title}!`,
                            letterBoxUser: `user_${Math.floor(Math.random() * 100)}`
                        },
                        {
                            text: `Critical but fair review of ${title}.`,
                            letterBoxUser: `user_${Math.floor(Math.random() * 100)}`
                        }
                    ]
                }
            }
        });

        console.log(`Created movie: ${movie.title}`);
    }
};

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });