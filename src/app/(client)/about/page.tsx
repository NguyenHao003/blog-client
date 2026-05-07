import AboutClientUI from '@/modules/about/components/about-client-ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Giới thiệu | Blog Công Nghệ',
    description: 'Tìm hiểu về sứ mệnh, giá trị và đội ngũ đằng sau Blog Công Nghệ - nơi chia sẻ tri thức và kiến tạo tương lai.',
};

export default function AboutPage() {
    return <AboutClientUI />;
}
