// posts/tin-hoc-12/tin12-001.ts
export const post = `
---
id: "tin12-001"
slug: "bai-tap-mang-mot-chieu-co-loi-giai"
title: "Bài tập mảng một chiều (có lời giải) - Tin học 12"
excerpt: "Tuyển tập các bài tập về mảng một chiều từ cơ bản đến nâng cao, giúp học sinh lớp 12 ôn tập và củng cố kiến thức chuẩn bị cho các kỳ thi."
author: "Admin"
publishedDate: "2023-10-27"
readTime: 14
categoryId: "tin-hoc-12"
tags: '["on-thi-12"]'
level: "Cơ bản"
grade: 12
language: null
attachments: '[]'
downloads: 750
---
## Bài 1: Tìm phần tử lớn nhất trong mảng
Viết chương trình nhập vào một mảng số nguyên và tìm ra phần tử có giá trị lớn nhất trong mảng đó.

### Lời giải tham khảo (Pascal)
\`\`\`pascal
VAR
  a: array[1..100] of integer;
  n, i, max: integer;
BEGIN
  write('Nhap so phan tu cua mang: ');
  readln(n);

  for i:=1 to n do
  begin
    write('a[', i, '] = ');
    readln(a[i]);
  end;

  max := a[1];
  for i:=2 to n do
    if a[i] > max then
      max := a[i];

  writeln('Phan tu lon nhat trong mang la: ', max);
  readln;
END.
\`\`\`

## Bài 2: Tính tổng các số chẵn trong mảng
Viết chương trình nhập vào một mảng và tính tổng các phần tử là số chẵn có trong mảng.

### Lời giải tham khảo (C++)
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Nhap so phan tu: ";
    cin >> n;
    int arr[n];
    int sum = 0;

    for (int i = 0; i < n; i++) {
        cout << "arr[" << i << "] = ";
        cin >> arr[i];
        if (arr[i] % 2 == 0) {
            sum += arr[i];
        }
    }

    cout << "Tong cac so chan la: " << sum << endl;
    return 0;
}
\`\`\`
`;
