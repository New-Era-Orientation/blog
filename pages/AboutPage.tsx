import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">Giới thiệu New Era Orientation</h1>
      <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
        <p>
          <strong>New Era Orientation</strong> được thành lập với sứ mệnh trở thành một nền tảng giáo dục trực tuyến hàng đầu, chuyên cung cấp kiến thức về Tin học cho học sinh, sinh viên và những người yêu thích công nghệ tại Việt Nam. Chúng tôi tin rằng việc tiếp cận kiến thức công nghệ một cách có hệ thống và dễ hiểu là chìa khóa để mở ra nhiều cơ hội trong tương lai.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Mục tiêu của chúng tôi</h2>
        <ul>
          <li><strong>Hệ thống hóa kiến thức:</strong> Cung cấp các bài giảng, tài liệu được biên soạn bám sát chương trình giáo dục phổ thông (lớp 10, 11, 12).</li>
          <li><strong>Hỗ trợ thực hành:</strong> Mang đến các bài tập và đề thi giúp thí sinh củng cố kiến thức và chuẩn bị tốt cho các kỳ thi Tốt nghiệp THPT.</li>
          <li><strong>Xây dựng cộng đồng:</strong> Mang đến các bài tập và đề thi giúp thí sinh củng cố kiến thức và chuẩn bị tốt cho các kỳ thi Tốt nghiệp THPT.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Đội ngũ</h2>
          <p>
  Đội ngũ của New Era Orientation là những sinh viên có nhiều kinh nghiệm trong lĩnh vực công nghệ thông tin đang theo học các đại học sau :
          </p>
          <ul>
            <li>Viện Công nghệ Massachusetts</li>
            <li>Đại học Bách khoa Hà Nội</li>
            <li>Học viện Công nghệ Bưu chính Viễn thông</li>
            <li>Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội</li>
            <li>Trường Đại học Công nghệ thông tin, Đại học Quốc gia thành phố Hồ Chí Minh</li>
          </ul>
<p>
  Chúng tôi luôn nỗ lực để mang đến những nội dung chất lượng, chính xác và cập nhật nhất.
</p>
        <p>
          Cảm ơn bạn đã ghé thăm và hy vọng New Era Orientation sẽ là người bạn đồng hành đáng tin cậy trên con đường chinh phục kiến thức Tin học của bạn!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;