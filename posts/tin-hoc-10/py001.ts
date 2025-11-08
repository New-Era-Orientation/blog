// posts/tin-hoc-10/py001.ts
export const post = `
---
id: "py001"
slug: "nhap-mon-python-cho-nguoi-moi"
title: "Nhập môn Python: Hướng dẫn từ A-Z cho người mới bắt đầu"
excerpt: "Bài viết này cung cấp một lộ trình học Python chi tiết từ các khái niệm cơ bản nhất như biến, kiểu dữ liệu, đến các cấu trúc điều khiển và hàm."
author: "Admin"
publishedDate: "2023-10-26"
readTime: 15
categoryId: "tin-hoc-10"
tags: '["python-basic"]'
level: "Cơ bản"
grade: 10
language: "Python"
attachments: '[{"type":"PDF","name":"Python_Cheatsheet.pdf","url":"#","size":"1.2MB"}]'
downloads: 1250
---
## Python là gì?
Python là một ngôn ngữ lập trình bậc cao, thông dịch, hướng đối tượng và đa mục đích. Nó được tạo ra bởi Guido van Rossum và ra mắt lần đầu vào năm 1991. Python có cú pháp đơn giản, dễ đọc, giúp người mới học dễ dàng tiếp cận với lập trình.

## Cài đặt môi trường
Để bắt đầu, bạn cần cài đặt Python từ trang chủ python.org. Sau khi cài đặt, bạn có thể kiểm tra phiên bản bằng lệnh \`python --version\` trong terminal.

## Biến và Kiểu dữ liệu
\`\`\`python
name = "New Era Orientation"
year = 2023
pi = 3.14
is_active = True

print(type(name))   # <class 'str'>
print(type(year))   # <class 'int'>
print(type(pi))     # <class 'float'>
print(type(is_active)) # <class 'bool'>
\`\`\`

## Cấu trúc điều khiển: if-else
Cấu trúc if-else cho phép bạn thực thi các khối mã khác nhau dựa trên một điều kiện.
\`\`\`python
score = 85

if score >= 90:
    print("Xuất sắc")
elif score >= 80:
    print("Giỏi")
else:
    print("Khá")
\`\`\`
`;
