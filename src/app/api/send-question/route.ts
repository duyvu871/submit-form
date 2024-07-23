import {NextRequest, NextResponse, userAgent} from "next/server";
import {SendQuestion} from "DTO";
import {z} from "zod";
import {zodFormSchema} from "@/lib/validation";
import prisma from "@/lib/database";

export const dynamic = 'force-dynamic'

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
            geoCity: geo?.city ?? "NULL",
            geoCountry: geo?.country ?? "NULL",
            geoRegion: geo?.region ?? "NULL",
            geoLatitude: geo?.latitude ?? "NULL",
            geoLongitude: geo?.longitude ?? "NULL",
            deviceModel: device?.model ?? "NULL",
            deviceVendor: device?.vendor ?? "NULL",
            deviceType: device?.type ?? "NULL",
            browserName: browser?.name ?? "NULL",
            browserVersion: browser?.version?? "NULL",
            osName: os?.name ?? "NULL",
            osVersion: os?.name ?? "NULL",
            engineName: engine?.name ?? "NULL",
            engineVersion: engine?.version ?? "NULL",
            isBot: isBot,
            userAgent: userAgentHeaders,
            origin,
            referer
        };
        // console.log(collectedData);
        const addQuestion = await prisma.feedback.create({
            data: collectedData
        });
        if (!addQuestion) {
            return NextResponse.json({success: false}, {
                status: 404
            });
        }

        return NextResponse.json({success: true});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false}, {
            status: 404
        });
    }
}