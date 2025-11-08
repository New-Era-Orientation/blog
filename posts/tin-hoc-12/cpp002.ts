// posts/tin-hoc-12/cpp002.ts
export const post = `
---
id: "cpp002"
slug: "vector-va-stl-trong-cpp"
title: "Sử dụng Vector và Thư viện chuẩn (STL) trong C++"
excerpt: "Khám phá sức mạnh của \`std::vector\` và các thành phần khác của Standard Template Library (STL) để viết code C++ hiệu quả và an toàn hơn."
author: "Le Tuan"
publishedDate: "2023-10-18"
readTime: 15
categoryId: "tin-hoc-12"
tags: '["cpp-oop"]'
level: "Nâng cao"
grade: 12
language: "C++"
attachments: '[]'
downloads: 1150
---
## Giới thiệu std::vector
\`std::vector\` là một mảng động, có khả năng tự động thay đổi kích thước khi một phần tử được thêm vào hoặc xóa đi. Nó cung cấp nhiều phương thức tiện lợi.
\`\`\`cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers;
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);

    for (size_t i = 0; i < numbers.size(); ++i) {
        std::cout << numbers[i] << " ";
    }
    return 0;
}
\`\`\`
`;
