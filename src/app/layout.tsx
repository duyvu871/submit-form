import type { Metadata } from "next";
import { Inter,  } from "next/font/google";
import "./globals.css";
import NextUiProvider from "@/app/nextui_provider";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: 'favicon.png'
  },
  title: "PSub - Nơi Giải Đáp Mọi Thắc Mắc Của Sinh Viên",
  description: "Bạn đang gặp khó khăn trong học tập, cuộc sống hay định hướng tương lai? [Tên trường] luôn đồng hành cùng bạn với hệ thống tư vấn chuyên nghiệp, tận tâm. Tham gia khảo sát ngay để chúng tôi hiểu bạn hơn!",
  keywords: ' tư vấn sinh viên, hỗ trợ học tập, tư vấn tâm lý, định hướng nghề nghiệp,'.split(","),
  openGraph: {
    images: [{
      url: "https://submit-form-beryl.vercel.app/og-image.png"
    }],
    type: "website",
    url: "https://submit-form-beryl.vercel.app/",
    description:"Bạn đang gặp khó khăn trong học tập, cuộc sống hay định hướng tương lai? [Tên trường] luôn đồng hành cùng bạn với hệ thống tư vấn chuyên nghiệp, tận tâm. Tham gia khảo sát ngay để chúng tôi hiểu bạn hơn!",
    title: "PSub - Nơi Giải Đáp Mọi Thắc Mắc Của Sinh Viên",
    siteName: "Psub"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          {children}
        </NextUiProvider>
        <Toast />
      </body>
    </html>
  );
}
