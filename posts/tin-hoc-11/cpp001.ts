// posts/tin-hoc-11/cpp001.ts
export const post = `
---
id: "cpp001"
slug: "con-tro-trong-cpp"
title: "Hiểu sâu về Con trỏ (Pointers) trong C++"
excerpt: "Con trỏ là một trong những khái niệm quan trọng và khó nhất trong C++. Bài viết này sẽ giải thích cặn kẽ về con trỏ, địa chỉ bộ nhớ và các phép toán liên quan."
author: "Admin"
publishedDate: "2023-10-20"
readTime: 18
categoryId: "tin-hoc-11"
tags: '["cpp-oop"]'
level: "Nâng cao"
grade: 11
language: "C++"
attachments: '[]'
downloads: 870
---
## Con trỏ là gì?
Con trỏ là một biến đặc biệt dùng để lưu trữ địa chỉ bộ nhớ của một biến khác. Nó "trỏ" đến vị trí của biến đó trong bộ nhớ.
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int var = 20;
    int *ptr;
    ptr = &var;

    // In ra giá trị của var (20)
    cout << var << endl;

    // In ra địa chỉ của var
    cout << &var << endl;

    // In ra giá trị lưu trong con trỏ (địa chỉ của var)
    cout << ptr << endl;

    // In ra giá trị tại địa chỉ mà con trỏ đang trỏ tới (20)
    cout << *ptr << endl;
    return 0;
}
\`\`\`
`;
