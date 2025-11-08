// posts/tin-hoc-12/py003.ts
export const post = `
---
id: "py003"
slug: "lap-trinh-huong-doi-tuong-python"
title: "Lập trình Hướng đối tượng (OOP) với Python"
excerpt: "Hiểu rõ các khái niệm cốt lõi của OOP như Class, Object, Kế thừa, Đa hình, và Đóng gói thông qua các ví dụ Python dễ hiểu."
author: "Thanh Nguyen"
publishedDate: "2023-10-22"
readTime: 20
categoryId: "tin-hoc-12"
tags: '["python-basic"]'
level: "Nâng cao"
grade: 12
language: "Python"
attachments: '[{"type":"PDF","name":"OOP_Python_Concepts.pdf","url":"#","size":"2.5MB"}]'
downloads: 1530
---
## Class và Object là gì?
Class là một bản thiết kế để tạo ra các đối tượng (object). Một object là một thể hiện (instance) của một class. Nó có các thuộc tính (attributes) và phương thức (methods).
\`\`\`python
class Dog:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age

    def description(self):
        return f"{self.name} is {self.age} years old"

    def speak(self, sound):
        return f"{self.name} says {sound}"

mikey = Dog("Mikey", 6)
print(mikey.description())
\`\`\`
`;
