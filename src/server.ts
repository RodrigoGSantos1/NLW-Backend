import Fastify from "fastify";
import cors from '@fastify/cors'
import { PoolRoutes } from "./routes/pool";
import { UserRoutes } from "./routes/user";
import { GuessRoutes } from "./routes/guess";
import { GameRoutes } from "./routes/game";
import { AuthRoutes } from "./routes/auth";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(AuthRoutes)
    await fastify.register(GameRoutes)
    await fastify.register(GuessRoutes)
    await fastify.register(PoolRoutes)
    await fastify.register(UserRoutes)

    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

bootstrap()