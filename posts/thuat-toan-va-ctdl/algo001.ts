// posts/thuat-toan-va-ctdl/algo001.ts
export const post = `
---
id: "algo001"
slug: "thuat-toan-quy-hoach-dong-nhap-mon"
title: "Nhập môn Quy hoạch động (Dynamic Programming)"
excerpt: "Quy hoạch động là một kỹ thuật mạnh mẽ để giải quyết các bài toán tối ưu. Bài viết này giới thiệu các khái niệm cốt lõi: bài toán con gối nhau và cấu trúc con tối ưu."
author: "Admin"
publishedDate: "2023-10-25"
readTime: 25
categoryId: "thuat-toan-va-ctdl"
tags: '["dp"]'
level: "Chuyên sâu"
grade: null
language: null
attachments: '[]'
downloads: 2100
---
## Bài toán Dãy con tăng dài nhất (LIS)
Một ví dụ kinh điển để minh họa cho quy hoạch động. Ta sẽ tìm cách xây dựng lời giải từ các bài toán con nhỏ hơn.
\`\`\`cpp
#include <vector>
#include <algorithm>
using namespace std;

int longestIncreasingSubsequence(vector<int>& nums) {
    if (nums.empty()) return 0;
    vector<int> dp(nums.size(), 1);
    int max_len = 1;
    for (size_t i = 1; i < nums.size(); ++i) {
        for (size_t j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        max_len = max(max_len, dp[i]);
    }
    return max_len;
}
\`\`\`
`;
