import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getAllPosts } from '../api/posts';
import { categories, tags } from '../data/meta';
import Breadcrumb from '../components/Breadcrumb';
import CodeBlock from '../components/CodeBlock';
import PostCard from '../components/PostCard';
import { ContentBlock } from '../types';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

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
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Parse markdown links [text](url) and convert to React elements
const parseMarkdownLinks = (text: string): (string | React.ReactElement)[] => {
  const parts: (string | React.ReactElement)[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the link
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
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : [text];
};


const ArticlePage: React.FC = () => {
  const { slug } = useParams<{slug: string}>();
  const post = getPostBySlug(slug!);

  if (!post) {
    return <div className="text-center py-20">
        <h1 className="text-4xl font-bold">404 - Không tìm thấy bài viết</h1>
        <p className="mt-4 text-lg">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">Về trang chủ</Link>
    </div>;
  }
  
  const allPosts = getAllPosts();
  const category = categories.find(c => c.id === post.categoryId);
  const postTags = tags.filter(t => post.tags.includes(t.id));
  const relatedPosts = allPosts.filter(p => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 3);
  // FIX: Use an explicit type guard with `Extract` to correctly narrow the `ContentBlock` type after filtering.
  // This ensures that `block` is recognized as a heading block, allowing safe access to `content` and `level` properties.
  const tocItems = post.content
    .filter(
      (block): block is Extract<ContentBlock, { type: 'heading' }> =>
        block.type === 'heading'
    )
    .map((block) => ({
      text: block.content,
      link: `#${slugify(block.content)}`,
      level: block.level,
    }));

  // Tìm và tách phần thông tin liên hệ
  const contactInfoIndex = post.content.findIndex(
    (block) => block.type === 'heading' && 
    block.content.toLowerCase().includes('thông tin liên hệ')
  );

  // Lọc content để loại bỏ phần thông tin liên hệ (sẽ render riêng)
  const filteredContent = contactInfoIndex !== -1 
    ? post.content.filter((block, index) => {
        // Tìm heading tiếp theo sau contact info
        let nextHeadingIndex = post.content.length;
        for (let i = contactInfoIndex + 1; i < post.content.length; i++) {
          if (post.content[i].type === 'heading') {
            nextHeadingIndex = i;
            break;
          }
        }
        // Loại bỏ heading "Thông tin liên hệ" và các block sau nó cho đến heading tiếp theo
        return !(index >= contactInfoIndex && index < nextHeadingIndex);
      })
    : post.content;

  // Lấy các block của phần thông tin liên hệ
  const contactBlocks: ContentBlock[] = contactInfoIndex !== -1
    ? (() => {
        const blocks: ContentBlock[] = [];
        for (let i = contactInfoIndex + 1; i < post.content.length; i++) {
          const nextBlock = post.content[i];
          if (nextBlock.type === 'heading') break;
          blocks.push(nextBlock);
        }
        return blocks;
      })()
    : [];

  const renderContentBlock = (block: ContentBlock, index: number) => {

    switch (block.type) {
      case 'heading':
        if (block.level === 2) {
          return <h2 key={index} id={slugify(block.content)} className="text-3xl font-bold mt-8 mb-4 scroll-mt-20">{block.content}</h2>;
        }
        return <h3 key={index} id={slugify(block.content)} className="text-2xl font-bold mt-6 mb-3 scroll-mt-20">{block.content}</h3>;
      case 'paragraph':
        return <p key={index} className="my-4 leading-relaxed">{parseMarkdownLinks(block.content)}</p>;
      case 'code':
        return <CodeBlock key={index} code={block.content} language={block.language} />;
      case 'list':
          return <ul key={index} className="list-disc list-inside my-4 space-y-2 pl-4">
              {block.items.map((item, i) => <li key={i}>{parseMarkdownLinks(item)}</li>)}
          </ul>
      default:
        return null;
    }
  };

  return (
    <div>
        <Breadcrumb items={[
            { label: 'Trang chủ', link: '/' },
            { label: category?.name || '', link: `/category/${category?.slug}` },
            { label: post.title },
        ]} />
        
        <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <article className="lg:col-span-8">
                <header>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Bởi {post.author}</span>
                        <span>&bull;</span>
                        <span>{new Date(post.publishedDate).toLocaleDateString('vi-VN')}</span>
                        <span>&bull;</span>
                        <span>{post.readTime} phút đọc</span>
                    </div>
                </header>

                <div className="prose dark:prose-invert max-w-none mt-8">
                    {filteredContent.map(renderContentBlock)}
                </div>

                {post.attachments.length > 0 && (
                    <div className="mt-12 p-6 bg-cyan-50 dark:bg-slate-800 border-l-4 border-cyan-500 rounded-r-lg">
                        <h3 className="text-xl font-bold mb-4">Tải tài liệu</h3>
                        <div className="space-y-3">
                            {post.attachments.map((file, i) => {
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

                                return (
                                    <div key={i} className="space-y-2">
                                        <a 
                                            href={file.url} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <DownloadIcon />
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
                                        {file.type === 'PDF' && file.url && (
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
                                                        src={getPreviewUrl(file.url)}
                                                        className="w-full h-full border-0"
                                                        title={`Preview ${file.name}`}
                                                        allow="fullscreen"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Thông tin liên hệ - hiển thị sau phần preview tài liệu */}
                {contactInfoIndex !== -1 && contactBlocks.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold mb-4">Thông tin liên hệ</h3>
                        <div className="space-y-3">
                            {contactBlocks.map((contactBlock, i) => {
                                if (contactBlock.type === 'paragraph') {
                                    const content = contactBlock.content;
                                    // Parse "Fanpage: [text](url)" hoặc "Email : [text](url)"
                                    const fanpageMatch = content.match(/^Fanpage:\s*\[([^\]]+)\]\(([^)]+)\)/);
                                    const emailMatch = content.match(/^Email\s*:\s*\[([^\]]+)\]\(([^)]+)\)/);
                                    const zaloDiscordMatch = content.match(/^Tham gia nhóm/);

                                    if (fanpageMatch) {
                                        return (
                                            <div key={`contact-${i}`}>
                                                <span className="font-semibold">Fanpage: </span>
                                                <a
                                                    href={fanpageMatch[2]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                                                >
                                                    {fanpageMatch[1]}
                                                </a>
                                            </div>
                                        );
                                    }
                                    if (emailMatch) {
                                        return (
                                            <div key={`contact-${i}`}>
                                                <span className="font-semibold">Email: </span>
                                                <a
                                                    href={emailMatch[2]}
                                                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                                                >
                                                    {emailMatch[1]}
                                                </a>
                                            </div>
                                        );
                                    }
                                    if (zaloDiscordMatch) {
                                        return (
                                            <div key={`contact-${i}`}>
                                                <p className="font-semibold mb-2">{content}</p>
                                            </div>
                                        );
                                    }
                                    // Fallback cho paragraph khác
                                    return (
                                        <p key={`contact-${i}`} className="leading-relaxed">
                                            {parseMarkdownLinks(content)}
                                        </p>
                                    );
                                }
                                if (contactBlock.type === 'list') {
                                    return (
                                        <ul key={`contact-${i}`} className="list-disc list-inside space-y-1 ml-4">
                                            {contactBlock.items.map((item, j) => (
                                                <li key={j}>
                                                    {parseMarkdownLinks(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold mb-2">Thẻ:</h4>
                    <div className="flex flex-wrap gap-2">
                        {postTags.map(tag => (
                            <span key={tag.id} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-sm rounded-full">{tag.name}</span>
                        ))}
                    </div>
                </div>

            </article>

            <aside className="lg:col-span-4 mt-12 lg:mt-0">
                <div className="sticky top-24">
                    <h3 className="text-xl font-bold mb-4">Mục lục</h3>
                    <ul className="space-y-2 border-l-2 border-slate-200 dark:border-slate-700">
                        {tocItems.map(item => (
                            <li key={item.link}>
                                <a 
                                    href={item.link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const targetId = item.link.substring(1); // Remove #
                                        const targetElement = document.getElementById(targetId);
                                        if (targetElement) {
                                            const headerOffset = 100;
                                            const elementPosition = targetElement.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: 'smooth'
                                            });
                                        }
                                    }}
                                    className={`block pl-4 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 border-l-2 border-transparent -ml-px transition-all cursor-pointer ${item.level === 3 ? 'ml-4' : ''}`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>

        {relatedPosts.length > 0 && (
             <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold mb-6">Bài viết liên quan</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
                </div>
            </section>
        )}
    </div>
  );
};

export default ArticlePage;
