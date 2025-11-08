// api/posts.ts
import { Post, ContentBlock } from '../types';

// Import aggregated post arrays from each category's index file
//import { tinHoc10Posts } from '../posts/tin-hoc-10';
//import { tinHoc11Posts } from '../posts/tin-hoc-11';
import { tinHoc12Posts } from '../posts/tin-hoc-12';
<<<<<<< HEAD
import { thuatToanVaCtdlPosts } from '../posts/thuat-toan-va-ctdl';
=======
import { thuatToanPosts } from '../posts/thuat-toan-va-ctdl';
>>>>>>> 6c4c2a6fe52e40088870e2ec40768145a2e0db59
//import { deThiPosts } from '../posts/de-thi-dap-an';
//import { huongDanPosts } from '../posts/huong-dan';

const allMarkdownStrings = [
 // ...tinHoc10Posts,
 // ...tinHoc11Posts,
  ...tinHoc12Posts,
<<<<<<< HEAD
  ...thuatToanVaCtdlPosts,
=======
  ...thuatToanPosts,
>>>>>>> 6c4c2a6fe52e40088870e2ec40768145a2e0db59
 // ...deThiPosts,
 // ...huongDanPosts,
];

// --- PARSING LOGIC (unchanged) ---
const parseMarkdown = (markdown: string): Post => {
  const frontmatterMatch = markdown.match(/---([\s\S]*?)---/);
  if (!frontmatterMatch) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }
  
  const frontmatter = frontmatterMatch[1];
  const content = markdown.slice(frontmatterMatch[0].length).trim();
  
  const post: Partial<Post> = {};

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      const trimmedKey = key.trim() as keyof Post;

      try {
        if (['tags', 'attachments'].includes(trimmedKey as string)) {
          (post[trimmedKey] as any) = JSON.parse(value);
        } else if (['readTime', 'grade', 'downloads'].includes(trimmedKey as string)) {
           (post[trimmedKey] as any) = value === 'null' ? null : Number(value);
        }
        else {
          (post[trimmedKey] as any) = value;
        }
      } catch (e) {
        console.error(`Error parsing key "${String(trimmedKey)}" with value "${value}"`, e);
        (post[trimmedKey] as any) = value;
      }
    }
  });

  const contentBlocks: ContentBlock[] = [];
  const lines = content.split('\n');
  let currentCodeBlock: { language: string; content: string[] } | null = null;
  
  for (const line of lines) {
      if (line.startsWith('```')) {
          if (currentCodeBlock) {
              contentBlocks.push({
                  type: 'code',
                  language: currentCodeBlock.language as any,
                  content: currentCodeBlock.content.join('\n')
              });
              currentCodeBlock = null;
          } else {
              currentCodeBlock = { language: line.substring(3), content: [] };
          }
      } else if (currentCodeBlock) {
          currentCodeBlock.content.push(line);
      } else if (line.startsWith('###')) {
          contentBlocks.push({ type: 'heading', level: 3, content: line.substring(4).trim() });
      } else if (line.startsWith('##')) {
          contentBlocks.push({ type: 'heading', level: 2, content: line.substring(3).trim() });
      } else if (line.trim().startsWith('- ')) {
          const lastBlock = contentBlocks[contentBlocks.length - 1];
          if (lastBlock && lastBlock.type === 'list') {
              lastBlock.items.push(line.trim().substring(2));
          } else {
              contentBlocks.push({ type: 'list', items: [line.trim().substring(2)] });
          }
      } else if (line.trim()) {
          contentBlocks.push({ type: 'paragraph', content: line.trim() });
      }
  }

  post.content = contentBlocks;
  return post as Post;
};


let allPosts: Post[] = [];

try {
  allPosts = allMarkdownStrings.map(parseMarkdown);
} catch (error) {
  console.error("Error parsing markdown files:", error);
}

export const getAllPosts = (): Post[] => {
  return allPosts;
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return allPosts.find(post => post.slug === slug);
};
