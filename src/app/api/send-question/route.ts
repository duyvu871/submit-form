import {NextRequest, NextResponse, userAgent} from "next/server";
import {SendQuestion} from "DTO";
import {z} from "zod";
import {zodFormSchema} from "@/lib/validation";
import prisma from "@/lib/database";

export async function POST(req: NextRequest) {
    try {
        const reqHeaders = req.headers;
        const userAgentHeaders = reqHeaders.get('user-agent');
        const origin = reqHeaders.get('origin');
        const referer = reqHeaders.get('referer');
        const data = await req.json() as SendQuestion;
        // validate sent data
        zodFormSchema.safeParse(data);
        const ip = req.ip || reqHeaders.get('x-forwarded-for');
        const geo = req.geo;
        const ua = userAgent(req);
        const device = ua.device;
        const browser = ua.browser;
        const os = ua.os;
        const engine = ua.engine;
        const isBot = ua.isBot;
        const collectedData = {
            email: data.email,
            questions: JSON.stringify(data.questions),
            domains: JSON.stringify(data.domains),
            name: data?.name ?? "NULL",
            ip: ip ?? "NULL",
            geo_city: geo?.city ?? "NULL",
            geo_country: geo?.country ?? "NULL",
            geo_region: geo?.region ?? "NULL",
            geo_latitude: geo?.latitude ?? "NULL",
            geo_longitude: geo?.longitude ?? "NULL",
            device_model: device?.model ?? "NULL",
            device_vendor: device?.vendor ?? "NULL",
            device_type: device?.type ?? "NULL",
            browser_name: browser?.name ?? "NULL",
            browser_version: browser?.version?? "NULL",
            os_name: os?.name ?? "NULL",
            os_version: os?.name ?? "NULL",
            engine_name: engine?.name ?? "NULL",
            engine_version: engine?.version ?? "NULL",
            is_bot: isBot,
            userAgent: userAgentHeaders,
            origin,
            referer
        };
        console.log(collectedData);
        const addQuestion = await prisma.feedback.create({
            data: collectedData
        });
        console.log(addQuestion);

        return NextResponse.json({success: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false}, {
            status: 404
        });
    }
}