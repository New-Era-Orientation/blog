// posts/thuat-toan-va-ctdl/algo002.ts
export const post = `
---
id: "algo002"
slug: "thuat-toan-tim-kiem-theo-chieu-sau-dfs"
title: "Thuật toán Tìm kiếm theo chiều sâu (DFS)"
excerpt: "Học cách duyệt đồ thị hoặc cây bằng thuật toán DFS. Bài viết bao gồm cài đặt bằng đệ quy và sử dụng ngăn xếp (stack), cùng các ứng dụng phổ biến."
author: "Admin"
publishedDate: "2023-10-23"
readTime: 16
categoryId: "thuat-toan-va-ctdl"
tags: '["graph", "search"]'
level: "Nâng cao"
grade: 11
language: null
attachments: '[]'
downloads: 1400
---
## Ý tưởng của DFS
DFS bắt đầu từ một đỉnh gốc và khám phá càng sâu càng tốt dọc theo mỗi nhánh trước khi quay lui. Thuật toán này thường được cài đặt bằng đệ quy.
\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

void DFS(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            DFS(v, adj, visited);
        }
    }
}
\`\`\`
`;
