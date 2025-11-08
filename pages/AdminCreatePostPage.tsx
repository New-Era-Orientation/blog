import React, { useState, useMemo } from 'react';
import { categories, tags } from '../data/meta';
import CodeBlock from '../components/CodeBlock';
import { Attachment } from '../types';

const slugify = (text: string) => {
  // Bảng chuyển đổi ký tự có dấu sang không dấu
  const diacriticsMap: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
    'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
    'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O',
    'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
    'Đ': 'D'
  };

  return text
    .toString()
    .split('')
    .map(char => diacriticsMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Parse markdown links [text](url) and convert to React elements
const parseMarkdownLinks = (text: string): (string | React.ReactElement)[] => {
  const parts: (string | React.ReactElement)[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const url = match[2];
    const linkText = match[1];
    const isExternal = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
    parts.push(
      <a
        key={key++}
        href={url}
        target={isExternal && !url.startsWith('mailto:') ? '_blank' : undefined}
        rel={isExternal && !url.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
        className="text-cyan-600 dark:text-cyan-400 hover:underline"
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : [text];
};

// Simple markdown parser for preview
const parseMarkdownPreview = (content: string) => {
  const blocks: React.ReactElement[] = [];
  const lines = content.split('\n');
  let currentCodeBlock: { language: string; content: string[] } | null = null;
  let currentListItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push(
        <ul key={key++} className="list-disc list-inside my-4 space-y-2 pl-4">
          {currentListItems.map((item, i) => (
            <li key={i}>{parseMarkdownLinks(item)}</li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      flushList();
      if (currentCodeBlock) {
        blocks.push(
          <CodeBlock key={key++} code={currentCodeBlock.content.join('\n')} language={currentCodeBlock.language} />
        );
        currentCodeBlock = null;
      } else {
        currentCodeBlock = { language: line.substring(3).trim() || 'text', content: [] };
      }
    } else if (currentCodeBlock) {
      currentCodeBlock.content.push(line);
    } else if (line.startsWith('###')) {
      flushList();
      blocks.push(
        <h3 key={key++} className="text-2xl font-bold mt-6 mb-3 scroll-mt-20">
          {line.substring(4).trim()}
        </h3>
      );
    } else if (line.startsWith('##')) {
      flushList();
      blocks.push(
        <h2 key={key++} className="text-3xl font-bold mt-8 mb-4 scroll-mt-20">
          {line.substring(3).trim()}
        </h2>
      );
    } else if (line.trim().startsWith('- ')) {
      currentListItems.push(line.trim().substring(2));
    } else if (line.trim().match(/^!\[.*?\]\(.*?\)$/)) {
      // Markdown image: ![alt](url)
      flushList();
      const imageMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        const alt = imageMatch[1];
        const url = imageMatch[2];
        blocks.push(
          <div key={key++} className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <img
              src={url}
              alt={alt}
              className="w-full h-auto object-contain bg-slate-50 dark:bg-slate-900"
            />
          </div>
        );
      }
    } else if (line.trim()) {
      flushList();
      blocks.push(
        <p key={key++} className="my-4 leading-relaxed">
          {parseMarkdownLinks(line.trim())}
        </p>
      );
    }
  }

  flushList();

  if (currentCodeBlock) {
    blocks.push(
      <CodeBlock key={key++} code={currentCodeBlock.content.join('\n')} language={currentCodeBlock.language} />
    );
  }

  return blocks;
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md text-sm transition-colors"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Đã copy' : label}</span>
    </button>
  );
};

const AdminCreatePostPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: 'NEO',
    categoryId: 'tin-hoc-10',
    tags: '[]',
    level: 'Cơ bản',
    grade: '10',
    language: 'null',
    readTime: '10',
    excerpt: '',
    content: '## Tiêu đề mục\n\nNội dung bài viết...\n\n```python\n# Code mẫu\nprint("Hello World")\n```',
  });
  
  const [contactInfo, setContactInfo] = useState({
    fanpageName: 'NEO - Cùng nhau Thủ khoa Tin học',
    fanpageUrl: 'https://www.facebook.com/profile.php?id=61581439181186',
    email: 'neo.tinhocthptqg@gmail.com',
    zaloUrl: 'https://zalo.me/g/amgakz845',
    discordUrl: 'https://discord.gg/c4RpGPQFZy',
    showContact: true,
  });

  const [coverImage, setCoverImage] = useState({
    url: '',
    showCover: false,
  });
  
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      name: 'Chủ đề 12G',
      url: 'https://drive.google.com/file/d/1dP5RvhlLu6ETCN5A04i0A2jHdfDHGGnS/view?usp=sharing',
      type: 'PDF',
      size: ''
    }
  ]);
  const [newAttachment, setNewAttachment] = useState({ name: '', url: '', type: 'PDF', size: '' });
  const [generatedCode, setGeneratedCode] = useState<{ postFile: string, indexFile: string } | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  const slug = useMemo(() => slugify(formData.title) || 'bai-viet-moi', [formData.title]);
  const id = useMemo(() => {
    const categoryPrefix = categories.find(c => c.id === formData.categoryId)?.slug.substring(0, 3) || 'post';
    return `${categoryPrefix}${Math.floor(Math.random() * 1000)}`;
  }, [formData.categoryId]);

  const selectedTags = useMemo(() => {
    try {
      const tagIds = JSON.parse(formData.tags || '[]');
      return tags.filter(t => tagIds.includes(t.id));
    } catch {
      return [];
    }
  }, [formData.tags]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId: string) => {
    try {
      const currentTags = JSON.parse(formData.tags || '[]');
      const newTags = currentTags.includes(tagId)
        ? currentTags.filter((t: string) => t !== tagId)
        : [...currentTags, tagId];
      setFormData(prev => ({ ...prev, tags: JSON.stringify(newTags) }));
    } catch {
      setFormData(prev => ({ ...prev, tags: JSON.stringify([tagId]) }));
    }
  };

  const handleAddAttachment = () => {
    if (newAttachment.name && newAttachment.url) {
      setAttachments([...attachments, { ...newAttachment }]);
      setNewAttachment({ name: '', url: '', type: 'PDF', size: '' });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleGenerateCode = () => {
    const attachmentsJson = JSON.stringify(attachments);
    let finalContent = formData.content;
    
    // Thêm ảnh bìa vào đầu content nếu được bật
    if (coverImage.showCover && coverImage.url) {
      const coverSection = `![Trang bìa](${coverImage.url})\n\n`;
      finalContent = coverSection + finalContent;
    }
    
    // Thêm thông tin liên hệ vào cuối content nếu được bật
    if (contactInfo.showContact) {
      const contactSection = `\n\n### Thông tin liên hệ:
Fanpage: [${contactInfo.fanpageName}](${contactInfo.fanpageUrl})
Email : [${contactInfo.email}](mailto:${contactInfo.email})
Tham gia nhóm Zalo và Discord để lấy thêm tài liệu:
- [Tham gia nhóm Zalo](${contactInfo.zaloUrl})
- [Tham gia Discord](${contactInfo.discordUrl})`;
      finalContent += contactSection;
    }
    
    const postFileContent = `export const post = \`
---
id: "${id}"
slug: "${slug}"
title: "${formData.title}"
excerpt: "${formData.excerpt}"
author: "${formData.author}"
publishedDate: "${new Date().toISOString().split('T')[0]}"
readTime: ${formData.readTime}
categoryId: "${formData.categoryId}"
tags: '${formData.tags}'
level: "${formData.level}"
grade: ${formData.grade === 'null' ? 'null' : formData.grade}
language: ${formData.language === 'null' ? 'null' : `"${formData.language}"`}
attachments: '${attachmentsJson}'
downloads: 0
---

${finalContent}
\`;`;

    const indexFileContent = `// Mở file: posts/${formData.categoryId}/index.ts

// 1. Thêm dòng import này vào đầu file
import { post as ${slug.replace(/-/g, '_')} } from './${slug}';

// 2. Thêm biến vừa import vào mảng export
// export const yourCategoryPosts = [
//   ...,
//   ${slug.replace(/-/g, '_')},
// ];`;

      setGeneratedCode({ postFile: postFileContent, indexFile: indexFileContent });
  };

  const category = categories.find(c => c.id === formData.categoryId);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Trợ lý tạo bài viết</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Điền thông tin vào form bên trái, xem preview bên phải. Sau đó click "Tạo mã" để lấy code.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          {showPreview ? 'Ẩn Preview' : 'Hiện Preview'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
      <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Thông tin bài viết</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề bài viết"
                  className="input-style w-full"
                />
                <p className="text-xs text-slate-500 mt-1">Slug: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">{slug}</code></p>
              </div>

        <div>
                <label className="block text-sm font-medium mb-1">Mô tả ngắn (Excerpt) *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Mô tả ngắn về bài viết"
                  className="input-style w-full"
                />
        </div>

              <div className="grid grid-cols-2 gap-4">
            <div>
                  <label className="block text-sm font-medium mb-1">Tác giả</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="input-style w-full"
                  />
            </div>
            <div>
                  <label className="block text-sm font-medium mb-1">Chuyên mục *</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="input-style w-full"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
              </select>
            </div>
        </div>
        
              <div className="grid grid-cols-3 gap-4">
           <div>
                  <label className="block text-sm font-medium mb-1">Cấp độ</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="input-style w-full"
                  >
                <option>Cơ bản</option>
                <option>Nâng cao</option>
                <option>Chuyên sâu</option>
              </select>
            </div>
            <div>
                  <label className="block text-sm font-medium mb-1">Lớp</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="input-style w-full"
                  >
                    <option value="null">Không có</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="input-style w-full"
                  >
                    <option value="null">Không có</option>
                    <option>Python</option>
                    <option>C++</option>
                  </select>
            </div>
        </div>

        <div>
                <label className="block text-sm font-medium mb-1">Thời gian đọc (phút)</label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  min="1"
                  className="input-style w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border border-slate-300 dark:border-slate-600 rounded-md">
                  {tags.map(tag => {
                    const isSelected = selectedTags.some(t => t.id === tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleTagToggle(tag.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          isSelected
                            ? 'bg-cyan-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-500 mt-1">Đã chọn: {selectedTags.length} tags</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📎 Link tài liệu</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên file</label>
                  <input
                    type="text"
                    value={newAttachment.name}
                    onChange={(e) => setNewAttachment({ ...newAttachment, name: e.target.value })}
                    placeholder="VD: De thi HK1.pdf"
                    className="input-style w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loại</label>
                  <select
                    value={newAttachment.type}
                    onChange={(e) => setNewAttachment({ ...newAttachment, type: e.target.value })}
                    className="input-style w-full"
                  >
                    <option>PDF</option>
                    <option>DOC</option>
                    <option>DOCX</option>
                    <option>ZIP</option>
                    <option>RAR</option>
                    <option>Link</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL/Link</label>
                <input
                  type="url"
                  value={newAttachment.url}
                  onChange={(e) => setNewAttachment({ ...newAttachment, url: e.target.value })}
                  placeholder="https://..."
                  className="input-style w-full"
                />
        </div>

        <div>
                <label className="block text-sm font-medium mb-1">Kích thước (tùy chọn)</label>
                <input
                  type="text"
                  value={newAttachment.size}
                  onChange={(e) => setNewAttachment({ ...newAttachment, size: e.target.value })}
                  placeholder="VD: 2.5 MB"
                  className="input-style w-full"
                />
        </div>

              <button
                onClick={handleAddAttachment}
                disabled={!newAttachment.name || !newAttachment.url}
                className="w-full py-2 px-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <PlusIcon />
                Thêm link tài liệu
              </button>

              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Danh sách tài liệu ({attachments.length}):</p>
                  {attachments.map((att, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-md"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <DownloadIcon />
                        <div className="ml-2 min-w-0 flex-1">
                          <p className="font-semibold truncate">{att.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {att.type}{att.size ? ` • ${att.size}` : ''}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAttachment(index)}
                        className="ml-2 p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Xóa"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🖼️ Trang bìa (Cover Page)</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="showCover"
                  checked={coverImage.showCover}
                  onChange={(e) => setCoverImage({ ...coverImage, showCover: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="showCover" className="text-sm font-medium">
                  Hiển thị trang bìa trong bài viết
                </label>
              </div>

              {coverImage.showCover && (
                <div>
                  <label className="block text-sm font-medium mb-1">URL ảnh bìa</label>
                  <input
                    type="url"
                    value={coverImage.url}
                    onChange={(e) => setCoverImage({ ...coverImage, url: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                    className="input-style w-full"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Nhập URL ảnh bìa (có thể từ Google Drive, Imgur, hoặc hosting khác)
                  </p>
                  
                  {coverImage.url && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Preview ảnh bìa:</p>
                      <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden">
                        <img
                          src={coverImage.url}
                          alt="Trang bìa"
                          className="w-full h-auto max-h-64 object-contain bg-slate-100 dark:bg-slate-900"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'p-4 text-center text-red-500 text-sm';
                            errorDiv.textContent = 'Không thể tải ảnh. Vui lòng kiểm tra lại URL.';
                            (e.target as HTMLImageElement).parentElement?.appendChild(errorDiv);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📞 Thông tin liên hệ</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="showContact"
                  checked={contactInfo.showContact}
                  onChange={(e) => setContactInfo({ ...contactInfo, showContact: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="showContact" className="text-sm font-medium">
                  Hiển thị thông tin liên hệ trong bài viết
                </label>
              </div>

              {contactInfo.showContact && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên Fanpage</label>
                    <input
                      type="text"
                      value={contactInfo.fanpageName}
                      onChange={(e) => setContactInfo({ ...contactInfo, fanpageName: e.target.value })}
                      placeholder="VD: NEO - Cùng nhau Thủ khoa Tin học"
                      className="input-style w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Link Fanpage</label>
                    <input
                      type="url"
                      value={contactInfo.fanpageUrl}
                      onChange={(e) => setContactInfo({ ...contactInfo, fanpageUrl: e.target.value })}
                      placeholder="https://www.facebook.com/..."
                      className="input-style w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="neo.tinhocthptqg@gmail.com"
                      className="input-style w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Link nhóm Zalo</label>
                    <input
                      type="url"
                      value={contactInfo.zaloUrl}
                      onChange={(e) => setContactInfo({ ...contactInfo, zaloUrl: e.target.value })}
                      placeholder="https://zalo.me/g/..."
                      className="input-style w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Link nhóm Discord</label>
                    <input
                      type="url"
                      value={contactInfo.discordUrl}
                      onChange={(e) => setContactInfo({ ...contactInfo, discordUrl: e.target.value })}
                      placeholder="https://discord.gg/..."
                      className="input-style w-full"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Nội dung (Markdown)</h2>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={20}
              placeholder="Nhập nội dung markdown..."
              className="input-style w-full font-mono text-sm"
            />
            <div className="mt-2 text-xs text-slate-500 space-y-1">
              <p><strong>Hỗ trợ:</strong></p>
              <ul className="list-disc list-inside ml-2">
                <li>Tiêu đề: <code>## Tiêu đề</code> hoặc <code>### Tiêu đề phụ</code></li>
                <li>Code block: <code>```python</code> ... <code>```</code></li>
                <li>Links: <code>[text](url)</code></li>
                <li>List: <code>- item</code></li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGenerateCode}
            className="w-full py-3 px-4 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors text-lg"
          >
            🚀 Tạo mã nguồn
        </button>

        {generatedCode && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-bold">📋 Mã nguồn đã tạo</h3>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">1. File bài viết mới</h4>
                  <CopyButton text={generatedCode.postFile} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Tạo file: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">posts/{formData.categoryId}/{slug}.ts</code>
                </p>
                <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-md text-xs overflow-x-auto">
                  <code>{generatedCode.postFile}</code>
                </pre>
              </div>

                <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">2. Cập nhật index.ts</h4>
                  <CopyButton text={generatedCode.indexFile} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Mở file: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">posts/{formData.categoryId}/index.ts</code>
                </p>
                <pre className="p-4 bg-slate-100 dark:bg-slate-900 rounded-md text-xs overflow-x-auto">
                  <code>{generatedCode.indexFile}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">👁️ Preview</h2>
              
              {formData.title ? (
                <div className="prose dark:prose-invert max-w-none">
                  <header className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                      {formData.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>Bởi {formData.author}</span>
                      <span>&bull;</span>
                      <span>{new Date().toISOString().split('T')[0]}</span>
                      <span>&bull;</span>
                      <span>{formData.readTime} phút đọc</span>
                    </div>
                    {formData.excerpt && (
                      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 italic">
                        {formData.excerpt}
                      </p>
                    )}
                  </header>

                  {coverImage.showCover && coverImage.url && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img
                        src={coverImage.url}
                        alt="Trang bìa"
                        className="w-full h-auto object-contain bg-slate-50 dark:bg-slate-900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent && !parent.querySelector('.error-message')) {
                            const errorDiv = document.createElement('div');
                            errorDiv.className = 'error-message p-4 text-center text-red-500 text-sm bg-red-50 dark:bg-red-900/20';
                            errorDiv.textContent = 'Không thể tải ảnh bìa. Vui lòng kiểm tra lại URL.';
                            parent.appendChild(errorDiv);
                          }
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {category && (
                      <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm">
                        {category.name}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">
                      {formData.level}
                    </span>
                    {formData.grade !== 'null' && (
                      <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">
                        Lớp {formData.grade}
                      </span>
                    )}
                    {formData.language !== 'null' && (
                      <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">
                        {formData.language}
                      </span>
                    )}
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold mb-2">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map(tag => (
                          <span key={tag.id} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="article-content">
                    {formData.content ? parseMarkdownPreview(formData.content) : (
                      <p className="text-slate-500 italic">Nhập nội dung để xem preview...</p>
                    )}
                  </div>

                  {attachments.length > 0 && (
                    <div className="mt-12 p-6 bg-cyan-50 dark:bg-slate-800 border-l-4 border-cyan-500 rounded-r-lg">
                      <h3 className="text-xl font-bold mb-4">Tải tài liệu</h3>
                      <div className="space-y-3">
                        {attachments.map((file, i) => (
                          <div key={i} className="space-y-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                            >
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <div>
                                  <span className="font-semibold">{file.name}</span>
                                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                                    ({file.type}{file.size ? `, ${file.size}` : ''})
                                  </span>
                                </div>
                              </div>
                              <span className="font-bold text-cyan-600 dark:text-cyan-400">Tải về</span>
                            </a>
                            
                            {/* Preview tài liệu PDF */}
                            {file.type === 'PDF' && file.url && (() => {
                              // Chuyển đổi Google Drive link sang preview link
                              const getPreviewUrl = (url: string) => {
                                // Google Drive file link: https://drive.google.com/file/d/FILE_ID/view
                                const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                                if (driveMatch) {
                                  return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
                                }
                                // Nếu đã là preview link hoặc direct link
                                return url.includes('preview') ? url : `${url}#toolbar=0&navpanes=0&scrollbar=0`;
                              };

                              const previewUrl = getPreviewUrl(file.url);
                              
                              return (
                                <div className="mt-2 border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                                  <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                      👁️ Xem trước tài liệu
                                    </span>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
                                    >
                                      Mở trong tab mới →
                                    </a>
                                  </div>
                                  <div className="w-full" style={{ height: '600px' }}>
                                    <iframe
                                      src={previewUrl}
                                      className="w-full h-full border-0"
                                      title={`Preview ${file.name}`}
                                      allow="fullscreen"
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {contactInfo.showContact && (
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="text-2xl font-bold mb-4">Thông tin liên hệ</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold">Fanpage: </span>
                          <a
                            href={contactInfo.fanpageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            {contactInfo.fanpageName}
                          </a>
                        </div>
                        <div>
                          <span className="font-semibold">Email: </span>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            {contactInfo.email}
                          </a>
                </div>
                 <div>
                          <p className="font-semibold mb-2">Tham gia nhóm Zalo và Discord để lấy thêm tài liệu:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>
                              <a
                                href={contactInfo.zaloUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-600 dark:text-cyan-400 hover:underline"
                              >
                                Tham gia nhóm Zalo
                              </a>
                            </li>
                            <li>
                              <a
                                href={contactInfo.discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-600 dark:text-cyan-400 hover:underline"
                              >
                                Tham gia Discord
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-lg">Nhập tiêu đề và nội dung để xem preview</p>
                </div>
              )}
                </div>
            </div>
        )}
      </div>

      <style>{`
        .input-style {
            padding: 0.5rem 0.75rem;
            background-color: white;
            border: 1px solid #cbd5e1;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          transition: all 0.2s;
        }
        .dark .input-style {
            background-color: #1e293b;
            border-color: #475569;
          color: #e2e8f0;
        }
        .input-style:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
        }
        .input-style::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default AdminCreatePostPage;
