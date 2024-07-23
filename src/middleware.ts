import {NextRequest, NextResponse} from "next/server";
import {Ratelimit} from "@upstash/ratelimit";
import {kv} from '@vercel/kv';

const ratelimit = new Ratelimit({
    redis: kv,
    // 5 requests from the same IP in 10 seconds
    limiter: Ratelimit.slidingWindow(5, '10s')
});

export const config = {
    matcher: '/'
};

export default async function middleware(request: NextRequest) {
    const ip = request.ip ?? '127.0.0.1';
    if (ip === '127.0.0.1') return NextResponse.next();
    const {success, pending, reset, remaining} = await ratelimit.limit(
        ip
    );

    return success ? NextResponse.next() : NextResponse.json({
        message: "server timeout",
        type: 'RATE_LIMIT'
    }, {
        status: 404
    })
}