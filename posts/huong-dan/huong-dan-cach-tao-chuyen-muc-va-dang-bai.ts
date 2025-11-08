// posts/huong-dan/huong-dan-cach-tao-chuyen-muc-va-dang-bai.ts
export const post = `
---
id: "huongdan001"
slug: "huong-dan-cach-tao-chuyen-muc-va-dang-bai"
title: "Hướng dẫn: Cách tạo chuyên mục và đăng bài viết mới"
excerpt: "Tài liệu hướng dẫn chi tiết từng bước cho người quản trị về cách thêm một chuyên mục mới và cách đăng một bài viết mới bằng file markdown (.md) trên hệ thống."
author: "Admin"
publishedDate: "2023-10-28"
readTime: 8
categoryId: "huong-dan"
tags: '[]'
level: "Cơ bản"
grade: null
language: null
attachments: '[]'
downloads: 50
---
## Giới thiệu
Chào mừng bạn đến với hệ thống quản lý nội dung của New Era Orientation. Với cấu trúc đã được tối ưu, việc đăng bài giờ đây trở nên cực kỳ đơn giản và an toàn.

## Bước 1: Tạo chuyên mục mới (nếu cần)
Nếu bạn muốn đăng bài vào một chuyên mục chưa có, bạn cần khai báo nó trước.

- **Mở file:** \`data/meta.ts\`
- **Thao tác:** Thêm một đối tượng mới vào mảng \`categories\`.

**Ví dụ:** Để thêm chuyên mục "Lập trình Web", bạn sẽ thêm dòng sau vào mảng:
\`\`\`javascript
{ 
  id: 'lap-trinh-web', 
  slug: 'lap-trinh-web', 
  name: 'Lập trình Web',
  description: 'Các bài viết về phát triển web'
},
\`\`\`
- **id:** một chuỗi định danh duy nhất, không dấu, không khoảng trắng.
- **slug:** đường dẫn URL, thường giống id.
- **name:** Tên chuyên mục sẽ hiển thị trên trang web.

## Bước 2: Đăng bài viết mới
Đây là quy trình đã được tối ưu hóa, bạn không cần phải đụng đến file API trung tâm nữa.

### 2.1. Tạo file bài viết
- **Xác định thư mục:** Vào thư mục \`posts/\` và chọn thư mục của chuyên mục bạn muốn đăng bài (ví dụ: \`posts/tin-hoc-10/\`). Nếu chưa có thư mục cho chuyên mục mới, hãy tạo nó.
- **Tạo file:** Tạo một file mới trong thư mục đó. **Tên file phải là slug của bài viết** và có đuôi \`.ts\`. Ví dụ: \`bai-viet-moi-rat-hay.ts\`.
- **Soạn nội dung:** Mở file vừa tạo và dán nội dung theo cấu trúc sau:

\`\`\`javascript
// posts/ten-chuyen-muc/ten-bai-viet.ts
export const post = \`
---
id: "id-duy-nhat-cua-bai-viet"
slug: "ten-bai-viet" // phải giống tên file
title: "Tiêu đề bài viết"
excerpt: "Mô tả ngắn gọn"
author: "Tên tác giả"
publishedDate: "YYYY-MM-DD"
readTime: 10 // số phút đọc
categoryId: "id-cua-chuyen-muc" // phải khớp với id trong meta.ts
tags: '["tag1", "tag2"]'
// ... các thông tin khác
---
## Nội dung bài viết bắt đầu ở đây
Nội dung được viết bằng Markdown.
\`\`\`;
\`\`\`

### 2.2. Thêm bài viết vào danh sách của chuyên mục
- **Mở file:** Mở file \`index.ts\` **ngay trong thư mục chuyên mục đó** (ví dụ: \`posts/tin-hoc-10/index.ts\`).
- **Thao tác:**
    1.  Import bài viết mới của bạn vào.
    2.  Thêm biến vừa import vào mảng được export.

**Ví dụ:**
\`\`\`javascript
// posts/tin-hoc-10/index.ts

// 1. Import bài viết mới (chọn một tên biến dễ nhớ)
import { post as baiVietMoi } from './bai-viet-moi-rat-hay';
import { post as baiVietCu } from './bai-viet-cu';


// 2. Thêm vào mảng export
export const tinHoc10Posts = [
  baiVietCu,
  baiVietMoi, // Thêm vào đây
];
\`\`\`

Vậy là xong! Bạn không cần phải chỉnh sửa file \`api/posts.ts\` nữa. Hệ thống sẽ tự động nhận diện bài viết mới của bạn.
`;
