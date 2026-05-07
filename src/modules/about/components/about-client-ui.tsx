'use client';

import { Typography, Row, Col, Card, Avatar, Space, Divider } from 'antd';
import { 
    RocketOutlined, 
    GlobalOutlined, 
    BulbOutlined, 
    HeartOutlined,
    TeamOutlined,
    CoffeeOutlined
} from '@ant-design/icons';
import Image from 'next/image';

const { Title, Paragraph, Text } = Typography;

const stats = [
    { label: 'Bài viết', value: '100+', icon: <RocketOutlined /> },
    { label: 'Độc giả hàng tháng', value: '2,000+', icon: <TeamOutlined /> },
    { label: 'Thành viên', value: '5+', icon: <BulbOutlined /> },
    { label: 'Năm hoạt động', value: '2+', icon: <GlobalOutlined /> },
];

const values = [
    {
        title: 'Chất Lượng Hàng Đầu',
        description: 'Chúng tôi tin rằng mỗi dòng code, mỗi bài viết đều cần được trau chuốt và kiểm chứng kỹ lưỡng trước khi đến tay độc giả.',
        icon: <HeartOutlined className="text-pink-500" />,
        bg: 'bg-pink-50'
    },
    {
        title: 'Cập Nhật Xu Hướng',
        description: 'Thế giới công nghệ thay đổi từng giây. Chúng tôi luôn nỗ lực để mang đến những thông tin mới nhất và giá trị nhất.',
        icon: <BulbOutlined className="text-amber-500" />,
        bg: 'bg-amber-50'
    },
    {
        title: 'Cộng Đồng Gắn Kết',
        description: 'Không chỉ là một blog, chúng tôi xây dựng một môi trường nơi mọi người có thể học hỏi và chia sẻ kinh nghiệm lẫn nhau.',
        icon: <CoffeeOutlined className="text-blue-500" />,
        bg: 'bg-blue-50'
    }
];

export default function AboutClientUI() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-200 blur-3xl" />
                    <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-indigo-200 blur-3xl" />
                </div>
                
                <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center lg:px-10">
                    <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-blue-600 mb-6">
                        Về chúng tôi
                    </div>
                    <Title 
                        level={1} 
                        className="!mb-8 !text-5xl md:!text-6xl lg:!text-7xl !font-black tracking-tight text-slate-900"
                    >
                        Chia Sẻ <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tri Thức</span>,<br />
                        Kiến Tạo <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Tương Lai</span>
                    </Title>
                    <Paragraph className="mx-auto max-w-3xl text-xl text-slate-600 leading-relaxed">
                        Chào mừng bạn đến với Blog Công Nghệ - nơi những ý tưởng sáng tạo được nuôi dưỡng và chia sẻ. 
                        Chúng tôi là một đội ngũ đam mê công nghệ, cam kết mang lại những giá trị thực chất cho cộng đồng lập trình viên Việt Nam.
                    </Paragraph>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mx-auto -mt-16 max-w-[1240px] px-6 relative z-20">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <div className="mb-3 text-2xl text-blue-600 opacity-80">{stat.icon}</div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
                <Row gutter={[64, 64]} align="middle">
                    <Col xs={24} lg={12}>
                        <div className="relative aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-[48px] shadow-2xl">
                            <Image 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                                alt="Team work"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Title level={2} className="!mb-8 !text-4xl !font-black text-slate-900">
                            Sứ mệnh của chúng tôi là <br />
                            <span className="text-blue-600">kết nối và truyền cảm hứng.</span>
                        </Title>
                        <Paragraph className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Chúng tôi hiểu rằng hành trình trở thành một lập trình viên giỏi không bao giờ dễ dàng. 
                            Vì vậy, chúng tôi tạo ra không gian này để làm cầu nối giữa những chuyên gia giàu kinh nghiệm 
                            và những bạn trẻ đang chập chững bước vào nghề.
                        </Paragraph>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <RocketOutlined />
                                </div>
                                <div>
                                    <Text className="text-lg font-bold text-slate-900 block mb-1">Khai phóng tiềm năng</Text>
                                    <Text className="text-slate-500">Giúp mọi người tiếp cận công nghệ một cách dễ dàng và hiệu quả nhất.</Text>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <HeartOutlined />
                                </div>
                                <div>
                                    <Text className="text-lg font-bold text-slate-900 block mb-1">Xây dựng cộng đồng</Text>
                                    <Text className="text-slate-500">Nơi mọi câu hỏi đều đáng quý và mọi chia sẻ đều được trân trọng.</Text>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>

            {/* Values Section */}
            <section className="bg-slate-50 py-24 lg:py-32">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-10 text-center mb-16">
                    <Title level={2} className="!mb-6 !text-4xl !font-black text-slate-900">GIÁ TRỊ CỐT LÕI</Title>
                    <Paragraph className="mx-auto max-w-2xl text-lg text-slate-500">
                        Những nguyên tắc định hướng cho mọi hoạt động và nội dung chúng tôi tạo ra.
                    </Paragraph>
                </div>
                
                <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div 
                                key={index} 
                                className="group p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className={`h-16 w-16 rounded-2xl ${value.bg} flex items-center justify-center text-2xl mb-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                    {value.icon}
                                </div>
                                <Title level={4} className="!mb-4 !font-bold text-slate-900">
                                    {value.title}
                                </Title>
                                <Paragraph className="text-slate-500 leading-relaxed mb-0">
                                    {value.description}
                                </Paragraph>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10">
                <div className="rounded-[48px] bg-slate-900 p-12 lg:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl -ml-32 -mb-32" />
                    
                    <Title level={2} className="!mb-8 !text-4xl md:!text-5xl !font-black !text-white relative z-10">
                        Sẵn sàng để bắt đầu hành trình <br /> tri thức cùng chúng tôi?
                    </Title>
                    <Paragraph className="mx-auto max-w-2xl text-lg !text-slate-300 mb-12 relative z-10 font-medium">
                        Đăng ký nhận bản tin để không bỏ lỡ những bài giới thiệu công nghệ đột phá và những kinh nghiệm quý báu được gửi trực tiếp tới email của bạn.
                    </Paragraph>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform active:scale-95">
                            Khám Phá Bài Viết
                        </button>
                        <button className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm transform active:scale-95">
                            Liên Hệ Hợp Tác
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
